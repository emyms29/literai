import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const features = [
  {
    title: 'AI Story Generator',
    path: '/features/story-generator',
    description: 'Practice reading and speaking with AI feedback',
    icon: '📚',
  },
  {
    title: 'Reading Level Analyzer',
    path: '/features/reading-analyzer',
    description: 'Analyze text complexity',
    icon: '📊',
  },
  {
    title: 'Phonics Game',
    path: '/features/phonics-game',
    description: 'Interactive phonics learning',
    icon: '🎮',
  },
  {
    title: 'Progress Tracking',
    path: '/features/progress',
    description: 'Monitor learning progress',
    icon: '📈',
  },
];

const FeaturesDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-gray-600 hover:text-primary transition-colors"
      >
        Features
        <span className="ml-1">
          {isOpen ? '▼' : '▶'}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 z-50"
          >
            <div className="py-2">
              {features.map((feature) => (
                <Link
                  key={feature.path}
                  to={feature.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                >
                  <span className="text-xl mr-3">{feature.icon}</span>
                  <div>
                    <div className="font-medium">{feature.title}</div>
                    <div className="text-sm text-gray-500">{feature.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FeaturesDropdown; 