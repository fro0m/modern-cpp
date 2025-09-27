import React, { useState } from 'react';
import { Trophy, Target, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Exercise, Standard, CppFeature } from '../types';
import { exercises } from '../data/exercises';
import { cppFeatures } from '../data/features';
import StandardSelector from './StandardSelector';
import CodeEditor from './CodeEditor';

interface PracticeSectionProps {
  onTopicSelect: (topic: CppFeature) => void;
}

const PracticeSection: React.FC<PracticeSectionProps> = ({ onTopicSelect }) => {
  const [selectedStandard, setSelectedStandard] = useState<Standard | 'performance' | 'templates' | 'all'>('all');

  const filteredExercises = exercises.filter(
    exercise => selectedStandard === 'all' || exercise.standard === selectedStandard
  );

  const groupedExercises = {
    beginner: filteredExercises.filter(ex => ex.difficulty === 'beginner'),
    intermediate: filteredExercises.filter(ex => ex.difficulty === 'intermediate'),
    advanced: filteredExercises.filter(ex => ex.difficulty === 'advanced')
  };

  const selectTopic = (exercise: Exercise) => {
    // Find the related topic and select it
    const relatedTopic = cppFeatures.find(feature => feature.id === exercise.relatedTheory);
    if (relatedTopic) {
      onTopicSelect(relatedTopic);
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

  const getStandardColor = (standard: Standard) => {
    switch (standard) {
      case 'cpp14': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'cpp17': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cpp20': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'cpp23': return 'bg-green-100 text-green-800 border-green-200';
      case 'performance': return 'bg-red-100 text-red-800 border-red-200';
      case 'templates': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Practice Exercises</h2>
        <p className="text-lg text-gray-600 mb-6">
          Put your modern C++ knowledge to the test with progressive exercises.
          Start with beginner challenges and work your way up to advanced implementations.
        </p>
        <StandardSelector 
          selectedStandard={selectedStandard} 
          onStandardChange={setSelectedStandard} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Exercise List */}
        <div className="lg:col-span-1 space-y-6">
          {Object.entries(groupedExercises).map(([difficulty, exerciseList]) => (
            <div key={difficulty} className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <Trophy className={`h-5 w-5 ${
                    difficulty === 'beginner' ? 'text-green-600' :
                    difficulty === 'intermediate' ? 'text-yellow-600' : 'text-red-600'
                  }`} />
                  <h3 className="text-lg font-semibold text-gray-900 capitalize">{difficulty}</h3>
                  <span className="text-sm text-gray-500">({exerciseList.length})</span>
                </div>
              </div>
              
              <div className="p-2">
                {exerciseList.map((exercise) => (
                  <button
                    key={exercise.id}
                    onClick={() => selectTopic(exercise)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 mb-2 ${
                      'hover:bg-gray-50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm">{exercise.title}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStandardColor(exercise.standard)}`}>
                        {exercise.standard.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{exercise.description}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getDifficultyColor(exercise.difficulty)}`}>
                      {exercise.difficulty}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Exercise Detail */}
        <div className="lg:col-span-2 flex items-center justify-center">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
            <Target className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Select an Exercise</h3>
            <p className="text-gray-600">Choose an exercise from the list to open the topic with theory and practice exercises.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeSection;