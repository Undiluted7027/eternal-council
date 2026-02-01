import { useGameStore } from '../store/gameStore';
import { motion } from 'framer-motion';

export const DivergenceScreen = () => {
  const { currentEra, loadEra, setScreen } = useGameStore();

  const handleContinue = () => {
    // Advance to next Era
    const nextEra = currentEra + 1;
    
    // Check if we exceeded max eras (Assuming 5 eras)
    if (nextEra > 5) {
      setScreen('RESULTS');
    } else {
      loadEra(nextEra).then(() => {
        setScreen('ERA_INTRO');
      });
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
                "Your choice has echoed through time. The stats have shifted. History is being rewritten."
            </p>
            {/* Note: If the API returns a specific 'outcome_text', display it here */}
        </div>

        <button
          onClick={handleContinue}
          className="px-8 py-3 bg-roman-gold text-black font-serif text-xl hover:bg-yellow-500 transition-colors rounded shadow-lg"
        >
          Proceed to {currentEra + 1 > 5 ? 'Final Results' : `Era ${currentEra + 1}`}
        </button>
      </motion.div>
    </div>
  );
};