import React, { useState } from 'react';
import { 
  CreditCard, 
  Smartphone, 
  Shield, 
  CheckCircle,
  AlertCircle,
  Loader,
  ArrowRight,
  Star
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
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'tigo' | 'airtel'>('mpesa');

  const activationFee = 500; // Tshs

  const handlePayment = async () => {
    setLoading(true);
    setError('');

    const response = await fetch('https://kidart-backend.onrender.com/api/pay', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    amount: activationFee,
    phone: user.phone,
    userId: user.id,
    description: 'KidArt Studio Account Activation'
  })
});
    try {
    
      // ⚠️ Try parse JSON but fallback kama siyo JSON sahihi
      let data: any;
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (response.ok && data.redirect_url) {
        // Redirect to Pesapal payment page
        window.location.href = data.redirect_url;
      } else {
        // TEMP BYPASS MODE
        console.warn("Payment service unavailable → bypassing activation.");
        onActivationSuccess();
      }
      
    } catch (error: any) {
      console.error("Payment error:", error);
      // TEMP BYPASS MODE
      onActivationSuccess();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-white" />
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
              <span>Contribute to community pool</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              <span>Unlock bonus features as pool grows</span>
            </div>
          </div>
        </div>

        {/* Payment Amount */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 text-center">
          <div className="text-3xl font-bold text-green-700 mb-1">
            Tshs {activationFee.toLocaleString()}/=
          </div>
          <div className="text-green-600 text-sm">
            One-time activation fee
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        )}

        {/* Payment Methods */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Chagua njia ya malipo:</h3>
          <div className="space-y-2">
            <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="paymentMethod"
                value="mpesa"
                checked={paymentMethod === 'mpesa'}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
                className="mr-3"
              />
              <Smartphone className="w-5 h-5 text-green-600 mr-2" />
              <span className="font-medium">M-Pesa</span>
            </label>
            <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="paymentMethod"
                value="tigo"
                checked={paymentMethod === 'tigo'}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
                className="mr-3"
              />
              <Smartphone className="w-5 h-5 text-blue-600 mr-2" />
              <span className="font-medium">Tigo Pesa</span>
            </label>
            <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="paymentMethod"
                value="airtel"
                checked={paymentMethod === 'airtel'}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
                className="mr-3"
              />
              <Smartphone className="w-5 h-5 text-red-600 mr-2" />
              <span className="font-medium">Airtel Money</span>
            </label>
          </div>
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-400 text-white py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center"
        >
          {loading ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <span>Lipa Tshs {activationFee}/=</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          )}
        </button>

        {/* Security Info */}
        <div className="mt-4 flex items-center justify-center text-xs text-gray-500">
          <Shield className="w-4 h-4 mr-1" />
          <span>Malipo yako ni salama kupitia Pesapal</span>
        </div>

        {/* Pool Contribution Info */}
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center text-blue-700 text-sm">
            <Star className="w-4 h-4 mr-2" />
            <span>
              Malipo yako yatachangia kwenye Community Pool ili kufungua features mpya kwa wote!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentActivation;
