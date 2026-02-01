import { useGameStore } from '../store/gameStore';
import { motion } from 'framer-motion';
import { Sword, Coins, Scale, Building2 } from 'lucide-react';

export const DivergenceScreen = () => {
  const { currentEra, setScreen, divergenceText, stats, oldStats } = useGameStore();

  const statConfig = [
    { key: 'military', label: 'Military', icon: Sword, color: 'text-red-400' },
    { key: 'economy', label: 'Economy', icon: Coins, color: 'text-yellow-400' },
    { key: 'stability', label: 'Stability', icon: Scale, color: 'text-blue-400' },
    { key: 'republic', label: 'Republic', icon: Building2, color: 'text-purple-400' },
  ] as const;

  // Helper logic to calculate change based on absolute values
  const getChangeIndicator = (oldVal: number, newVal: number) => {
    const diff = newVal - oldVal;

    // Check for high impact changes (15 or more)
    if (diff >= 15) return { symbol: '++', color: 'text-green-500' };
    if (diff <= -15) return { symbol: '--', color: 'text-red-500' };

    // Check for medium impact changes (5 or more)
    if (diff >= 5)  return { symbol: '+',  color: 'text-green-400' };
    if (diff <= -5)  return { symbol: '-',  color: 'text-red-400' };
    
    // Low impact or no change
    return { symbol: '=', color: 'text-stone-400' };
  };

  const handleContinue = () => {
    if (currentEra > 5) {
      setScreen('RESULTS');
    } else {
      setScreen('ERA_INTRO');
    }
  };

  return (
    <div className="h-screen w-full bg-stone-950 flex flex-col items-center justify-center text-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full"
      >
        <h2 className="text-4xl md:text-5xl font-serif text-roman-red mb-8">THE TIMELINE DIVERGES</h2>
        
        <div className="bg-black/50 border border-stone-800 p-8 rounded-lg mb-8">
            <p className="text-lg md:text-xl text-roman-parchment italic leading-relaxed">
                {divergenceText || "Your choice has echoed through time. The stats have shifted. History is being rewritten."}
            </p>
        </div>

        {/* Stat Changes Panel */}
        {oldStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {statConfig.map(({ key, label, icon: Icon, color }) => {
              const oldVal = oldStats[key];
              const newVal = stats[key];
              
              const { symbol, color: indicatorColor } = getChangeIndicator(oldVal, newVal);

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-black/40 p-4 rounded-lg border border-stone-800 flex flex-col items-center justify-center min-h-27.5"
                >
                  {/* Label and Icon */}
                  <div className={`flex items-center justify-center gap-2 mb-2 ${color}`}>
                    <Icon size={20} />
                    <span className="text-sm md:text-base uppercase tracking-wider font-bold">{label}</span>
                  </div>

                  {/* The Abstract Symbol Display (++ / --) */}
                  <div className={`text-3xl md:text-4xl font-serif font-bold ${indicatorColor}`}>
                    {symbol}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        <button
          onClick={handleContinue}
          className="px-8 py-3 bg-roman-gold text-black font-serif text-xl hover:bg-yellow-500 transition-colors rounded shadow-lg"
        >
          Proceed to {currentEra > 5 ? 'Final Results' : `Era ${currentEra}`}
        </button>
      </motion.div>
    </div>
  );
};