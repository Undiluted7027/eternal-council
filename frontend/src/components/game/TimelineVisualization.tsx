import { motion } from 'framer-motion';
import { type TimelineEra } from '../../types';

export type NodeViewType = 'historical' | 'divergent';

interface TimelineVisualizationProps {
  eras: TimelineEra[];
  onNodeClick: (era: TimelineEra, viewType: NodeViewType) => void;
}

export const TimelineVisualization = ({ eras, onNodeClick }: TimelineVisualizationProps) => {
  const width = 1200;
  const height = 400;
  const nodeRadius = 28;
  const divergeNodeRadius = 20;
  const startX = 120;
  const endX = width - 120;
  const centerY = 140;
  const divergeY = 300;

  // Calculate X positions for each era node
  const getNodeX = (index: number) => {
    const spacing = (endX - startX) / (eras.length - 1);
    return startX + index * spacing;
  };

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="min-w-[800px] w-full h-auto"
        style={{ maxHeight: '400px' }}
      >
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="blueRedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#EF4444" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Main blue spine connecting all era nodes */}
        <motion.path
          d={`M ${startX} ${centerY} L ${endX} ${centerY}`}
          stroke="#3B82F6"
          strokeWidth="4"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />

        {/* Render divergence branches and nodes for non-aligned eras */}
        {eras.map((era, index) => {
          const x = getNodeX(index);
          if (!era.aligned_with_history) {
            // Quadratic bezier curve going downward
            const controlX = x;
            const controlY = centerY + 60;
            return (
              <g key={`diverge-${era.era_id}`}>
                {/* Red divergence branch */}
                <motion.path
                  d={`M ${x} ${centerY + nodeRadius} Q ${controlX} ${controlY} ${x} ${divergeY - divergeNodeRadius}`}
                  stroke="#EF4444"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="8,4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.5 + index * 0.2 }}
                />
                {/* Divergence node */}
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 2 + index * 0.2 }}
                  style={{ cursor: 'pointer' }}
                  onClick={() => onNodeClick(era, 'divergent')}
                >
                  <circle
                    cx={x}
                    cy={divergeY}
                    r={divergeNodeRadius}
                    fill="#EF4444"
                    stroke="#991B1B"
                    strokeWidth="3"
                    filter="url(#glow)"
                    className="hover:brightness-110 transition-all"
                  />
                  <text
                    x={x}
                    y={divergeY + 5}
                    textAnchor="middle"
                    className="fill-white text-xs font-bold pointer-events-none"
                  >
                    DIV
                  </text>
                  {/* Label below divergence node */}
                  <text
                    x={x}
                    y={divergeY + 40}
                    textAnchor="middle"
                    className="fill-red-400 text-xs font-serif"
                  >
                    {era.player_choice_title.length > 15
                      ? era.player_choice_title.substring(0, 15) + '...'
                      : era.player_choice_title}
                  </text>
                </motion.g>
              </g>
            );
          }
          return null;
        })}

        {/* Render main era nodes */}
        {eras.map((era, index) => {
          const x = getNodeX(index);
          const isAligned = era.aligned_with_history;

          return (
            <motion.g
              key={`era-${era.era_id}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.2 }}
              style={{ cursor: 'pointer' }}
              onClick={() => onNodeClick(era, 'historical')}
            >
              {/* Node circle */}
              <circle
                cx={x}
                cy={centerY}
                r={nodeRadius}
                fill={isAligned ? '#3B82F6' : 'url(#blueRedGradient)'}
                stroke={isAligned ? '#1D4ED8' : '#7C3AED'}
                strokeWidth="4"
                filter="url(#glow)"
                className="hover:brightness-110 transition-all"
              />

              {/* Year inside the node */}
              <text
                x={x}
                y={centerY + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-white text-xs font-bold pointer-events-none"
              >
                {era.year.replace(' BC', '').replace(' AD', '')}
              </text>

              {/* Era title above the node */}
              <text
                x={x}
                y={centerY - nodeRadius - 20}
                textAnchor="middle"
                className="fill-stone-300 text-sm font-serif pointer-events-none"
              >
                {era.title}
              </text>

              {/* Year suffix below title */}
              <text
                x={x}
                y={centerY - nodeRadius - 6}
                textAnchor="middle"
                className="fill-stone-500 text-xs pointer-events-none"
              >
                {era.year.includes('BC') ? 'BC' : 'AD'}
              </text>

              {/* Alignment indicator below node (only for aligned) */}
              {isAligned && (
                <text
                  x={x}
                  y={centerY + nodeRadius + 20}
                  textAnchor="middle"
                  className="fill-blue-400 text-xs font-serif pointer-events-none"
                >
                  Aligned
                </text>
              )}
            </motion.g>
          );
        })}

        {/* Legend */}
        <g transform={`translate(${width - 200}, ${height - 30})`}>
          <circle cx={0} cy={0} r={8} fill="#3B82F6" />
          <text x={15} y={4} className="fill-stone-400 text-xs">History's Path</text>
          <circle cx={0} cy={25} r={8} fill="#EF4444" />
          <text x={15} y={29} className="fill-stone-400 text-xs">Your Divergence</text>
        </g>
      </svg>
    </div>
  );
};
