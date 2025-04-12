import { AnalysisResult } from '../types/textAnalysis';

// Function to calculate Flesch-Kincaid Grade Level
const calculateFleschKincaid = (text: string): number => {
  const words = text.split(/\s+/).length;
  const sentences = text.split(/[.!?]+/).length;
  const syllables = text.toLowerCase().replace(/[^aeiouy]+/g, ' ').trim().split(/\s+/).length;
  
  return 0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59;
};

// Function to calculate Coleman-Liau Index
const calculateColemanLiau = (text: string): number => {
  const words = text.split(/\s+/).length;
  const sentences = text.split(/[.!?]+/).length;
  const characters = text.replace(/\s+/g, '').length;
  
  return 0.0588 * (characters / words * 100) - 0.296 * (sentences / words * 100) - 15.8;
};

// Function to calculate Automated Readability Index
const calculateAutomatedReadability = (text: string): number => {
  const words = text.split(/\s+/).length;
  const sentences = text.split(/[.!?]+/).length;
  const characters = text.replace(/\s+/g, '').length;
  
  return 4.71 * (characters / words) + 0.5 * (words / sentences) - 21.43;
};

// Function to identify hard words using Hugging Face's API
const identifyHardWords = async (text: string): Promise<Array<{word: string, frequency: number, suggestions: string[]}>> => {
  try {
    const response = await fetch('https://api-inference.huggingface.co/models/facebook/bart-large-cnn', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: text,
        parameters: {
          max_length: 100,
          min_length: 30,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Process the response to identify hard words
    // This is a simplified example - you might want to use a more sophisticated approach
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const wordFrequency: { [key: string]: number } = {};
    
    words.forEach(word => {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    });

    // Identify words that appear frequently and might be challenging
    const hardWords = Object.entries(wordFrequency)
      .filter(([_, count]) => count > 1)
      .map(([word, frequency]) => ({
        word,
        frequency,
        suggestions: [word], // In a real implementation, you'd get synonyms from an API
      }));

    return hardWords;
  } catch (error) {
    console.error('Error identifying hard words:', error);
    return [];
  }
};

// Function to calculate Lexile score based on readability metrics
const calculateLexileScore = (fleschKincaid: number): number => {
  // This is a simplified conversion - you might want to use a more accurate formula
  return Math.round(100 * fleschKincaid + 200);
};

// Main analysis function
export const analyzeText = async (text: string): Promise<AnalysisResult> => {
  try {
    const fleschKincaid = calculateFleschKincaid(text);
    const colemanLiau = calculateColemanLiau(text);
    const automatedReadability = calculateAutomatedReadability(text);
    const hardWords = await identifyHardWords(text);
    const lexileScore = calculateLexileScore(fleschKincaid);

    // Determine grade level based on Lexile score
    const gradeLevel = (() => {
      if (lexileScore < 300) return 'K-1';
      if (lexileScore < 500) return '2-3';
      if (lexileScore < 800) return '4-5';
      if (lexileScore < 1000) return '6-8';
      if (lexileScore < 1200) return '9-10';
      return '11-12';
    })();

    return {
      lexileScore,
      gradeLevel,
      hardWords,
      readabilityMetrics: {
        fleschKincaid,
        colemanLiau,
        automatedReadability,
      },
    };
  } catch (error) {
    console.error('Error analyzing text:', error);
    throw new Error('Failed to analyze text');
  }
}; 