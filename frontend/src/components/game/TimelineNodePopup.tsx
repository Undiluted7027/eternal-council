import { motion } from 'framer-motion';
import { X, Sword, Coins, Scale, Building2 } from 'lucide-react';
import { type TimelineEra } from '../../types';
import { type NodeViewType } from './TimelineVisualization';

interface TimelineNodePopupProps {
  era: TimelineEra;
  viewType: NodeViewType;
  onClose: () => void;
}

const statConfig = [
  { key: 'military', label: 'Military', icon: Sword, color: 'text-red-400' },
  { key: 'economy', label: 'Economy', icon: Coins, color: 'text-yellow-400' },
  { key: 'stability', label: 'Stability', icon: Scale, color: 'text-blue-400' },
  { key: 'republic', label: 'Republic', icon: Building2, color: 'text-purple-400' },
] as const;

export const TimelineNodePopup = ({ era, viewType, onClose }: TimelineNodePopupProps) => {
  const isHistorical = viewType === 'historical';

  const title = isHistorical ? era.historical_choice_title : era.player_choice_title;
  const image = isHistorical ? era.historical_choice_image : era.player_choice_image;
  const outcomeText = isHistorical ? era.historical_outcome_text : era.player_outcome_text;
  const accentColor = isHistorical ? 'roman-gold' : 'red-500';

  const getChangeIndicator = (val: number) => {
    if (val >= 15) return { symbol: '++', color: 'text-green-500' };
    if (val <= -15) return { symbol: '--', color: 'text-red-500' };
    if (val >= 5) return { symbol: '+', color: 'text-green-400' };
    if (val <= -5) return { symbol: '-', color: 'text-red-400' };
    return { symbol: '=', color: 'text-stone-400' };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-2xl bg-stone-950 text-roman-parchment rounded-lg shadow-2xl border-2 border-stone-800 overflow-hidden"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-stone-800 bg-black/40">
          <div>
            <h2 className="text-3xl font-serif font-bold text-roman-red">{era.title}</h2>
            <p className="text-stone-500">{era.year}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-stone-800 rounded transition-colors text-stone-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Choice Card */}
          <div className={`rounded-lg border-2 overflow-hidden ${isHistorical ? 'border-roman-gold' : 'border-red-600'}`}>
            <div className={`px-4 py-2 ${isHistorical ? 'bg-roman-gold/20' : 'bg-red-900/30'}`}>
              <span className="text-xs uppercase tracking-widest text-stone-400">
                {isHistorical ? "History's Path" : 'Your Divergence'}
              </span>
            </div>
            {image && (
              <div className="relative h-48 overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 to-transparent" />
              </div>
            )}
            <div className="p-4">
              <h3 className={`text-xl font-serif font-bold ${isHistorical ? 'text-roman-gold' : 'text-red-400'}`}>
                {title}
              </h3>
              <p className="text-stone-400 mt-2">{outcomeText}</p>
            </div>
          </div>

          {/* Context badge */}
          {!isHistorical && (
            <div className="text-center py-2 rounded-lg bg-red-900/20 text-red-400 border border-red-900/30 text-sm">
              You chose a different path than history
            </div>
          )}

          {/* Stat Impacts - only show for divergent (player's choice) */}
          {!isHistorical && era.stat_impact && Object.keys(era.stat_impact).length > 0 && (
            <div className="bg-black/40 p-4 rounded-lg border border-stone-800">
              <h4 className="text-xs uppercase tracking-widest text-stone-500 mb-4">Impact of Your Choice</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {statConfig.map(({ key, label, icon: Icon, color }) => {
                  const val = era.stat_impact[key as keyof typeof era.stat_impact];
                  if (val === undefined) return null;
                  const { symbol, color: indicatorColor } = getChangeIndicator(val);
                  return (
                    <div key={key} className="flex flex-col items-center">
                      <div className={`flex items-center gap-2 mb-1 ${color}`}>
                        <Icon size={16} />
                        <span className="text-xs uppercase">{label}</span>
                      </div>
                      <div className={`text-2xl font-serif font-bold ${indicatorColor}`}>
                        {symbol}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-black/40 border-t border-stone-800 text-center text-stone-500 text-sm">
          Era {era.era_id} of 5
        </div>
      </motion.div>
    </div>
  );
};
