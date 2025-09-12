import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Eye, 
  Download,
  CreditCard,
  Wallet,
  PieChart,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const EarningsPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  // Mock earnings data
  const earningsData = {
    total: 45000,
    thisMonth: 15000,
    artworksSold: 3
  };

  const recentSales = [
    {
      id: 1,
      artwork: "Sunset Dreams",
      buyer: "John Smith",
      amount: 15000,
      date: "2 hours ago",
      image: "https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Earnings 💰</h1>
          <p className="text-gray-600">See how much you've earned from your art!</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">
            {earningsData.total.toLocaleString()} Tshs
          </div>
          <div className="text-sm text-gray-600">Total Earnings</div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">
            {earningsData.thisMonth.toLocaleString()} Tshs
          </div>
          <div className="text-sm text-gray-600">This Month</div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-sm text-gray-600">{earningsData.artworksSold} sold</div>
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">
            {earningsData.artworksSold}
          </div>
          <div className="text-sm text-gray-600">Artworks Sold</div>
        </div>
      </div>

      {/* Recent Sales */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
            <Star className="w-6 h-6 text-yellow-500" />
            <span>Recent Sales</span>
          </h2>
        </div>
        
        <div className="space-y-4">
          {recentSales.map((sale) => (
            <div key={sale.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors duration-200">
              <div className="flex items-center space-x-4">
                <img
                  src={sale.image}
                  alt={sale.artwork}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-800">{sale.artwork}</div>
                  <div className="text-sm text-gray-600">Sold to {sale.buyer}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-600">{sale.amount.toLocaleString()} Tshs</div>
                <div className="text-sm text-gray-500">{sale.date}</div>
              </div>
            </div>
          ))}
        </div>
        
        {recentSales.length === 0 && (
          <div className="text-center py-8">
            <Star className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No sales yet</h3>
            <p className="text-gray-500">Keep creating amazing art - your first sale is coming!</p>
          </div>
        )}
      </div>

      {/* Simple Payout Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">🎉 Great Job!</h2>
            <p className="text-purple-100">Una {earningsData.thisMonth.toLocaleString()} Tshs kutoka kwa sanaa zako!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningsPage;