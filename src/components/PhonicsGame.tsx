import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';

interface Letter {
  id: string;
  letter: string;
  matched: boolean;
}

interface Sound {
  id: string;
  word: string;
  image: string;
  matched: boolean;
}

interface WordAnalysis {
  word: string;
  spoken: string;
  correct: boolean;
  confidence: number;
}

interface StoryPrompt {
  prompt: string;
  readingLevel: string;
  topic: string;
}

const LETTERS: Letter[] = [
  { id: 'a', letter: 'A', matched: false },
  { id: 'b', letter: 'B', matched: false },
  { id: 'c', letter: 'C', matched: false },
  { id: 'd', letter: 'D', matched: false },
  { id: 'e', letter: 'E', matched: false },
  { id: 'f', letter: 'F', matched: false },
  { id: 'g', letter: 'G', matched: false },
  { id: 'h', letter: 'H', matched: false },
  { id: 'i', letter: 'I', matched: false },
  { id: 'j', letter: 'J', matched: false },
  { id: 'k', letter: 'K', matched: false },
  { id: 'l', letter: 'L', matched: false },
  { id: 'm', letter: 'M', matched: false },
  { id: 'n', letter: 'N', matched: false },
  { id: 'o', letter: 'O', matched: false },
  { id: 'p', letter: 'P', matched: false },
  { id: 'q', letter: 'Q', matched: false },
  { id: 'r', letter: 'R', matched: false },
  { id: 's', letter: 'S', matched: false },
  { id: 't', letter: 'T', matched: false },
  { id: 'u', letter: 'U', matched: false },
  { id: 'v', letter: 'V', matched: false },
  { id: 'w', letter: 'W', matched: false },
  { id: 'x', letter: 'X', matched: false },
  { id: 'y', letter: 'Y', matched: false },
  { id: 'z', letter: 'Z', matched: false }
];

const SOUNDS: Sound[] = [
  { id: 'apple', word: 'Apple', image: '🍎', matched: false },
  { id: 'ball', word: 'Ball', image: '⚽', matched: false },
  { id: 'cat', word: 'Cat', image: '🐱', matched: false },
  { id: 'dog', word: 'Dog', image: '🐕', matched: false },
  { id: 'elephant', word: 'Elephant', image: '🐘', matched: false },
  { id: 'fish', word: 'Fish', image: '🐟', matched: false },
  { id: 'giraffe', word: 'Giraffe', image: '🦒', matched: false },
  { id: 'house', word: 'House', image: '🏠', matched: false },
  { id: 'igloo', word: 'Igloo', image: '❄️', matched: false },
  { id: 'jacket', word: 'Jacket', image: '🧥', matched: false },
  { id: 'kangaroo', word: 'Kangaroo', image: '🦘', matched: false },
  { id: 'ladder', word: 'Ladder', image: '🪜', matched: false },
  { id: 'monkey', word: 'Monkey', image: '🐒', matched: false },
  { id: 'notebook', word: 'Notebook', image: '📓', matched: false },
  { id: 'octopus', word: 'Octopus', image: '🐙', matched: false },
  { id: 'penguin', word: 'Penguin', image: '🐧', matched: false },
  { id: 'queen', word: 'Queen', image: '👑', matched: false },
  { id: 'rainbow', word: 'Rainbow', image: '🌈', matched: false },
  { id: 'sun', word: 'Sun', image: '☀️', matched: false },
  { id: 'tiger', word: 'Tiger', image: '🐯', matched: false },
  { id: 'umbrella', word: 'Umbrella', image: '☔', matched: false },
  { id: 'violin', word: 'Violin', image: '🎻', matched: false },
  { id: 'watermelon', word: 'Watermelon', image: '🍉', matched: false },
  { id: 'xylophone', word: 'Xylophone', image: '🎼', matched: false },
  { id: 'yacht', word: 'Yacht', image: '⛵', matched: false },
  { id: 'zebra', word: 'Zebra', image: '🦓', matched: false }
];

