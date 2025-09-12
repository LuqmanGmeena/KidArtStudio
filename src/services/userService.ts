import { auth, db } from '../firebase/config';
import { 
  signInWithPhoneNumber, 
  RecaptchaVerifier, 
  PhoneAuthProvider,
  signInWithCredential,
  User,
  onAuthStateChanged
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

  // Initialize reCAPTCHA verifier
  initializeRecaptcha(containerId: string = 'recaptcha-container') {
    if (!this.recaptchaVerifier) {
      this.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
        size: 'invisible',
        callback: () => {
          console.log('reCAPTCHA solved');
        },
        'expired-callback': () => {
          console.log('reCAPTCHA expired');
        }
      });
    }
    return this.recaptchaVerifier;
  }

  // Send OTP to phone number
  async sendOTP(phoneNumber: string): Promise<string> {
    try {
      // Format phone number for Tanzania
      let formattedPhone = phoneNumber;
      if (phoneNumber.startsWith('0')) {
        formattedPhone = '+255' + phoneNumber.substring(1);
      } else if (!phoneNumber.startsWith('+')) {
        formattedPhone = '+255' + phoneNumber;
      }

      const recaptcha = this.initializeRecaptcha();
      const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, recaptcha);
      
      return confirmationResult.verificationId;
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      throw new Error('Failed to send OTP: ' + error.message);
    }
  }

  // Verify OTP and sign in user
  async verifyOTP(verificationId: string, otp: string): Promise<User> {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      const result = await signInWithCredential(auth, credential);
      return result.user;
    } catch (error: any) {
      console.error('Error verifying OTP:', error);
      throw new Error('Invalid OTP: ' + error.message);
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
    } catch (error: any) {
      console.error('Error creating user profile:', error);
      throw new Error('Failed to create user profile');
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
    } catch (error: any) {
      console.error('Error activating user:', error);
      throw new Error('Failed to activate user');
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
    } catch (error: any) {
      console.error('Error signing out:', error);
      throw new Error('Failed to sign out');
    }
  }

  // Clean up reCAPTCHA
  cleanup() {
    if (this.recaptchaVerifier) {
      this.recaptchaVerifier.clear();
      this.recaptchaVerifier = null;
    }
  }
}

export const userService = new UserService();