import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VisualizerLayout from './VisualizerLayout';

interface QueueVisualizerProps {
  onBack: () => void;
}

interface QueueItem {
  id: number;
  value: number;
}

export default function QueueVisualizer({ onBack }: QueueVisualizerProps) {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [logs, setLogs] = useState<string[]>(['Queue initialized. Ready to enqueue items.']);
  const [animationSpeed, setAnimationSpeed] = useState(0.5);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev].slice(0, 20));
  };

  const handleEnqueue = () => {
    const value = inputValue ? parseInt(inputValue) : Math.floor(Math.random() * 99) + 1;
    const newItem: QueueItem = {
      id: Date.now(),
      value,
    };
    setQueue(prev => [...prev, newItem]);
    addLog(`ENQUEUE: Added ${value} to queue. Size: ${queue.length + 1}`);
    setInputValue('');
  };

  const handleDequeue = () => {
    if (queue.length === 0) {
      addLog('ERROR: Queue is empty. Cannot dequeue.');
      return;
    }
    const dequeuedItem = queue[0];
    setQueue(prev => prev.slice(1));
    addLog(`DEQUEUE: Removed ${dequeuedItem.value} from queue. Size: ${queue.length - 1}`);
  };

  const handleReset = () => {
    setQueue([]);
    setLogs(['Queue cleared. Ready for new operations.']);
  };

  const handlePeek = () => {
    if (queue.length === 0) {
      addLog('PEEK: Queue is empty.');
      return;
    }
    const frontItem = queue[0];
    addLog(`PEEK: Front element is ${frontItem.value}`);
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
          onClick={handleEnqueue}
          className="
            w-full py-3 pixel-font bg-gradient-to-r from-cyan-500 to-blue-600
            text-white pixel-corners border-2 border-cyan-400/50
          "
          style={{ fontSize: '0.7rem' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ENQUEUE
        </motion.button>

        <motion.button
          onClick={handleDequeue}
          disabled={queue.length === 0}
          className="
            w-full py-3 pixel-font bg-gradient-to-r from-magenta-500 to-purple-600
            text-white pixel-corners border-2 border-magenta-400/50
            disabled:opacity-50 disabled:cursor-not-allowed
          "
          style={{ fontSize: '0.7rem' }}
          whileHover={queue.length > 0 ? { scale: 1.05 } : {}}
          whileTap={queue.length > 0 ? { scale: 0.95 } : {}}
        >
          DEQUEUE
        </motion.button>

        <motion.button
          onClick={handlePeek}
          disabled={queue.length === 0}
          className="
            w-full py-3 pixel-font bg-gradient-to-r from-purple-500 to-indigo-600
            text-white pixel-corners border-2 border-purple-400/50
            disabled:opacity-50 disabled:cursor-not-allowed
          "
          style={{ fontSize: '0.7rem' }}
          whileHover={queue.length > 0 ? { scale: 1.05 } : {}}
          whileTap={queue.length > 0 ? { scale: 0.95 } : {}}
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

      {/* Queue info */}
      <div className="mt-6 p-4 bg-black/50 border-2 border-cyan-400/30 pixel-corners">
        <div className="text-cyan-400 text-xs space-y-1">
          <div>SIZE: {queue.length}</div>
          <div>FRONT: {queue.length > 0 ? queue[0].value : 'N/A'}</div>
          <div>REAR: {queue.length > 0 ? queue[queue.length - 1].value : 'N/A'}</div>
        </div>
      </div>
    </div>
  );

  const visualArea = (
    <div className="flex items-center justify-center min-h-[350px]">
      <div className="flex items-center gap-4 overflow-x-auto pb-4">
        {/* Front label */}
        {queue.length > 0 && (
          <div className="flex flex-col items-center gap-2">
            <div className="text-cyan-400 pixel-font" style={{ fontSize: '0.6rem' }}>
              FRONT
            </div>
            <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-cyan-400"></div>
          </div>
        )}

        {/* Queue items */}
        <div className="flex gap-3">
          <AnimatePresence mode="popLayout">
            {queue.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0, x: 100 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  x: 0,
                }}
                exit={{ opacity: 0, scale: 0, y: -100 }}
                transition={{ duration: 0.3 / animationSpeed }}
                className="relative"
              >
                {/* Box */}
                <div className={`
                  w-20 h-20 pixel-corners relative
                  bg-gradient-to-br ${
                    index === 0
                      ? 'from-cyan-500 to-blue-600 border-cyan-400' 
                      : 'from-purple-600 to-magenta-600 border-purple-400'
                  }
                  border-4 flex items-center justify-center
                `}>
                  {/* Value */}
                  <span className="pixel-font text-white" style={{ fontSize: '1rem' }}>
                    {item.value}
                  </span>

                  {/* Corner pixels */}
                  <div className="absolute top-1 left-1 w-2 h-2 bg-white/30"></div>
                  <div className="absolute top-1 right-1 w-2 h-2 bg-white/30"></div>
                  <div className="absolute bottom-1 left-1 w-2 h-2 bg-white/50"></div>
                  <div className="absolute bottom-1 right-1 w-2 h-2 bg-white/50"></div>
                </div>

                {/* Index label */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-purple-400 text-xs">
                  [{index}]
                </div>

                {/* Arrow to next */}
                {index < queue.length - 1 && (
                  <div className="absolute -right-5 top-1/2 -translate-y-1/2 text-cyan-400" style={{ fontSize: '1.5rem' }}>
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Rear label */}
        {queue.length > 0 && (
          <div className="flex flex-col items-center gap-2">
            <div className="text-magenta-400 pixel-font" style={{ fontSize: '0.6rem' }}>
              REAR
            </div>
            <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-magenta-400"></div>
          </div>
        )}

        {/* Empty state */}
        {queue.length === 0 && (
          <div className="text-gray-600 text-center pixel-font" style={{ fontSize: '0.7rem' }}>
            EMPTY QUEUE
          </div>
        )}
      </div>
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
      title="QUEUE VISUALIZER"
      onBack={onBack}
      controls={controls}
      visualArea={visualArea}
      console={consoleOutput}
    />
  );
}
