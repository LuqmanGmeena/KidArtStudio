# KidArt Studio - Firebase Phone Authentication Setup

## 🔥 Firebase Configuration

This project uses Firebase Phone Authentication with the following setup:

### Project Details
- **Project Name**: Kid Art Studio
- **Project ID**: kid-art-studio
- **Hosting Domain**: kid-art-studio.web.app

### Authentication Setup

#### 1. Enable Phone Authentication
In Firebase Console:
1. Go to Authentication > Sign-in method
2. Enable "Phone" sign-in provider
3. Add test phone numbers for development:
   - Phone: +255712345678
   - OTP: 123456

#### 2. Domain Whitelist
Add these domains to Firebase Auth authorized domains:
- `localhost` (for development)
- `kid-art-studio.web.app` (production)
- `kid-art-studio.firebaseapp.com` (Firebase hosting)

#### 3. reCAPTCHA Setup
- Uses invisible reCAPTCHA for better UX
- Automatically initialized in `userService.ts`
- Container ID: `recaptcha-container`

### 🚀 Development Setup

#### Environment Variables
Create `.env` file with Firebase config (already included).

#### Test Numbers
For development, use these test numbers in Firebase Console:
- `+255712345678` → OTP: `123456`
- `+255687654321` → OTP: `654321`

#### Phone Number Formats Supported
- `0712345678` (local format)
- `+255712345678` (international)
- `255712345678` (country code without +)

### 📱 OTP Flow

1. **Signup**: User enters name, phone, email
2. **Payment**: Mock payment of 500 TZS
3. **OTP**: Real SMS sent via Firebase
4. **Verification**: User enters 6-digit OTP
5. **Success**: User authenticated and profile created

### 🛡️ Security Features

- Invisible reCAPTCHA verification
- Phone number validation
- Error handling for invalid OTP
- Rate limiting protection
- Secure Firestore rules

### 🎨 UI Features

- Kid-friendly colorful design
- Loading states and animations
- Clear error/success messages
- Responsive design
- Swahili language support

### 📦 Deployment

```bash
# Build and deploy
npm run build
firebase deploy
```

### 🔧 Troubleshooting

#### Common Issues:
1. **SMS not sent**: Check if phone auth is enabled in Firebase Console
2. **Domain not authorized**: Add domain to Firebase Auth settings
3. **reCAPTCHA failed**: Check if domain is whitelisted
4. **OTP invalid**: Ensure test numbers are configured correctly

#### Error Messages:
- `auth/operation-not-allowed`: Phone auth not enabled
- `auth/invalid-phone-number`: Wrong phone format
- `auth/too-many-requests`: Rate limited, wait before retry
- `auth/invalid-verification-code`: Wrong OTP entered

### 📞 Support

For issues with Firebase setup, check:
1. Firebase Console settings
2. Domain whitelist
3. Test phone numbers
4. reCAPTCHA configuration

---

**Note**: This setup includes both real Firebase Phone Auth and mock payment system for demonstration purposes.