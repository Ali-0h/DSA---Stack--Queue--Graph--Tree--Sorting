import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ModuleCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onOpen: () => void;
  delay?: number;
}

export default function ModuleCard({ icon: Icon, title, description, onOpen, delay = 0 }: ModuleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="relative group"
    >
      {/* Card background */}
      <div className="relative bg-gradient-to-br from-gray-900 to-black border-4 border-cyan-400/50 pixel-corners p-6 h-full">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-purple-600/0 group-hover:from-cyan-400/10 group-hover:to-purple-600/10 transition-all duration-300 pixel-corners" />
        
        <div className="relative z-10">
          {/* Icon */}
          <div className="mb-4 flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-purple-600 pixel-corners flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Icon size={40} className="text-white" />
            </div>
          </div>

          {/* Title */}
          <h3 className="pixel-font text-cyan-400 text-center mb-4 group-hover:neon-cyan transition-all duration-300" style={{ fontSize: '0.9rem' }}>
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-center mb-6" style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>
            {description}
          </p>

          {/* Button */}
          <motion.button
            onClick={onOpen}
            className="
              w-full py-3 pixel-font bg-gradient-to-r from-cyan-500 to-purple-600
              text-white pixel-corners relative overflow-hidden
              border-2 border-cyan-400/50
            "
            style={{ fontSize: '0.7rem' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">OPEN VISUALIZER</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-magenta-500"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-2 left-2 w-3 h-3 bg-cyan-400 opacity-50"></div>
        <div className="absolute top-2 right-2 w-3 h-3 bg-magenta-500 opacity-50"></div>
        <div className="absolute bottom-2 left-2 w-3 h-3 bg-purple-500 opacity-50"></div>
        <div className="absolute bottom-2 right-2 w-3 h-3 bg-cyan-400 opacity-50"></div>
      </div>

      {/* Outer glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
    </motion.div>
  );
}
