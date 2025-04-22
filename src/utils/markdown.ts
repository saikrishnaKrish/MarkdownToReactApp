import matter from 'gray-matter';
import { Chapter } from '../types';

export const parseMarkdown = (fileContent: string, id: string): Chapter => {
  const { data, content } = matter(fileContent);
  
  return {
    id,
    title: data.title || 'Untitled Chapter',
    slug: data.slug || id,
    duration: data.duration || '0 min',
    content,
    order: data.order || 0,
    badge: data.badge,
    completed: data.completed || false
  };
};