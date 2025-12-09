import { Home, Box, ArrowRightLeft, Network, GitBranch, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const navItems = [
    { id: 'home', label: 'HOME', icon: Home },
    { id: 'stack', label: 'STACK', icon: Box },
    { id: 'queue', label: 'QUEUE', icon: ArrowRightLeft },
    { id: 'tree', label: 'TREE', icon: GitBranch },
    { id: 'graph', label: 'GRAPH', icon: Network },
    { id: 'sorting', label: 'SORTING', icon: BarChart3 },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b-4 border-cyan-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onNavigate('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-600 pixel-corners flex items-center justify-center">
              <div className="w-8 h-8 bg-black pixel-corners"></div>
            </div>
            <h1 className="pixel-font neon-cyan" style={{ fontSize: '0.75rem' }}>
              DSA PIXEL
            </h1>
          </motion.div>

          {/* Nav Items */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`
                  px-4 py-2 pixel-font flex items-center gap-2 relative
                  transition-all duration-300
                  ${currentPage === item.id 
                    ? 'text-cyan-400' 
                    : 'text-gray-400 hover:text-cyan-300'
                  }
                `}
                style={{ fontSize: '0.6rem' }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon size={14} />
                {item.label}
                {currentPage === item.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-magenta-500"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-cyan-400 p-2">
            <div className="w-6 h-1 bg-cyan-400 mb-1"></div>
            <div className="w-6 h-1 bg-cyan-400 mb-1"></div>
            <div className="w-6 h-1 bg-cyan-400"></div>
          </button>
        </div>
      </div>
    </nav>
  );
}
