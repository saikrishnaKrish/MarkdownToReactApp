import React from 'react';
import { Clock } from 'lucide-react';

interface ChapterHeaderProps {
  title: string;
  duration: string;
  badge?: string;
}

const ChapterHeader: React.FC<ChapterHeaderProps> = ({ title, duration, badge }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h1>
        
        <div className="flex items-center mt-4 md:mt-0 space-x-4">
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm">{duration}</span>
          </div>
          
          {badge && (
            <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full uppercase font-medium">
              {badge}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterHeader;