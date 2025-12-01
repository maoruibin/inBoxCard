import React from 'react';
import { Note } from '../types';
import { useApp } from '../context';
import { useNavigate } from 'react-router-dom';

interface CardProps {
  note: Note;
  collectionName?: string;
  collectionId?: string;
}

export const Card: React.FC<CardProps> = ({ note, collectionName, collectionId }) => {
  const { language } = useApp();
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700/50 hover:shadow-md transition-all duration-300 flex flex-col h-full group relative">
      <div className="flex justify-between items-start mb-3">
        <div className="text-xs text-slate-400 font-mono">
          {note.timestamp}
        </div>
        {collectionName && (
          <span 
            onClick={(e) => {
              e.stopPropagation();
              if(collectionId) navigate(`/collection/${collectionId}`);
            }}
            className="text-[10px] uppercase tracking-wider font-bold text-blue-500 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
          >
            {collectionName}
          </span>
        )}
      </div>
      
      <div className="flex-1">
        <p className="text-slate-800 dark:text-slate-100 text-lg leading-relaxed whitespace-pre-wrap font-serif">
          {note.content}
        </p>
        
        {language === 'en' && note.translation && (
          <p className="mt-4 text-slate-500 dark:text-slate-400 text-sm border-l-2 border-slate-200 dark:border-slate-700 pl-3 italic">
            {note.translation}
          </p>
        )}
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700/50 flex flex-wrap gap-2 items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {note.tags?.map(tag => (
            <span key={tag} className="px-2 py-1 bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 text-xs rounded-md">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};