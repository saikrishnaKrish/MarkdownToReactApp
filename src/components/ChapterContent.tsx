import React from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useChapters } from '../hooks/useChapters';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import ChapterHeader from './ChapterHeader';

const ChapterContent: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getChapterBySlug, getNextChapter, getPreviousChapter } = useChapters();
  
  const currentChapter = getChapterBySlug(slug || '');
  const nextChapter = getNextChapter(currentChapter?.order || 0);
  const prevChapter = getPreviousChapter(currentChapter?.order || 0);
  
  if (!currentChapter) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Chapter Not Found</h2>
          <p className="text-gray-600">The chapter you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <ChapterHeader 
        title={currentChapter.title} 
        duration={currentChapter.duration}
        badge={currentChapter.badge}
      />
      
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mt-6">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-gray-900 mb-6" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4" {...props} />,
            h3: ({ node, ...props }) => <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3" {...props} />,
            p: ({ node, ...props }) => <p className="text-gray-700 leading-relaxed mb-4" {...props} />,
            ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2" {...props} />,
            ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-6 text-gray-700 space-y-2" {...props} />,
            li: ({ node, ...props }) => <li className="mb-1" {...props} />,
            strong: ({ node, ...props }) => <strong className="font-semibold text-gray-900" {...props} />,
            a: ({ node, ...props }) => <a className="text-blue-600 hover:underline" {...props} />,
          }}
        >
          {currentChapter.content}
        </ReactMarkdown>
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between mt-8 mb-12">
        {prevChapter ? (
          <button 
            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
            onClick={() => window.location.href = `/chapters/${prevChapter.slug}`}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            <span>Previous: {prevChapter.title}</span>
          </button>
        ) : <div></div>}
        
        {nextChapter && (
          <button 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition-colors"
            onClick={() => window.location.href = `/chapters/${nextChapter.slug}`}
          >
            <span>Next: {nextChapter.title}</span>
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ChapterContent;