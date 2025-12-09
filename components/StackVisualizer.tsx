import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VisualizerLayout from './VisualizerLayout';

interface StackVisualizerProps {
  onBack: () => void;
}

interface StackItem {
  id: number;
  value: number;
}

export default function StackVisualizer({ onBack }: StackVisualizerProps) {
  const [stack, setStack] = useState<StackItem[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [logs, setLogs] = useState<string[]>(['Stack initialized. Ready to push items.']);
  const [animationSpeed, setAnimationSpeed] = useState(0.5);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev].slice(0, 20));
  };

  const handlePush = () => {
    const value = inputValue ? parseInt(inputValue) : Math.floor(Math.random() * 99) + 1;
    const newItem: StackItem = {
      id: Date.now(),
      value,
    };
    setStack(prev => [...prev, newItem]);
    addLog(`PUSH: Added ${value} to stack. Size: ${stack.length + 1}`);
    setInputValue('');
  };

  const handlePop = () => {
    if (stack.length === 0) {
      addLog('ERROR: Stack is empty. Cannot pop.');
      return;
    }
    const poppedItem = stack[stack.length - 1];
    setStack(prev => prev.slice(0, -1));
    addLog(`POP: Removed ${poppedItem.value} from stack. Size: ${stack.length - 1}`);
  };

  const handleReset = () => {
    setStack([]);
    setLogs(['Stack cleared. Ready for new operations.']);
  };

  const handlePeek = () => {
    if (stack.length === 0) {
      addLog('PEEK: Stack is empty.');
      return;
    }
    const topItem = stack[stack.length - 1];
    addLog(`PEEK: Top element is ${topItem.value}`);
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

      {/* Speed control */}
      <div>
        <label className="text-cyan-400 text-xs mb-2 block">
          SPEED: {animationSpeed.toFixed(1)}x
        </label>
        <input
          type="range"
          min="0.3"
          max="2"
          step="0.1"
          value={animationSpeed}
          onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Action buttons */}
      <div className="space-y-2">
        <motion.button
          onClick={handlePush}
          className="
            w-full py-3 pixel-font bg-gradient-to-r from-cyan-500 to-blue-600
            text-white pixel-corners border-2 border-cyan-400/50
          "
          style={{ fontSize: '0.7rem' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          PUSH
        </motion.button>

        <motion.button
          onClick={handlePop}
          disabled={stack.length === 0}
          className="
            w-full py-3 pixel-font bg-gradient-to-r from-magenta-500 to-purple-600
            text-white pixel-corners border-2 border-magenta-400/50
            disabled:opacity-50 disabled:cursor-not-allowed
          "
          style={{ fontSize: '0.7rem' }}
          whileHover={stack.length > 0 ? { scale: 1.05 } : {}}
          whileTap={stack.length > 0 ? { scale: 0.95 } : {}}
        >
          POP
        </motion.button>

        <motion.button
          onClick={handlePeek}
          disabled={stack.length === 0}
          className="
            w-full py-3 pixel-font bg-gradient-to-r from-purple-500 to-indigo-600
            text-white pixel-corners border-2 border-purple-400/50
            disabled:opacity-50 disabled:cursor-not-allowed
          "
          style={{ fontSize: '0.7rem' }}
          whileHover={stack.length > 0 ? { scale: 1.05 } : {}}
          whileTap={stack.length > 0 ? { scale: 0.95 } : {}}
        >
          PEEK
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

      {/* Stack info */}
      <div className="mt-6 p-4 bg-black/50 border-2 border-cyan-400/30 pixel-corners">
        <div className="text-cyan-400 text-xs space-y-1">
          <div>SIZE: {stack.length}</div>
          <div>TOP: {stack.length > 0 ? stack[stack.length - 1].value : 'N/A'}</div>
        </div>
      </div>
    </div>
  );

  const visualArea = (
    <div className="flex flex-col-reverse items-center justify-end min-h-[350px] gap-2">
      <AnimatePresence>
        {stack.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0, y: -50 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
            }}
            exit={{ opacity: 0, scale: 0, x: 100 }}
            transition={{ duration: 0.3 / animationSpeed }}
            className="relative"
          >
            {/* Crate */}
            <div className={`
              w-48 h-16 pixel-corners relative
              bg-gradient-to-br ${
                index === stack.length - 1 
                  ? 'from-cyan-500 to-blue-600 border-cyan-400' 
                  : 'from-gray-700 to-gray-800 border-gray-600'
              }
              border-4 flex items-center justify-center
            `}>
              {/* Value */}
              <span className="pixel-font text-white" style={{ fontSize: '1.2rem' }}>
                {item.value}
              </span>

              {/* Corner pixels */}
              <div className="absolute top-1 left-1 w-2 h-2 bg-white/30"></div>
              <div className="absolute top-1 right-1 w-2 h-2 bg-white/30"></div>
              <div className="absolute bottom-1 left-1 w-2 h-2 bg-white/50"></div>
              <div className="absolute bottom-1 right-1 w-2 h-2 bg-white/50"></div>
            </div>

            {/* Index label */}
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 text-cyan-400 text-xs">
              [{index}]
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Base */}
      {stack.length === 0 && (
        <div className="text-gray-600 text-center pixel-font" style={{ fontSize: '0.7rem' }}>
          EMPTY STACK
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
      title="STACK VISUALIZER"
      onBack={onBack}
      controls={controls}
      visualArea={visualArea}
      console={consoleOutput}
    />
  );
}
