import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';

interface Word {
  id: string;
  word: string;
  selected: boolean;
  matched: boolean;
}

interface Emoji {
  id: string;
  emoji: string;
  matched: boolean;
  wordId: string;
  difficulty: number; // 1: easy, 2: medium, 3: hard
}

const WORDS: Word[] = [
  // Easy words (3-4 letters)
  { id: 'cat', word: 'Cat', selected: true, matched: false },
  { id: 'dog', word: 'Dog', selected: true, matched: false },
  { id: 'fish', word: 'Fish', selected: true, matched: false },
  { id: 'hat', word: 'Hat', selected: true, matched: false },
  { id: 'jet', word: 'Jet', selected: true, matched: false },
  { id: 'key', word: 'Key', selected: true, matched: false },
  { id: 'leg', word: 'Leg', selected: true, matched: false },
  { id: 'net', word: 'Net', selected: true, matched: false },
  { id: 'pig', word: 'Pig', selected: true, matched: false },
  { id: 'rat', word: 'Rat', selected: true, matched: false },
  { id: 'sun', word: 'Sun', selected: true, matched: false },
  { id: 'target', word: 'Target', selected: true, matched: false },
  { id: 'van', word: 'Van', selected: true, matched: false },
  { id: 'web', word: 'Web', selected: true, matched: false },
  { id: 'yarn', word: 'Yarn', selected: true, matched: false },
  { id: 'elephant', word: 'Elephant', selected: true, matched: false },

  // Medium words (5-6 letters)
  { id: 'apple', word: 'Apple', selected: true, matched: false },
  { id: 'beach', word: 'Beach', selected: true, matched: false },
  { id: 'crown', word: 'Crown', selected: true, matched: false },
  { id: 'dress', word: 'Dress', selected: true, matched: false },
  { id: 'eagle', word: 'Eagle', selected: true, matched: false },
  { id: 'fence', word: 'Fence', selected: true, matched: false },
  { id: 'ghost', word: 'Ghost', selected: true, matched: false },
  { id: 'house', word: 'House', selected: true, matched: false },
  { id: 'snow', word: 'Snow', selected: true, matched: false },
  { id: 'juice', word: 'Juice', selected: true, matched: false },
  { id: 'kite', word: 'Kite', selected: true, matched: false },
  { id: 'lemon', word: 'Lemon', selected: true, matched: false },
  { id: 'mouse', word: 'Mouse', selected: true, matched: false },
  { id: 'night', word: 'Night', selected: true, matched: false },
  { id: 'ocean', word: 'Ocean', selected: true, matched: false },
  { id: 'piano', word: 'Piano', selected: true, matched: false },
  { id: 'queen', word: 'Queen', selected: true, matched: false },
  { id: 'robot', word: 'Robot', selected: true, matched: false },
  { id: 'snake', word: 'Snake', selected: true, matched: false },
  { id: 'tiger', word: 'Tiger', selected: true, matched: false },
  { id: 'umbrella', word: 'Umbrella', selected: true, matched: false },
  { id: 'violin', word: 'Violin', selected: true, matched: false },
  { id: 'whale', word: 'Whale', selected: true, matched: false },
  { id: 'xylophone', word: 'Xylophone', selected: true, matched: false },
  { id: 'yacht', word: 'Yacht', selected: true, matched: false },
  { id: 'zebra', word: 'Zebra', selected: true, matched: false },

  // Hard words (7+ letters)
  { id: 'airplane', word: 'Airplane', selected: true, matched: false },
  { id: 'butterfly', word: 'Butterfly', selected: true, matched: false },
  { id: 'crocodile', word: 'Crocodile', selected: true, matched: false },
  { id: 'dinosaur', word: 'Dinosaur', selected: true, matched: false },
  { id: 'firetruck', word: 'Firetruck', selected: true, matched: false },
  { id: 'giraffe', word: 'Giraffe', selected: true, matched: false },
  { id: 'helicopter', word: 'Helicopter', selected: true, matched: false },
  { id: 'icecream', word: 'Ice Cream', selected: true, matched: false },
  { id: 'jellyfish', word: 'Jellyfish', selected: true, matched: false },
  { id: 'kangaroo', word: 'Kangaroo', selected: true, matched: false },
  { id: 'lighthouse', word: 'Lighthouse', selected: true, matched: false },
  { id: 'mushroom', word: 'Mushroom', selected: true, matched: false },
  { id: 'notebook', word: 'Notebook', selected: true, matched: false },
  { id: 'octopus', word: 'Octopus', selected: true, matched: false },
  { id: 'penguin', word: 'Penguin', selected: true, matched: false },
  { id: 'question', word: 'Question', selected: true, matched: false },
  { id: 'rainbow', word: 'Rainbow', selected: true, matched: false },
  { id: 'scissors', word: 'Scissors', selected: true, matched: false },
  { id: 'telescope', word: 'Telescope', selected: true, matched: false },
  { id: 'unicycle', word: 'Unicycle', selected: true, matched: false },
  { id: 'volcano', word: 'Volcano', selected: true, matched: false },
  { id: 'watermelon', word: 'Watermelon', selected: true, matched: false },
  { id: 'xylophone', word: 'Xylophone', selected: true, matched: false },
  { id: 'yogurt', word: 'Yogurt', selected: true, matched: false },
  { id: 'zucchini', word: 'Zucchini', selected: true, matched: false }
];

