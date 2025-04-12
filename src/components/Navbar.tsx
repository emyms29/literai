
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-primary">
                LiterAI
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/features"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-primary"
              >
                Features
              </Link>
              <Link
                to="/story-prompt"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-primary"
              >
                Story Generator
              </Link>
              <Link
                to="/phonics"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-primary"
              >
                Phonics Game
              </Link>
              <Link
                to="/analyzer"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-primary"
              >
                Reading Analyzer
              </Link>
            </div>
          </div>
        </div>
      </div>w
    </nav>
  );
};

export default Navbar; 