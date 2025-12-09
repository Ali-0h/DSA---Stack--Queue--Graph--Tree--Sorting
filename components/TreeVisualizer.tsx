import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VisualizerLayout from './VisualizerLayout';

interface TreeVisualizerProps {
  onBack: () => void;
}

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
  x?: number;
  y?: number;
}

export default function TreeVisualizer({ onBack }: TreeVisualizerProps) {
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [logs, setLogs] = useState<string[]>(['Binary Tree initialized. Ready to insert nodes.']);
  const [highlightedNodes, setHighlightedNodes] = useState<Set<number>>(new Set());
  const [traversalMode, setTraversalMode] = useState<'inorder' | 'preorder' | 'postorder'>('inorder');

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev].slice(0, 20));
  };

  const insertNode = (root: TreeNode | null, value: number): TreeNode => {
    if (root === null) {
      return { value, left: null, right: null };
    }

    if (value < root.value) {
      root.left = insertNode(root.left, value);
    } else if (value > root.value) {
      root.right = insertNode(root.right, value);
    }

    return root;
  };

  const handleInsert = () => {
    const value = inputValue ? parseInt(inputValue) : Math.floor(Math.random() * 99) + 1;
    const newTree = insertNode(tree, value);
    setTree({ ...newTree });
    addLog(`INSERT: Added ${value} to tree`);
    setInputValue('');
  };

  const handleReset = () => {
    setTree(null);
    setHighlightedNodes(new Set());
    setLogs(['Tree cleared. Ready for new operations.']);
  };

  const traverseTree = async (node: TreeNode | null, mode: 'inorder' | 'preorder' | 'postorder') => {
    if (!node) return;

    const highlight = (value: number) => {
      setHighlightedNodes(new Set([value]));
      addLog(`VISIT: Node ${value}`);
    };

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    if (mode === 'preorder') {
      highlight(node.value);
      await delay(600);
      await traverseTree(node.left, mode);
      await traverseTree(node.right, mode);
    } else if (mode === 'inorder') {
      await traverseTree(node.left, mode);
      highlight(node.value);
      await delay(600);
      await traverseTree(node.right, mode);
    } else {
      await traverseTree(node.left, mode);
      await traverseTree(node.right, mode);
      highlight(node.value);
      await delay(600);
    }
  };

  const handleTraversal = async () => {
    if (!tree) {
      addLog('ERROR: Tree is empty');
      return;
    }
    setHighlightedNodes(new Set());
    addLog(`Starting ${traversalMode.toUpperCase()} traversal...`);
    await traverseTree(tree, traversalMode);
    setHighlightedNodes(new Set());
    addLog('Traversal complete');
  };

  const calculatePositions = (node: TreeNode | null, x: number, y: number, offset: number): void => {
    if (!node) return;
    node.x = x;
    node.y = y;
    if (node.left) calculatePositions(node.left, x - offset, y + 80, offset / 2);
    if (node.right) calculatePositions(node.right, x + offset, y + 80, offset / 2);
  };

  if (tree) {
    calculatePositions(tree, 400, 50, 100);
  }

  const renderNode = (node: TreeNode | null): JSX.Element | null => {
    if (!node || node.x === undefined || node.y === undefined) return null;

    return (
      <g key={`node-${node.value}`}>
        {/* Lines to children */}
        {node.left && node.left.x !== undefined && node.left.y !== undefined && (
          <line
            x1={node.x}
            y1={node.y}
            x2={node.left.x}
            y2={node.left.y}
            stroke="#a855f7"
            strokeWidth="3"
            opacity="0.6"
          />
        )}
        {node.right && node.right.x !== undefined && node.right.y !== undefined && (
          <line
            x1={node.x}
            y1={node.y}
            x2={node.right.x}
            y2={node.right.y}
            stroke="#a855f7"
            strokeWidth="3"
            opacity="0.6"
          />
        )}

        {/* Node circle */}
        <motion.circle
          cx={node.x}
          cy={node.y}
          r="25"
          fill={highlightedNodes.has(node.value) ? '#00ffff' : '#8b5cf6'}
          stroke={highlightedNodes.has(node.value) ? '#00ffff' : '#a855f7'}
          strokeWidth="3"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Node value */}
        <text
          x={node.x}
          y={node.y}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize="16"
          fontWeight="bold"
        >
          {node.value}
        </text>

        {/* Render children */}
        {node.left && renderNode(node.left)}
        {node.right && renderNode(node.right)}
      </g>
    );
  };

  const controls = (
    <div className="space-y-4">
      {/* Input */}
      <div>
        <label className="text-cyan-400 text-xs mb-2 block">VALUE</label>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Random"
          className="
            w-full px-3 py-2 bg-black border-2 border-cyan-400/50
            text-cyan-400 pixel-corners focus:outline-none focus:border-cyan-400
          "
          style={{ fontSize: '0.9rem' }}
        />
      </div>

      {/* Traversal mode */}
      <div>
        <label className="text-cyan-400 text-xs mb-2 block">TRAVERSAL</label>
        <select
          value={traversalMode}
          onChange={(e) => setTraversalMode(e.target.value as any)}
          className="
            w-full px-3 py-2 bg-black border-2 border-cyan-400/50
            text-cyan-400 pixel-corners focus:outline-none focus:border-cyan-400
          "
          style={{ fontSize: '0.8rem' }}
        >
          <option value="inorder">In-Order</option>
          <option value="preorder">Pre-Order</option>
          <option value="postorder">Post-Order</option>
        </select>
      </div>

      {/* Action buttons */}
      <div className="space-y-2">
        <motion.button
          onClick={handleInsert}
          className="
            w-full py-3 pixel-font bg-gradient-to-r from-cyan-500 to-blue-600
            text-white pixel-corners border-2 border-cyan-400/50
          "
          style={{ fontSize: '0.7rem' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          INSERT
        </motion.button>

        <motion.button
          onClick={handleTraversal}
          disabled={!tree}
          className="
            w-full py-3 pixel-font bg-gradient-to-r from-purple-500 to-magenta-600
            text-white pixel-corners border-2 border-purple-400/50
            disabled:opacity-50 disabled:cursor-not-allowed
          "
          style={{ fontSize: '0.7rem' }}
          whileHover={tree ? { scale: 1.05 } : {}}
          whileTap={tree ? { scale: 0.95 } : {}}
        >
          TRAVERSE
        </motion.button>

        <motion.button
          onClick={handleReset}
          className="
            w-full py-3 pixel-font bg-gray-800
            text-gray-400 pixel-corners border-2 border-gray-600/50
          "
          style={{ fontSize: '0.7rem' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          RESET
        </motion.button>
      </div>
    </div>
  );

  const visualArea = (
    <div className="flex items-center justify-center min-h-[350px]">
      {tree ? (
        <svg width="800" height="400" className="overflow-visible">
          {renderNode(tree)}
        </svg>
      ) : (
        <div className="text-gray-600 text-center pixel-font" style={{ fontSize: '0.7rem' }}>
          EMPTY TREE - INSERT NODES TO BEGIN
        </div>
      )}
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
      title="TREE VISUALIZER"
      onBack={onBack}
      controls={controls}
      visualArea={visualArea}
      console={consoleOutput}
    />
  );
}
