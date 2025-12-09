import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface HeroProps {
  onStartClick: () => void;
}

export default function Hero({ onStartClick }: HeroProps) {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden pixel-grid scanlines">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Main title */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="pixel-font neon-cyan mb-6" style={{ fontSize: '2rem', lineHeight: '1.5' }}>
            EXPLORE DATA STRUCTURES
          </h1>
          <h2 className="pixel-font neon-magenta mb-8" style={{ fontSize: '1.5rem', lineHeight: '1.5' }}>
            THROUGH PIXEL ANIMATIONS
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <p className="pixel-font text-purple-400" style={{ fontSize: '0.7rem', lineHeight: '1.8' }}>
            STACK • QUEUE • TREES • GRAPHS • SORTING
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          onClick={onStartClick}
          className="
            relative px-12 py-6 pixel-font bg-gradient-to-r from-cyan-500 to-purple-600
            text-white pixel-corners glow-button overflow-hidden group
          "
          style={{ fontSize: '0.8rem' }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10 flex items-center gap-3">
            <Sparkles size={20} />
            START VISUALIZING
            <Sparkles size={20} />
          </span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6 }}
          />
        </motion.button>

        {/* Pixel decoration */}
        <div className="mt-16 flex justify-center gap-4">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-4 h-4 bg-gradient-to-br from-cyan-400 to-magenta-500 pixel-corners"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
    </section>
  );
}
