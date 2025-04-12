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
      title: 'Reading Level Analyzer',
      description: 'Get instant feedback on your reading level and progress.',
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600 mb-6">{feature.description}</p>
              <Link
                to={feature.path}
                className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Try Now
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features; 