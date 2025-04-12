export interface AnalysisResult {
  lexileScore: number;
  gradeLevel: string;
  hardWords: Array<{
    word: string;
    frequency: number;
    suggestions: string[];
  }>;
  readabilityMetrics: {
    fleschKincaid: number;
    colemanLiau: number;
    automatedReadability: number;
  };
} 