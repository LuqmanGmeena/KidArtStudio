import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  User, 
  CheckCircle,
  AlertCircle,
  Loader,
  CreditCard
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

  const handlePayment = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 500,
          phone: formData.phone,
          description: 'KidArt Studio Account Activation'
        })
      });

      const data = await response.json();

      if (response.ok && data.redirect_url) {
        // Redirect to Pesapal payment page
        window.location.href = data.redirect_url;
      } else {
        throw new Error(data.error || 'Kuna tatizo la malipo');
      }
      
    } catch (error: any) {
      setError(error.message);
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

  // Check if returning from payment
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get('payment_status');
    
    if (paymentStatus === 'completed') {
      setPaymentCompleted(true);
      // Get stored user data and proceed to OTP
      const pendingUserData = JSON.parse(localStorage.getItem('pendingUserData') || '{}');
      if (pendingUserData.phone) {
        setFormData(prev => ({ ...prev, ...pendingUserData }));
        handleSendOTP();
      }
    }
  }, []);

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

        {/* Payment Screen */}
        {authMode === 'payment' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-green-600" />
            </div>
            
            <h2 className="text-xl font-bold text-gray-800 mb-2">Lipa Kuanzisha Akaunti</h2>
            <p className="text-gray-600 mb-4">
              Lipa Tshs 500/= kupitia Pesapal ili kuanzisha akaunti yako ya KidArt Studio
            </p>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="text-2xl font-bold text-green-700">Tshs 500/=</div>
              <div className="text-green-600 text-sm">Activation Fee</div>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
            >
              {loading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                'Lipa na Pesapal'
              )}
            </button>
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