import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ReadingBuddy from '../components/ReadingBuddy';

const ReadingBuddyPage = () => {
  const [lexileLevel, setLexileLevel] = useState<number>(800); // Default to intermediate level

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Talking Buddy</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your personal AI conversation partner, here to help you practice your language skills!
          </p>
        </motion.div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Your Reading Level
          </label>
          <div className="grid grid-cols-3 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setLexileLevel(600)}
              className={`p-4 rounded-lg border-2 transition-colors ${
                lexileLevel === 600
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-200 hover:border-primary/50'
              }`}
            >
              <span className="block font-medium">Beginner</span>
              <span className="block text-sm text-gray-500">Lexile: 600-750</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setLexileLevel(800)}
              className={`p-4 rounded-lg border-2 transition-colors ${
                lexileLevel === 800
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-200 hover:border-primary/50'
              }`}
            >
              <span className="block font-medium">Intermediate</span>
              <span className="block text-sm text-gray-500">Lexile: 750-950</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setLexileLevel(1000)}
              className={`p-4 rounded-lg border-2 transition-colors ${
                lexileLevel === 1000
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-200 hover:border-primary/50'
              }`}
            >
              <span className="block font-medium">Advanced</span>
              <span className="block text-sm text-gray-500">Lexile: 950+</span>
            </motion.button>
          </div>
        </div>

        <ReadingBuddy lexileLevel={lexileLevel} />
      </div>
    </div>
  );
};

export default ReadingBuddyPage; 