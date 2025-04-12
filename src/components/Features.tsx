import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'AI-Powered Story Generation',
    description: 'Create personalized stories based on student interests and reading level.',
    icon: '📚',
  },
  {
    title: 'Interactive Learning',
    description: 'Engage with animated characters and interactive exercises.',
    icon: '🎮',
  },
  {
    title: 'Progress Tracking',
    description: 'Monitor student progress with detailed analytics and reports.',
    icon: '📊',
  },
  {
    title: 'Voice Recognition',
    description: 'Practice pronunciation with real-time feedback.',
    icon: '🎤',
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Features</h2>
          <p className="text-xl text-gray-600">Everything you need to make learning fun and effective</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 