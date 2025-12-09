import { useState } from 'react';
import { motion } from 'framer-motion';
import VisualizerLayout from './VisualizerLayout';

interface SortingVisualizerProps {
  onBack: () => void;
}

interface Bar {
  value: number;
  color: string;
}

export default function SortingVisualizer({ onBack }: SortingVisualizerProps) {
  const [array, setArray] = useState<Bar[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [logs, setLogs] = useState<string[]>(['Sorting visualizer ready. Generate an array to begin.']);
  const [arraySize, setArraySize] = useState(15);
  const [algorithm, setAlgorithm] = useState<'bubble' | 'quick'>('bubble');
  const [speed, setSpeed] = useState(100);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev].slice(0, 20));
  };

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const generateArray = () => {
    const newArray: Bar[] = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push({
        value: Math.floor(Math.random() * 100) + 10,
        color: '#6b7280',
      });
    }
    setArray(newArray);
    addLog(`Generated random array of size ${arraySize}`);
  };

  const updateBarColors = (indices: number[], color: string) => {
    setArray(prev => prev.map((bar, idx) => ({
      ...bar,
      color: indices.includes(idx) ? color : '#6b7280',
    })));
  };

  const bubbleSort = async () => {
    setIsSorting(true);
    addLog('Starting Bubble Sort...');
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        // Highlight comparing elements
        updateBarColors([j, j + 1], '#00ffff');
        await delay(speed);

        if (arr[j].value > arr[j + 1].value) {
          // Swap
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          updateBarColors([j, j + 1], '#ff00ff');
          addLog(`Swapped ${arr[j + 1].value} and ${arr[j].value}`);
          await delay(speed);
        }

        updateBarColors([j, j + 1], '#6b7280');
      }
      // Mark sorted element
      arr[n - i - 1].color = '#a855f7';
      setArray([...arr]);
    }

    arr[0].color = '#a855f7';
    setArray([...arr]);
    addLog('Bubble Sort complete!');
    setIsSorting(false);
  };

  const partition = async (arr: Bar[], low: number, high: number): Promise<number> => {
    const pivot = arr[high].value;
    updateBarColors([high], '#ffff00');
    await delay(speed);

    let i = low - 1;

    for (let j = low; j < high; j++) {
      updateBarColors([j], '#00ffff');
      await delay(speed);

      if (arr[j].value < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        updateBarColors([i, j], '#ff00ff');
        addLog(`Swapped ${arr[j].value} and ${arr[i].value}`);
        await delay(speed);
      }

      updateBarColors([j], '#6b7280');
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    updateBarColors([i + 1, high], '#a855f7');
    await delay(speed);

    return i + 1;
  };

  const quickSortHelper = async (arr: Bar[], low: number, high: number) => {
    if (low < high) {
      const pi = await partition(arr, low, high);
      await quickSortHelper(arr, low, pi - 1);
      await quickSortHelper(arr, pi + 1, high);
    } else if (low === high) {
      arr[low].color = '#a855f7';
      setArray([...arr]);
    }
  };

  const quickSort = async () => {
    setIsSorting(true);
    addLog('Starting Quick Sort...');
    const arr = [...array];
    await quickSortHelper(arr, 0, arr.length - 1);
    
    // Mark all as sorted
    arr.forEach(bar => bar.color = '#a855f7');
    setArray([...arr]);
    addLog('Quick Sort complete!');
    setIsSorting(false);
  };

  const handleSort = () => {
    if (array.length === 0) {
      addLog('ERROR: Generate an array first');
      return;
    }

    if (algorithm === 'bubble') {
      bubbleSort();
    } else {
      quickSort();
    }
  };

  const handleReset = () => {
    setArray([]);
    setLogs(['Visualizer reset. Generate a new array.']);
  };

  const controls = (
    <div className="space-y-4">
      {/* Array size */}
      <div>
        <label className="text-cyan-400 text-xs mb-2 block">
          ARRAY SIZE: {arraySize}
        </label>
        <input
          type="range"
          min="5"
          max="30"
          value={arraySize}
          onChange={(e) => setArraySize(parseInt(e.target.value))}
          disabled={isSorting}
          className="w-full"
        />
      </div>

      {/* Speed control */}
      <div>
        <label className="text-cyan-400 text-xs mb-2 block">
          SPEED: {speed}ms
        </label>
        <input
          type="range"
          min="10"
          max="500"
          step="10"
          value={speed}
          onChange={(e) => setSpeed(parseInt(e.target.value))}
          disabled={isSorting}
          className="w-full"
        />
      </div>

      {/* Algorithm selector */}
      <div>
        <label className="text-cyan-400 text-xs mb-2 block">ALGORITHM</label>
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value as any)}
          disabled={isSorting}
          className="
            w-full px-3 py-2 bg-black border-2 border-cyan-400/50
            text-cyan-400 pixel-corners focus:outline-none focus:border-cyan-400
            disabled:opacity-50
          "
          style={{ fontSize: '0.8rem' }}
        >
          <option value="bubble">Bubble Sort</option>
          <option value="quick">Quick Sort</option>
        </select>
      </div>

      {/* Action buttons */}
      <div className="space-y-2">
        <motion.button
          onClick={generateArray}
          disabled={isSorting}
          className="
            w-full py-3 pixel-font bg-gradient-to-r from-cyan-500 to-blue-600
            text-white pixel-corners border-2 border-cyan-400/50
            disabled:opacity-50 disabled:cursor-not-allowed
          "
          style={{ fontSize: '0.7rem' }}
          whileHover={!isSorting ? { scale: 1.05 } : {}}
          whileTap={!isSorting ? { scale: 0.95 } : {}}
        >
          GENERATE
        </motion.button>

        <motion.button
          onClick={handleSort}
          disabled={isSorting || array.length === 0}
          className="
            w-full py-3 pixel-font bg-gradient-to-r from-magenta-500 to-purple-600
            text-white pixel-corners border-2 border-magenta-400/50
            disabled:opacity-50 disabled:cursor-not-allowed
          "
          style={{ fontSize: '0.7rem' }}
          whileHover={!isSorting && array.length > 0 ? { scale: 1.05 } : {}}
          whileTap={!isSorting && array.length > 0 ? { scale: 0.95 } : {}}
        >
          {isSorting ? 'SORTING...' : 'START SORT'}
        </motion.button>

        <motion.button
          onClick={handleReset}
          disabled={isSorting}
          className="
            w-full py-3 pixel-font bg-gray-800
            text-gray-400 pixel-corners border-2 border-gray-600/50
            disabled:opacity-50 disabled:cursor-not-allowed
          "
          style={{ fontSize: '0.7rem' }}
          whileHover={!isSorting ? { scale: 1.05 } : {}}
          whileTap={!isSorting ? { scale: 0.95 } : {}}
        >
          RESET
        </motion.button>
      </div>

      {/* Legend */}
      <div className="mt-6 p-4 bg-black/50 border-2 border-cyan-400/30 pixel-corners space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-600"></div>
          <span className="text-gray-400 text-xs">Unsorted</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-cyan-400"></div>
          <span className="text-cyan-400 text-xs">Comparing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-magenta-500"></div>
          <span className="text-magenta-400 text-xs">Swapping</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-600"></div>
          <span className="text-purple-400 text-xs">Sorted</span>
        </div>
      </div>
    </div>
  );

  const maxValue = Math.max(...array.map(bar => bar.value), 100);
  const barWidth = Math.min(40, 600 / array.length - 4);

  const visualArea = (
    <div className="flex items-end justify-center min-h-[350px] gap-1">
      {array.length > 0 ? (
        array.map((bar, index) => {
          const barHeight = (bar.value / maxValue) * 300;
          return (
            <motion.div
              key={index}
              className="pixel-corners relative"
              style={{
                width: `${barWidth}px`,
                height: `${barHeight}px`,
                backgroundColor: bar.color,
                border: `2px solid ${bar.color}`,
              }}
              initial={{ height: 0 }}
              animate={{ height: barHeight }}
              transition={{ duration: 0.3 }}
            >
              {barWidth > 25 && (
                <span 
                  className="absolute top-1 left-1/2 -translate-x-1/2 text-white text-xs font-bold"
                  style={{ fontSize: barWidth > 35 ? '0.7rem' : '0.5rem' }}
                >
                  {bar.value}
                </span>
              )}
            </motion.div>
          );
        })
      ) : (
        <div className="text-gray-600 text-center pixel-font" style={{ fontSize: '0.7rem' }}>
          GENERATE ARRAY TO BEGIN
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
      title="SORTING VISUALIZER"
      onBack={onBack}
      controls={controls}
      visualArea={visualArea}
      console={consoleOutput}
    />
  );
}
