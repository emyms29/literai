import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Features = () => {
  const features = [
    {
      title: 'Story Prompt Generator',
      description: 'Practice reading and speaking with AI-generated prompts tailored to your level.',
      path: '/story-prompt',
      icon: '📚'
    },
    {
      title: 'Phonics Game',
      description: 'Learn letter sounds and word recognition through interactive games.',
      path: '/phonics',
      icon: '🎮'
    },
    {
      title: 'Reading Comprehension',
      description: 'Learn to analyze passages with the help of AI.',
      path: '/analyzer',
      icon: '📊'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Features</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our interactive tools designed to help you improve your reading and speaking skills.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2">Story Generator</h3>
            <p className="text-gray-600 mb-4">Create personalized stories based on reading level and interests.</p>
            <Link to="/story-prompt" className="text-primary hover:text-primary/80">
              Try it out →
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="text-4xl mb-4">🎮</div>
            <h3 className="text-xl font-semibold mb-2">Phonics Game</h3>
            <p className="text-gray-600 mb-4">Interactive games to practice phonics and word recognition.</p>
            <Link to="/phonics" className="text-primary hover:text-primary/80">
              Play now →
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Reading Comprehension</h3>
            <p className="text-gray-600 mb-4">Practice reading comprehension with leveled passages.</p>
            <Link to="/analyzer" className="text-primary hover:text-primary/80">
              Get started →
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-semibold mb-2">Talking Buddy</h3>
            <p className="text-gray-600 mb-4">Practice conversations with an AI partner at your reading level.</p>
            <Link to="/reading-buddy" className="text-primary hover:text-primary/80">
              Start chatting →
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Features; 