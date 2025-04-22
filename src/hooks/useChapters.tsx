import { useState, useEffect, createContext, useContext } from 'react';
import { Chapter } from '../types';
import { parseMarkdown } from '../utils/markdown';
import { Buffer } from 'buffer';

// Make Buffer available globally
(window as any).Buffer = Buffer;

interface ChaptersContextType {
  chapters: Chapter[];
  loading: boolean;
  error: string | null;
  getChapterBySlug: (slug: string) => Chapter | undefined;
  getNextChapter: (currentOrder: number) => Chapter | undefined;
  getPreviousChapter: (currentOrder: number) => Chapter | undefined;
}

const ChaptersContext = createContext<ChaptersContextType>({
  chapters: [],
  loading: false,
  error: null,
  getChapterBySlug: () => undefined,
  getNextChapter: () => undefined,
  getPreviousChapter: () => undefined,
});

export const ChaptersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadChapters = async () => {
      try {
        // In a real application, you would fetch these from an API or import them dynamically
        // For simplicity, we're importing them statically here
        const chapter1 = await import('../data/chapters/chapter-1.md?raw');
        const chapter2 = await import('../data/chapters/chapter-2.md?raw');
        const chapter3 = await import('../data/chapters/chapter-3.md?raw');

        const parsedChapters = [
          parseMarkdown(chapter1.default, 'chapter-1'),
          parseMarkdown(chapter2.default, 'chapter-2'),
          parseMarkdown(chapter3.default, 'chapter-3'),
          parseMarkdown(chapter3.default, 'chapter-4'),
          parseMarkdown(chapter3.default, 'chapter-5'),
        ];

        // Mark the first chapter as completed for demo purposes
        parsedChapters[0].completed = true;

        // Sort chapters by order
        parsedChapters.sort((a, b) => a.order - b.order);

        setChapters(parsedChapters);
      } catch (err) {
        setError('Failed to load chapters');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadChapters();
  }, []);

  const getChapterBySlug = (slug: string): Chapter | undefined => {
    return chapters.find((chapter) => chapter.slug === slug);
  };

  const getNextChapter = (currentOrder: number): Chapter | undefined => {
    return chapters.find((chapter) => chapter.order === currentOrder + 1);
  };

  const getPreviousChapter = (currentOrder: number): Chapter | undefined => {
    return chapters.find((chapter) => chapter.order === currentOrder - 1);
  };

  return (
    <ChaptersContext.Provider
      value={{
        chapters,
        loading,
        error,
        getChapterBySlug,
        getNextChapter,
        getPreviousChapter,
      }}
    >
      {children}
    </ChaptersContext.Provider>
  );
};

export const useChapters = () => useContext(ChaptersContext);