const DraggableLetter: React.FC<{ letter: Letter }> = ({ letter }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'LETTER',
    item: { id: letter.id, value: letter.letter },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <motion.div
      ref={drag}
      className={`w-16 h-16 flex items-center justify-center text-3xl font-bold rounded-xl cursor-move
        ${letter.matched ? 'bg-green-100 text-green-600' : 'bg-primary text-white'}
        ${isDragging ? 'opacity-50' : 'opacity-100'}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {letter.letter}
    </motion.div>
  );
};

const SoundTarget: React.FC<{ sound: Sound; onDrop: (letterId: string) => void }> = ({ sound, onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'LETTER',
    drop: (item: { id: string }) => onDrop(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`w-32 h-32 flex flex-col items-center justify-center rounded-xl p-4
        ${sound.matched ? 'bg-green-100' : 'bg-gray-100'}
        ${isOver ? 'ring-2 ring-primary' : ''}`}
    >
      <span className="text-4xl mb-2">{sound.image}</span>
      <span className="text-lg font-medium text-gray-700">{sound.word}</span>
    </div>
  );
};

const PhonicsGame: React.FC = () => {
  const [letters, setLetters] = useState<Letter[]>(() => {
    const saved = localStorage.getItem('phonicsLetters');
    return saved ? JSON.parse(saved) : LETTERS;
  });
  const [sounds, setSounds] = useState<Sound[]>(() => {
    const saved = localStorage.getItem('phonicsSounds');
    return saved ? JSON.parse(saved) : SOUNDS;
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [hint, setHint] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('phonicsLetters', JSON.stringify(letters));
    localStorage.setItem('phonicsSounds', JSON.stringify(sounds));
  }, [letters, sounds]);

  const handleDrop = (letterId: string, soundId: string) => {
    const letter = letters.find(l => l.id === letterId);
    const sound = sounds.find(s => s.id === soundId);
    
    if (!letter || !sound) return;

    // Check if the match is correct (first letter matches)
    const isCorrect = sound.word.toLowerCase().startsWith(letter.letter.toLowerCase());

    if (isCorrect) {
      setLetters(letters.map(l => 
        l.id === letterId ? { ...l, matched: true } : l
      ));
      setSounds(sounds.map(s => 
        s.id === soundId ? { ...s, matched: true } : s
      ));
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      // Show hint
      setHint(`Try matching ${letter.letter} with a word that starts with ${letter.letter.toLowerCase()}`);
      setTimeout(() => setHint(''), 3000);
    }
  };

  const resetGame = () => {
    setLetters(LETTERS);
    setSounds(SOUNDS);
    setHint('');
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gradient-to-b from-primary/5 to-secondary/5 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Phonics Match</h2>
            <p className="text-gray-600">Drag the letters to match the sounds!</p>
          </div>

          {/* AI Mascot */}
          <div className="flex justify-center mb-8">
            <div className="bg-white p-4 rounded-xl shadow-lg max-w-md">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-3xl">🤖</span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-700">
                    {hint || "Hi! I'm your phonics helper. Match the letters to the correct sounds!"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Game Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Letters */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-center">Letters</h3>
              <div className="flex justify-center space-x-4">
                {letters.map(letter => (
                  <DraggableLetter key={letter.id} letter={letter} />
                ))}
              </div>
            </div>

            {/* Sounds */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-center">Sounds</h3>
              <div className="grid grid-cols-2 gap-4">
                {sounds.map(sound => (
                  <SoundTarget
                    key={sound.id}
                    sound={sound}
                    onDrop={(letterId) => handleDrop(letterId, sound.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Reset Button */}
          <div className="text-center mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              className="bg-primary text-white px-6 py-3 rounded-xl font-semibold"
            >
              Reset Game
            </motion.button>
          </div>

          {/* Confetti */}
          <AnimatePresence>
            {showConfetti && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0"
              >
                <Confetti
                  width={window.innerWidth}
                  height={window.innerHeight}
                  recycle={false}
                  numberOfPieces={200}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DndProvider>
  );
};

export default PhonicsGame; 