import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Add type declarations for Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionError extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionError) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

interface WordAnalysis {
  word: string;
  spoken: string;
  correct: boolean;
  confidence: number;
}

interface StoryPrompt {
  id: string;
  prompt: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  readingLevel?: string;
  topic?: string;
}

const READING_LEVELS = [
  { id: 'beginner', label: 'Beginner', description: 'Simple vocabulary, short sentences' },
  { id: 'intermediate', label: 'Intermediate', description: 'Moderate vocabulary, compound sentences' },
  { id: 'advanced', label: 'Advanced', description: 'Complex vocabulary, varied sentence structures' },
];

const TOPICS = [
  'animals', 'space', 'ocean', 'nature', 'sports', 'music',
  'art', 'food', 'travel', 'weather', 'school', 'family'
];

// Topic-specific vocabulary and themes with logical connections
const TOPIC_THEMES = {
  animals: {
    beginner: {
      subjects: ['The little cat', 'A small dog', 'The brown bear', 'A blue fish'],
      actions: ['plays with', 'finds', 'eats', 'sees'],
      objects: ['a ball', 'some food', 'a toy', 'a friend']
    },
    intermediate: {
      subjects: ['The majestic eagle', 'A family of dolphins', 'The curious fox'],
      actions: ['hunts for', 'communicates with', 'adapts to'],
      objects: ['its prey', 'each other', 'the changing environment']
    },
    advanced: {
      subjects: ['The endangered species', 'The apex predator', 'The migratory bird'],
      actions: ['maintains ecological balance', 'demonstrates complex behavior', 'exhibits remarkable adaptation'],
      objects: ['the delicate ecosystem', 'social hierarchies', 'environmental changes']
    }
  },
  space: {
    beginner: {
      subjects: ['The bright moon', 'A shiny star', 'The big rocket'],
      actions: ['shines', 'twinkles', 'flies'],
      objects: ['at night', 'in the darkness', 'to the stars']
    },
    intermediate: {
      subjects: ['The astronaut', 'The space station', 'The telescope'],
      actions: ['conducts experiments', 'collects data', 'makes discoveries'],
      objects: ['in microgravity', 'about distant stars', 'about the universe']
    },
    advanced: {
      subjects: ['The quantum physicist', 'The astrophysicist', 'The space exploration team'],
      actions: ['analyzes cosmic phenomena', 'develops theoretical models', 'pushes the boundaries of knowledge'],
      objects: ['the fundamental nature of reality', 'the origins of the universe', 'the limits of human exploration']
    }
  },
  ocean: {
    beginner: {
      subjects: ['The blue whale', 'A colorful fish', 'The playful dolphin'],
      actions: ['swims', 'dives', 'jumps'],
      objects: ['in the water', 'through the waves', 'over the surface']
    },
    intermediate: {
      subjects: ['The coral reef', 'The ocean current', 'The marine biologist'],
      actions: ['supports', 'carries', 'studies'],
      objects: ['diverse marine life', 'nutrients across the ocean', 'underwater ecosystems']
    },
    advanced: {
      subjects: ['The deep-sea explorer', 'The oceanographer', 'The marine conservationist'],
      actions: ['investigates', 'monitors', 'protects'],
      objects: ['previously unknown species', 'ocean temperature changes', 'endangered marine habitats']
    }
  },
  nature: {
    beginner: {
      subjects: ['The green tree', 'A red flower', 'The brown squirrel'],
      actions: ['grows', 'blooms', 'climbs'],
      objects: ['in the forest', 'in the garden', 'up the trunk']
    },
    intermediate: {
      subjects: ['The mountain range', 'The waterfall', 'The forest ecosystem'],
      actions: ['towers', 'cascades', 'thrives'],
      objects: ['above the clouds', 'down the cliff', 'with diverse species']
    },
    advanced: {
      subjects: ['The environmental scientist', 'The conservation biologist', 'The climate researcher'],
      actions: ['analyzes', 'preserves', 'studies'],
      objects: ['ecosystem dynamics', 'biodiversity hotspots', 'climate change impacts']
    }
  },
  sports: {
    beginner: {
      subjects: ['The soccer player', 'A basketball team', 'The swimmer'],
      actions: ['kicks', 'scores', 'swims'],
      objects: ['the ball', 'many points', 'fast laps']
    },
    intermediate: {
      subjects: ['The professional athlete', 'The sports coach', 'The team captain'],
      actions: ['trains', 'guides', 'leads'],
      objects: ['for the championship', 'young players', 'the team to victory']
    },
    advanced: {
      subjects: ['The sports psychologist', 'The performance analyst', 'The athletic trainer'],
      actions: ['enhances', 'optimizes', 'develops'],
      objects: ['mental resilience', 'athletic performance', 'training programs']
    }
  },
  music: {
    beginner: {
      subjects: ['The piano', 'A guitar', 'The singer'],
      actions: ['plays', 'strums', 'sings'],
      objects: ['beautiful music', 'happy songs', 'sweet melodies']
    },
    intermediate: {
      subjects: ['The orchestra', 'The composer', 'The music teacher'],
      actions: ['performs', 'creates', 'teaches'],
      objects: ['classical symphonies', 'original compositions', 'music theory']
    },
    advanced: {
      subjects: ['The musicologist', 'The sound engineer', 'The concert pianist'],
      actions: ['researches', 'produces', 'masterfully performs'],
      objects: ['musical history', 'high-quality recordings', 'complex pieces']
    }
  },
  art: {
    beginner: {
      subjects: ['The painter', 'A sculptor', 'The art student'],
      actions: ['paints', 'carves', 'draws'],
      objects: ['colorful pictures', 'beautiful statues', 'creative sketches']
    },
    intermediate: {
      subjects: ['The art gallery', 'The art historian', 'The art teacher'],
      actions: ['displays', 'studies', 'instructs'],
      objects: ['contemporary works', 'artistic movements', 'various techniques']
    },
    advanced: {
      subjects: ['The art curator', 'The art critic', 'The art conservator'],
      actions: ['curates', 'analyzes', 'preserves'],
      objects: ['museum exhibitions', 'artistic significance', 'cultural heritage']
    }
  },
  food: {
    beginner: {
      subjects: ['The chef', 'A baker', 'The cook'],
      actions: ['prepares', 'bakes', 'cooks'],
      objects: ['delicious meals', 'fresh bread', 'tasty dishes']
    },
    intermediate: {
      subjects: ['The restaurant', 'The food critic', 'The nutritionist'],
      actions: ['serves', 'reviews', 'advises'],
      objects: ['gourmet cuisine', 'culinary experiences', 'healthy eating habits']
    },
    advanced: {
      subjects: ['The food scientist', 'The culinary researcher', 'The gastronomy expert'],
      actions: ['develops', 'investigates', 'explores'],
      objects: ['new food products', 'cooking techniques', 'cultural food traditions']
    }
  },
  travel: {
    beginner: {
      subjects: ['The tourist', 'A traveler', 'The explorer'],
      actions: ['visits', 'discovers', 'explores'],
      objects: ['new places', 'different cultures', 'famous landmarks']
    },
    intermediate: {
      subjects: ['The travel guide', 'The adventurer', 'The cultural explorer'],
      actions: ['leads', 'embarks on', 'immerses in'],
      objects: ['guided tours', 'exciting journeys', 'local traditions']
    },
    advanced: {
      subjects: ['The travel journalist', 'The cultural anthropologist', 'The sustainable tourism expert'],
      actions: ['documents', 'studies', 'promotes'],
      objects: ['travel experiences', 'cultural practices', 'responsible tourism']
    }
  },
  weather: {
    beginner: {
      subjects: ['The sun', 'A cloud', 'The rain'],
      actions: ['shines', 'floats', 'falls'],
      objects: ['brightly', 'in the sky', 'from the clouds']
    },
    intermediate: {
      subjects: ['The weather system', 'The meteorologist', 'The climate pattern'],
      actions: ['develops', 'predicts', 'influences'],
      objects: ['across regions', 'weather changes', 'global conditions']
    },
    advanced: {
      subjects: ['The climate scientist', 'The atmospheric researcher', 'The weather forecaster'],
      actions: ['analyzes', 'models', 'monitors'],
      objects: ['climate data', 'weather patterns', 'atmospheric conditions']
    }
  },
  school: {
    beginner: {
      subjects: ['The teacher', 'A student', 'The class'],
      actions: ['teaches', 'learns', 'studies'],
      objects: ['new lessons', 'many subjects', 'together']
    },
    intermediate: {
      subjects: ['The principal', 'The school counselor', 'The academic advisor'],
      actions: ['leads', 'guides', 'advises'],
      objects: ['the school', 'students', 'academic choices']
    },
    advanced: {
      subjects: ['The education researcher', 'The curriculum developer', 'The learning specialist'],
      actions: ['investigates', 'designs', 'implements'],
      objects: ['teaching methods', 'educational programs', 'learning strategies']
    }
  },
  family: {
    beginner: {
      subjects: ['The mother', 'A father', 'The children'],
      actions: ['cooks', 'works', 'play'],
      objects: ['dinner', 'hard', 'together']
    },
    intermediate: {
      subjects: ['The family unit', 'The parents', 'The siblings'],
      actions: ['supports', 'nurtures', 'shares'],
      objects: ['each other', 'their children', 'family traditions']
    },
    advanced: {
      subjects: ['The family therapist', 'The social worker', 'The family counselor'],
      actions: ['helps', 'supports', 'guides'],
      objects: ['family relationships', 'family dynamics', 'family communication']
    }
  }
};

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
];

