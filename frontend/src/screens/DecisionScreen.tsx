import { useState } from 'react'; // Added useState
import { useGameStore } from '../store/gameStore';
import { motion, AnimatePresence } from 'framer-motion'; // Added AnimatePresence

export const DecisionScreen = () => {
  const { eraData, makeDecision, isLoading } = useGameStore();
  
  // 1. Track which choice is being hovered
  const [hoveredChoice, setHoveredChoice] = useState<string | null>(null);

  if (!eraData) return null;

  const handleChoice = async (choiceId: string) => {
    await makeDecision(choiceId);
  };

  return (
    <div className="h-screen w-full bg-stone-900 flex flex-col items-center justify-center p-8 relative overflow-hidden">
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
          <div key={choice.id} className="flex-1 relative"> {/* Wrapper for absolute positioning */}
            
            {/* 2. ADVISOR POP-OUT LAYER */}
            <div className="absolute -top-20 left-0 w-full flex justify-center gap-4 pointer-events-none z-30">
              <AnimatePresence>
                {hoveredChoice === choice.id && choice.supporters?.map((supId: string, idx: number) => {
                  const advisor = eraData.advisors?.find((a: any) => a.id === supId);
                  if (!advisor) return null;
                  return (
                    <motion.img
                      key={supId}
                      src={advisor.sprite}
                      initial={{ y: 40, opacity: 0, scale: 0.5 }}
                      animate={{ 
                        y: 0, 
                        opacity: 1, 
                        scale: 1,
                        transition: { 
                          type: "spring", 
                          stiffness: 300, 
                          damping: 15, 
                          delay: idx * 0.1 
                        } 
                      }}
                      exit={{ y: 40, opacity: 0, scale: 0.5 }}
                      className="w-20 h-20 object-contain"
                    />
                  );
                })}
              </AnimatePresence>
            </div>

            {/* 3. CHOICE CARD */}
            <motion.div
              initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 * index }}
              // Removed 'overflow-hidden' so sprites aren't cut off
              className="h-full bg-black/40 border border-stone-600 hover:border-roman-gold rounded-lg group cursor-pointer transition-all duration-300 hover:bg-black/60 relative z-10"
              onClick={() => !isLoading && handleChoice(choice.id)}
              onMouseEnter={() => setHoveredChoice(choice.id)}
              onMouseLeave={() => setHoveredChoice(null)}
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-roman-gold opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none rounded-lg"></div>

              {/* Choice Image - Keep overflow-hidden here specifically */}
              {choice.image && (
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img 
                    src={choice.image} 
                    alt={choice.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
              )}

              <div className="p-6">
                <h3 className="text-2xl font-serif text-roman-parchment group-hover:text-roman-gold mb-4 transition-colors">
                  {choice.title}
                </h3>

                <p className="text-stone-300 leading-relaxed mb-6">
                  {choice.description}
                </p>

                <div className="border-t border-stone-700 pt-4">
                  <div className="text-xs uppercase text-stone-500 mb-2 font-bold tracking-widest">Expected Impact</div>
                  <div className="flex gap-4 text-sm flex-wrap">
                    {choice.stat_impact && Object.entries(choice.stat_impact).map(([stat, val]: any) => (
                      <span key={stat} className={val > 0 ? "text-green-500" : val < 0 ? "text-red-500" : "text-gray-500"}>
                        {stat.charAt(0).toUpperCase() + stat.slice(1)} {val > 0 ? `+${val}` : val}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-stone-700 pt-4 mt-4">
                  <div className="text-xs uppercase text-stone-500 mb-2">Supported By</div>
                  <div className="flex gap-2 flex-wrap">
                    {choice.supporters?.map((id: string) => {
                      const advisor = eraData.advisors?.find((a: any) => a.id === id);
                      return advisor ? (
                        <span key={id} className="px-2 py-1 bg-stone-800 rounded text-stone-300 text-xs">
                          {advisor.name}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>

                <button
                  disabled={isLoading}
                  className="w-full mt-6 py-3 border border-stone-500 text-stone-400 group-hover:bg-roman-gold group-hover:text-black group-hover:border-roman-gold transition-all uppercase tracking-widest text-sm font-bold"
                >
                  {isLoading ? "Consulting..." : "CHOOSE"}
                </button>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};