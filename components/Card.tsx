import React from 'react';
import { Note } from '../types';
import { useApp } from '../context';
import { useNavigate } from 'react-router-dom';
import { ICONS } from '../constants';

interface CardProps {
  note: Note;
  collectionName?: string;
  collectionId?: string;
}

export const Card: React.FC<CardProps> = ({ note, collectionName, collectionId }) => {
  const { language } = useApp();
  const navigate = useNavigate();

  // Helper to clean up source string (remove leading dashes)
  const cleanSource = (source: string) => {
    return source.replace(/^[—\-\s]+/, '');
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:shadow-none border border-slate-100 dark:border-slate-700/50 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 flex flex-col h-full group relative hover:-translate-y-1">
      
      {/* 1. Context Label (Search Results only) */}
      {collectionName && (
        <div 
          onClick={(e) => {
            e.stopPropagation();
            if(collectionId) navigate(`/collection/${collectionId}`);
          }}
          className="mb-6 flex items-center gap-1.5 cursor-pointer opacity-60 hover:opacity-100 transition-opacity w-fit"
        >
          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-[10px] font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1">
            <ICONS.BookOpen size={10} />
            {collectionName}
          </span>
        </div>
      )}
      
      {/* 2. Main Content & Source (The Core) */}
      <div className="flex-1 flex flex-col">
        {/* Decorative Quote Mark */}
        <div className="text-slate-200 dark:text-slate-700/50 -ml-1 mb-4 select-none">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
             <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
          </svg>
        </div>

        <div className="space-y-6">
          <p className="text-slate-800 dark:text-slate-100 text-[17px] leading-[1.8] whitespace-pre-wrap font-serif tracking-wide selection:bg-blue-100 dark:selection:bg-blue-900">
            {note.content}
          </p>

          {/* Translation */}
          {language === 'en' && note.translation && (
            <p className="text-slate-500 dark:text-slate-400 text-sm border-l-2 border-slate-200 dark:border-slate-700 pl-3 italic mt-4">
              {note.translation}
            </p>
          )}
        </div>

        {/* Source Signature - Now part of the content flow */}
        {note.source && (
          <div className="mt-8 text-right pl-4">
            <div className="text-sm text-slate-400 dark:text-slate-500 font-medium italic relative inline-block group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
              <span className="opacity-30 mr-2">—</span>
              {cleanSource(note.source)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};