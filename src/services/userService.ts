import { auth, db } from '../firebase/config';
import { 
  signInWithPhoneNumber, 
  RecaptchaVerifier, 
  PhoneAuthProvider,
  signInWithCredential,
  User,
  onAuthStateChanged,
  ConfirmationResult
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';

export interface KidArtUser {
  uid: string;
  phone: string;
  name: string;
  email?: string;
  isActive: boolean;
  createdAt: string;
  contribution: number;
  totalArtworks: number;
}

export class UserService {
  private recaptchaVerifier: RecaptchaVerifier | null = null;
  private confirmationResult: ConfirmationResult | null = null;

  // Initialize reCAPTCHA verifier (invisible mode)
  initializeRecaptcha(containerId: string = 'recaptcha-container'): RecaptchaVerifier {
    if (!this.recaptchaVerifier) {
      this.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
        size: 'invisible',
        callback: () => {
          console.log('reCAPTCHA solved');
        },
        'expired-callback': () => {
          console.log('reCAPTCHA expired');
          this.recaptchaVerifier = null;
        }
      });
    }
    return this.recaptchaVerifier;
  }

  // Send OTP to phone number
  async sendOTP(phoneNumber: string): Promise<string> {
    try {
      // Format phone number for Tanzania (+255)
      let formattedPhone = phoneNumber.trim();
      
      // Remove any spaces or dashes
      formattedPhone = formattedPhone.replace(/[\s-]/g, '');
      
      // Handle different formats
      if (formattedPhone.startsWith('0')) {
        formattedPhone = '+255' + formattedPhone.substring(1);
      } else if (formattedPhone.startsWith('255')) {
        formattedPhone = '+' + formattedPhone;
      } else if (!formattedPhone.startsWith('+255')) {
        formattedPhone = '+255' + formattedPhone;
      }

      console.log('Sending OTP to:', formattedPhone);

      // Initialize reCAPTCHA
      const recaptcha = this.initializeRecaptcha();
      
      // Send SMS
      this.confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, recaptcha);
      
      console.log('OTP sent successfully');
      return this.confirmationResult.verificationId;
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      
      // Handle specific Firebase errors
      if (error.code === 'auth/invalid-phone-number') {
        throw new Error('Namba ya simu si sahihi. Tumia mfano: 0712345678');
      } else if (error.code === 'auth/too-many-requests') {
        throw new Error('Maombi mengi sana. Jaribu baada ya dakika chache.');
      } else if (error.code === 'auth/operation-not-allowed') {
        throw new Error('Huduma ya SMS haijawezeshwa. Wasiliana na msimamizi.');
      } else {
        throw new Error('Hitilafu katika kutuma OTP. Jaribu tena.');
      }
    }
  }

  // Verify OTP and sign in user
  async verifyOTP(otp: string): Promise<User> {
    try {
      if (!this.confirmationResult) {
        throw new Error('Hakuna session ya uthibitisho. Tuma OTP tena.');
      }

      console.log('Verifying OTP:', otp);
      
      // Verify the OTP
      const result = await this.confirmationResult.confirm(otp);
      
      console.log('OTP verified successfully');
      return result.user;
    } catch (error: any) {
      console.error('Error verifying OTP:', error);
      
      // Handle specific Firebase errors
      if (error.code === 'auth/invalid-verification-code') {
        throw new Error('Namba ya uthibitisho si sahihi. Jaribu tena.');
      } else if (error.code === 'auth/code-expired') {
        throw new Error('Namba ya uthibitisho imeisha muda. Tuma OTP mpya.');
      } else {
        throw new Error('Hitilafu katika kuthibitisha OTP. Jaribu tena.');
      }
    }
  }

  // Create user profile in Firestore
  async createUserProfile(user: User, userData: Partial<KidArtUser>): Promise<void> {
    try {
      const userRef = doc(db, 'users', user.uid);
      const userProfile: KidArtUser = {
        uid: user.uid,
        phone: user.phoneNumber || '',
        name: userData.name || 'KidArt User',
        email: userData.email || '',
        isActive: userData.isActive || false,
        createdAt: new Date().toISOString(),
        contribution: userData.contribution || 0,
        totalArtworks: 0
      };

      await setDoc(userRef, userProfile);
      console.log('User profile created successfully');
    } catch (error: any) {
      console.error('Error creating user profile:', error);
      throw new Error('Hitilafu katika kuunda wasifu wa mtumiaji');
    }
  }

  // Get user profile from Firestore
  async getUserProfile(uid: string): Promise<KidArtUser | null> {
    try {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        return userSnap.data() as KidArtUser;
      }
      return null;
    } catch (error: any) {
      console.error('Error getting user profile:', error);
      return null;
    }
  }

  // Update user activation status
  async activateUser(uid: string, contribution: number = 500): Promise<void> {
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        isActive: true,
        contribution: contribution
      });

      // Update community pool
      await this.updateCommunityPool(contribution);
      console.log('User activated successfully');
    } catch (error: any) {
      console.error('Error activating user:', error);
      throw new Error('Hitilafu katika kuwezesha akaunti');
    }
  }

  // Update community pool
  async updateCommunityPool(amount: number): Promise<void> {
    try {
      const poolRef = doc(db, 'system', 'communityPool');
      const poolSnap = await getDoc(poolRef);
      
      if (poolSnap.exists()) {
        const currentPool = poolSnap.data().balance || 0;
        await updateDoc(poolRef, {
          balance: currentPool + amount,
          lastUpdated: new Date().toISOString()
        });
      } else {
        await setDoc(poolRef, {
          balance: amount,
          lastUpdated: new Date().toISOString()
        });
      }
    } catch (error: any) {
      console.error('Error updating community pool:', error);
    }
  }

  // Get community pool balance
  async getCommunityPool(): Promise<number> {
    try {
      const poolRef = doc(db, 'system', 'communityPool');
      const poolSnap = await getDoc(poolRef);
      
      if (poolSnap.exists()) {
        return poolSnap.data().balance || 0;
      }
      return 0;
    } catch (error: any) {
      console.error('Error getting community pool:', error);
      return 0;
    }
  }

  // Listen to auth state changes
  onAuthStateChange(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  }

  // Sign out user
  async signOut(): Promise<void> {
    try {
      await auth.signOut();
      this.cleanup();
    } catch (error: any) {
      console.error('Error signing out:', error);
      throw new Error('Hitilafu katika kutoka');
    }
  }

  // Clean up reCAPTCHA
  cleanup() {
    if (this.recaptchaVerifier) {
      this.recaptchaVerifier.clear();
      this.recaptchaVerifier = null;
    }
    this.confirmationResult = null;
  }
}

export const userService = new UserService();