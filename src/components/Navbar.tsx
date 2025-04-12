import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
=======
import FeaturesDropdown from './FeaturesDropdown';
>>>>>>> 0e96a6b2d40a7bc29890e95aecad7a47b77a6584

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary">LiterAI</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
<<<<<<< HEAD
            <Link to="/features" className="text-gray-600 hover:text-primary transition-colors">
              Features
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-primary transition-colors">
              About
            </Link>
=======
            <FeaturesDropdown />
>>>>>>> 0e96a6b2d40a7bc29890e95aecad7a47b77a6584
            <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar; 