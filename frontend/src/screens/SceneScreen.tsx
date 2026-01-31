import { useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Search } from 'lucide-react';
import { MOCK_ERA_1 } from '../data/mockData'; // Direct import for now

export const SceneScreen = () => {
  const { 
    eraData, 
    loadEra, 
    viewEvidence, 
    consultAdvisor, 
    evidenceViewed, 
    advisorsConsulted,
    checkReadyForDecision,
    setScreen 
  } = useGameStore();

  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    // Load data on mount if missing
    if (!eraData) {
        loadEra(1);
    }
  }, []);

  if (!eraData) return <div className="h-screen flex items-center justify-center text-white">Loading Rome...</div>;

  const isReady = checkReadyForDecision();

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      
      {/* 1. Background Scene */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{ backgroundImage: `url(${eraData.scene_background})` }}
      >
        {/* Vignette overlay */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-black opacity-60 pointer-events-none" />
      </div>

      {/* 2. Header / HUD */}
      <div className="absolute top-4 left-4 z-10">
        <h2 className="text-3xl font-serif text-roman-gold drop-shadow-md">
          {eraData.title}
        </h2>
        <div className="text-roman-parchment font-serif text-lg opacity-80">
          {eraData.year}
        </div>
        <div className="mt-2 flex gap-4 text-sm text-gray-300 bg-black/50 p-2 rounded backdrop-blur-sm border border-gray-700">
          <span>Evidence: <span className={evidenceViewed.length >= 3 ? "text-green-400" : "text-white"}>{evidenceViewed.length}/5</span></span>
          <span>Advisors: <span className={advisorsConsulted.length >= 1 ? "text-green-400" : "text-white"}>{advisorsConsulted.length}/4</span></span>
        </div>
      </div>

      {/* 3. Interactive Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {/* We use a container that matches aspect ratio or full screen 
            For this hackathon, full screen relative positioning is easiest */}
            
        {/* ADVISORS */}
        {eraData.advisors.map((advisor) => (
          <motion.button
            key={advisor.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            className="absolute pointer-events-auto group"
            style={{ 
              left: `${advisor.position?.x}%`, 
              top: `${advisor.position?.y}%`,
              transform: 'translate(-50%, -100%)' // Anchor at feet
            }}
            onClick={() => consultAdvisor(advisor.id)}
            onMouseEnter={() => setHoveredItem(advisor.name)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {/* Sprite */}
            <div className="text-6xl filter drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] relative">
              {advisor.sprite}
              {/* Status Indicator */}
              {advisorsConsulted.includes(advisor.id) && (
                <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1 w-6 h-6 flex items-center justify-center border-2 border-black">
                  <span className="text-xs text-black font-bold">✓</span>
                </div>
              )}
            </div>
            
            {/* Label (Only visible on hover) */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/80 text-roman-gold text-sm px-2 py-1 rounded border border-roman-gold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
               <div className="flex items-center gap-1">
                 <MessageCircle size={14} />
                 {advisor.name}
               </div>
            </div>
          </motion.button>
        ))}

        {/* EVIDENCE */}
        {eraData.evidence.map((item) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="absolute pointer-events-auto group"
            style={{ 
              left: `${item.position?.x}%`, 
              top: `${item.position?.y}%` 
            }}
            onClick={() => viewEvidence(item.id)}
            onMouseEnter={() => setHoveredItem(item.title)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className={`text-4xl filter drop-shadow-lg transition-all duration-300 ${evidenceViewed.includes(item.id) ? 'opacity-50 grayscale' : 'animate-pulse'}`}>
              {item.sprite}
            </div>

            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/80 text-blue-200 text-sm px-2 py-1 rounded border border-blue-900 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
               <div className="flex items-center gap-1">
                 <Search size={14} />
                 {item.title}
               </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* 4. Footer / Hint */}
      <div className="absolute bottom-8 w-full flex flex-col items-center justify-center pointer-events-none z-10">
        <AnimatePresence>
          {hoveredItem && (
             <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0 }}
               className="bg-black/60 text-white px-4 py-2 rounded-full backdrop-blur-md border border-white/20 mb-4"
             >
               Click to examine <strong>{hoveredItem}</strong>
             </motion.div>
          )}
        </AnimatePresence>

        <button 
          disabled={!isReady}
          onClick={() => setScreen('DECISION')}
          className={`
            pointer-events-auto px-12 py-4 rounded font-serif text-xl border-2 transition-all duration-500 shadow-2xl
            ${isReady 
              ? 'bg-roman-red text-white border-roman-gold hover:bg-red-900 hover:scale-105 cursor-pointer' 
              : 'bg-gray-900 text-gray-500 border-gray-700 cursor-not-allowed opacity-80 grayscale'}
          `}
        >
          {isReady ? "THE COUNCIL IS READY" : "GATHER MORE INTEL"}
        </button>
      </div>

    </div>
  );
};