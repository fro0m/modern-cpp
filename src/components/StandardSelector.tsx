import React from 'react';
import { Standard } from '../types';

interface StandardSelectorProps {
  selectedStandard: Standard | 'performance' | 'templates' | 'multithreading' | 'all';
  onStandardChange: (standard: Standard | 'performance' | 'templates' | 'multithreading' | 'all') => void;
}

const StandardSelector: React.FC<StandardSelectorProps> = ({
  selectedStandard,
  onStandardChange
}) => {
  const standards = [
    { id: 'all', name: 'All Standards', color: 'bg-gray-100 text-gray-700' },
    { id: 'cpp14' as Standard, name: 'C++14', color: 'bg-orange-100 text-orange-700' },
    { id: 'cpp17' as Standard, name: 'C++17', color: 'bg-blue-100 text-blue-700' },
    { id: 'cpp20' as Standard, name: 'C++20', color: 'bg-purple-100 text-purple-700' },
    { id: 'cpp23' as Standard, name: 'C++23', color: 'bg-green-100 text-green-700' },
    { id: 'performance', name: 'Performance', color: 'bg-red-100 text-red-700' },
    { id: 'templates', name: 'Templates', color: 'bg-indigo-100 text-indigo-700' },
    { id: 'multithreading', name: 'Multithreading', color: 'bg-teal-100 text-teal-700' }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {standards.map(({ id, name, color }) => (
        <button
          key={id}
          onClick={() => onStandardChange(id as Standard | 'all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedStandard === id
              ? `${color} shadow-sm ring-2 ring-offset-2 ${
                  id === 'cpp17' ? 'ring-blue-300' :
                  id === 'cpp14' ? 'ring-orange-300' :
                  id === 'cpp20' ? 'ring-purple-300' :
                  id === 'cpp23' ? 'ring-green-300' :
                  id === 'performance' ? 'ring-red-300' :
                  id === 'templates' ? 'ring-indigo-300' :
                  id === 'multithreading' ? 'ring-teal-300' : 'ring-gray-300'
                }`
              : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:shadow-sm'
          }`}
        >
          {name}
        </button>
      ))}
    </div>
  );
};

export default StandardSelector;