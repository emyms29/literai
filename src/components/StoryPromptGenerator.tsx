import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StoryPrompt {
  id: string;
  prompt: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const STORY_PROMPTS: StoryPrompt[] = [
  {
    id: '1',
    prompt: 'Write a story about a magical garden where plants can talk.',
    category: 'Fantasy',
    difficulty: 'easy',
  },
  {
    id: '2',
    prompt: 'Describe a day in the life of a superhero who can control time.',
    category: 'Adventure',
    difficulty: 'medium',
  },
  {
    id: '3',
    prompt: 'Create a story about a robot who learns to feel emotions.',
    category: 'Science Fiction',
    difficulty: 'hard',
  },
  {
    id: '4',
    prompt: 'Write about a mysterious door that appears in your bedroom one night.',
    category: 'Mystery',
    difficulty: 'easy',
  },
  {
    id: '5',
    prompt: 'Tell the story of a young detective solving their first case.',
    category: 'Mystery',
    difficulty: 'medium',
  },
];

const StoryPromptGenerator: React.FC = () => {
  const [currentPrompt, setCurrentPrompt] = useState<StoryPrompt | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

  const generatePrompt = () => {
    setIsGenerating(true);
    const filteredPrompts = STORY_PROMPTS.filter(p => p.difficulty === selectedDifficulty);
    const randomIndex = Math.floor(Math.random() * filteredPrompts.length);
    
    setTimeout(() => {
      setCurrentPrompt(filteredPrompts[randomIndex]);
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Story Prompt Generator</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Difficulty
          </label>
          <div className="flex space-x-4">
            {(['easy', 'medium', 'hard'] as const).map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedDifficulty === difficulty
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={generatePrompt}
          disabled={isGenerating}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? 'Generating...' : 'Generate Prompt'}
        </button>

        <AnimatePresence mode="wait">
          {currentPrompt && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-8 p-6 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-500">
                  {currentPrompt.category}
                </span>
                <span className="text-sm font-medium text-gray-500">
                  {currentPrompt.difficulty}
                </span>
              </div>
              <p className="text-lg text-gray-900">{currentPrompt.prompt}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StoryPromptGenerator; 