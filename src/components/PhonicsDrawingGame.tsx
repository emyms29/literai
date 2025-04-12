import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

interface Word {
  id: string;
  word: string;
  matched: boolean;
}

const WORDS: Word[] = [
  { id: 'cat', word: 'cat', matched: false },
  { id: 'dog', word: 'dog', matched: false },
  { id: 'sun', word: 'sun', matched: false },
  { id: 'hat', word: 'hat', matched: false },
  { id: 'fish', word: 'fish', matched: false },
  { id: 'book', word: 'book', matched: false },
  { id: 'ball', word: 'ball', matched: false },
  { id: 'tree', word: 'tree', matched: false },
  { id: 'house', word: 'house', matched: false },
  { id: 'star', word: 'star', matched: false },
  { id: 'elephant', word: 'elephant', matched: false },
  { id: 'giraffe', word: 'giraffe', matched: false },
  { id: 'kangaroo', word: 'kangaroo', matched: false },
  { id: 'watermelon', word: 'watermelon', matched: false },
  { id: 'butterfly', word: 'butterfly', matched: false },
  { id: 'dinosaur', word: 'dinosaur', matched: false },
  { id: 'rainbow', word: 'rainbow', matched: false },
  { id: 'octopus', word: 'octopus', matched: false },
  { id: 'penguin', word: 'penguin', matched: false },
  { id: 'squirrel', word: 'squirrel', matched: false }
];

const DIFFICULTY_LEVELS = {
  easy: {
    name: 'Easy',
    description: '3-4 letter words',
    maxItems: 4
  },
  medium: {
    name: 'Medium',
    description: '4-5 letter words',
    maxItems: 6
  },
  hard: {
    name: 'Hard',
    description: 'Longer, complex words',
    maxItems: 6
  }
};

