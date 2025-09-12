import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  User, 
  CheckCircle,
  AlertCircle,
  Loader,
  CreditCard,
  Star,
  Gift,
  Coins
} from 'lucide-react';
import { userService } from '../services/userService';

interface AuthSystemProps {
  onAuthSuccess: (user: any) => void;
}

const AuthSystem: React.FC<AuthSystemProps> = ({ onAuthSuccess }) => {
  const [authMode, setAuthMode] = useState<'signup' | 'payment' | 'otp'>('signup');
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    name: '',
    otp: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      userService.cleanup();
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate phone number (Tanzanian format)
      if (!formData.phone.match(/^(\+255|0)[67]\d{8}$/)) {
        throw new Error('Namba ya simu si sahihi. Tumia mfano: 0712345678');
      }

      if (!formData.name.trim()) {
        throw new Error('Jina ni lazima');
      }

      // Store user data for later use
      localStorage.setItem('pendingUserData', JSON.stringify({
        phone: formData.phone,
        email: formData.email,
        name: formData.name
      }));

      // Proceed to payment
      setAuthMode('payment');
      
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMockPayment = async () => {
    setLoading(true);
    setError('');

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock payment success
      setPaymentCompleted(true);
      
      // Get stored user data and proceed to OTP
      const pendingUserData = JSON.parse(localStorage.getItem('pendingUserData') || '{}');
      if (pendingUserData.phone) {
        setFormData(prev => ({ ...prev, ...pendingUserData }));
        handleSendOTP();
      }
      
    } catch (error: any) {
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = async () => {
    setLoading(true);
    setError('');

    try {
      const verificationId = await userService.sendOTP(formData.phone);
      setVerificationId(verificationId);
      setAuthMode('otp');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const firebaseUser = await userService.verifyOTP(verificationId, formData.otp);
      
      // Get stored user data
      const pendingUserData = JSON.parse(localStorage.getItem('pendingUserData') || '{}');
      
      // Create user profile in Firestore
      await userService.createUserProfile(firebaseUser, {
        name: pendingUserData.name,
        email: pendingUserData.email,
        isActive: true,
        contribution: 500
      });
      
      // Create user object
      const userData = {
        uid: firebaseUser.uid,
        phone: firebaseUser.phoneNumber,
        name: pendingUserData.name || 'KidArt User',
        email: pendingUserData.email || '',
        isActive: true, // Active because payment was completed
        createdAt: new Date().toISOString(),
        contribution: 500 // Added to community pool
      };

      // Clean up
      localStorage.removeItem('pendingUserData');
      userService.cleanup();

      onAuthSuccess(userData);
      
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
        {/* reCAPTCHA container */}
        <div id="recaptcha-container"></div>
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎨</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">KidArt Studio</h1>
          <p className="text-gray-600 text-sm">
            {authMode === 'signup' && 'Fungua akaunti mpya'}
            {authMode === 'payment' && 'Lipa kuanzisha akaunti'}
            {authMode === 'otp' && 'Thibitisha namba ya simu'}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        )}

        {/* Payment Success Message */}
        {paymentCompleted && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            <span className="text-green-700 text-sm">Malipo yamekamilika! Sasa thibitisha namba ya simu.</span>
          </div>
        )}

        {/* Signup Form */}
        {authMode === 'signup' && (
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jina Kamili
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Jina lako kamili"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Namba ya Simu
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="0712345678"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email (Optional)
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="email@example.com"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
            >
              {loading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                'Endelea na Malipo'
              )}
            </button>
          </form>
        )}

        {/* Mock Payment Screen */}
        {authMode === 'payment' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Coins className="w-8 h-8 text-green-600" />
            </div>
            
            <h2 className="text-xl font-bold text-gray-800 mb-2">Lipa Kuanzisha Akaunti</h2>
            <p className="text-gray-600 mb-4">
              Lipa Tshs 500/= ili kuanzisha akaunti yako ya KidArt Studio
            </p>
            
            <div className="bg-gradient-to-r from-green-100 to-blue-100 border border-green-200 rounded-lg p-4 mb-6">
              <div className="text-3xl font-bold text-green-700 mb-2">Tshs 500/=</div>
              <div className="text-green-600 text-sm mb-3">Activation Fee</div>
              
              {/* Mock Benefits */}
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center justify-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>Unlimited drawing tools</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Gift className="w-4 h-4 text-purple-500" />
                  <span>Daily reward points</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <CreditCard className="w-4 h-4 text-blue-500" />
                  <span>Art competitions access</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleMockPayment}
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-400 text-white py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center shadow-lg"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin mr-2" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Coins className="w-5 h-5 mr-2" />
                  <span>Pay Now (Mock)</span>
                </>
              )}
            </button>
            
            <p className="text-xs text-gray-500 mt-3">
              🎮 This is a demo payment - no real money charged!
            </p>
          </div>
        )}

        {/* OTP Verification */}
        {authMode === 'otp' && (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <div className="text-center mb-4">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                Tumekutumia namba ya uthibitisho kwenye {formData.phone}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Namba ya Uthibitisho (OTP)
              </label>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleInputChange}
                placeholder="123456"
                maxLength={6}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-center text-lg font-mono"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
            >
              {loading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                'Thibitisha na Ingia'
              )}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={handleSendOTP}
                disabled={loading}
                className="text-purple-600 hover:text-purple-700 text-sm font-medium"
              >
                Hujapokea? Tuma tena
              </button>
            </div>
          </form>
        )}

        {/* Info */}
        <div className="mt-6 text-center text-xs text-gray-500">
          Kwa kujisajili, unakubali masharti yetu ya matumizi
        </div>
      </div>
    </div>
  );
};

export default AuthSystem;