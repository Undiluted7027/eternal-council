import { useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { api } from '../lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { TimelineVisualization, type NodeViewType } from '../components/game/TimelineVisualization';
import { TimelineNodePopup } from '../components/game/TimelineNodePopup';
import { type TimelineData, type TimelineEra } from '../types';

export const TimelineScreen = () => {
  const { sessionId, startGame } = useGameStore();
  const [timelineData, setTimelineData] = useState<TimelineData | null>(null);
  const [selectedEra, setSelectedEra] = useState<TimelineEra | null>(null);
  const [viewType, setViewType] = useState<NodeViewType>('historical');

  useEffect(() => {
    if (sessionId) {
      api.getTimeline(sessionId).then(setTimelineData).catch(console.error);
    }
  }, [sessionId]);

  const handleNodeClick = (era: TimelineEra, type: NodeViewType) => {
    setSelectedEra(era);
    setViewType(type);
  };

  const handleClosePopup = () => {
    setSelectedEra(null);
  };

  if (!timelineData) {
    return (
      <div className="h-screen w-full bg-stone-950 flex items-center justify-center">
        <div className="text-white text-center">Reconstructing the timeline...</div>
      </div>
    );
  }

  const divergenceCount = timelineData.eras.filter(e => !e.aligned_with_history).length;

  return (
    <div className="h-screen w-full bg-stone-950 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 max-w-6xl w-full"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-serif text-roman-red mb-2">THE PATHS OF ROME</h1>
          <div className="w-32 h-1 bg-roman-gold mx-auto mb-4"></div>
          <p className="text-stone-400 text-lg">
            Your choices compared to the actual course of history
          </p>
        </div>

        {/* Timeline Visualization */}
        <div className="bg-black/40 border-2 border-stone-800 rounded-lg p-6 mb-8 backdrop-blur-sm">
          <TimelineVisualization
            eras={timelineData.eras}
            onNodeClick={handleNodeClick}
          />
          <p className="text-stone-500 text-sm text-center mt-4">
            Click on any node to see the details of that era's decision
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-black/40 p-6 rounded border border-stone-800 text-center">
            <div className="text-stone-500 uppercase text-xs tracking-widest mb-2">Historical Accuracy</div>
            <div className="text-4xl font-serif text-blue-400">{timelineData.correlation_score}%</div>
          </div>
          <div className="bg-black/40 p-6 rounded border border-stone-800 text-center">
            <div className="text-stone-500 uppercase text-xs tracking-widest mb-2">Aligned Decisions</div>
            <div className="text-4xl font-serif text-blue-400">{5 - divergenceCount} / 5</div>
          </div>
          <div className="bg-black/40 p-6 rounded border border-stone-800 text-center">
            <div className="text-stone-500 uppercase text-xs tracking-widest mb-2">Divergences</div>
            <div className="text-4xl font-serif text-red-400">{divergenceCount}</div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <button
            onClick={() => startGame()}
            className="px-8 py-3 bg-roman-gold text-black font-serif text-lg hover:bg-yellow-500 transition-colors"
          >
            REWRITE HISTORY
          </button>
        </div>
      </motion.div>

      {/* Popup */}
      <AnimatePresence>
        {selectedEra && (
          <TimelineNodePopup era={selectedEra} viewType={viewType} onClose={handleClosePopup} />
        )}
      </AnimatePresence>
    </div>
  );
};
