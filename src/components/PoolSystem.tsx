import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  Gift, 
  Star, 
  Trophy,
  Coins,
  Target,
  Zap,
  Crown,
  Heart
} from 'lucide-react';

interface PoolSystemProps {
  userContribution?: number;
  isActive?: boolean;
}

const PoolSystem: React.FC<PoolSystemProps> = ({ 
  userContribution = 0, 
  isActive = false 
}) => {
  const [poolBalance, setPoolBalance] = useState(50000); // Current pool balance
  const [targetAmount, setTargetAmount] = useState(75000); // Target for next unlock
  const [totalContributors, setTotalContributors] = useState(100);
  
  const progressPercentage = (poolBalance / targetAmount) * 100;
  
  const bonusUnlocks = [
    {
      amount: 25000,
      title: "New Stickers Pack 🎉",
      description: "Unlock 20 fun stickers!",
      unlocked: poolBalance >= 25000,
      icon: Star
    },
    {
      amount: 50000,
      title: "Rainbow Brush 🌈",
      description: "Magic rainbow drawing tool!",
      unlocked: poolBalance >= 50000,
      icon: Zap
    },
    {
      amount: 75000,
      title: "Animal Templates 🐶",
      description: "Drawing guides for animals!",
      unlocked: poolBalance >= 75000,
      icon: Heart
    },
    {
      amount: 100000,
      title: "Pro Features 👑",
      description: "Advanced tools for everyone!",
      unlocked: poolBalance >= 100000,
      icon: Crown
    }
  ];

  return (
    <div className="space-y-6">
      {/* Pool Progress Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl p-6 text-white">
        <div className="text-center mb-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center justify-center">
            <Coins className="w-8 h-8 mr-3" />
            Community Pool 🏊‍♀️
          </h2>
          <p className="text-purple-100 text-sm md:text-base">
            Kila mtu anapochanga, tunafungua vitu vipya kwa wote!
          </p>
        </div>
        
        {/* Progress Bar */}
        <div className="bg-white/20 rounded-full h-6 mb-4 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-yellow-400 to-orange-400 h-full rounded-full transition-all duration-1000 flex items-center justify-end pr-2"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          >
            {progressPercentage > 20 && (
              <span className="text-white text-xs font-bold">
                {Math.round(progressPercentage)}%
              </span>
            )}
          </div>
        </div>
        
        {/* Pool Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-2xl font-bold">{poolBalance.toLocaleString()} Tshs</div>
            <div className="text-purple-100 text-sm">Current Pool</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-2xl font-bold">{targetAmount.toLocaleString()} Tshs</div>
            <div className="text-purple-100 text-sm">Next Target</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-2xl font-bold">{totalContributors}</div>
            <div className="text-purple-100 text-sm">Contributors</div>
          </div>
        </div>
      </div>

      {/* User Contribution Status */}
      {isActive && userContribution > 0 && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-2xl p-4">
          <div className="flex items-center justify-center text-green-700">
            <div className="animate-bounce mr-3">
              <Trophy className="w-6 h-6 text-yellow-500" />
            </div>
            <span className="font-semibold">
              🎉 Hongera! Umechangia {userContribution.toLocaleString()} Tshs kwenye pool!
            </span>
          </div>
          <div className="text-center mt-2">
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
              ⭐ Daily Points: +100 points earned!
            </span>
          </div>
        </div>
      )}

      {/* Bonus Unlocks */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <Gift className="w-6 h-6 text-purple-600 mr-2" />
          Community Rewards
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bonusUnlocks.map((bonus, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                bonus.unlocked
                  ? 'bg-green-50 border-green-200 text-green-800'
                  : 'bg-gray-50 border-gray-200 text-gray-600'
              }`}
            >
              <div className="flex items-center mb-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                  bonus.unlocked ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <bonus.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold">{bonus.title}</h4>
                  <p className="text-sm opacity-75">{bonus.amount.toLocaleString()} Tshs</p>
                </div>
              </div>
              <p className="text-sm">{bonus.description}</p>
              {bonus.unlocked && (
                <div className="mt-2 flex items-center text-green-600">
                  <Trophy className="w-4 h-4 mr-1" />
                  <span className="text-xs font-semibold">UNLOCKED!</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
        <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center">
          <Target className="w-6 h-6 mr-2" />
          Jinsi Pool Inavyofanya Kazi
        </h3>
        
        <div className="space-y-3 text-blue-700">
          <div className="flex items-start">
            <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
            <p className="text-sm">Kila mtu anapochanga 500 Tshs, inaongezeka kwenye Community Pool</p>
          </div>
          <div className="flex items-start">
            <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
            <p className="text-sm">Pool ikifika target, tunafungua features mpya kwa wote!</p>
          </div>
          <div className="flex items-start">
            <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
            <p className="text-sm">Kila mtu anapata access ya vitu vipya bila kulipa tena</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolSystem;