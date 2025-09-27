import React from 'react';
import { BookOpen, Code2, ArrowLeft } from 'lucide-react';
import { Section, CppFeature } from '../types';

interface HeaderProps {
  currentSection: Section;
  onSectionChange: (section: Section) => void;
  selectedTopic?: CppFeature | null;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  currentSection, 
  onSectionChange, 
  selectedTopic, 
  onBack 
}) => {
  const sections = [
    { id: 'learn' as Section, name: 'Learn & Practice', icon: BookOpen },
    { id: 'practice' as Section, name: 'Exercises', icon: Code2 }
  ];

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
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            {selectedTopic && onBack && (
              <button
                onClick={onBack}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors mr-4"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm font-medium">Back</span>
              </button>
            )}
            <Code2 className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Modern C++ Learning
              </h1>
              {selectedTopic && (
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStandardColor(selectedTopic.standard)}`}>
                    {selectedTopic.standard.toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-600">{selectedTopic.title}</span>
                </div>
              )}
            </div>
          </div>
          
          {!selectedTopic && (
            <nav className="flex space-x-1">
              {sections.map(({ id, name, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => onSectionChange(id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentSection === id
                      ? 'bg-blue-100 text-blue-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{name}</span>
                </button>
              ))}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;