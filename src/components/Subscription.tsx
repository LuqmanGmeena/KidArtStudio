import React, { useState } from 'react';
import { 
  Crown, 
  Check, 
  Star, 
  Zap, 
  Palette, 
  Download, 
  Users, 
  Shield,
  CreditCard,
  Gift,
  Sparkles,
  Award
} from 'lucide-react';

const Subscription: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');

  const plans = {
    free: {
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      features: [
        'Basic drawing tools',
        '5 artworks per month',
        'Community gallery access',
        'Basic tutorials',
        'Standard support'
      ]
    },
    pro: {
      name: 'Pro',
      price: { monthly: 50000, yearly: 500000 },
      features: [
        'Advanced drawing tools',
        'Unlimited artworks',
        'Premium tutorials',
        'Priority support',
        'Export in HD quality',
        'Custom brushes',
        'Layer support'
      ]
    },
    premium: {
      name: 'Premium',
      price: { monthly: 80000, yearly: 800000 },
      features: [
        'Everything in Pro',
        'AI-powered tools',
        'Exclusive masterclasses',
        '1-on-1 mentoring sessions',
        'Commercial license',
        'Advanced analytics',
        'Custom portfolio website'
      ]
    }
  };

  const handlePesapalPayment = async (amount: number) => {
    try {
      const response = await fetch('/api/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          phone: '255700000000', // This should come from user input
          userId: 'user123' // This should come from auth context
        }),
      });

      const data = await response.json();
      
      if (data.redirect_url) {
        // Redirect to Pesapal payment page
        window.location.href = data.redirect_url;
      } else {
        alert('Payment initialization failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Crown className="w-12 h-12 text-yellow-500 mr-3" />
          <h1 className="text-4xl font-bold text-gray-800">Choose Your Plan</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Unlock your creative potential with our premium features and tools
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex items-center justify-center">
        <div className="bg-gray-100 rounded-full p-1 flex">
          <button
            onClick={() => setSelectedPlan('monthly')}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
              selectedPlan === 'monthly'
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setSelectedPlan('yearly')}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 relative ${
              selectedPlan === 'yearly'
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Yearly
            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Free Plan */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 relative">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{plans.free.name}</h3>
            <div className="text-4xl font-bold text-gray-800 mb-1">
              {plans.free.price[selectedPlan] === 0 ? 'Free' : `${plans.free.price[selectedPlan].toLocaleString()} Tshs`}
              <span className="text-lg font-normal text-gray-600">
                {plans.free.price[selectedPlan] !== 0 ? `/${selectedPlan === 'monthly' ? 'month' : 'year'}` : ''}
              </span>
            </div>
            <p className="text-gray-600">Perfect for beginners</p>
          </div>
          
          <ul className="space-y-4 mb-8">
            {plans.free.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
          
          <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold transition-colors duration-200">
            Current Plan
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-purple-500 relative transform scale-105">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
              <Star className="w-4 h-4 mr-1" />
              Most Popular
            </span>
          </div>
          
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{plans.pro.name}</h3>
            <div className="text-4xl font-bold text-purple-600 mb-1">
              {plans.pro.price[selectedPlan].toLocaleString()} Tshs
              <span className="text-lg font-normal text-gray-600">
                /{selectedPlan === 'monthly' ? 'month' : 'year'}
              </span>
            </div>
            <p className="text-gray-600">For serious artists</p>
          </div>
          
          <ul className="space-y-4 mb-8">
            {plans.pro.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <Check className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
          
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center">
            <Crown className="w-5 h-5 mr-2" />
            <span onClick={() => handlePesapalPayment(plans.pro.price[selectedPlan])}>
              Activate with Pesapal - {plans.pro.price[selectedPlan].toLocaleString()} Tshs
            </span>
          </button>
        </div>

        {/* Premium Plan */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 relative">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{plans.premium.name}</h3>
            <div className="text-4xl font-bold text-gray-800 mb-1">
              {plans.premium.price[selectedPlan].toLocaleString()} Tshs
              <span className="text-lg font-normal text-gray-600">
                /{selectedPlan === 'monthly' ? 'month' : 'year'}
              </span>
            </div>
            <p className="text-gray-600">For professionals</p>
          </div>
          
          <ul className="space-y-4 mb-8">
            {plans.premium.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <Check className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
          
          <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center">
            <Sparkles className="w-5 h-5 mr-2" />
            <span onClick={() => handlePesapalPayment(plans.premium.price[selectedPlan])}>
              Go Premium - {plans.premium.price[selectedPlan].toLocaleString()} Tshs
            </span>
          </button>
        </div>
      </div>

      {/* Features Comparison */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">What You Get</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Palette className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Advanced Tools</h3>
            <p className="text-gray-600">Professional-grade brushes, layers, and effects to bring your vision to life.</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Community Access</h3>
            <p className="text-gray-600">Connect with fellow artists, get feedback, and participate in challenges.</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Expert Learning</h3>
            <p className="text-gray-600">Access exclusive tutorials and masterclasses from industry professionals.</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Frequently Asked Questions</h2>
        
        <div className="space-y-6 max-w-3xl mx-auto">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Can I cancel my subscription anytime?</h3>
            <p className="text-gray-600">Yes, you can cancel your subscription at any time. You'll continue to have access to premium features until the end of your billing period.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Do you offer student discounts?</h3>
            <p className="text-gray-600">Yes! We offer a 50% discount for students with a valid student ID. Contact our support team to apply for the discount.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">What payment methods do you accept?</h3>
            <p className="text-gray-600">We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely.</p>
          </div>
        </div>
      </div>

      {/* Money Back Guarantee */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white text-center">
        <Shield className="w-16 h-16 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">30-Day Money Back Guarantee</h2>
        <p className="text-green-100 max-w-2xl mx-auto">
          Try KidArt Studio Pro risk-free. If you're not completely satisfied within 30 days, 
          we'll refund your money, no questions asked.
        </p>
      </div>
    </div>
  );
};

export default Subscription;