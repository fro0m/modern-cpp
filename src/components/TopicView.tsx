import React, { useState } from 'react';
import { Lightbulb, ExternalLink, Target, Play, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { CppFeature, Exercise, CodeReview } from '../types';
import { exercises } from '../data/exercises';
import CodeEditor from './CodeEditor';

interface TopicViewProps {
  topic: CppFeature;
  onBack: () => void;
}

const TopicView: React.FC<TopicViewProps> = ({ topic, onBack }) => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [userCode, setUserCode] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string>('');
  const [showHints, setShowHints] = useState(false);
  const [aiReview, setAiReview] = useState<CodeReview | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const relatedExercises = exercises.filter(ex => ex.relatedTheory === topic.id);

  const selectExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setUserCode(exercise.starterCode);
    setOutput('');
    setShowHints(false);
    setAiReview(null);
  };

  const runCode = async () => {
    if (!userCode.trim()) return;
    
    setIsRunning(true);
    setOutput('');
    setAiReview(null);

    try {
      // Simulate code execution
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      let executionOutput = '';
      let success = false;
      
      if (selectedExercise) {
        if (userCode.includes('TODO')) {
          executionOutput = 'Error: Please complete the TODO sections before running.\n\nCompilation failed.';
        } else {
          // Simple validation - check if code contains expected patterns
          const hasExpectedPatterns = validateCode(userCode, selectedExercise);
          if (hasExpectedPatterns) {
            executionOutput = `Compilation successful!\n\nOutput:\n${selectedExercise.expectedOutput}\n\n✓ Test passed!`;
            success = true;
          } else {
            executionOutput = `Compilation successful!\n\nOutput:\nUnexpected output - please check your implementation.\n\n⚠ Test failed - output doesn't match expected result.`;
          }
        }
      }
      
      setOutput(executionOutput);
      
      // If compilation was successful, automatically trigger AI review
      if (success) {
        setIsAnalyzing(true);
        
        // Simulate AI analysis
        await new Promise(resolve => setTimeout(resolve, 2500));
        
        // Generate AI review based on the exercise and code
        const review = generateAIReview(userCode, selectedExercise);
        setAiReview(review);
        setIsAnalyzing(false);
      }
      
    } catch (error) {
      setOutput('Error: Failed to execute code. Please check your implementation.\n\nRuntime error.');
    } finally {
      setIsRunning(false);
    }
  };

  const validateCode = (code: string, exercise: Exercise): boolean => {
    // Simple validation based on exercise features
    switch (exercise.feature) {
      case 'generic-lambdas':
        return code.includes('auto') && code.includes('[');
      case 'structured-bindings':
        return code.includes('auto [');
      case 'std-optional':
        return code.includes('std::optional') || code.includes('std::nullopt');
      case 'concepts':
        return code.includes('concept') || code.includes('requires');
      case 'ranges':
        return code.includes('std::views::') || code.includes('std::ranges::');
      case 'std-expected':
        return code.includes('std::expected');
      case 'memory-layout':
        return code.includes('struct') && (code.includes('SoA') || code.includes('Array'));
      case 'lock-free':
        return code.includes('std::atomic') && code.includes('memory_order');
      case 'simd':
        return code.includes('__m256') || code.includes('_mm256_');
      case 'template-fundamentals':
        return code.includes('template') && code.includes('<');
      case 'sfinae-concepts':
        return code.includes('std::enable_if') || code.includes('concept');
      case 'variadic-templates':
        return code.includes('template<typename...') || code.includes('sizeof...');
      default:
        return true; // Default to success for unknown exercises
    }
  };

  const generateAIReview = (code: string, exercise: Exercise | null): CodeReview => {
    const suggestions: string[] = [];
    const issues: string[] = [];
    const bestPractices: string[] = [];
    const modernCppUsage: string[] = [];
    const topicSpecificFeedback: string[] = [];
    
    // Generic feedback
    if (code.includes('std::endl')) {
      suggestions.push("Consider using '\\n' instead of std::endl for better performance");
    }
    
    if (code.includes('for (int i = 0; i <') && !code.includes('auto')) {
      suggestions.push("Consider using range-based for loops or auto keyword for type deduction");
    }
    
    // Topic-specific feedback based on exercise
    if (exercise) {
      switch (exercise.feature) {
        case 'generic-lambdas':
          topicSpecificFeedback.push("Great use of generic lambdas! They provide type flexibility without sacrificing performance.");
          if (code.includes('auto')) {
            topicSpecificFeedback.push("Excellent use of auto parameters in lambda - this makes your code work with any printable type.");
          }
          modernCppUsage.push("Generic lambdas (C++14) eliminate the need for separate function templates in many cases");
          break;
          
        case 'structured-bindings':
          if (code.includes('auto [')) {
            topicSpecificFeedback.push("Perfect use of structured bindings! This makes tuple/pair decomposition much more readable.");
            modernCppUsage.push("Structured bindings (C++17) eliminate the need for std::get<> or .first/.second");
          } else {
            issues.push("Consider using structured bindings to decompose tuples/pairs more elegantly");
          }
          break;
          
        case 'std-optional':
          if (code.includes('std::nullopt')) {
            topicSpecificFeedback.push("Good use of std::nullopt for representing absent values safely.");
          }
          if (code.includes('.value_or(')) {
            topicSpecificFeedback.push("Excellent use of value_or() for providing default values!");
          }
          modernCppUsage.push("std::optional (C++17) provides type-safe nullable values without pointer risks");
          break;
          
        case 'concepts':
          if (code.includes('concept')) {
            topicSpecificFeedback.push("Excellent concept definition! This makes template constraints self-documenting.");
            modernCppUsage.push("Concepts (C++20) provide much clearer error messages than SFINAE");
          }
          if (code.includes('requires')) {
            topicSpecificFeedback.push("Good use of requires clause for specifying template requirements.");
          }
          break;
          
        case 'ranges':
          if (code.includes('std::views::')) {
            topicSpecificFeedback.push("Great use of range views! They provide lazy evaluation and composability.");
            modernCppUsage.push("Range views (C++20) enable functional programming patterns with zero-cost abstractions");
          }
          if (code.includes('|')) {
            topicSpecificFeedback.push("Excellent use of pipe operator for chaining range operations!");
          }
          break;
          
        case 'std-expected':
          if (code.includes('std::unexpected')) {
            topicSpecificFeedback.push("Perfect use of std::unexpected for explicit error handling!");
          }
          if (code.includes('.and_then(')) {
            topicSpecificFeedback.push("Great use of and_then() for chaining operations that might fail.");
          }
          modernCppUsage.push("std::expected (C++23) provides type-safe error handling without exceptions");
          break;

        case 'memory-layout':
          if (code.includes('alignas')) {
            topicSpecificFeedback.push("Excellent use of alignas for cache-line alignment!");
          }
          if (code.includes('SoA')) {
            topicSpecificFeedback.push("Great implementation of Structure of Arrays pattern for better cache performance.");
          }
          modernCppUsage.push("SoA pattern significantly improves cache locality for vectorized operations");
          break;

        case 'lock-free':
          if (code.includes('memory_order_acquire') || code.includes('memory_order_release')) {
            topicSpecificFeedback.push("Perfect use of acquire-release semantics for lock-free synchronization!");
          }
          if (code.includes('compare_exchange')) {
            topicSpecificFeedback.push("Excellent use of compare-and-swap for atomic updates.");
          }
          modernCppUsage.push("Lock-free programming eliminates thread contention and improves scalability");
          break;

        case 'simd':
          if (code.includes('_mm256_')) {
            topicSpecificFeedback.push("Great use of AVX intrinsics for vectorized computation!");
          }
          if (code.includes('_mm256_fmadd')) {
            topicSpecificFeedback.push("Excellent use of fused multiply-add for optimal performance.");
          }
          modernCppUsage.push("SIMD instructions can provide 4-8x performance improvement for parallel operations");
          break;
      }
    }
    
    // Best practices
    bestPractices.push("Use const correctness where possible");
    bestPractices.push("Prefer range-based for loops over traditional index-based loops");
    bestPractices.push("Use auto for type deduction when the type is obvious");
    
    const rating = Math.max(6, 10 - issues.length);
    
    return {
      suggestions,
      issues,
      bestPractices,
      modernCppUsage,
      topicSpecificFeedback,
      rating
    };
  };

  const getStandardColor = (standard: string) => {
    switch (standard) {
      case 'cpp14': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'cpp17': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cpp20': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'cpp23': return 'bg-green-100 text-green-800 border-green-200';
      case 'performance': return 'bg-red-100 text-red-800 border-red-200';
      case 'templates': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Theory Section */}
        <div className="xl:col-span-2 space-y-6">
          {/* Topic Header */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{topic.title}</h1>
              <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStandardColor(topic.standard)}`}>
                {topic.standard.toUpperCase()}
              </span>
            </div>
            <p className="text-lg text-gray-600">{topic.description}</p>
          </div>

          {/* Explanation */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Lightbulb className="h-6 w-6 text-yellow-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Explanation</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">{topic.explanation}</p>
          </div>

          {/* Code Example */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Code Example</h2>
            <CodeEditor
              code={topic.codeExample}
              onChange={() => {}} // Read-only for theory
              readOnly={true}
              height="400px"
            />
          </div>

          {/* Use Case */}
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4 flex items-center">
              <ExternalLink className="h-6 w-6 mr-2" />
              Real-World Use Case
            </h2>
            <p className="text-blue-800 leading-relaxed">{topic.useCase}</p>
          </div>
        </div>

        {/* Exercise Section */}
        <div className="xl:col-span-1">
          <div className="sticky top-8 space-y-6">
            {/* Exercise List */}
            {relatedExercises.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Practice Exercises</h3>
                <div className="space-y-3">
                  {relatedExercises.map((exercise) => (
                    <button
                      key={exercise.id}
                      onClick={() => selectExercise(exercise)}
                      className={`w-full text-left p-4 rounded-lg border transition-all ${
                        selectedExercise?.id === exercise.id
                          ? 'bg-blue-50 border-blue-200 shadow-sm'
                          : 'bg-gray-50 border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{exercise.title}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getDifficultyColor(exercise.difficulty)}`}>
                          {exercise.difficulty}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{exercise.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Exercise */}
            {selectedExercise ? (
              <div className="space-y-6">
                {/* Exercise Details */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Target className="h-6 w-6 text-blue-600" />
                    <h3 className="text-xl font-semibold text-gray-900">Current Exercise</h3>
                  </div>
                  
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-amber-900 mb-2">Expected Output:</h4>
                    <pre className="text-sm text-amber-800 font-mono whitespace-pre-wrap">{selectedExercise.expectedOutput}</pre>
                  </div>

                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-gray-900">Your Solution</h4>
                    <button
                      onClick={() => setShowHints(!showHints)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                    >
                      {showHints ? 'Hide Hints' : 'Show Hints'}
                    </button>
                  </div>
                </div>

                {/* Code Editor */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <CodeEditor
                    code={userCode}
                    onChange={setUserCode}
                    onRun={runCode}
                    height="350px"
                  />
                </div>

                {/* Hints */}
                {showHints && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <AlertCircle className="h-5 w-5 text-blue-600" />
                      <h4 className="font-semibold text-blue-900">Hints</h4>
                    </div>
                    <ul className="space-y-2">
                      {selectedExercise.hints.map((hint, index) => (
                        <li key={index} className="flex items-start space-x-2 text-blue-800">
                          <span className="text-blue-600 font-bold">•</span>
                          <span className="text-sm">{hint}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Output */}
                {(output || isRunning) && (
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Clock className="h-5 w-5 text-gray-600" />
                      <h4 className="font-semibold text-gray-900">Execution Result</h4>
                    </div>
                    
                    {isRunning ? (
                      <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                        <span className="text-blue-800">Running your code...</span>
                      </div>
                    ) : (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-mono whitespace-pre-wrap overflow-x-auto">
                        {output}
                      </pre>
                    )}
                  </div>
                )}

                {/* AI Review */}
                {(aiReview || isAnalyzing) && (
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <CheckCircle2 className="h-5 w-5 text-purple-600" />
                      <h4 className="font-semibold text-gray-900">AI Code Review</h4>
                      {aiReview && (
                        <div className="flex items-center space-x-1 ml-auto">
                          <span className="text-sm text-gray-600">Score:</span>
                          <span className="font-semibold text-purple-600">{aiReview.rating}/10</span>
                        </div>
                      )}
                    </div>

                    {isAnalyzing ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-3"></div>
                          <p className="text-gray-600">Analyzing your code...</p>
                        </div>
                      </div>
                    ) : aiReview && (
                      <div className="space-y-4">
                        {/* Topic-Specific Feedback */}
                        {aiReview.topicSpecificFeedback.length > 0 && (
                          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                            <h5 className="font-semibold text-purple-900 mb-2">Topic-Specific Feedback</h5>
                            <ul className="space-y-1">
                              {aiReview.topicSpecificFeedback.map((feedback, index) => (
                                <li key={index} className="flex items-start space-x-2 text-purple-800">
                                  <span className="text-purple-600 font-bold">✓</span>
                                  <span className="text-sm">{feedback}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Issues */}
                        {aiReview.issues.length > 0 && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <h5 className="font-semibold text-red-900 mb-2">Issues Found</h5>
                            <ul className="space-y-1">
                              {aiReview.issues.map((issue, index) => (
                                <li key={index} className="flex items-start space-x-2 text-red-800">
                                  <span className="text-red-600 font-bold">!</span>
                                  <span className="text-sm">{issue}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Suggestions */}
                        {aiReview.suggestions.length > 0 && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <h5 className="font-semibold text-yellow-900 mb-2">Suggestions</h5>
                            <ul className="space-y-1">
                              {aiReview.suggestions.map((suggestion, index) => (
                                <li key={index} className="flex items-start space-x-2 text-yellow-800">
                                  <span className="text-yellow-600 font-bold">💡</span>
                                  <span className="text-sm">{suggestion}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Modern C++ Usage */}
                        {aiReview.modernCppUsage.length > 0 && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h5 className="font-semibold text-green-900 mb-2">Modern C++ Insights</h5>
                            <ul className="space-y-1">
                              {aiReview.modernCppUsage.map((usage, index) => (
                                <li key={index} className="flex items-start space-x-2 text-green-800">
                                  <span className="text-green-600 font-bold">🚀</span>
                                  <span className="text-sm">{usage}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
                <Target className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Select an Exercise</h3>
                <p className="text-gray-600">Choose a practice exercise to start coding and get AI feedback.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicView;