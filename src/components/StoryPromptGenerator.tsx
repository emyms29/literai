<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

=======
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WordAnalysis {
  word: string;
  spoken: string;
  correct: boolean;
  confidence: number;
}

>>>>>>> 0e96a6b2d40a7bc29890e95aecad7a47b77a6584
interface StoryPrompt {
  prompt: string;
  readingLevel: string;
  topic: string;
}

const READING_LEVELS = [
<<<<<<< HEAD
  { id: 'k-2', label: 'Grades K-2', description: 'Simple sentences, basic vocabulary' },
  { id: '3-5', label: 'Grades 3-5', description: 'Intermediate vocabulary, more complex ideas' },
  { id: '6-8', label: 'Grades 6-8', description: 'Advanced vocabulary, sophisticated themes' },
];

const TOPICS = [
  'animals', 'space', 'ocean', 'magic', 'sports', 'friendship',
  'adventure', 'mystery', 'science', 'history', 'art', 'music'
];

=======
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

const generatePrompt = (level: string, topic: string): string => {
  const theme = TOPIC_THEMES[topic as keyof typeof TOPIC_THEMES]?.[level as keyof typeof TOPIC_THEMES] || {};
  
  if (!theme.subjects || !theme.actions || !theme.objects) {
    throw new Error('Invalid topic or level selected');
  }

  // Get random words from the theme
  const subject = theme.subjects[Math.floor(Math.random() * theme.subjects.length)];
  const action = theme.actions[Math.floor(Math.random() * theme.actions.length)];
  const object = theme.objects[Math.floor(Math.random() * theme.objects.length)];

  // Generate sentence based on level
  if (level === 'beginner') {
    return `${subject} ${action} ${object}.`;
  } else if (level === 'intermediate') {
    // Get a second action and object for compound sentence
    const action2 = theme.actions[Math.floor(Math.random() * theme.actions.length)];
    const object2 = theme.objects[Math.floor(Math.random() * theme.objects.length)];
    return `${subject} ${action} ${object} and ${action2} ${object2}.`;
  } else {
    // Advanced level gets a more complex sentence
    const action2 = theme.actions[Math.floor(Math.random() * theme.actions.length)];
    const object2 = theme.objects[Math.floor(Math.random() * theme.objects.length)];
    return `${subject} ${action} ${object} while ${action2} ${object2}.`;
  }
};

>>>>>>> 0e96a6b2d40a7bc29890e95aecad7a47b77a6584
// Cache for storing generated prompts
const promptCache = new Map<string, StoryPrompt>();

const StoryPromptGenerator: React.FC = () => {
<<<<<<< HEAD
  const [prompt, setPrompt] = useState<StoryPrompt | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string>('k-2');

  const generatePrompt = async (level: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Check cache first
      const cacheKey = `${level}-${Date.now()}`;
      const cachedPrompt = promptCache.get(cacheKey);
      if (cachedPrompt) {
        setPrompt(cachedPrompt);
        setIsLoading(false);
        return;
      }

      // Select a random topic
      const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];

      // First, let's get the list of available models
      const modelsResponse = await fetch('https://generativelanguage.googleapis.com/v1/models', {
        headers: {
          'x-goog-api-key': import.meta.env.VITE_GEMINI_API_KEY
        }
      });

      if (!modelsResponse.ok) {
        throw new Error('Failed to fetch available models');
      }

      const modelsData = await modelsResponse.json();
      console.log('Available models:', modelsData);

      // Use the first available model that supports generateContent
      const availableModel = modelsData.models?.find((model: any) => 
        model.supportedGenerationMethods?.includes('generateContent')
      );

      if (!availableModel) {
        throw new Error('No suitable model found');
      }

      console.log('Using model:', availableModel.name);

      // Add retry logic for rate limiting
      let retries = 3;
      let lastError = null;

      while (retries > 0) {
        try {
          console.log('Attempting API call, retries left:', retries);
          const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-goog-api-key': import.meta.env.VITE_GEMINI_API_KEY
            },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: `Generate a ${level} story prompt about ${topic}. ${
                    level === 'k-2' ? 'Use simple sentences and basic vocabulary.' :
                    level === '3-5' ? 'Use intermediate vocabulary and more complex ideas.' :
                    'Use advanced vocabulary and sophisticated themes.'
                  }`
                }]
              }],
              generationConfig: {
                temperature: 0.7,
                topP: 1,
                topK: 40,
                maxOutputTokens: 150,
              }
            })
          });

          console.log('API Response status:', response.status);
          console.log('API Response headers:', Object.fromEntries(response.headers.entries()));
          
          if (response.status === 429) {
            const retryAfter = response.headers.get('Retry-After') || '5';
            console.log('Rate limited, waiting for:', retryAfter, 'seconds');
            await new Promise(resolve => setTimeout(resolve, parseInt(retryAfter) * 1000));
            retries--;
            continue;
          }

          if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error Response:', errorText);
            let errorMessage = `API error: ${response.status} ${response.statusText}`;
            try {
              const errorData = JSON.parse(errorText);
              errorMessage += ` - ${errorData.error?.message || errorData.error || ''}`;
            } catch (e) {
              errorMessage += ` - ${errorText}`;
            }
            throw new Error(errorMessage);
          }

          const data = await response.json();
          console.log('API Response data:', data);
          
          if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
            throw new Error('Invalid API response format');
          }

          const generatedPrompt = data.candidates[0].content.parts[0].text.trim();

          const newPrompt: StoryPrompt = {
            prompt: generatedPrompt,
            readingLevel: level,
            topic
          };

          // Cache the prompt
          promptCache.set(cacheKey, newPrompt);
          setPrompt(newPrompt);
          return;
        } catch (err) {
          console.error('Attempt failed:', err);
          lastError = err;
          retries--;
          if (retries > 0) {
            console.log('Retrying in 2 seconds...');
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        }
      }

      console.error('All retries failed. Last error:', lastError);
      throw lastError || new Error('Failed to generate prompt after multiple attempts. Please check your API key and try again later.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate prompt. Please try again later.');
      console.error('Error generating prompt:', err);
    } finally {
      setIsLoading(false);
    }
