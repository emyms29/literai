import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface GameOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
}

const GAME_OPTIONS: GameOption[] = [
  {
    id: 'matching',
    title: 'Letter Matching',
    description: 'Match letters to their sounds and images',
    icon: '🔤',
    path: '/features/phonics/matching'
  },
  {
    id: 'drawing',
    title: 'Word Drawing',
    description: 'Draw pictures to match given words',
    icon: '✏️',
    path: '/features/phonics/drawing'
  }
];

const PhonicsGamesMenu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-secondary/5 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Phonics Games</h1>
          <p className="text-lg text-gray-600">Choose a game to play!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GAME_OPTIONS.map((game) => (
            <motion.div
              key={game.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(game.path)}
              className="bg-white p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="text-4xl">{game.icon}</div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{game.title}</h2>
                  <p className="text-gray-600">{game.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhonicsGamesMenu; 