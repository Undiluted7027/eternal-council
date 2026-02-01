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

  const handleContinue = () => {
    // currentEra is already updated by makeDecision to the next era
    // Check if we exceeded max eras (Assuming 5 eras)
    if (currentEra > 5) {
      setScreen('RESULTS');
    } else {
      // Navigate to EraIntro - it will handle loading the era data
      setScreen('ERA_INTRO');
    }
  };

  return (
    <div className="h-screen w-full bg-stone-950 flex flex-col items-center justify-center text-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl"
      >
        <h2 className="text-5xl font-serif text-roman-red mb-8">THE TIMELINE DIVERGES</h2>
        
        <div className="bg-black/50 border border-stone-800 p-8 rounded-lg mb-8">
            <p className="text-xl text-roman-parchment italic leading-relaxed">
                {divergenceText || "Your choice has echoed through time. The stats have shifted. History is being rewritten."}
            </p>
        </div>

        {/* Stat Changes Panel */}
        {oldStats && (
          <div className="grid grid-cols-4 gap-4 mb-8">
            {statConfig.map(({ key, label, icon: Icon, color }) => {
              const oldVal = oldStats[key];
              const newVal = stats[key];
              const change = newVal - oldVal;
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-black/40 p-4 rounded-lg border border-stone-800"
                >
                  <div className={`flex items-center justify-center gap-1 mb-2 ${color}`}>
                    <Icon size={16} />
                    <span className="text-xs uppercase tracking-wider">{label}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-lg">
                    <span className="text-stone-500">{oldVal}</span>
                    <span className="text-stone-600">→</span>
                    <span className={change > 0 ? "text-green-400" : change < 0 ? "text-red-400" : "text-stone-400"}>
                      {newVal}
                    </span>
                  </div>
                  <div className={`text-center text-sm font-bold ${change > 0 ? "text-green-500" : change < 0 ? "text-red-500" : "text-stone-600"}`}>
                    {change > 0 ? `+${change}` : change === 0 ? '—' : change}
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