=======
  const [selectedLevel, setSelectedLevel] = useState<string>('beginner');
  const [selectedTopic, setSelectedTopic] = useState<string>('animals');
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
          
          // Simulate grading process with progress - faster now
          const interval = setInterval(() => {
            setGradingProgress(prev => {
              if (prev >= 100) {
                clearInterval(interval);
                setIsGrading(false);
                // Calculate and set score with more varied range
                const baseScore = Math.floor(Math.random() * 40); // 0-39
                const score = baseScore + 60; // 60-99
                setSpeechScore(score);
                analyzeSpeech();
                return 100;
              }
              return prev + 25; // Larger steps
            });
          }, 50); // Shorter interval
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
    if (!prompt || !submittedRecording) return;

    const recordingWords = submittedRecording.toLowerCase().split(/\s+/);
    const expectedWords = prompt.prompt.toLowerCase().split(/\s+/);
    const analysis: WordAnalysis[] = [];
    let correctCount = 0;
    let totalWords = expectedWords.length;

    // More lenient word matching
    for (let i = 0; i < expectedWords.length; i++) {
      const expected = expectedWords[i];
      const spoken = recordingWords[i] || '';
      const isCorrect = expected === spoken || 
                       expected.includes(spoken) || 
                       spoken.includes(expected);
      
      analysis.push({
        word: expected,
        spoken: spoken,
        correct: isCorrect,
        confidence: isCorrect ? 1 : 0.5
      });

      if (isCorrect) {
        correctCount++;
      }
    }

    // Calculate accuracy with partial credit
    const accuracy = (correctCount / totalWords) * 100;

    // Calculate fluency score (words per second) with more balanced scoring
    const duration = 10; // Assuming 10 seconds of recording
    const wordsPerSecond = recordingWords.length / duration;
    // Target range: 2-4 words per second is considered good
    const fluencyScore = Math.min(Math.max((wordsPerSecond - 1) * 25, 0), 50);
    // This gives a range of 0-50 for fluency

    // Calculate final score with adjusted weights
    const finalScore = (accuracy * 0.7) + fluencyScore; // 70% accuracy, 30% fluency

    // Generate feedback based on the score
    let feedbackMessage = '';
    if (finalScore >= 90) {
      feedbackMessage = 'Excellent! Your pronunciation and fluency are outstanding.';
    } else if (finalScore >= 80) {
      feedbackMessage = 'Great job! Your speech is clear and natural.';
    } else if (finalScore >= 70) {
      feedbackMessage = 'Good work! Keep practicing to improve your fluency.';
    } else if (finalScore >= 60) {
      feedbackMessage = 'Not bad! Focus on speaking more naturally.';
    } else {
      feedbackMessage = 'Keep practicing! Try to speak more clearly and at a natural pace.';
    }

    setWordAnalysis(analysis);
    setSpeechScore(finalScore);
    setFeedback(feedbackMessage);
>>>>>>> 0e96a6b2d40a7bc29890e95aecad7a47b77a6584
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

<<<<<<< HEAD
=======
  const generateNewPrompt = async () => {
    try {
      // Reset all states
      resetRecording();
      setPrompt(null);
      setTranscript('');
      setSpeechScore(null);
      setFeedback('');
      setWordAnalysis(null);
      setSubmittedRecording('');
      setGradingProgress(0);
      setIsGrading(false);
      setError(null);

      // Generate a new prompt using OpenAI
      const newPrompt = await generatePrompt(selectedLevel, selectedTopic);
      
      setPrompt({ 
        prompt: newPrompt, 
        readingLevel: selectedLevel, 
        topic: selectedTopic 
      });
    } catch (error) {
      setError('Failed to generate new prompt. Please try again.');
    }
  };

>>>>>>> 0e96a6b2d40a7bc29890e95aecad7a47b77a6584
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

<<<<<<< HEAD
=======
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

>>>>>>> 0e96a6b2d40a7bc29890e95aecad7a47b77a6584
      {/* Generate Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
<<<<<<< HEAD
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
=======
        onClick={generateNewPrompt}
        className="w-full bg-gradient-to-r from-primary to-secondary text-white rounded-xl py-4 px-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
      >
        Generate New Prompt
>>>>>>> 0e96a6b2d40a7bc29890e95aecad7a47b77a6584
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
<<<<<<< HEAD
            <p className="text-xl text-gray-800 leading-relaxed">
              {prompt.prompt}
            </p>
=======
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
                      onClick={stopRecording}
                      className="px-6 py-3 rounded-lg font-semibold bg-red-500 text-white hover:bg-red-600"
                    >
                      Stop & Grade
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={resetRecording}
                      className="px-6 py-3 rounded-lg font-semibold bg-gray-500 text-white hover:bg-gray-600"
                    >
                      Reset
                    </motion.button>
                  </>
                )}
              </div>

              {isTranscribing && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Live Transcription:</h3>
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

              {!isGrading && wordAnalysis && (
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

              {!isGrading && speechScore !== null && (
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
>>>>>>> 0e96a6b2d40a7bc29890e95aecad7a47b77a6584
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StoryPromptGenerator; 