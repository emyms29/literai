import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StoryPrompt {
  prompt: string;
  readingLevel: string;
  topic: string;
}

const READING_LEVELS = [
  { id: 'beginner', label: 'Beginner', description: 'Simple vocabulary, short sentences' },
  { id: 'intermediate', label: 'Intermediate', description: 'Moderate vocabulary, compound sentences' },
  { id: 'advanced', label: 'Advanced', description: 'Complex vocabulary, varied sentence structures' },
];

const TOPICS = [
  'animals', 'space', 'ocean', 'magic', 'sports', 'friendship',
  'adventure', 'mystery', 'science', 'history', 'art', 'music'
];

// Cache for storing generated prompts
const promptCache = new Map<string, StoryPrompt>();

const StoryPromptGenerator: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>('beginner');
  const [prompt, setPrompt] = useState<StoryPrompt | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [speechScore, setSpeechScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [submittedRecording, setSubmittedRecording] = useState<string>('');
  const [wordAnalysis, setWordAnalysis] = useState<Array<{
    word: string;
    correct: boolean;
    confidence: number;
  }> | null>(null);
  const [isGrading, setIsGrading] = useState<boolean>(false);
  const [gradingProgress, setGradingProgress] = useState<number>(0);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        setTranscript(transcript);
      };

      recognitionRef.current.onerror = (event: SpeechRecognitionError) => {
        console.error('Speech recognition error:', event.error);
        setError('Speech recognition error. Please try again.');
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        if (isRecording) {
          recognitionRef.current?.start();
        }
      };
    } else {
      setError('Speech recognition is not supported in your browser.');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isRecording]);

  const startRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsRecording(true);
      setTranscript('');
      setSpeechScore(null);
      setFeedback('');
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
      analyzeSpeech();
    }
  };

  const pauseRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsPaused(true);
    }
  };

  const resumeRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsPaused(false);
    }
  };

  const submitRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
      setSubmittedRecording(transcript);
      setIsGrading(true);
      setGradingProgress(0);
      
      // Simulate grading process with progress
      const interval = setInterval(() => {
        setGradingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsGrading(false);
            // Calculate and set the score immediately after grading
            const score = Math.floor(Math.random() * 40) + 60; // Example score between 60-100
            setSpeechScore(score);
            analyzeSpeech();
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const analyzeSpeech = () => {
    if (!prompt || !submittedRecording) return;

    const promptWords = prompt.prompt.toLowerCase().split(' ');
    const recordingWords = submittedRecording.toLowerCase().split(' ');
    
    // Word-by-word analysis
    const wordAnalysis = promptWords.map((word, index) => {
      const recordedWord = recordingWords[index];
      const isCorrect = recordedWord === word;
      const confidence = isCorrect ? 1 : 0.5; // Simplified confidence score
      
      return {
        word,
        correct: isCorrect,
        confidence
      };
    });
    
    setWordAnalysis(wordAnalysis);
    
    // Calculate overall accuracy
    const correctWords = wordAnalysis.filter(w => w.correct).length;
    const accuracy = (correctWords / promptWords.length) * 100;
    
    // Calculate fluency score (words per second)
    const duration = 10; // Assuming 10 seconds of recording
    const wordsPerSecond = recordingWords.length / duration;
    
    // Calculate final score with more weight on accuracy
    const finalScore = (accuracy * 0.8) + (Math.min(wordsPerSecond, 3) * 6.67);
    setSpeechScore(Math.min(Math.round(finalScore), 100));

    // Generate detailed feedback
    let feedback = '';
    if (accuracy < 50) {
      feedback = 'Try to speak more clearly and match the words in the prompt. Focus on pronunciation.';
    } else if (accuracy < 80) {
      feedback = 'Good effort! Work on matching the exact words and maintaining a steady pace.';
    } else {
      feedback = 'Excellent! Your pronunciation and fluency are great. Keep practicing for even better results.';
    }
    setFeedback(feedback);
  };

  const generatePrompt = async (level: string) => {
    setIsLoading(true);
    setError(null);
    setPrompt(null);
    setTranscript('');
    setSpeechScore(null);
    setFeedback('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const prompts = {
        beginner: {
          prompt: "The little cat sat on the mat. It saw a big red ball. The cat wanted to play with the ball.",
          topic: "Animals"
        },
        intermediate: {
          prompt: "The adventurous explorer discovered a hidden cave deep in the forest. Inside, they found ancient drawings on the walls and a mysterious golden key.",
          topic: "Adventure"
        },
        advanced: {
          prompt: "As the sun dipped below the horizon, casting long shadows across the valley, the young scientist made a groundbreaking discovery that would change the course of human history forever.",
          topic: "Science"
        }
      };

      setPrompt({
        prompt: prompts[level as keyof typeof prompts].prompt,
        readingLevel: level,
        topic: prompts[level as keyof typeof prompts].topic
      });
    } catch (err) {
      setError('Failed to generate prompt. Please try again.');
      console.error('Error generating prompt:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReadAloud = () => {
    if (!prompt) return;

    window.speechSynthesis.cancel();

    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(prompt.prompt);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    
    utterance.onend = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Reading Level Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Reading Level
        </label>
        <div className="grid grid-cols-3 gap-4">
          {READING_LEVELS.map(level => (
            <motion.button
              key={level.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedLevel(level.id)}
              className={`p-3 rounded-lg border-2 transition-colors ${
                selectedLevel === level.id
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-200 hover:border-primary/50'
              }`}
            >
              <span className="block font-medium">{level.label}</span>
              <span className="block text-sm text-gray-500">{level.description}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => generatePrompt(selectedLevel)}
        disabled={isLoading}
        className={`w-full bg-gradient-to-r from-primary to-secondary text-white rounded-xl py-4 px-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow ${
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
          'Generate Story Prompt'
        )}
      </motion.button>

      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg"
          >
            {error}
          </motion.div>
        )}

        {prompt && !error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 bg-white rounded-xl p-6 shadow-lg border-2 border-accent/20"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="inline-block px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                  {READING_LEVELS.find(l => l.id === prompt.readingLevel)?.label}
                </span>
                <span className="ml-2 inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {prompt.topic}
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReadAloud}
                className="text-primary hover:text-primary/80 transition-colors"
              >
                {isSpeaking ? (
                  <span className="flex items-center">
                    <span className="mr-2">■</span>
                    Stop Reading
                  </span>
                ) : (
                  <span className="flex items-center">
                    <span className="mr-2">▶</span>
                    Read Aloud
                  </span>
                )}
              </motion.button>
            </div>
            <p className="text-xl text-gray-800 leading-relaxed mb-6">
              {prompt.prompt}
            </p>

            {/* Speech Recognition Section */}
            <div className="mt-6 space-y-4">
              <div className="flex justify-center space-x-4">
                {!isRecording ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startRecording}
                    className="px-6 py-3 rounded-lg font-semibold bg-primary text-white hover:bg-primary/90"
                  >
                    Start Recording
                  </motion.button>
                ) : (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={isPaused ? resumeRecording : pauseRecording}
                      className={`px-6 py-3 rounded-lg font-semibold flex items-center ${
                        isPaused
                          ? 'bg-green-500 text-white hover:bg-green-600'
                          : 'bg-yellow-500 text-white hover:bg-yellow-600'
                      }`}
                    >
                      {isPaused ? (
                        <>
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="w-3 h-3 bg-white rounded-full mr-2"
                          />
                          Resume
                        </>
                      ) : (
                        <>
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="w-3 h-3 bg-white rounded-full mr-2"
                          />
                          Pause
                        </>
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={submitRecording}
                      className="px-6 py-3 rounded-lg font-semibold bg-red-500 text-white hover:bg-red-600"
                    >
                      Submit
                    </motion.button>
                  </>
                )}
              </div>

              {transcript && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Your Recording:</h3>
                  <p className="text-gray-700">{transcript}</p>
                </div>
              )}

              {isGrading && (
                <div className="mt-4 p-4 bg-white rounded-lg border-2 border-primary/20">
                  <h3 className="text-lg font-semibold mb-2">Grading Your Recording...</h3>
                  <div className="flex items-center space-x-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full"
                    />
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <motion.div
                          className="bg-primary h-2.5 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${gradingProgress}%` }}
                          transition={{ duration: 0.2 }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      {gradingProgress}%
                    </span>
                  </div>
                </div>
              )}

              {wordAnalysis && !isGrading && (
                <div className="mt-4 p-4 bg-white rounded-lg border-2 border-primary/20">
                  <h3 className="text-lg font-semibold mb-2">Word-by-Word Analysis:</h3>
                  <div className="flex flex-wrap gap-2">
                    {wordAnalysis.map((word, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-sm ${
                          word.correct
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {word.word}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {speechScore !== null && (
                <div className="mt-4 p-4 bg-white rounded-lg border-2 border-primary/20">
                  <h3 className="text-lg font-semibold mb-2">Speech Analysis Results:</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl font-bold text-primary">
                        {speechScore}%
                      </div>
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full ${
                              speechScore >= 80
                                ? 'bg-green-500'
                                : speechScore >= 50
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${speechScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-500">Accuracy</div>
                        <div className="text-xl font-semibold">
                          {Math.round(speechScore * 0.8)}%
                        </div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-500">Fluency</div>
                        <div className="text-xl font-semibold">
                          {Math.round(speechScore * 0.2)}%
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-600">{feedback}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StoryPromptGenerator; 