const PhonicsDrawingGame: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<keyof typeof DIFFICULTY_LEVELS>('easy');
  const [words, setWords] = useState<Word[]>([]);
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hint, setHint] = useState<string>('');
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawing, setDrawing] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  // Function to shuffle array
  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Function to get words for the current difficulty
  const getWordsForDifficulty = (difficulty: keyof typeof DIFFICULTY_LEVELS) => {
    const level = DIFFICULTY_LEVELS[difficulty];
    let filteredWords = WORDS;
    
    if (difficulty === 'easy') {
      filteredWords = WORDS.filter(word => word.word.length <= 4);
    } else if (difficulty === 'medium') {
      filteredWords = WORDS.filter(word => word.word.length <= 5);
    } else {
      // Hard: longer words
      filteredWords = WORDS.filter(word => word.word.length > 5);
    }
    
    const shuffledWords = shuffleArray(filteredWords);
    return shuffledWords.slice(0, level.maxItems);
  };

  // Initialize game with selected difficulty
  useEffect(() => {
    const newWords = getWordsForDifficulty(selectedDifficulty);
    setWords(newWords);
    setCurrentWord(newWords[0]);
  }, [selectedDifficulty]);

  // Timer effect
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  // Drawing setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Set drawing styles
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    const getMousePos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      
      if (e instanceof MouseEvent) {
        return {
          x: (e.clientX - rect.left) * scaleX,
          y: (e.clientY - rect.top) * scaleY
        };
      } else {
        return {
          x: (e.touches[0].clientX - rect.left) * scaleX,
          y: (e.touches[0].clientY - rect.top) * scaleY
        };
      }
    };

    const startDrawing = (e: MouseEvent | TouchEvent) => {
      isDrawing = true;
      const pos = getMousePos(e);
      lastX = pos.x;
      lastY = pos.y;
    };

    const draw = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      const pos = getMousePos(e);

      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();

      lastX = pos.x;
      lastY = pos.y;
    };

    const stopDrawing = () => {
      isDrawing = false;
    };

    // Mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Touch events
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', draw);
      canvas.removeEventListener('touchend', stopDrawing);
    };
  }, []);

  const validateDrawing = async (canvas: HTMLCanvasElement, targetWord: string): Promise<boolean> => {
    try {
      // Convert canvas to base64 image
      const imageData = canvas.toDataURL('image/png').split(',')[1];
      
      // Call your backend API endpoint that uses Google Cloud Vision
      const response = await fetch('/api/validate-drawing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: imageData,
          targetWord: targetWord.toLowerCase()
        })
      });

      const result = await response.json();
      return result.isValid;
    } catch (error) {
      console.error('Error validating drawing:', error);
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!currentWord) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check if there's any drawing on the canvas
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const hasDrawing = imageData.data.some(pixel => pixel !== 0);

    if (!hasDrawing) {
      setHint('Please draw something before submitting!');
      setTimeout(() => setHint(''), 3000);
      return;
    }

    // Show loading state
    setHint('Validating your drawing...');

    // Validate the drawing
    const isValid = await validateDrawing(canvas, currentWord.word);

    if (isValid) {
      setWords(words.map(w => 
        w.id === currentWord.id ? { ...w, matched: true } : w
      ));

      const nextWord = words.find(w => !w.matched && w.id !== currentWord.id);
      if (nextWord) {
        setCurrentWord(nextWord);
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setHint('Great job! Draw the next word.');
      } else {
        // Game complete
        setIsRunning(false);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);

        // Update best time
        if (bestTime === null || time < bestTime) {
          setBestTime(time);
          localStorage.setItem('phonicsDrawingBestTime', time.toString());
        }
      }
    } else {
      setHint('Try again! Your drawing doesn\'t match the word.');
      setTimeout(() => setHint(''), 3000);
    }
  };

  const handleDifficultyChange = (difficulty: keyof typeof DIFFICULTY_LEVELS) => {
    setSelectedDifficulty(difficulty);
    resetGame();
  };

  const resetGame = () => {
    const newWords = getWordsForDifficulty(selectedDifficulty);
    setWords(newWords);
    setCurrentWord(newWords[0]);
    setHint('');
    setTime(0);
    setIsRunning(false);
    
    // Clear canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-secondary/5 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-4">
          {/* Left Column - Game Info */}
          <div className="col-span-3 space-y-4">
            {/* Title */}
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Phonics Drawing</h2>
              <p className="text-sm text-gray-600">Draw the word you see!</p>
            </div>

            {/* Difficulty Selection */}
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <h3 className="text-sm font-semibold mb-2">Select Difficulty</h3>
              <div className="flex flex-col gap-2">
                {Object.entries(DIFFICULTY_LEVELS).map(([key, level]) => (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDifficultyChange(key as keyof typeof DIFFICULTY_LEVELS)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium ${
                      selectedDifficulty === key
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {level.name}
                    <span className="block text-xs opacity-75">{level.description}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Timer and Best Time */}
            <div className="space-y-2">
              <div className="bg-white p-3 rounded-xl shadow-lg">
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Current Time</h3>
                <p className="text-xl font-bold text-primary">{formatTime(time)}</p>
              </div>
              {bestTime !== null && (
                <div className="bg-white p-3 rounded-xl shadow-lg">
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">Best Time</h3>
                  <p className="text-xl font-bold text-green-600">{formatTime(bestTime)}</p>
                </div>
              )}
            </div>

            {/* AI Mascot */}
            <div className="bg-white p-3 rounded-xl shadow-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <span className="text-xl">🤖</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">
                    {hint || "Draw the word you see above!"}
                  </p>
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={resetGame}
              className="w-full bg-primary text-white px-4 py-2 rounded-xl font-medium text-sm"
            >
              Reset Game
            </motion.button>
          </div>

          {/* Right Column - Game Area */}
          <div className="col-span-9">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              {/* Current Word */}
              {currentWord && (
                <div className="text-center mb-6">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{currentWord.word}</h3>
                </div>
              )}

              {/* Drawing Canvas */}
              <div className="mb-6">
                <canvas
                  ref={canvasRef}
                  className="w-full h-64 border-2 border-gray-200 rounded-lg bg-white"
                />
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  className="bg-primary text-white px-6 py-3 rounded-xl font-semibold"
                >
                  Submit Drawing
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          gravity={0.2}
          wind={0.01}
        />
      )}
    </div>
  );
};

export default PhonicsDrawingGame; 