const StoryPromptGenerator: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>('beginner');
  const [selectedTopic, setSelectedTopic] = useState<string>('animals');
  const [currentPrompt, setCurrentPrompt] = useState<StoryPrompt | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [speechScore, setSpeechScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [submittedRecording, setSubmittedRecording] = useState<string>('');
  const [wordAnalysis, setWordAnalysis] = useState<WordAnalysis[] | null>(null);
  const [isGrading, setIsGrading] = useState<boolean>(false);
  const [gradingProgress, setGradingProgress] = useState<number>(0);
  const [isTranscribing, setIsTranscribing] = useState<boolean>(false);
  const [currentTranscript, setCurrentTranscript] = useState<string>('');

  const initializeRecognition = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const results = Array.from(event.results);
        const lastResult = results[results.length - 1];
        const transcript = lastResult[0].transcript;
        
        // Update transcript immediately for live feedback
        setTranscript(transcript);
      };

      recognitionRef.current.onerror = (event: SpeechRecognitionError) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'no-speech' || event.error === 'aborted') {
          // These errors are expected and can be ignored
        return;
      }
        setError('Speech recognition error. Please try again.');
        resetRecording();
      };

      recognitionRef.current.onend = () => {
        if (isRecording && !isPaused) {
          try {
            recognitionRef.current?.start();
          } catch (error) {
            console.error('Error restarting recognition:', error);
            resetRecording();
          }
        }
      };
    } else {
      setError('Speech recognition is not supported in your browser.');
    }
  };

  useEffect(() => {
    initializeRecognition();
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
    };
  }, []);

  const startRecording = () => {
    if (!recognitionRef.current) {
      initializeRecognition();
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
        setIsTranscribing(true);
        // Only clear transcript if starting fresh
        if (!transcript) {
          setTranscript('');
          setSpeechScore(null);
          setFeedback('');
          setWordAnalysis(null);
          setSubmittedRecording('');
        }
        setError(null);
      } catch (error) {
        console.error('Error starting recognition:', error);
        setError('Failed to start recording. Please try again.');
        resetRecording();
      }
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
        setIsRecording(false);
        setIsTranscribing(false);
        
        // Only proceed with grading if there's actual content
        if (transcript.trim().length > 0) {
          setSubmittedRecording(transcript);
          setIsGrading(true);
          setGradingProgress(0);
          
          // Simulate grading process with progress
          const interval = setInterval(() => {
            setGradingProgress(prev => {
              if (prev >= 100) {
                clearInterval(interval);
                setIsGrading(false);
                analyzeSpeech();
                return 100;
              }
              return prev + 25;
            });
          }, 50);
        } else {
          setError('No speech detected. Please try speaking again.');
          resetRecording();
        }
      } catch (error) {
        console.error('Error stopping recognition:', error);
        setError('Error stopping recording. Please try again.');
        resetRecording();
      }
    }
  };

  const resetRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error('Error stopping recognition during reset:', error);
      }
      recognitionRef.current = null;
    }
    setIsRecording(false);
    setIsTranscribing(false);
    setIsPaused(false);
    setTranscript('');
    setSpeechScore(null);
    setFeedback('');
    setWordAnalysis(null);
    setSubmittedRecording('');
    setGradingProgress(0);
    setIsGrading(false);
    setError(null);
    // Reinitialize recognition for next use
    initializeRecognition();
  };

  const pauseRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
        setIsPaused(true);
        setIsTranscribing(false);
        // Don't clear current transcript when pausing
      } catch (error) {
        console.error('Error pausing recognition:', error);
        setError('Error pausing recording. Please try again.');
        resetRecording();
      }
    }
  };

  const resumeRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsPaused(false);
        setIsTranscribing(true);
        // Don't clear current transcript when resuming
      } catch (error) {
        console.error('Error resuming recognition:', error);
        setError('Error resuming recording. Please try again.');
        resetRecording();
      }
    }
  };

  const analyzeSpeech = () => {
    if (!currentPrompt || !submittedRecording) return;

    const recordingWords = submittedRecording.toLowerCase().split(/\s+/);
    const expectedWords = currentPrompt.prompt.toLowerCase().split(/\s+/);
    const analysis: WordAnalysis[] = [];
    let correctCount = 0;
    let totalWords = expectedWords.length;

    // Word matching with proper handling of unspoken words
    for (let i = 0; i < expectedWords.length; i++) {
      const expected = expectedWords[i];
      const spoken = recordingWords[i] || '';
      
      // Mark as incorrect if word wasn't spoken
      const isCorrect = spoken !== '' && (
        expected === spoken || 
        expected.includes(spoken) || 
        spoken.includes(expected)
      );
      
      analysis.push({
        word: expected,
        spoken: spoken || '(not spoken)',
        correct: isCorrect,
        confidence: isCorrect ? 1 : 0
      });

      if (isCorrect) {
        correctCount++;
      }
    }

    // Calculate accuracy (0-100)
    const accuracy = (correctCount / totalWords) * 100;

    // Calculate fluency score (0-20 bonus points)
    const duration = 10; // Assuming 10 seconds of recording
    const wordsPerSecond = recordingWords.length / duration;
    // Target range: 2-4 words per second is considered good
    const fluencyScore = Math.min(Math.max((wordsPerSecond - 1) * 5, 0), 20);

    // Calculate final score: accuracy (0-100) + fluency bonus (0-20), capped at 100
    const finalScore = Math.min(accuracy + fluencyScore, 100);

    // Generate feedback based on the accuracy
    let feedbackMessage = '';
    if (accuracy >= 90) {
      feedbackMessage = 'Excellent! Your pronunciation and fluency are outstanding.';
    } else if (accuracy >= 80) {
      feedbackMessage = 'Great job! Your speech is clear and natural.';
    } else if (accuracy >= 70) {
      feedbackMessage = 'Good work! Keep practicing to improve your fluency.';
    } else if (accuracy >= 60) {
      feedbackMessage = 'Not bad! Focus on speaking more naturally.';
    } else {
      feedbackMessage = 'Keep practicing! Try to speak more clearly and at a natural pace.';
    }

    setWordAnalysis(analysis);
    setSpeechScore(finalScore);
    setFeedback(feedbackMessage);
  };

  const handleReadAloud = () => {
    if (!currentPrompt) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(currentPrompt.prompt);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    
    // Set up event listeners
    utterance.onstart = () => {
      setIsSpeaking(true);
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
      setError('Error reading text aloud. Please try again.');
    };

    // Add the utterance to the speech queue
    window.speechSynthesis.speak(utterance);
  };

  const generatePrompt = () => {
    setIsGenerating(true);
    setError(null);

    try {
      const themes = TOPIC_THEMES[selectedTopic as keyof typeof TOPIC_THEMES];
      if (!themes) {
        throw new Error('Invalid topic selected');
      }

      const levelThemes = themes[selectedLevel as keyof typeof themes];
      if (!levelThemes) {
        throw new Error('Invalid level selected');
      }

      // Generate a sentence using the theme components
      const subject = levelThemes.subjects[Math.floor(Math.random() * levelThemes.subjects.length)];
      const action = levelThemes.actions[Math.floor(Math.random() * levelThemes.actions.length)];
      const object = levelThemes.objects[Math.floor(Math.random() * levelThemes.objects.length)];

      // Create the prompt
      const generatedPrompt = `${subject} ${action} ${object}.`;

      // Set the new prompt
      setCurrentPrompt({
        id: Date.now().toString(),
        prompt: generatedPrompt,
        category: selectedTopic,
        difficulty: selectedLevel as 'easy' | 'medium' | 'hard',
        readingLevel: selectedLevel,
        topic: selectedTopic
      });

      // Reset speech-related states when generating new prompt
      resetRecording();
    } catch (error) {
      setError('Failed to generate prompt. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Story Prompt Generator</h2>
        
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

        {/* Topic Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Topic
          </label>
          <div className="grid grid-cols-4 gap-3">
            {TOPICS.map(topic => (
      <motion.button
                key={topic}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedTopic(topic)}
                className={`p-2 rounded-lg border-2 transition-colors ${
                  selectedTopic === topic
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-gray-200 hover:border-primary/50'
                }`}
              >
                <span className="block font-medium capitalize">{topic}</span>
      </motion.button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generatePrompt}
          disabled={isGenerating}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? 'Generating...' : 'Generate New Prompt'}
        </button>

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

          {currentPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-8 p-6 bg-gray-50 rounded-lg"
          >
              <div className="flex items-center justify-between mb-4">
              <div>
                <span className="inline-block px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                    {READING_LEVELS.find(l => l.id === currentPrompt.readingLevel)?.label}
                </span>
                <span className="ml-2 inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {currentPrompt.topic}
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
              <p className="text-xl text-gray-900">{currentPrompt.prompt}</p>

              {/* Speech Recording Section */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={isRecording ? (isPaused ? resumeRecording : pauseRecording) : startRecording}
                      className={`px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 ${
                        isRecording
                          ? 'bg-red-500 text-white hover:bg-red-600'
                          : 'bg-primary text-white hover:bg-primary/90'
                      }`}
                    >
                      <span>{isRecording ? (isPaused ? '▶' : '❚❚') : '●'}</span>
                      <span>{isRecording ? (isPaused ? 'Resume' : 'Pause') : 'Start Recording'}</span>
                    </motion.button>
                    {isRecording && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={stopRecording}
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300"
                      >
                        Stop
                      </motion.button>
                    )}
                  </div>
                </div>

                {/* Live Transcription */}
                {isTranscribing && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">{transcript || 'Listening...'}</p>
                  </div>
                )}

                {/* Submit Recording Button */}
                {transcript && !isRecording && !isGrading && speechScore === null && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={stopRecording}
                    className="w-full px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-colors"
                  >
                    Submit Recording
                  </motion.button>
                )}

                {/* Grading Progress */}
                {isGrading && (
                  <div className="space-y-2">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${gradingProgress}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-600 text-center">Analyzing speech...</p>
                  </div>
                )}

                {/* Results */}
                {!isGrading && speechScore !== null && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    {/* Score and Feedback */}
                    <div className="text-center space-y-3">
                      <div>
                        <span className="text-4xl font-bold text-primary">{Math.round(speechScore)}</span>
                        <span className="text-xl text-gray-600">/100</span>
                      </div>
                      {feedback && (
                        <p className="text-gray-700 font-medium">{feedback}</p>
                      )}
                    </div>

                    {/* Detailed Word Analysis */}
                    {wordAnalysis && (
                      <div className="bg-gray-50 rounded-lg overflow-hidden">
                        <div className="p-4 bg-gray-100 border-b border-gray-200">
                          <h3 className="font-semibold text-gray-900">Word Analysis</h3>
                        </div>
                        <div className="p-4">
                          <div className="space-y-3">
                            {wordAnalysis.map((analysis, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm"
                              >
                                <div className="flex items-center space-x-3">
                                  <span className={`w-2 h-2 rounded-full ${
                                    analysis.correct ? 'bg-green-500' : 'bg-red-500'
                                  }`} />
                                  <div>
                                    <p className="font-medium text-gray-900">{analysis.word}</p>
                                    <p className="text-sm text-gray-500">
                                      {analysis.spoken || '(not spoken)'}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <span className={`inline-block px-2 py-1 text-sm rounded ${
                                    analysis.correct 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-red-100 text-red-800'
                                  }`}>
                                    {analysis.correct ? 'Correct' : 'Incorrect'}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Summary Statistics */}
                        <div className="p-4 bg-gray-100 border-t border-gray-200">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Accuracy</p>
                              <p className="text-lg font-semibold text-gray-900">
                                {Math.round((wordAnalysis.filter(w => w.correct).length / wordAnalysis.length) * 100)}%
                              </p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Words Analyzed</p>
                              <p className="text-lg font-semibold text-gray-900">{wordAnalysis.length}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Try Again Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={resetRecording}
                      className="w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                    >
                      Try Again
                    </motion.button>
                  </motion.div>
                )}
              </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
};

export default StoryPromptGenerator; 