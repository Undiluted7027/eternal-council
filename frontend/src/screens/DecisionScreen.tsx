import { useGameStore } from '../store/gameStore';
import { motion } from 'framer-motion';

export const DecisionScreen = () => {
  const { eraData, makeDecision, isLoading } = useGameStore();

  if (!eraData) return null;

  const handleChoice = async (choiceId: string) => {
    await makeDecision(choiceId);
    // The store handles the navigation to DIVERGENCE upon success
  };

  return (
    <div className="h-screen w-full bg-stone-900 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Dramatic Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 z-10"
      >
        <h2 className="text-4xl font-serif text-roman-gold mb-4">THE COUNCIL MUST DECIDE</h2>
        <p className="text-stone-400 text-lg">What say you, Oracle?</p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8 max-w-6xl w-full z-10">
        {eraData.choices?.map((choice: any, index: number) => (
          <motion.div
            key={choice.id}
            initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 * index }}
            className="flex-1 bg-black/40 border border-stone-600 hover:border-roman-gold rounded-lg p-6 group cursor-pointer transition-all duration-300 hover:bg-black/60 relative overflow-hidden"
            onClick={() => !isLoading && handleChoice(choice.id)}
          >
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-roman-gold opacity-0 group-hover:opacity-5 transition-opacity"></div>
            
            <h3 className="text-2xl font-serif text-roman-parchment group-hover:text-roman-gold mb-4 transition-colors">
              {choice.title}
            </h3>
            
            <p className="text-stone-300 leading-relaxed mb-6 h-24">
              {choice.description}
            </p>

            <div className="border-t border-stone-700 pt-4">
               <div className="text-xs uppercase text-stone-500 mb-2 font-bold tracking-widest">Expected Impact</div>
               <div className="flex gap-4 text-sm">
                 {/* Assuming choice has stat_impact object */}
                 {choice.stat_impact && Object.entries(choice.stat_impact).map(([stat, val]: any) => (
                   <span key={stat} className={val > 0 ? "text-green-500" : "text-red-500"}>
                     {stat.charAt(0).toUpperCase() + stat.slice(1)} {val > 0 ? '++' : '--'}
                   </span>
                 ))}
               </div>
            </div>

            <button 
              disabled={isLoading}
              className="w-full mt-8 py-3 border border-stone-500 text-stone-400 group-hover:bg-roman-gold group-hover:text-black group-hover:border-roman-gold transition-all uppercase tracking-widest text-sm font-bold"
            >
              {isLoading ? "Consulting..." : "CHOOSE"}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};