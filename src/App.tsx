import React, { useState } from 'react';
import Header from './components/Header';
import LearnSection from './components/LearnSection';
import PracticeSection from './components/PracticeSection';
import TopicView from './components/TopicView';
import { Section, CppFeature } from './types';

const App = () => {
  const [currentSection, setCurrentSection] = useState<Section>('learn');
  const [selectedTopic, setSelectedTopic] = useState<CppFeature | null>(null);

  const renderSection = () => {
    if (selectedTopic) {
      return (
        <TopicView 
          topic={selectedTopic} 
          onBack={() => setSelectedTopic(null)}
        />
      );
    }

    switch (currentSection) {
      case 'learn':
        return <LearnSection onTopicSelect={setSelectedTopic} />;
      case 'practice':
        return <PracticeSection onTopicSelect={setSelectedTopic} />;
      default:
        return <LearnSection onTopicSelect={setSelectedTopic} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentSection={currentSection} 
        onSectionChange={setCurrentSection}
        selectedTopic={selectedTopic}
        onBack={() => setSelectedTopic(null)}
      />
      <main className="pb-8">
        {renderSection()}
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-600">
            Modern C++ Learning Platform - Master C++14, C++17, C++20, and C++23 features
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Interactive learning with AI-powered code review
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
