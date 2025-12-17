import React, { useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import LearnSection from './components/LearnSection';
import PracticeSection from './components/PracticeSection';
import TopicView from './components/TopicView';
import { Section, CppFeature } from './types';

const App = () => {
  const [currentSection, setCurrentSection] = useState<Section>('learn');
  const location = useLocation();
  const navigate = useNavigate();

  // Determine if we are on a topic page to hide/show specific UI if needed
  // or pass down to Header
  const isTopicPage = location.pathname !== '/';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
        selectedTopic={null} // Header might not need this anymore or we adapt it
        onBack={() => navigate('/')}
        showBack={isTopicPage}
      />
      <main className="pb-8">
        <Routes>
          <Route path="/" element={
            currentSection === 'learn'
              ? <LearnSection onTopicSelect={(topic) => navigate(`/${topic.id}`)} />
              : <PracticeSection onTopicSelect={(topic) => navigate(`/${topic.id}`)} />
          } />
          <Route path="/:topicId" element={<TopicView />} />
        </Routes>
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
