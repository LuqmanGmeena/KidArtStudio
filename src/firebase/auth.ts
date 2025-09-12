import { auth } from './config';
import { 
  signInWithPhoneNumber, 
  RecaptchaVerifier, 
  PhoneAuthProvider,
  signInWithCredential,
  User
} from 'firebase/auth';

export class FirebaseAuthService {
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
      // Format phone number for international use
      let formattedPhone = phoneNumber;
      if (phoneNumber.startsWith('0')) {
        formattedPhone = '+255' + phoneNumber.substring(1);
      } else if (!phoneNumber.startsWith('+')) {
        formattedPhone = '+255' + phoneNumber;
      }

      const recaptcha = this.initializeRecaptcha();
      const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, recaptcha);
      
      // Store verification ID for later use
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

  // Clean up reCAPTCHA
  cleanup() {
    if (this.recaptchaVerifier) {
      this.recaptchaVerifier.clear();
      this.recaptchaVerifier = null;
    }
  }
}

export const firebaseAuth = new FirebaseAuthService();