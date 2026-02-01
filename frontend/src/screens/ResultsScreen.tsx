import { useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { api } from '../lib/api';
import { motion } from 'framer-motion';
import { GitBranch } from 'lucide-react';

interface ResultsData {
  final_stats: any;
  final_state: {
    survival_year: string;
    government: string;
    legacy: string;
  };
  correlation_score: number;
  total_time_played: string;
}

export const ResultsScreen = () => {
  const { sessionId, startGame, setScreen } = useGameStore();
    const [results, setResults] = useState<ResultsData | null>(null);

  useEffect(() => {
    if (sessionId) {
      api.getResults(sessionId).then(setResults).catch(console.error);
    }
  }, [sessionId]);

  if (!results) return <div className="text-white text-center mt-20">Calculating the fate of Rome...</div>;

  return (
    <div className="h-screen w-full bg-stone-950 flex flex-col items-center justify-center p-8 relative overflow-hidden text-center">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="z-10 max-w-4xl w-full bg-black/40 border-2 border-roman-gold p-12 rounded-lg backdrop-blur-sm"
      >
        <h1 className="text-6xl font-serif text-roman-red mb-2">THE FATE OF YOUR ROME</h1>
        <div className="w-32 h-1 bg-roman-gold mx-auto mb-8"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-roman-parchment">
          <div className="bg-black/40 p-6 rounded border border-stone-800">
            <div className="text-stone-500 uppercase text-xs tracking-widest mb-2">Survived Until</div>
            <div className="text-4xl font-serif text-white">{results.final_state.survival_year}</div>
          </div>
          <div className="bg-black/40 p-6 rounded border border-stone-800">
             <div className="text-stone-500 uppercase text-xs tracking-widest mb-2">Government</div>
             <div className="text-2xl font-serif text-white">{results.final_state.government}</div>
          </div>
          <div className="bg-black/40 p-6 rounded border border-stone-800">
             <div className="text-stone-500 uppercase text-xs tracking-widest mb-2">Legacy</div>
             <div className="text-2xl font-serif text-roman-gold">"{results.final_state.legacy}"</div>
          </div>
        </div>

        <div className="mb-12">
            <h3 className="text-xl text-stone-400 mb-4">Alignment with Actual History</h3>
            <div className="w-full bg-stone-800 h-6 rounded-full overflow-hidden relative">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${results.correlation_score}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-blue-600"
                />
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white drop-shadow-md">
                    {results.correlation_score}% Historical Accuracy
                </div>
            </div>
            <p className="mt-4 text-stone-500 text-sm">
                {results.correlation_score > 80 ? "You followed the path of history closely." : 
                 results.correlation_score < 30 ? "You created a radically different timeline." : 
                 "You balanced tradition with new choices."}
            </p>
        </div>
        <div className="mt-4 mb-4">
          <p className="text-roman-gold font-serif text-xl tracking-wide">
            Time played: <span className="text-white">{results.total_time_played}</span>
          </p>
        </div>
        <div className="flex justify-center gap-6">
            <button
                onClick={() => setScreen('TIMELINE')}
                className="px-8 py-3 bg-blue-600 text-white font-serif text-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
                <GitBranch size={20} />
                VIEW HISTORY'S PATH
            </button>
            <button
                onClick={() => {
                    startGame(); // Reset game
                }}
                className="px-8 py-3 bg-roman-gold text-black font-serif text-lg hover:bg-yellow-500 transition-colors"
            >
                REWRITE HISTORY
            </button>
        </div>

      </motion.div>
    </div>
  );
};