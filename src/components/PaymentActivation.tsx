import React, { useState } from 'react';
import { 
  CreditCard, 
  Shield, 
  CheckCircle,
  AlertCircle,
  Loader,
  ArrowRight,
  Star,
  Gift,
  Coins,
  Zap,
  Heart,
  Trophy
} from 'lucide-react';

interface PaymentActivationProps {
  user: any;
  onActivationSuccess: () => void;
}

const PaymentActivation: React.FC<PaymentActivationProps> = ({ 
  user, 
  onActivationSuccess 
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const activationFee = 500; // Tshs

  const handleMockPayment = async () => {
    setLoading(true);
    setError('');

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success animation
      setShowSuccess(true);
      
      // Wait for animation then proceed
      setTimeout(() => {
        onActivationSuccess();
      }, 2000);
      
    } catch (error: any) {
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
          <div className="animate-bounce mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-4">🎉 Payment Successful!</h1>
          <p className="text-gray-600 mb-6">
            Hongera {user.name}! Your KidArt Studio account is now active!
          </p>
          
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex items-center justify-center space-x-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>Unlimited drawing tools unlocked</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Gift className="w-4 h-4 text-purple-500" />
              <span>Daily rewards activated</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Trophy className="w-4 h-4 text-blue-500" />
              <span>Art competitions access granted</span>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="animate-pulse text-purple-600 font-medium">
              Redirecting to your studio...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Coins className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Activate Your Account</h1>
          <p className="text-gray-600 text-sm">
            Karibu {user.name}! Lipa Tshs {activationFee}/= kuanza kutumia KidArt Studio
          </p>
        </div>

        {/* Benefits */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-purple-800 mb-3 flex items-center">
            <Star className="w-5 h-5 mr-2" />
            Utapata nini:
          </h3>
          <div className="space-y-2 text-sm text-purple-700">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              <span>Unlimited drawing canvas</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              <span>Save & download your artwork</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              <span>Access to community gallery</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              <span>Daily reward points</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              <span>Art competition participation</span>
            </div>
          </div>
        </div>

        {/* Payment Amount */}
        <div className="bg-gradient-to-r from-green-100 to-blue-100 border border-green-200 rounded-xl p-4 mb-6 text-center">
          <div className="text-3xl font-bold text-green-700 mb-1">
            Tshs {activationFee.toLocaleString()}/=
          </div>
          <div className="text-green-600 text-sm mb-3">
            One-time activation fee
          </div>
          
          {/* Fun visual elements */}
          <div className="flex justify-center space-x-4 text-2xl">
            <span className="animate-bounce">🎨</span>
            <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>✨</span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🌟</span>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        )}

        {/* Mock Pay Button */}
        <button
          onClick={handleMockPayment}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-400 text-white py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center shadow-lg transform hover:scale-105"
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 animate-spin mr-2" />
              <span>Processing Payment...</span>
            </>
          ) : (
            <>
              <Coins className="w-5 h-5 mr-2" />
              <span>Pay Tshs {activationFee}/= (Demo)</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          )}
        </button>

        {/* Demo Notice */}
        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <div className="flex items-center text-yellow-700 text-sm">
            <Zap className="w-4 h-4 mr-2" />
            <span>
              🎮 This is a demo payment - no real money will be charged!
            </span>
          </div>
        </div>

        {/* Pool Contribution Info */}
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center text-blue-700 text-sm">
            <Heart className="w-4 h-4 mr-2" />
            <span>
              Your payment helps grow our community art pool for everyone! 🎨
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentActivation;