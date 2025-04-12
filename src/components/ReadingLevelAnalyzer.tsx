import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { analyzeText } from '../utils/textAnalysis';
import { AnalysisResult } from '../types/textAnalysis';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
  isSubmitted?: boolean;
}

interface Passage {
  id: number;
  title: string;
  text: string;
  lexileLevel: number;
  questions: Question[];
  source: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const SAMPLE_PASSAGES: Passage[] = [
  {
    id: 1,
    title: "The Water Cycle",
    text: "Water is essential for all life on Earth. It moves in a continuous cycle between the air, ground, and living things. When the sun heats water in oceans, lakes, and rivers, it turns into water vapor. This process is called evaporation. The water vapor rises into the air and forms clouds. When the clouds become heavy with water, the water falls back to Earth as rain or snow. This is called precipitation. Some of this water soaks into the ground, where it is stored in underground reservoirs called aquifers. Plants absorb water from the soil through their roots. The cycle then begins again.",
    lexileLevel: 650,
    difficulty: 'beginner',
    questions: [
      {
        id: 1,
        text: "What happens when the sun heats water in oceans, lakes, and rivers?",
        options: [
          "It forms clouds immediately",
          "It turns into water vapor",
          "It falls as rain",
          "It creates aquifers"
        ],
        correctAnswer: "It turns into water vapor"
      },
      {
        id: 2,
        text: "What are underground water reservoirs called?",
        options: [
          "Precipitation",
          "Evaporation",
          "Aquifers",
          "Vapor chambers"
        ],
        correctAnswer: "Aquifers"
      },
      {
        id: 3,
        text: "How do plants get water from the soil?",
        options: [
          "Through their leaves",
          "Through evaporation",
          "Through their roots",
          "Through precipitation"
        ],
        correctAnswer: "Through their roots"
      }
    ],
    source: "Adapted from Common Core Reading Passages"
  },
  {
    id: 2,
    title: "The First Flight",
    text: "On December 17, 1903, Orville and Wilbur Wright made history. Their powered aircraft, the Wright Flyer, successfully took off from the ground and flew for 12 seconds. This flight, covering 120 feet, was the first controlled, sustained flight of a powered aircraft. The Wright brothers chose Kitty Hawk, North Carolina, for their experiments because of its steady winds and soft, sandy landing surface. They had spent years studying birds and developing their aircraft design. Their success came from their systematic approach to solving the problems of flight: lift, power, and control. This achievement opened the door to modern aviation.",
    lexileLevel: 850,
    difficulty: 'intermediate',
    questions: [
      {
        id: 1,
        text: "How long was the Wright Flyer's first successful flight?",
        options: [
          "120 seconds",
          "12 seconds",
          "17 seconds",
          "1903 seconds"
        ],
        correctAnswer: "12 seconds"
      },
      {
        id: 2,
        text: "Why did the Wright brothers choose Kitty Hawk for their experiments?",
        options: [
          "Because it was close to their home",
          "Because it had steady winds and soft, sandy landing surface",
          "Because it was the only place they were allowed to fly",
          "Because it was always sunny there"
        ],
        correctAnswer: "Because it had steady winds and soft, sandy landing surface"
      },
      {
        id: 3,
        text: "What were the three problems of flight the Wright brothers needed to solve?",
        options: [
          "Speed, height, and distance",
          "Lift, power, and control",
          "Wind, weather, and terrain",
          "Design, testing, and landing"
        ],
        correctAnswer: "Lift, power, and control"
      }
    ],
    source: "Adapted from Historical Reading Comprehension Passages"
  },
  {
    id: 3,
    title: "The Human Brain",
    text: "The human brain is an extraordinarily complex organ that serves as the control center for the entire body. Comprising approximately 86 billion neurons, it processes vast amounts of information simultaneously. The brain's cerebral cortex, its outermost layer, is responsible for higher-order thinking, including reasoning, language processing, and decision-making. Different regions of the brain specialize in specific functions: the frontal lobe manages executive functions and personality, the temporal lobe processes auditory information and memories, the parietal lobe integrates sensory information, and the occipital lobe handles visual processing. The brain's remarkable plasticity allows it to form new neural connections throughout life, enabling continuous learning and adaptation.",
    lexileLevel: 1050,
    difficulty: 'advanced',
    questions: [
      {
        id: 1,
        text: "What is the primary function of the cerebral cortex?",
        options: [
          "Processing visual information",
          "Managing personality traits",
          "Higher-order thinking and reasoning",
          "Storing memories"
        ],
        correctAnswer: "Higher-order thinking and reasoning"
      },
      {
        id: 2,
        text: "Approximately how many neurons are in the human brain?",
        options: [
          "86 million",
          "86 billion",
          "860 million",
          "8.6 billion"
        ],
        correctAnswer: "86 billion"
      },
      {
        id: 3,
        text: "What characteristic of the brain enables continuous learning?",
        options: [
          "The number of neurons",
          "The cerebral cortex",
          "Neural plasticity",
          "The frontal lobe"
        ],
        correctAnswer: "Neural plasticity"
      }
    ],
    source: "Adapted from Scientific Reading Comprehension Passages"
  }
];

const DIFFICULTY_LEVELS = [
  {
    id: 'beginner',
    label: 'Beginner',
    description: 'Lexile Level: 600-750',
    color: 'bg-green-100 text-green-800'
  },
  {
    id: 'intermediate',
    label: 'Intermediate',
    description: 'Lexile Level: 750-950',
    color: 'bg-blue-100 text-blue-800'
  },
  {
    id: 'advanced',
    label: 'Advanced',
    description: 'Lexile Level: 950+',
    color: 'bg-purple-100 text-purple-800'
  }
];

const ReadingLevelAnalyzer: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('beginner');
  const [selectedPassage, setSelectedPassage] = useState<Passage | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [questionStatus, setQuestionStatus] = useState<{ [key: number]: boolean }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generatePassage = () => {
    setIsLoading(true);
    setError(null);

    try {
      // Get passages for the selected difficulty
      const difficultyPassages = SAMPLE_PASSAGES.filter(
        passage => passage.difficulty === selectedDifficulty
      );

      if (difficultyPassages.length === 0) {
        throw new Error('No passages available for this difficulty level');
      }

      // Randomly select a passage
      const randomIndex = Math.floor(Math.random() * difficultyPassages.length);
      const newPassage = difficultyPassages[randomIndex];

      handlePassageSelect(newPassage);
    } catch (err) {
      setError('Failed to generate passage. Please try again.');
      console.error('Error generating passage:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDifficultySelect = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
    setSelectedPassage(null);
    setUserAnswers({});
    setQuestionStatus({});
  };

  const handlePassageSelect = (passage: Passage) => {
    setSelectedPassage(passage);
    setUserAnswers({});
    setQuestionStatus({});
  };

  const handleAnswerSelect = (questionId: number, answer: string) => {
    if (!questionStatus[questionId]) {
      setUserAnswers(prev => ({
        ...prev,
        [questionId]: answer
      }));
    }
  };

  const handleQuestionSubmit = (questionId: number) => {
    setQuestionStatus(prev => ({
      ...prev,
      [questionId]: true
    }));
  };

  const handleTryAgain = (questionId: number) => {
    setQuestionStatus(prev => ({
      ...prev,
      [questionId]: false
    }));
    setUserAnswers(prev => {
      const newAnswers = { ...prev };
      delete newAnswers[questionId];
      return newAnswers;
    });
  };

  const filteredPassages = SAMPLE_PASSAGES.filter(p => p.difficulty === selectedDifficulty);

  const chartData = {
    labels: ['Lexile Score', 'Remaining'],
    datasets: [
      {
        data: selectedPassage ? [selectedPassage.lexileLevel, 2000 - selectedPassage.lexileLevel] : [0, 2000],
        backgroundColor: ['#4F46E5', '#E5E7EB'],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Difficulty Selection */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Select Difficulty Level</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DIFFICULTY_LEVELS.map(level => (
            <motion.button
              key={level.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleDifficultySelect(level.id)}
              className={`p-4 rounded-xl text-left transition-colors ${
                selectedDifficulty === level.id
                  ? level.color
                  : 'bg-white hover:bg-gray-50'
              }`}
            >
              <h3 className="font-semibold mb-1">{level.label}</h3>
              <p className="text-sm opacity-80">{level.description}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Generate Passage Button */}
      {!selectedPassage && (
        <div className="mb-8 text-center">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
            onClick={generatePassage}
            disabled={isLoading}
            className={`px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors text-lg ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
          <span className="flex items-center justify-center">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="inline-block w-6 h-6 border-2 border-white border-t-transparent rounded-full mr-2"
            />
                Generating...
          </span>
        ) : (
              'Generate Passage'
        )}
      </motion.button>
      {error && (
            <p className="mt-4 text-red-600">{error}</p>
          )}
        </div>
      )}

      {/* Selected Passage */}
      {selectedPassage && (
        <div className="mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
            <h3 className="text-xl font-semibold mb-4">{selectedPassage.title}</h3>
            <p className="text-gray-700 leading-relaxed mb-4">{selectedPassage.text}</p>
            <p className="text-sm text-gray-500">{selectedPassage.source}</p>
          </div>

          {/* Comprehension Questions */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Comprehension Questions</h3>
            {selectedPassage.questions.map(question => (
              <div key={question.id} className="bg-white rounded-xl p-6 shadow-lg">
                <p className="font-medium mb-4">{question.text}</p>
                <div className="space-y-2">
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(question.id, option)}
                      disabled={questionStatus[question.id]}
                      className={`w-full p-3 rounded-lg text-left transition-colors ${
                        userAnswers[question.id] === option
                          ? 'bg-primary text-white'
                          : 'bg-gray-50 hover:bg-gray-100'
                      } ${
                        questionStatus[question.id] && userAnswers[question.id] === question.correctAnswer
                          ? option === question.correctAnswer
                            ? 'border-2 border-green-500'
                            : userAnswers[question.id] === option
                            ? 'border-2 border-red-500'
                            : ''
                          : ''
                      } disabled:opacity-75`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <div className="mt-4 flex justify-between items-center">
                  {!questionStatus[question.id] && userAnswers[question.id] && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleQuestionSubmit(question.id)}
                      className="px-4 py-2 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors"
                    >
                      Check Answer
                    </motion.button>
                  )}
                  {questionStatus[question.id] && (
                    <div className="flex items-center gap-4">
                      <p className={`text-sm ${
                        userAnswers[question.id] === question.correctAnswer
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}>
                        {userAnswers[question.id] === question.correctAnswer
                          ? 'Correct!'
                          : 'Incorrect. Try again!'}
                      </p>
                      {userAnswers[question.id] !== question.correctAnswer && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleTryAgain(question.id)}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                        >
                          Try Again
                        </motion.button>
                      )}
              </div>
                  )}
                </div>
              </div>
            ))}
                </div>

          {/* Generate New Passage Button */}
          <div className="mt-8 text-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={generatePassage}
              disabled={isLoading}
              className={`px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors text-lg ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="inline-block w-6 h-6 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                  Generating...
                </span>
              ) : (
                'Generate New Passage'
              )}
            </motion.button>
            {error && (
              <p className="mt-4 text-red-600">{error}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadingLevelAnalyzer; 