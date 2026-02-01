import { useGameStore } from '../../store/gameStore';
import { Sword, Coins, Scale, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

const StatItem = ({ icon: Icon, value, label, color }: any) => (
  <div className="flex flex-col items-center gap-1">
    <div className="relative group">
      <Icon className={`w-6 h-6 ${color}`} />
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
        {label}
      </span>
    </div>
    <motion.span 
      key={value}
      initial={{ scale: 1.2, color: "#fff" }}
      animate={{ scale: 1, color: "#e5e7eb" }}
      className="text-sm font-bold font-serif"
    >
      {value}
    </motion.span>
    {/* Progress Bar Background */}
    <div className="w-12 h-1.5 bg-gray-700 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ type: "spring", stiffness: 50 }}
        className={`h-full ${value < 30 ? 'bg-red-500' : 'bg-roman-gold'}`}
      />
    </div>
  </div>
);

export const StatsPanel = () => {
  const stats = useGameStore((state) => state.stats);

  return (
    <div className="absolute top-4 right-4 bg-roman-stone/90 border-2 border-roman-gold p-4 rounded-lg shadow-xl backdrop-blur-sm z-50">
      <div className="flex gap-6">
        <StatItem icon={Sword} value={stats.military} label="Military" color="text-red-400" />
        <StatItem icon={Coins} value={stats.economy} label="Economy" color="text-yellow-400" />
        <StatItem icon={Scale} value={stats.stability} label="Stability" color="text-blue-400" />
        <StatItem icon={Building2} value={stats.republic} label="Republic" color="text-purple-400" />
      </div>
    </div>
  );
};