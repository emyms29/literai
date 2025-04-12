import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">LiterAI</h3>
            <p className="text-gray-400">Making literacy fun and accessible for all students.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/story-prompt" className="text-gray-400 hover:text-white transition-colors">
                  Story Generator
                </Link>
              </li>
              <li>
                <Link to="/phonics" className="text-gray-400 hover:text-white transition-colors">
                  Phonics Game
                </Link>
              </li>
              <li>
                <Link to="/analyzer" className="text-gray-400 hover:text-white transition-colors">
                  Reading Comprehension
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© 2024 LiterAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 