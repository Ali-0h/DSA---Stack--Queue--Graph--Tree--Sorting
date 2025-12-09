import { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ModuleCard from './components/ModuleCard';
import StackVisualizer from './components/StackVisualizer';
import QueueVisualizer from './components/QueueVisualizer';
import TreeVisualizer from './components/TreeVisualizer';
import GraphVisualizer from './components/GraphVisualizer';
import SortingVisualizer from './components/SortingVisualizer';
import { Box, ArrowRightLeft, GitBranch, Network, BarChart3 } from 'lucide-react';

type Page = 'home' | 'stack' | 'queue' | 'tree' | 'graph' | 'sorting';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const scrollToModules = () => {
    const modulesSection = document.getElementById('modules');
    if (modulesSection) {
      modulesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'stack':
        return <StackVisualizer onBack={() => setCurrentPage('home')} />;
      case 'queue':
        return <QueueVisualizer onBack={() => setCurrentPage('home')} />;
      case 'tree':
        return <TreeVisualizer onBack={() => setCurrentPage('home')} />;
      case 'graph':
        return <GraphVisualizer onBack={() => setCurrentPage('home')} />;
      case 'sorting':
        return <SortingVisualizer onBack={() => setCurrentPage('home')} />;
      default:
        return (
          <>
            <Hero onStartClick={scrollToModules} />
            
            {/* Modules Section */}
            <section id="modules" className="py-20 px-4 bg-[#0a0a0f] relative">
              {/* Section header */}
              <div className="max-w-7xl mx-auto mb-16 text-center">
                <h2 className="pixel-font neon-purple mb-4" style={{ fontSize: '1.5rem' }}>
                  CHOOSE YOUR MODULE
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto" style={{ fontSize: '0.95rem' }}>
                  Select a data structure or algorithm to explore interactive visualizations
                  with real-time animations and step-by-step execution.
                </p>
              </div>

              {/* Module cards grid */}
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ModuleCard
                  icon={Box}
                  title="STACK"
                  description="Push / Pop crates in a vertical pixel stack with animations."
                  onOpen={() => setCurrentPage('stack')}
                  delay={0}
                />
                <ModuleCard
                  icon={ArrowRightLeft}
                  title="QUEUE"
                  description="Enqueue and dequeue elements on a pixel conveyor."
                  onOpen={() => setCurrentPage('queue')}
                  delay={0.1}
                />
                <ModuleCard
                  icon={GitBranch}
                  title="TREE"
                  description="Interactive Binary Tree with insert and traversal animations."
                  onOpen={() => setCurrentPage('tree')}
                  delay={0.2}
                />
                <ModuleCard
                  icon={Network}
                  title="GRAPH"
                  description="Explore BFS traversal with animated pixel nodes."
                  onOpen={() => setCurrentPage('graph')}
                  delay={0.3}
                />
                <ModuleCard
                  icon={BarChart3}
                  title="SORTING"
                  description="Bubble Sort and QuickSort visualized with neon pixel bars."
                  onOpen={() => setCurrentPage('sorting')}
                  delay={0.4}
                />
                <div className="flex items-center justify-center">
                  <div className="text-center p-8 border-4 border-dashed border-gray-700 pixel-corners">
                    <p className="pixel-font text-gray-600" style={{ fontSize: '0.7rem' }}>
                      MORE COMING SOON
                    </p>
                    <div className="mt-4 flex justify-center gap-2">
                      <div className="w-3 h-3 bg-cyan-400/30 animate-pulse"></div>
                      <div className="w-3 h-3 bg-purple-400/30 animate-pulse delay-100"></div>
                      <div className="w-3 h-3 bg-magenta-400/30 animate-pulse delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative grid lines */}
              <div className="absolute inset-0 pointer-events-none opacity-10">
                <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
                <div className="absolute top-2/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
                <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-magenta-500 to-transparent"></div>
              </div>
            </section>

            {/* Footer */}
            <footer className="bg-black border-t-4 border-cyan-400/30 py-8">
              <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="pixel-font text-cyan-400 mb-2" style={{ fontSize: '0.7rem' }}>
                  DSA PIXEL VISUALIZER
                </p>
                <p className="text-gray-600 text-xs">
                  Learn data structures and algorithms through interactive pixel art animations
                </p>
                <div className="mt-6 flex justify-center gap-4">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-2 h-2 bg-cyan-400/50 pixel-corners"></div>
                  ))}
                </div>
              </div>
            </footer>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navigation currentPage={currentPage} onNavigate={(page) => setCurrentPage(page as Page)} />
      {renderPage()}
    </div>
  );
}
