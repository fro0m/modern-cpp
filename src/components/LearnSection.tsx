import React, { useState } from 'react';
import { ChevronDown, ChevronRight, ExternalLink, Lightbulb, Play, CheckCircle2, AlertCircle, Target } from 'lucide-react';
import { CppFeature, Standard, Exercise, CodeReview } from '../types';
import { cppFeatures } from '../data/features';
import { exercises } from '../data/exercises';
import StandardSelector from './StandardSelector';
import CodeEditor from './CodeEditor';

interface LearnSectionProps {
  onTopicSelect: (topic: CppFeature) => void;
}

const LearnSection: React.FC<LearnSectionProps> = ({ onTopicSelect }) => {
  const [selectedStandard, setSelectedStandard] = useState<Standard | 'performance' | 'templates' | 'all'>('all');

  const filteredFeatures = cppFeatures.filter(
    feature => selectedStandard === 'all' || feature.standard === selectedStandard
  );

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

  const getExerciseCount = (featureId: string) => {
    return exercises.filter(ex => ex.relatedTheory === featureId).length;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Learn Modern C++</h2>
        <p className="text-lg text-gray-600 mb-6">
          Explore modern C++ features with detailed theory and hands-on practice. 
          Each topic includes comprehensive explanations, code examples, and interactive exercises with AI-powered feedback.
        </p>
        <StandardSelector 
          selectedStandard={selectedStandard} 
          onStandardChange={setSelectedStandard} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Theory Section */}
        <div className="lg:col-span-2 xl:col-span-3 space-y-4">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Theory & Concepts</h3>
          
          {filteredFeatures.map((feature) => {
            const exerciseCount = getExerciseCount(feature.id);
            
            return (
              <div
                key={feature.id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <button
                  onClick={() => onTopicSelect(feature)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-xl font-semibold text-gray-900">{feature.title}</h4>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStandardColor(feature.standard)}`}>
                        {feature.standard.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-600">{feature.description}</p>
                    {exerciseCount > 0 && (
                      <p className="text-sm text-blue-600 mt-2">
                        {exerciseCount} practice exercise{exerciseCount > 1 ? 's' : ''} available
                      </p>
                    )}
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 ml-4" />
                </button>
              </div>
            );
          })}

          {filteredFeatures.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📚</div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">No features found</h4>
              <p className="text-gray-600">Try selecting a different C++ standard.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearnSection;