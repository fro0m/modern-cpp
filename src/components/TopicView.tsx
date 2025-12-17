import React from 'react';
import { Lightbulb, ExternalLink, Target, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import CodeEditor from './CodeEditor';
import { useTopicController } from '../controllers/useTopicController';

const TopicView: React.FC = () => {
  const {
    topic,
    relatedExercises,
    selectedExercise,
    userCode,
    setUserCode,
    isRunning,
    output,
    showHints,
    setShowHints,
    aiReview,
    isAnalyzing,
    selectExercise,
    runCode
  } = useTopicController();

  if (!topic) {
    return <div className="p-8 text-center">Loading topic...</div>;
  }

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
      <div className="flex flex-col space-y-8">
        {/* Theory Section */}
        <div className="space-y-6">
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
              onChange={() => { }} // Read-only for theory
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

          {/* Reference Documentation */}
          {topic.referenceUrl && (
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <h2 className="text-2xl font-semibold text-purple-900 mb-4 flex items-center">
                <ExternalLink className="h-6 w-6 mr-2" />
                Reference Documentation
              </h2>
              <p className="text-purple-800 mb-3">
                Learn more about this feature from the official C++ reference:
              </p>
              <a
                href={topic.referenceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View on cppreference.com
              </a>
            </div>
          )}
        </div>

        {/* Exercise Section - Accordion Style */}
        <div className="mt-8 border-t border-gray-200 pt-8">
          <div className="space-y-4">
            {relatedExercises.map((exercise) => (
              <div key={exercise.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <button
                  onClick={() => selectExercise(selectedExercise?.id === exercise.id ? null! : exercise)}
                  className={`w-full text-left p-6 flex items-center justify-between transition-colors ${selectedExercise?.id === exercise.id ? 'bg-gray-50' : 'hover:bg-gray-50'
                    }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="text-xl font-semibold text-gray-900">{exercise.title}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getDifficultyColor(exercise.difficulty)}`}>
                        {exercise.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-600">{exercise.description}</p>
                  </div>
                  <Target className={`h-6 w-6 text-gray-400 transition-transform ${selectedExercise?.id === exercise.id ? 'rotate-180 text-blue-600' : ''
                    }`} />
                </button>

                {selectedExercise?.id === exercise.id && (
                  <div className="p-6 border-t border-gray-200 bg-gray-50/50">
                    <div className="space-y-6">
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <h4 className="font-semibold text-amber-900 mb-2">Expected Output:</h4>
                        <pre className="text-sm text-amber-800 font-mono whitespace-pre-wrap">{exercise.expectedOutput}</pre>
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

                      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-1">
                        <CodeEditor
                          code={userCode}
                          onChange={setUserCode}
                          onRun={runCode}
                          height="400px"
                        />
                      </div>

                      {showHints && (
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                          <div className="flex items-center space-x-2 mb-3">
                            <AlertCircle className="h-5 w-5 text-blue-600" />
                            <h4 className="font-semibold text-blue-900">Hints</h4>
                          </div>
                          <ul className="space-y-2">
                            {exercise.hints.map((hint, index) => (
                              <li key={index} className="flex items-start space-x-2 text-blue-800">
                                <span className="text-blue-600 font-bold">•</span>
                                <span className="text-sm">{hint}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

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
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicView;