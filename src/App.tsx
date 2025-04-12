import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import StoryPromptGenerator from './components/StoryPromptGenerator';
import PhonicsGame from './components/PhonicsGame';
import ReadingLevelAnalyzer from './components/ReadingLevelAnalyzer';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Try Our Story Generator</h2>
                <p className="text-xl text-gray-600">Get creative with AI-powered story prompts</p>
              </motion.div>
              <StoryPromptGenerator />
            </div>
          </section>
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Reading Level Analyzer</h2>
                <p className="text-xl text-gray-600">Analyze text complexity and get reading level insights</p>
              </motion.div>
              <ReadingLevelAnalyzer />
            </div>
          </section>
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Phonics Learning Game</h2>
                <p className="text-xl text-gray-600">Match letters to sounds in this interactive game</p>
              </motion.div>
              <PhonicsGame />
            </div>
          </section>
          <Features />
          <Testimonials />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 