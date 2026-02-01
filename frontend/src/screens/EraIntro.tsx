import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
// import { StatsPanel } from '../components/game/StatsPanel';

const toRomanNumeral = (num: number): string => {
  const numerals: [number, string][] = [
    [5, 'V'], [4, 'IV'], [1, 'I']
  ];
  let result = '';
  for (const [value, symbol] of numerals) {
    while (num >= value) {
      result += symbol;
      num -= value;
    }
  }
  return result;
};

export const EraIntro = () => {
  const { setScreen, loadEra, currentEra, eraData, isLoading } = useGameStore();
  useEffect(() => {
    // Always load era data when this screen mounts or era changes
    loadEra(currentEra);
  }, [currentEra]);

  // Show loading if: still loading, no data, or data is stale (wrong era)
  if (isLoading || !eraData || eraData.id !== currentEra) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-stone-950">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-roman-gold font-serif text-2xl"
        >
          The Council gathers...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex items-center justify-center bg-stone-950 relative overflow-hidden">
      {/* Background Image from Era Data */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${eraData.scene_background})` }}
        // 1. Start fully opaque
        initial={{ opacity: 1 }}
        // 2. Animate to a dimmer state (e.g., 30% opacity)
        animate={{ opacity: 0.4 }}
        // 3. IMPORTANT: Delay this animation to match the text fade-in
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-stone-950/50 to-stone-950"></div>
      </motion.div>


      {/* Stats Panel */}
      {/* <StatsPanel /> */}

      <div className="max-w-3xl px-8 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="text-roman-red font-serif tracking-[0.3em] mb-4 text-2xl uppercase font-bold">
            Era {toRomanNumeral(eraData.id)}
          </div>
          <h1 className="text-6xl md:text-8xl font-serif text-roman-gold mb-2 drop-shadow-lg uppercase">
            {eraData.title}
          </h1>
          <div className="text-2xl text-stone-500 font-serif italic mb-12">
            {eraData.year}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="text-lg md:text-xl text-roman-parchment leading-relaxed mb-12 border-t border-b border-stone-800 py-8 whitespace-pre-line"
        >
          {eraData.intro_text}
        </motion.div>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.5, duration: 0.5 }}
          onClick={() => setScreen('SCENE')}
          className="group relative px-8 py-3 bg-transparent border border-roman-gold text-roman-gold font-serif text-lg tracking-widest hover:bg-roman-gold hover:text-black transition-all duration-300"
        >
          <span className="relative z-10">ENTER THE FORUM</span>
          <div className="absolute inset-0 bg-roman-gold opacity-0 group-hover:opacity-10 transition-opacity blur-md"></div>
        </motion.button>
      </div>
    </div>
  );
};