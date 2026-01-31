import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

export const EraIntro = () => {
  const setScreen = useGameStore(s => s.setScreen);
  
  return (
    <div className="h-screen w-full flex items-center justify-center bg-stone-950 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
      
      <div className="max-w-3xl px-8 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-roman-red font-serif tracking-[0.3em] mb-4 text-sm uppercase">
            Era I
          </div>
          <h1 className="text-6xl md:text-8xl font-serif text-roman-gold mb-2 drop-shadow-lg">
            THE RUBICON
          </h1>
          <div className="text-2xl text-stone-500 font-serif italic mb-12">
            49 BC
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-lg md:text-xl text-roman-parchment leading-relaxed mb-12 border-t border-b border-stone-800 py-8"
        >
          <p className="mb-4">
            Caesar stands at the Rubicon with his XIII Legion. 
            To cross is treason. To retreat is death.
          </p>
          <p className="text-stone-400">
            The Council has gathered. They await your wisdom.
          </p>
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