import { motion } from 'framer-motion';
import { X, ArrowUp, ArrowDown } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import { type Stats } from '../../types';

export const EvidencePopup = () => {
  const { activeItemId, eraData, closePopup } = useGameStore();

  const item = eraData?.evidence.find(e => e.id === activeItemId);
  if (!item) return null;

  // Helper to render stat changes
  const StatImpact = ({ stat, val }: { stat: string, val: number }) => (
    <div className={`flex items-center gap-2 ${val > 0 ? 'text-green-600' : 'text-red-600'}`}>
      {val > 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
      <span className="font-bold capitalize">{stat}</span>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-2xl bg-roman-parchment text-stone-900 rounded-sm shadow-2xl border-4 border-stone-800"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/aged-paper.png')" }}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b-2 border-stone-400">
          <h2 className="text-3xl font-serif font-bold text-roman-red">{item.title}</h2>
          <button
            onClick={closePopup}
            className="p-1 hover:bg-stone-300 rounded transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col md:flex-row gap-8">
          {/* Visual Representation */}
          <div className="w-32 h-32 shrink-0 bg-stone-200 border-2 border-stone-400 flex items-center justify-center text-6xl shadow-inner">
            <img
              src={item.sprite}
              alt={item.title}
              className="w-full h-full object-contain block"
            />
          </div>

          <div className="flex-1 space-y-6">
            {/* The Document Text */}
            <div className="font-serif italic text-lg leading-relaxed border-l-4 border-roman-gold pl-4">
              "{item.content}"
            </div>

            {/* The Insight */}
            <div className="bg-stone-800/5 p-4 rounded border border-stone-300">
              <h4 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Analysis</h4>
              <p className="text-stone-800">{item.insight}</p>
            </div>

            {/* Stat Impacts */}
            {item.stat_impact && (
              <div className="flex gap-4 text-sm bg-white/50 p-2 rounded">
                {Object.entries(item.stat_impact).map(([key, val]) => (
                  <StatImpact key={key} stat={key} val={val as number} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-200/50 border-t border-stone-400 text-center text-stone-500 text-sm font-serif">
          Evidence recorded in Council archives
        </div>

      </motion.div>
    </div>
  );
};