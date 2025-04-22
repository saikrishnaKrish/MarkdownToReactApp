import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { BookOpen, Award, CheckCircle } from 'lucide-react';
import { userProfile } from '../data/user';
import { useChapters } from '../hooks/useChapters';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { chapters } = useChapters();

  return (
    <aside className="w-full md:w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
      {/* User Profile */}
      <div className="flex items-center space-x-4 mb-8">
        <img 
          src={userProfile.avatar} 
          alt={userProfile.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h2 className="font-semibold text-gray-800">{userProfile.name}</h2>
          <div className="text-sm text-gray-500">
            {userProfile.chaptersCompleted} of {userProfile.totalChapters} chapters completed
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">Your Progress</span>
          <span className="text-sm font-medium text-blue-600">{userProfile.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
            style={{ width: `${userProfile.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Chapter Navigation */}
      <h3 className="font-medium text-gray-700 mb-4">Course Chapters</h3>
      <nav className="space-y-2">
        {chapters.map((chapter) => (
          <NavLink
            key={chapter.id}
            to={`/chapters/${chapter.slug}`}
            className={({ isActive }) => `
              flex items-center p-3 rounded-lg transition-all
              ${isActive 
                ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' 
                : 'text-gray-700 hover:bg-gray-100'
              }
            `}
          >
            <div className="flex items-center w-full">
              <div className="mr-3">
                {chapter.completed ? 
                  <CheckCircle className="h-5 w-5 text-green-500" /> : 
                  <BookOpen className="h-5 w-5 text-gray-400" />
                }
              </div>
              <div className="flex-1">
                <div className="font-medium">{chapter.title}</div>
                <div className="text-sm text-gray-500">{chapter.duration}</div>
              </div>
              {chapter.badge && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                  <Award className="w-3 h-3 mr-1" />
                  {chapter.badge}
                </span>
              )}
            </div>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;