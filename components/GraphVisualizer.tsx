import { useState } from 'react';
import { motion } from 'framer-motion';
import VisualizerLayout from './VisualizerLayout';

interface GraphVisualizerProps {
  onBack: () => void;
}

interface Node {
  id: number;
  x: number;
  y: number;
  label: string;
}

interface Edge {
  from: number;
  to: number;
}

export default function GraphVisualizer({ onBack }: GraphVisualizerProps) {
  const [nodes, setNodes] = useState<Node[]>([
    { id: 0, x: 200, y: 100, label: 'A' },
    { id: 1, x: 350, y: 100, label: 'B' },
    { id: 2, x: 500, y: 100, label: 'C' },
    { id: 3, x: 200, y: 250, label: 'D' },
    { id: 4, x: 350, y: 250, label: 'E' },
    { id: 5, x: 500, y: 250, label: 'F' },
  ]);

  const [edges] = useState<Edge[]>([
    { from: 0, to: 1 },
    { from: 0, to: 3 },
    { from: 1, to: 2 },
    { from: 1, to: 4 },
    { from: 3, to: 4 },
    { from: 4, to: 5 },
    { from: 2, to: 5 },
  ]);

  const [visitedNodes, setVisitedNodes] = useState<Set<number>>(new Set());
  const [currentNode, setCurrentNode] = useState<number | null>(null);
  const [logs, setLogs] = useState<string[]>(['Graph initialized. Ready for BFS traversal.']);
  const [isTraversing, setIsTraversing] = useState(false);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev].slice(0, 20));
  };

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const bfsTraversal = async (startId: number) => {
    setIsTraversing(true);
    setVisitedNodes(new Set());
    setCurrentNode(null);

    const visited = new Set<number>();
    const queue: number[] = [startId];
    visited.add(startId);

    addLog(`BFS started from node ${nodes[startId].label}`);

    while (queue.length > 0) {
      const nodeId = queue.shift()!;
      setCurrentNode(nodeId);
      addLog(`Visiting node ${nodes[nodeId].label}`);
      await delay(800);

      setVisitedNodes(new Set(visited));

      // Find neighbors
      const neighbors = edges
        .filter(edge => edge.from === nodeId)
        .map(edge => edge.to);

      for (const neighborId of neighbors) {
        if (!visited.has(neighborId)) {
          visited.add(neighborId);
          queue.push(neighborId);
          addLog(`Enqueued node ${nodes[neighborId].label}`);
        }
      }

      await delay(400);
    }

    setCurrentNode(null);
    addLog('BFS traversal complete');
    setIsTraversing(false);
  };

  const handleReset = () => {
    setVisitedNodes(new Set());
    setCurrentNode(null);
    setLogs(['Graph reset. Ready for new traversal.']);
  };

  const handleRandomize = () => {
    const newNodes = nodes.map(node => ({
      ...node,
      x: 100 + Math.random() * 500,
      y: 80 + Math.random() * 280,
    }));
    setNodes(newNodes);
    handleReset();
    addLog('Graph layout randomized');
  };

  const controls = (
    <div className="space-y-4">
      {/* Start node selector */}
      <div>
        <label className="text-cyan-400 text-xs mb-2 block">START NODE</label>
        <select
          disabled={isTraversing}
          className="
            w-full px-3 py-2 bg-black border-2 border-cyan-400/50
            text-cyan-400 pixel-corners focus:outline-none focus:border-cyan-400
            disabled:opacity-50
          "
          style={{ fontSize: '0.8rem' }}
          onChange={(e) => {
            if (!isTraversing) {
              bfsTraversal(parseInt(e.target.value));
            }
          }}
        >
          <option value="">Select node...</option>
          {nodes.map(node => (
            <option key={node.id} value={node.id}>
              Node {node.label}
            </option>
          ))}
        </select>
      </div>

      {/* Info */}
      <div className="p-4 bg-black/50 border-2 border-cyan-400/30 pixel-corners">
        <div className="text-cyan-400 text-xs space-y-2">
          <div>NODES: {nodes.length}</div>
          <div>EDGES: {edges.length}</div>
          <div>VISITED: {visitedNodes.size}</div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="space-y-2">
        <motion.button
          onClick={() => bfsTraversal(0)}
          disabled={isTraversing}
          className="
            w-full py-3 pixel-font bg-gradient-to-r from-cyan-500 to-blue-600
            text-white pixel-corners border-2 border-cyan-400/50
            disabled:opacity-50 disabled:cursor-not-allowed
          "
          style={{ fontSize: '0.7rem' }}
          whileHover={!isTraversing ? { scale: 1.05 } : {}}
          whileTap={!isTraversing ? { scale: 0.95 } : {}}
        >
          RUN BFS
        </motion.button>

        <motion.button
          onClick={handleRandomize}
          disabled={isTraversing}
          className="
            w-full py-3 pixel-font bg-gradient-to-r from-purple-500 to-magenta-600
            text-white pixel-corners border-2 border-purple-400/50
            disabled:opacity-50 disabled:cursor-not-allowed
          "
          style={{ fontSize: '0.7rem' }}
          whileHover={!isTraversing ? { scale: 1.05 } : {}}
          whileTap={!isTraversing ? { scale: 0.95 } : {}}
        >
          RANDOMIZE
        </motion.button>

        <motion.button
          onClick={handleReset}
          disabled={isTraversing}
          className="
            w-full py-3 pixel-font bg-gray-800
            text-gray-400 pixel-corners border-2 border-gray-600/50
            disabled:opacity-50 disabled:cursor-not-allowed
          "
          style={{ fontSize: '0.7rem' }}
          whileHover={!isTraversing ? { scale: 1.05 } : {}}
          whileTap={!isTraversing ? { scale: 0.95 } : {}}
        >
          RESET
        </motion.button>
      </div>

      {/* Legend */}
      <div className="mt-6 p-4 bg-black/50 border-2 border-purple-400/30 pixel-corners space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
          <span className="text-gray-400 text-xs">Unvisited</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
          <span className="text-purple-400 text-xs">Visited</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-cyan-400 rounded-full"></div>
          <span className="text-cyan-400 text-xs">Current</span>
        </div>
      </div>
    </div>
  );

  const visualArea = (
    <div className="flex items-center justify-center min-h-[350px] relative">
      <svg width="700" height="400" className="overflow-visible">
        {/* Render edges */}
        {edges.map((edge, index) => {
          const fromNode = nodes[edge.from];
          const toNode = nodes[edge.to];
          return (
            <line
              key={index}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="#4a5568"
              strokeWidth="3"
              opacity="0.5"
            />
          );
        })}

        {/* Render nodes */}
        {nodes.map(node => {
          const isVisited = visitedNodes.has(node.id);
          const isCurrent = currentNode === node.id;

          return (
            <g key={node.id}>
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="30"
                fill={isCurrent ? '#00ffff' : isVisited ? '#8b5cf6' : '#4a5568'}
                stroke={isCurrent ? '#00ffff' : isVisited ? '#a855f7' : '#6b7280'}
                strokeWidth="4"
                animate={isCurrent ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.5, repeat: isCurrent ? Infinity : 0 }}
              />
              <text
                x={node.x}
                y={node.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="20"
                fontWeight="bold"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );

  const consoleOutput = (
    <div className="space-y-1 font-mono text-xs">
      {logs.map((log, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-green-400"
        >
          {'>'} {log}
        </motion.div>
      ))}
    </div>
  );

  return (
    <VisualizerLayout
      title="GRAPH VISUALIZER"
      onBack={onBack}
      controls={controls}
      visualArea={visualArea}
      console={consoleOutput}
    />
  );
}
