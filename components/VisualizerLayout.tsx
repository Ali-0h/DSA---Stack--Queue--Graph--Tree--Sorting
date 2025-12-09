import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface VisualizerLayoutProps {
  title: string;
  onBack: () => void;
  controls: ReactNode;
  visualArea: ReactNode;
  console: ReactNode;
}

export default function VisualizerLayout({
  title,
  onBack,
  controls,
  visualArea,
  console: consoleArea,
}: VisualizerLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0f] pixel-grid scanlines">
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <motion.button
              onClick={onBack}
              className="
                px-4 py-3 pixel-font bg-gray-900 text-cyan-400
                border-2 border-cyan-400/50 pixel-corners
                hover:bg-cyan-400/10 transition-all
              "
              style={{ fontSize: '0.7rem' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={16} className="inline mr-2" />
              BACK
            </motion.button>
            <h2 className="pixel-font neon-cyan" style={{ fontSize: '1.2rem' }}>
              {title}
            </h2>
          </div>
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Control Panel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-gradient-to-br from-gray-900 to-black border-4 border-purple-500/50 pixel-corners p-6">
              <h3 className="pixel-font text-purple-400 mb-6" style={{ fontSize: '0.8rem' }}>
                CONTROLS
              </h3>
              {controls}
            </div>
          </motion.div>

          {/* Visualization Area */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Main visual */}
            <div className="bg-gradient-to-br from-black to-gray-900 border-4 border-cyan-400/50 pixel-corners p-8 min-h-[400px] relative overflow-hidden">
              {/* Grid overlay */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `
                  linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px',
              }} />
              
              <div className="relative z-10">
                {visualArea}
              </div>
            </div>

            {/* Console */}
            <div className="bg-black border-4 border-magenta-500/50 pixel-corners p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-magenta-500"></div>
                <h3 className="pixel-font text-magenta-400" style={{ fontSize: '0.7rem' }}>
                  CONSOLE OUTPUT
                </h3>
              </div>
              <div className="bg-gray-900/50 border-2 border-magenta-500/30 p-4 max-h-[200px] overflow-y-auto">
                {consoleArea}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