const EMOJIS: Emoji[] = [
  // Easy words (3-4 letters)
  { id: 'cat', emoji: '🐱', matched: false, wordId: 'cat', difficulty: 1 },
  { id: 'dog', emoji: '🐕', matched: false, wordId: 'dog', difficulty: 1 },
  { id: 'fish', emoji: '🐟', matched: false, wordId: 'fish', difficulty: 1 },
  { id: 'hat', emoji: '🧢', matched: false, wordId: 'hat', difficulty: 1 },
  { id: 'jet', emoji: '✈️', matched: false, wordId: 'jet', difficulty: 1 },
  { id: 'key', emoji: '🔑', matched: false, wordId: 'key', difficulty: 1 },
  { id: 'leg', emoji: '🦵', matched: false, wordId: 'leg', difficulty: 1 },
  { id: 'net', emoji: '🏐', matched: false, wordId: 'net', difficulty: 1 },
  { id: 'pig', emoji: '🐷', matched: false, wordId: 'pig', difficulty: 1 },
  { id: 'rat', emoji: '🐀', matched: false, wordId: 'rat', difficulty: 1 },
  { id: 'sun', emoji: '☀️', matched: false, wordId: 'sun', difficulty: 1 },
  { id: 'target', emoji: '🎯', matched: false, wordId: 'target', difficulty: 1 },
  { id: 'van', emoji: '🚐', matched: false, wordId: 'van', difficulty: 1 },
  { id: 'web', emoji: '🕸️', matched: false, wordId: 'web', difficulty: 1 },
  { id: 'yarn', emoji: '🧶', matched: false, wordId: 'yarn', difficulty: 1 },
  { id: 'elephant', emoji: '🐘', matched: false, wordId: 'elephant', difficulty: 1 },

  // Medium words (5-6 letters)
  { id: 'apple', emoji: '🍎', matched: false, wordId: 'apple', difficulty: 2 },
  { id: 'beach', emoji: '🏖️', matched: false, wordId: 'beach', difficulty: 2 },
  { id: 'crown', emoji: '👑', matched: false, wordId: 'crown', difficulty: 2 },
  { id: 'dress', emoji: '👗', matched: false, wordId: 'dress', difficulty: 2 },
  { id: 'eagle', emoji: '🦅', matched: false, wordId: 'eagle', difficulty: 2 },
  { id: 'fence', emoji: '🌳', matched: false, wordId: 'fence', difficulty: 2 },
  { id: 'ghost', emoji: '👻', matched: false, wordId: 'ghost', difficulty: 2 },
  { id: 'house', emoji: '🏠', matched: false, wordId: 'house', difficulty: 2 },
  { id: 'snow', emoji: '❄️', matched: false, wordId: 'snow', difficulty: 2 },
  { id: 'juice', emoji: '🧃', matched: false, wordId: 'juice', difficulty: 2 },
  { id: 'kite', emoji: '🪁', matched: false, wordId: 'kite', difficulty: 2 },
  { id: 'lemon', emoji: '🍋', matched: false, wordId: 'lemon', difficulty: 2 },
  { id: 'mouse', emoji: '🐭', matched: false, wordId: 'mouse', difficulty: 2 },
  { id: 'night', emoji: '🌙', matched: false, wordId: 'night', difficulty: 2 },
  { id: 'ocean', emoji: '🌊', matched: false, wordId: 'ocean', difficulty: 2 },
  { id: 'piano', emoji: '🎹', matched: false, wordId: 'piano', difficulty: 2 },
  { id: 'queen', emoji: '👸', matched: false, wordId: 'queen', difficulty: 2 },
  { id: 'robot', emoji: '🤖', matched: false, wordId: 'robot', difficulty: 2 },
  { id: 'snake', emoji: '🐍', matched: false, wordId: 'snake', difficulty: 2 },
  { id: 'tiger', emoji: '🐯', matched: false, wordId: 'tiger', difficulty: 2 },
  { id: 'umbrella', emoji: '☔', matched: false, wordId: 'umbrella', difficulty: 2 },
  { id: 'violin', emoji: '🎻', matched: false, wordId: 'violin', difficulty: 2 },
  { id: 'whale', emoji: '🐋', matched: false, wordId: 'whale', difficulty: 2 },
  { id: 'xylophone', emoji: '🎼', matched: false, wordId: 'xylophone', difficulty: 2 },
  { id: 'yacht', emoji: '⛵', matched: false, wordId: 'yacht', difficulty: 2 },
  { id: 'zebra', emoji: '🦓', matched: false, wordId: 'zebra', difficulty: 2 },

  // Hard words (7+ letters)
  { id: 'airplane', emoji: '✈️', matched: false, wordId: 'airplane', difficulty: 3 },
  { id: 'butterfly', emoji: '🦋', matched: false, wordId: 'butterfly', difficulty: 3 },
  { id: 'crocodile', emoji: '🐊', matched: false, wordId: 'crocodile', difficulty: 3 },
  { id: 'dinosaur', emoji: '🦖', matched: false, wordId: 'dinosaur', difficulty: 3 },
  { id: 'firetruck', emoji: '🚒', matched: false, wordId: 'firetruck', difficulty: 3 },
  { id: 'giraffe', emoji: '🦒', matched: false, wordId: 'giraffe', difficulty: 3 },
  { id: 'helicopter', emoji: '🚁', matched: false, wordId: 'helicopter', difficulty: 3 },
  { id: 'icecream', emoji: '🍦', matched: false, wordId: 'icecream', difficulty: 3 },
  { id: 'jellyfish', emoji: '🎐', matched: false, wordId: 'jellyfish', difficulty: 3 },
  { id: 'kangaroo', emoji: '🦘', matched: false, wordId: 'kangaroo', difficulty: 3 },
  { id: 'lighthouse', emoji: '🗼', matched: false, wordId: 'lighthouse', difficulty: 3 },
  { id: 'mushroom', emoji: '🍄', matched: false, wordId: 'mushroom', difficulty: 3 },
  { id: 'notebook', emoji: '📓', matched: false, wordId: 'notebook', difficulty: 3 },
  { id: 'octopus', emoji: '🐙', matched: false, wordId: 'octopus', difficulty: 3 },
  { id: 'penguin', emoji: '🐧', matched: false, wordId: 'penguin', difficulty: 3 },
  { id: 'question', emoji: '❓', matched: false, wordId: 'question', difficulty: 3 },
  { id: 'rainbow', emoji: '🌈', matched: false, wordId: 'rainbow', difficulty: 3 },
  { id: 'scissors', emoji: '✂️', matched: false, wordId: 'scissors', difficulty: 3 },
  { id: 'telescope', emoji: '🔭', matched: false, wordId: 'telescope', difficulty: 3 },
  { id: 'unicycle', emoji: '🚲', matched: false, wordId: 'unicycle', difficulty: 3 },
  { id: 'volcano', emoji: '🌋', matched: false, wordId: 'volcano', difficulty: 3 },
  { id: 'watermelon', emoji: '🍉', matched: false, wordId: 'watermelon', difficulty: 3 },
  { id: 'yogurt', emoji: '🥛', matched: false, wordId: 'yogurt', difficulty: 3 },
  { id: 'zucchini', emoji: '🥒', matched: false, wordId: 'zucchini', difficulty: 3 }
];

