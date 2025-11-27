import React, { useState } from 'react';
import { Note } from '../types';
import { useApp } from '../context';
import { generateInsight } from '../services/geminiService';
import { ICONS } from '../constants';

interface CardProps {
  note: Note;
}

export const Card: React.FC<CardProps> = ({ note }) => {
  const { language } = useApp();
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAiAnalyze = async () => {
    if (insight) return; // Already generated
    setLoading(true);
    setError(null);
    try {
      const result = await generateInsight(note.content);
      setInsight(result);
    } catch (err: any) {
      // In a real app, prompt for API key here
      setError("Set API Key in env to use AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700/50 hover:shadow-md transition-shadow flex flex-col h-full group">
      <div className="text-xs text-slate-400 mb-3 font-mono">
        {note.timestamp}
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
        <div className="flex gap-2">
          {note.tags?.map(tag => (
            <span key={tag} className="px-2 py-1 bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 text-xs rounded-md">
              #{tag}
            </span>
          ))}
        </div>
        
        <button 
          onClick={handleAiAnalyze}
          disabled={loading}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 hover:text-blue-600 text-sm flex items-center gap-1"
          title="Analyze with AI"
        >
          <ICONS.Sparkles size={14} />
          {loading ? 'Thinking...' : 'AI Insight'}
        </button>
      </div>

      {/* AI Insight Box */}
      {(insight || error) && (
        <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-sm text-slate-700 dark:text-slate-300 animate-fadeIn">
          {error ? (
             <span className="text-red-500">{error}</span>
          ) : (
             <>
               <strong className="block text-blue-700 dark:text-blue-400 mb-1 flex items-center gap-1">
                 <ICONS.Sparkles size={12}/> Gemini Insight
               </strong>
               {insight}
             </>
          )}
        </div>
      )}
    </div>
  );
};
