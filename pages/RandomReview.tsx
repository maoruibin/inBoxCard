import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context';
import { COLLECTIONS } from '../data';
import { Note, Collection } from '../types';
import { loadNoteContent } from '../utils/loader';
import { parseTimestampNotes } from '../utils/parser';
import { ICONS } from '../constants';

export const RandomReview: React.FC = () => {
  const { language } = useApp();
  const navigate = useNavigate();
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [sourceCollection, setSourceCollection] = useState<Collection | null>(null);
  const [loading, setLoading] = useState(true);
  const [animating, setAnimating] = useState(false);
  const mountedRef = useRef(false);

  // Core logic to pick a random note
  const pickRandomNote = useCallback(async (retryCount = 0) => {
    // Prevent infinite loops
    if (retryCount > 3) {
      setLoading(false);
      setAnimating(false);
      return;
    }

    setLoading(true);
    setAnimating(true);
    
    try {
      if (COLLECTIONS.length === 0) throw new Error("No collections available");
      
      const randomCollectionIndex = Math.floor(Math.random() * COLLECTIONS.length);
      const randomCollection = COLLECTIONS[randomCollectionIndex];
      
      const content = await loadNoteContent(randomCollection.filePath);
      const notes = parseTimestampNotes(content);
      
      if (notes.length > 0) {
        const randomNoteIndex = Math.floor(Math.random() * notes.length);
        
        // Wait a bit if we are re-rolling to show animation
        if (retryCount === 0) {
           await new Promise(resolve => setTimeout(resolve, 400));
        }

        setCurrentNote(notes[randomNoteIndex]);
        setSourceCollection(randomCollection);
        
        setLoading(false);
        setAnimating(false);
      } else {
        console.warn(`Collection ${randomCollection.id} is empty, retrying...`);
        pickRandomNote(retryCount + 1);
      }
    } catch (e) {
      console.error("Failed to pick random note", e);
      pickRandomNote(retryCount + 1);
    }
  }, []);

  // Initial load
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      pickRandomNote();
    }
  }, [pickRandomNote]);

  return (
    <div className="min-h-full flex flex-col relative overflow-hidden bg-slate-50 dark:bg-slate-900">
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-[100px] opacity-60"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-100/50 dark:bg-purple-900/10 rounded-full blur-[100px] opacity-60"></div>
      </div>

      {/* Header: Subtle Top Pill */}
      <div className="flex-shrink-0 pt-6 pb-2 text-center z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 shadow-sm transition-all hover:bg-white/80 dark:hover:bg-slate-800/80">
           <ICONS.Sparkles size={14} className="text-purple-500" />
           <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
             {language === 'zh' ? '随机漫步' : 'Serendipity'}
           </span>
        </div>
      </div>

      {/* Main Content Area: Centered Card */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-8 z-10 relative">
        <div className="w-full max-w-2xl perspective-1000">
          
          {loading ? (
             <div className="w-full bg-white dark:bg-slate-800 rounded-3xl p-12 shadow-xl border border-slate-100 dark:border-slate-700/50 flex flex-col items-center justify-center min-h-[360px]">
               <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-200 border-t-blue-500 mb-4"></div>
               <p className="text-slate-400 text-sm font-medium animate-pulse">
                 {language === 'zh' ? '正在寻找灵感...' : 'Seeking wisdom...'}
               </p>
             </div>
          ) : currentNote ? (
              <div className={`w-full bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl shadow-slate-200/50 dark:shadow-black/30 border border-slate-100 dark:border-slate-700 flex flex-col transition-all duration-500 transform ${animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'} min-h-[360px]`}>
                
                {/* Quote Icon */}
                <div className="mb-6 flex justify-center text-slate-200 dark:text-slate-700">
                  <ICONS.BookOpen size={32} strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div className="flex-1 flex items-center justify-center my-4">
                   <p className="text-xl md:text-3xl font-serif leading-relaxed text-slate-800 dark:text-slate-100 text-center select-text">
                     {currentNote.content}
                   </p>
                </div>

                {/* Footer Info */}
                <div className="mt-8 pt-8 border-t border-slate-50 dark:border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                    {currentNote.timestamp}
                  </div>
                  
                  {sourceCollection && (
                    <button 
                      onClick={() => navigate(`/collection/${sourceCollection.id}`)}
                      className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-700/30 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                    >
                      <span className="text-xs font-bold uppercase tracking-wider">
                        {language === 'zh' ? sourceCollection.name : sourceCollection.nameEn}
                      </span>
                      <ICONS.ArrowLeft className="rotate-180 w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  )}
                </div>
              </div>
          ) : (
             // Fallback
             <div className="w-full bg-white dark:bg-slate-800 rounded-3xl p-12 text-center shadow-xl">
               <ICONS.Dices size={40} className="mx-auto text-slate-300 mb-4" />
               <p className="text-slate-500">
                 {language === 'zh' ? '准备好开始探索了吗？' : 'Ready to explore?'}
               </p>
             </div>
          )}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="flex-shrink-0 pb-10 md:pb-16 flex items-center justify-center gap-4 z-10 px-4">
        {currentNote && (
          <button
            onClick={() => {
              if (currentNote) {
                navigator.clipboard.writeText(currentNote.content);
              }
            }}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 shadow-lg shadow-slate-200/50 dark:shadow-black/20 border border-slate-100 dark:border-slate-700 transition-all hover:-translate-y-1 active:scale-95"
            title={language === 'zh' ? '复制' : 'Copy'}
          >
            <ICONS.Copy size={20} />
          </button>
        )}

        <button
          onClick={() => pickRandomNote(0)}
          disabled={loading}
          className="flex items-center gap-3 px-8 py-3.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold shadow-xl shadow-slate-900/20 dark:shadow-white/10 hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
        >
          <ICONS.Shuffle size={18} className={loading ? 'animate-spin' : ''} />
          <span>
            {loading 
              ? (language === 'zh' ? '抽取中...' : 'Shuffling...') 
              : (currentNote ? (language === 'zh' ? '再来一条' : 'Next Wisdom') : (language === 'zh' ? '开始随机漫步' : 'Start Shuffling'))
            }
          </span>
        </button>
      </div>

    </div>
  );
};