import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import StoryPromptGenerator from './components/StoryPromptGenerator';
import PhonicsGame from './components/PhonicsGame';
import ReadingLevelAnalyzer from './components/ReadingLevelAnalyzer';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                {/* Purpose Section */}
                <section className="py-20 bg-white">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true }}
                      className="text-center mb-16"
                    >
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        LiterAI is dedicated to helping learners improve their reading and speaking skills through AI-powered practice. 
                        Our interactive tools provide real-time feedback and personalized exercises to help you develop confidence and fluency 
                        in your language abilities.
                      </p>
                    </motion.div>
                  </div>
                </section>

                {/* Research Evidence Section */}
                <section className="py-20 bg-gray-50">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true }}
                      className="text-center mb-16"
                    >
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">Backed by Research</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                          <h3 className="text-xl font-semibold mb-4">Personalized Learning</h3>
                          <p className="text-gray-600">
                            Studies show that personalized learning approaches can improve student outcomes by up to 30%.
                            Our AI-powered platform adapts to each student's unique learning journey.
                          </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                          <h3 className="text-xl font-semibold mb-4">Engagement Matters</h3>
                          <p className="text-gray-600">
                            Research indicates that engaged students are 2.5 times more likely to achieve academic success.
                            Our interactive approach keeps students motivated and focused.
                          </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                          <h3 className="text-xl font-semibold mb-4">Early Intervention</h3>
                          <p className="text-gray-600">
                            Early literacy intervention can prevent reading difficulties and improve long-term academic success.
                            Our platform helps identify and address learning gaps early.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </section>

                {/* Impact Section */}
                <section className="py-20 bg-white">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true }}
                      className="text-center mb-16"
                    >
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">Making a Difference</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gray-50 p-8 rounded-xl">
                          <h3 className="text-2xl font-semibold mb-4">For Students</h3>
                          <ul className="space-y-4 text-left">
                            <li className="flex items-start">
                              <span className="text-primary mr-2">✓</span>
                              <span>Build confidence through personalized learning experiences</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-primary mr-2">✓</span>
                              <span>Develop strong literacy skills at their own pace</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-primary mr-2">✓</span>
                              <span>Enjoy learning with engaging, interactive content</span>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-gray-50 p-8 rounded-xl">
                          <h3 className="text-2xl font-semibold mb-4">For Educators</h3>
                          <ul className="space-y-4 text-left">
                            <li className="flex items-start">
                              <span className="text-primary mr-2">✓</span>
                              <span>Access detailed progress reports and insights</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-primary mr-2">✓</span>
                              <span>Save time with AI-powered lesson planning</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-primary mr-2">✓</span>
                              <span>Support diverse learning needs effectively</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </section>
              </>
            } />
            <Route path="/features/story-generator" element={<StoryPromptGenerator />} />
            <Route path="/features/reading-analyzer" element={<ReadingLevelAnalyzer />} />
            <Route path="/features/phonics-game" element={<PhonicsGame />} />
            <Route path="/features/progress" element={
              <div className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h2 className="text-3xl font-bold text-center mb-8">Progress Tracking</h2>
                  <p className="text-xl text-center text-gray-600">Coming soon!</p>
                </div>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 