import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { analyzeText } from '../utils/textAnalysis';
import { AnalysisResult } from '../types/textAnalysis';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const ReadingLevelAnalyzer: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const result = await analyzeText(text);
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze text');
      console.error('Error analyzing text:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const chartData = {
    labels: ['Lexile Score', 'Remaining'],
    datasets: [
      {
        data: analysis ? [analysis.lexileScore, 2000 - analysis.lexileScore] : [0, 2000],
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
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Paste or type your text here
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-48 p-4 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20"
          placeholder="Enter text to analyze..."
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleAnalyze}
        disabled={isAnalyzing || !text.trim()}
        className={`w-full bg-gradient-to-r from-primary to-secondary text-white rounded-xl py-4 px-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow ${
          isAnalyzing || !text.trim() ? 'opacity-75 cursor-not-allowed' : ''
        }`}
      >
        {isAnalyzing ? (
          <span className="flex items-center justify-center">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="inline-block w-6 h-6 border-2 border-white border-t-transparent rounded-full mr-2"
            />
            Analyzing...
          </span>
        ) : (
          'Analyze Text'
        )}
      </motion.button>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {analysis && (
        <div className="mt-6 space-y-6">
          {/* Reading Level Meter */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Reading Level Analysis</h3>
            <div className="flex items-center justify-center">
              <div className="relative w-48 h-48">
                <Doughnut data={chartData} options={chartOptions} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-primary">
                    {analysis.lexileScore}
                  </span>
                  <span className="text-sm text-gray-500">Lexile Score</span>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                Grade Level: {analysis.gradeLevel}
              </span>
            </div>
          </div>

          {/* Hard Words */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Hard Words</h3>
            <div className="space-y-4">
              {analysis.hardWords.map((word, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{word.word}</span>
                    <span className="text-sm text-gray-500">Appears {word.frequency} times</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Suggestions: {word.suggestions.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Readability Metrics */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Readability Metrics</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">
                  {analysis.readabilityMetrics.fleschKincaid.toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">Flesch-Kincaid</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">
                  {analysis.readabilityMetrics.colemanLiau.toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">Coleman-Liau</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">
                  {analysis.readabilityMetrics.automatedReadability.toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">Automated Readability</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadingLevelAnalyzer; 