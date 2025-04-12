import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';

interface Letter {
  id: string;
  value: string;
  matched: boolean;
}

interface Sound {
  id: string;
  word: string;
  image: string;
  matched: boolean;
}

const LETTERS: Letter[] = [
  { id: 'a', value: 'A', matched: false },
  { id: 'b', value: 'B', matched: false },
  { id: 'c', value: 'C', matched: false },
];

<<<<<<< HEAD
<<<<<<< Updated upstream
=======
>>>>>>> 0e96a6b2d40a7bc29890e95aecad7a47b77a6584
const SOUNDS: Sound[] = [
  { id: 'apple', word: 'Apple', image: '🍎', matched: false },
  { id: 'ball', word: 'Ball', image: '⚽', matched: false },
  { id: 'cat', word: 'Cat', image: '🐱', matched: false },
];

const DraggableLetter: React.FC<{ letter: Letter }> = ({ letter }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'LETTER',
    item: { id: letter.id, value: letter.value },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
<<<<<<< HEAD
=======
const SOUND_CATEGORIES: SoundCategory[] = [
  {
    id: 'single-letters',
    name: 'Single Letters',
    sounds: [
      { id: 'apple', word: 'Apple', image: '🍎', matched: false, sound: 'a' },
      { id: 'ball', word: 'Ball', image: '⚽', matched: false, sound: 'b' },
      { id: 'cat', word: 'Cat', image: '🐱', matched: false, sound: 'c' },
      { id: 'dog', word: 'Dog', image: '🐕', matched: false, sound: 'd' },
      { id: 'elephant', word: 'Elephant', image: '🐘', matched: false, sound: 'e' },
      { id: 'fish', word: 'Fish', image: '🐟', matched: false, sound: 'f' },
      { id: 'giraffe', word: 'Giraffe', image: '🦒', matched: false, sound: 'g' },
      { id: 'house', word: 'House', image: '🏠', matched: false, sound: 'h' },
      { id: 'igloo', word: 'Igloo', image: '❄️', matched: false, sound: 'i' },
      { id: 'jacket', word: 'Jacket', image: '🧥', matched: false, sound: 'j' },
      { id: 'kangaroo', word: 'Kangaroo', image: '🦘', matched: false, sound: 'k' },
      { id: 'ladder', word: 'Ladder', image: '🪜', matched: false, sound: 'l' },
      { id: 'monkey', word: 'Monkey', image: '🐒', matched: false, sound: 'm' },
      { id: 'notebook', word: 'Notebook', image: '📓', matched: false, sound: 'n' },
      { id: 'octopus', word: 'Octopus', image: '🐙', matched: false, sound: 'o' },
      { id: 'penguin', word: 'Penguin', image: '🐧', matched: false, sound: 'p' },
      { id: 'queen', word: 'Queen', image: '👑', matched: false, sound: 'q' },
      { id: 'rainbow', word: 'Rainbow', image: '🌈', matched: false, sound: 'r' },
      { id: 'sun', word: 'Sun', image: '☀️', matched: false, sound: 's' },
      { id: 'tiger', word: 'Tiger', image: '🐯', matched: false, sound: 't' },
      { id: 'umbrella', word: 'Umbrella', image: '☔', matched: false, sound: 'u' },
      { id: 'violin', word: 'Violin', image: '🎻', matched: false, sound: 'v' },
      { id: 'watermelon', word: 'Watermelon', image: '🍉', matched: false, sound: 'w' },
      { id: 'xylophone', word: 'Xylophone', image: '🎼', matched: false, sound: 'x' },
      { id: 'yacht', word: 'Yacht', image: '⛵', matched: false, sound: 'y' },
      { id: 'zebra', word: 'Zebra', image: '🦓', matched: false, sound: 'z' },
    ],
  },
  {
    id: 'digraphs',
    name: 'Digraphs',
    sounds: [
      { id: 'chair', word: 'Chair', image: '🪑', matched: false, sound: 'ch' },
      { id: 'ship', word: 'Ship', image: '🚢', matched: false, sound: 'sh' },
      { id: 'thumb', word: 'Thumb', image: '👍', matched: false, sound: 'th' },
      { id: 'phone', word: 'Phone', image: '📱', matched: false, sound: 'ph' },
      { id: 'whale', word: 'Whale', image: '🐋', matched: false, sound: 'wh' },
      { id: 'school', word: 'School', image: '🏫', matched: false, sound: 'sch' },
      { id: 'splash', word: 'Splash', image: '💦', matched: false, sound: 'spl' },
      { id: 'squirrel', word: 'Squirrel', image: '🐿️', matched: false, sound: 'squ' },
      { id: 'through', word: 'Through', image: '🚪', matched: false, sound: 'thr' },
      { id: 'strength', word: 'Strength', image: '💪', matched: false, sound: 'str' },
    ],
  },
];

const DIFFICULTY_LEVELS = {
  easy: {
    name: 'Easy',
    description: '3-4 letter words',
    categories: ['single-letters'],
    maxItems: 6
  },
  medium: {
    name: 'Medium',
    description: '4-5 letter words',
    categories: ['single-letters', 'digraphs'],
    maxItems: 6
  },
  hard: {
    name: 'Hard',
    description: 'Longer, complex words',
    categories: ['single-letters', 'digraphs'],
    maxItems: 6
  }
};
>>>>>>> Stashed changes
=======
>>>>>>> 0e96a6b2d40a7bc29890e95aecad7a47b77a6584

  return (
    <motion.div
      ref={drag}
      className={`w-16 h-16 flex items-center justify-center text-3xl font-bold rounded-xl cursor-move
        ${letter.matched ? 'bg-green-100 text-green-600' : 'bg-primary text-white'}
        ${isDragging ? 'opacity-50' : 'opacity-100'}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {letter.value}
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
    const isCorrect = sound.word.toLowerCase().startsWith(letter.value.toLowerCase());

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
      setHint(`Try matching ${letter.value} with a word that starts with ${letter.value.toLowerCase()}`);
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
    </DndProvider>
  );
};

export default PhonicsGame; 