// Move shuffleArray function here, before the component
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  const length = newArray.length;
  
  // Use a combination of Fisher-Yates and random swaps
  for (let i = length - 1; i > 0; i--) {
    // Get a random index from the remaining elements
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  // Additional random swaps for better distribution
  for (let i = 0; i < length; i++) {
    const j = Math.floor(Math.random() * length);
    const k = Math.floor(Math.random() * length);
    [newArray[j], newArray[k]] = [newArray[k], newArray[j]];
  }

  return newArray;
};

const PhonicsGame: React.FC = () => {
  const [words, setWords] = useState<Word[]>(WORDS);
  const [emojis, setEmojis] = useState<Emoji[]>(EMOJIS);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hint, setHint] = useState<string>('');
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(300);
  const [gameStarted, setGameStarted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [difficulty, setDifficulty] = useState<number>(1);
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [roundsPerLevel, setRoundsPerLevel] = useState<number>(3);
  const [gameStats, setGameStats] = useState<{word: string, attempts: number}[]>([]);

  // Filter words and emojis based on difficulty and ensure they match
  const getCurrentRoundItems = () => {
    // First, get all words for the current difficulty
    const filteredWords = WORDS.filter(word => {
      const wordLength = word.id.length;
      return (difficulty === 1 && wordLength <= 4) ||
             (difficulty === 2 && wordLength > 4 && wordLength <= 6) ||
             (difficulty === 3 && wordLength > 6);
    });

    // Get the slice of words for the current round (4 words per round)
    const roundWords = filteredWords.slice(
      currentRound * 4,
      (currentRound + 1) * 4
    );

    // Get the corresponding emojis for these words
    const roundEmojis = EMOJIS.filter(emoji => 
      roundWords.some(word => word.id === emoji.wordId)
    );

    return {
      words: roundWords,
      emojis: roundEmojis
    };
  };

  // Update emojis when round changes
  useEffect(() => {
    if (gameStarted) {
      const { emojis: newEmojis } = getCurrentRoundItems();
      setEmojis(shuffleArray([...newEmojis]));
    }
  }, [currentRound, difficulty, gameStarted]);

  const { words: currentRoundWords, emojis: currentRoundEmojis } = getCurrentRoundItems();

  useEffect(() => {
    localStorage.setItem('phonicsWords', JSON.stringify(words));
    localStorage.setItem('phonicsEmojis', JSON.stringify(emojis));
  }, [words, emojis]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, timeLeft]);

  const handleWordClick = (wordId: string) => {
    setSelectedWord(wordId);
    setIsError(false);
  };

  const handleEmojiClick = (emojiId: string) => {
    if (!selectedWord) return;

    const word = currentRoundWords.find(w => w.id === selectedWord);
    const emoji = currentRoundEmojis.find(e => e.id === emojiId);
    
    if (!word || !emoji) return;

    const isCorrect = emoji.wordId === word.id;

    // Update game stats
    setGameStats(prev => {
      const existingStat = prev.find(stat => stat.word === word.word);
      if (existingStat) {
        return prev.map(stat => 
          stat.word === word.word ? { ...stat, attempts: stat.attempts + 1 } : stat
        );
      }
      return [...prev, { word: word.word, attempts: 1 }];
    });

    if (isCorrect) {
      // Update both words and emojis state to mark them as matched
      setWords(prevWords => prevWords.map(w => 
        w.id === selectedWord ? { ...w, matched: true } : w
      ));
      setEmojis(prevEmojis => prevEmojis.map(e => 
        e.id === emojiId ? { ...e, matched: true } : e
      ));
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      setSelectedWord(null);

      // Check if all items in current round are matched
      const allMatchedInRound = currentRoundWords.every(word => 
        words.find(w => w.id === word.id)?.matched
      );

      if (allMatchedInRound) {
        if (currentRound < roundsPerLevel - 1) {
          setCurrentRound(prev => prev + 1);
          setWords(WORDS.map(word => ({ ...word, matched: false })));
          setSelectedWord(null);
          setTimeLeft(300);
        } else {
          // Game completed
          setGameStarted(false);
        }
      }
    } else {
      setIsError(true);
      setHint(`Try matching "${word.word}" with its correct emoji`);
      setTimeout(() => {
        setHint('');
        setIsError(false);
      }, 2000);
    }
  };

  const resetGame = () => {
    setWords(WORDS.map(word => ({ ...word, matched: false })));
    setEmojis(EMOJIS.map(emoji => ({ ...emoji, matched: false })));
    setHint('');
    setSelectedWord(null);
    setTimeLeft(300);
    setGameStarted(false);
    setIsError(false);
    setDifficulty(1);
    setCurrentRound(0);
  };

  const startGame = () => {
    setGameStarted(true);
    setTimeLeft(300);
    setGameStats([]);
    setCurrentRound(0);
    setWords(WORDS.map(word => ({ ...word, matched: false })));
    const { emojis: newEmojis } = getCurrentRoundItems();
    setEmojis(shuffleArray([...newEmojis]));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyText = () => {
    switch (difficulty) {
      case 1: return 'Easy (3-4 letters)';
      case 2: return 'Medium (5-6 letters)';
      case 3: return 'Hard (7+ letters)';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-secondary/5 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Word Match</h2>
          <p className="text-gray-600">Click a word, then click the matching emoji!</p>
        </div>

        {/* Timer and Controls */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-bold">
            Time: {formatTime(timeLeft)}
          </div>
          <div className="flex gap-2">
            {!gameStarted ? (
              <div className="flex gap-2">
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(Number(e.target.value))}
                  className="border rounded-lg px-3 py-2"
                >
                  <option value={1}>Easy</option>
                  <option value={2}>Medium</option>
                  <option value={3}>Hard</option>
                </select>
                <button
                  onClick={startGame}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  Start Game
                </button>
              </div>
            ) : (
              <button
                onClick={resetGame}
                className="bg-primary text-white px-4 py-2 rounded-lg"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Level and Round Info */}
        {gameStarted && (
          <div className="text-center mb-4">
            <p className="text-lg font-semibold">
              Level {difficulty}: {getDifficultyText()} - Round {currentRound + 1}/{roundsPerLevel}
            </p>
          </div>
        )}

        {/* AI Mascot */}
        <div className={`bg-white p-3 rounded-lg shadow mb-4 transition-colors duration-300 ${isError ? 'bg-red-100' : ''}`}>
          <div className="flex items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-3 transition-colors duration-300 ${isError ? 'bg-red-200' : 'bg-primary/10'}`}>
              <span className="text-2xl">🤖</span>
            </div>
            <p className="text-gray-700">
              {hint || "Hi! I'm your word helper. Click a word, then find the matching emoji!"}
            </p>
          </div>
        </div>

        {/* Game Area */}
        <div className="grid grid-cols-1 gap-4">
          {/* Words */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Words</h3>
            <div className="flex flex-wrap gap-2">
              {currentRoundWords.map(word => {
                const wordState = words.find(w => w.id === word.id);
                return !wordState?.matched && (
                  <motion.button
                    key={word.id}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleWordClick(word.id)}
                    className={`px-4 py-2 flex items-center justify-center text-lg font-bold rounded-lg cursor-pointer
                      ${selectedWord === word.id ? 'ring-2 ring-primary bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}
                  >
                    {word.word}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Emojis */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Emojis</h3>
            <div className="grid grid-cols-4 gap-2">
              {emojis
                .filter(emoji => currentRoundEmojis.some(e => e.id === emoji.id) && !emoji.matched)
                .map(emoji => (
                  <motion.button
                    key={emoji.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEmojiClick(emoji.id)}
                    className={`flex items-center justify-center p-4 rounded-lg text-3xl
                      ${selectedWord ? 'cursor-pointer bg-gray-100 hover:bg-gray-200' : 'cursor-not-allowed bg-gray-50'}`}
                    disabled={!selectedWord}
                  >
                    {emoji.emoji}
                  </motion.button>
                ))}
            </div>
          </div>
        </div>

        {/* Confetti */}
        <AnimatePresence>
          {showConfetti && (
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              recycle={false}
              numberOfPieces={200}
            />
          )}
        </AnimatePresence>

        {/* Victory Message */}
        {currentRoundWords.every(word => words.find(w => w.id === word.id)?.matched) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              className="bg-white p-8 rounded-lg text-center max-w-md w-full mx-4 shadow-xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>
              <h2 className="text-3xl font-bold text-primary mb-2">Great Job!</h2>
              <p className="text-xl text-gray-700 mb-4">
                {currentRound === roundsPerLevel - 1 
                  ? "You've completed all rounds!" 
                  : `You've completed round ${currentRound + 1}!`}
              </p>
              {currentRound === roundsPerLevel - 1 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Practice Summary</h3>
                  <div className="space-y-2">
                    {gameStats
                      .sort((a, b) => b.attempts - a.attempts)
                      .slice(0, 5)
                      .map((stat, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-gray-700">{stat.word}</span>
                          <span className="text-gray-500">Attempts: {stat.attempts}</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
              <div className="space-y-2 mb-6">
                <p className="text-gray-600">⭐ Matched all words and emojis</p>
                <p className="text-gray-600">⭐ Time remaining: {formatTime(timeLeft)}</p>
              </div>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    if (currentRound < roundsPerLevel - 1) {
                      setCurrentRound(prev => prev + 1);
                      setWords(WORDS.map(word => ({ ...word, matched: false })));
                      setSelectedWord(null);
                      setTimeLeft(300);
                    } else {
                      // Reset all game state
                      setGameStarted(false);
                      setCurrentRound(0);
                      setWords(WORDS.map(word => ({ ...word, matched: false })));
                      setEmojis(EMOJIS.map(emoji => ({ ...emoji, matched: false })));
                      setSelectedWord(null);
                      setTimeLeft(300);
                      setGameStats([]);
                    }
                  }}
                  className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  {currentRound === roundsPerLevel - 1 ? "Play Again" : "Next Round"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PhonicsGame; 
