export interface CppFeature {
  id: string;
  title: string;
  standard: 'cpp14' | 'cpp17' | 'cpp20' | 'cpp23' | 'performance' | 'templates';
  description: string;
  codeExample: string;
  explanation: string;
  useCase: string;
  referenceUrl?: string; // Optional cppreference.com link
}

export interface Exercise {
  id: string;
  title: string;
  standard: 'cpp14' | 'cpp17' | 'cpp20' | 'cpp23' | 'performance' | 'templates';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  starterCode: string;
  expectedOutput: string;
  hints: string[];
  feature: string;
  relatedTheory: string; // ID of related theory feature
}

export interface CodeReview {
  suggestions: string[];
  issues: string[];
  bestPractices: string[];
  modernCppUsage: string[];
  topicSpecificFeedback: string[];
  rating: number;
}

export type Section = 'learn' | 'practice';

export interface AppState {
  currentSection: Section;
  selectedTopic: CppFeature | null;
  selectedExercise: Exercise | null;
}