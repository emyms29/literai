import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StoryPrompt {
  prompt: string;
  readingLevel: string;
  topic: string;
}

const READING_LEVELS = [
  { id: 'k-2', label: 'Grades K-2', description: 'Simple sentences, basic vocabulary' },
  { id: '3-5', label: 'Grades 3-5', description: 'Intermediate vocabulary, more complex ideas' },
  { id: '6-8', label: 'Grades 6-8', description: 'Advanced vocabulary, sophisticated themes' },
];

const TOPICS = [
  'animals', 'space', 'ocean', 'magic', 'sports', 'friendship',
  'adventure', 'mystery', 'science', 'history', 'art', 'music'
];

// Cache for storing generated prompts
const promptCache = new Map<string, StoryPrompt>();

const StoryPromptGenerator: React.FC = () => {
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
            <p className="text-xl text-gray-800 leading-relaxed">
              {prompt.prompt}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StoryPromptGenerator; 