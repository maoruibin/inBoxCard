import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { COLLECTIONS } from '../data';
import { useApp } from '../context';
import { ICONS } from '../constants';
import { Card } from '../components/Card';
import { Note } from '../types';
import { parseTimestampNotes } from '../utils/parser';

export const CollectionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language } = useApp();
  const [viewMode, setViewMode] = useState<'cards' | 'raw'>('cards');
  const [copied, setCopied] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [rawContent, setRawContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const collection = useMemo(() => COLLECTIONS.find(c => c.id === id), [id]);

  useEffect(() => {
    if (collection) {
      setLoading(true);
      fetch(collection.filePath)
        .then(res => {
          if (!res.ok) throw new Error('Failed to load notes file');
          return res.text();
        })
        .then(text => {
          setRawContent(text);
          const parsedNotes = parseTimestampNotes(text);
          setNotes(parsedNotes);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setError(language === 'zh' ? '加载笔记失败，请确保文件存在。' : 'Failed to load notes. File might be missing.');
          setLoading(false);
        });
    }
  }, [collection, language]);

  if (!collection) {
    return <div className="p-10 text-center text-slate-500">Collection not found</div>;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(rawContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([rawContent], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${collection.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors gap-2"
        >
          <ICONS.ArrowLeft size={20} />
          {language === 'zh' ? '返回' : 'Back'}
        </button>

        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg self-start">
          <button
            onClick={() => setViewMode('cards')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              viewMode === 'cards' 
                ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' 
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
            }`}
          >
            {language === 'zh' ? '卡片视图' : 'Cards'}
          </button>
          <button
            onClick={() => setViewMode('raw')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              viewMode === 'raw' 
                ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' 
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
            }`}
          >
            {language === 'zh' ? '时间戳源码' : 'Timestamp Source'}
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
          {language === 'zh' ? collection.name : collection.nameEn}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">
          {collection.description}
        </p>
        <p className="text-xs font-mono text-slate-400 mt-2 bg-slate-100 dark:bg-slate-800/50 inline-block px-2 py-1 rounded">
          Source: {collection.filePath}
        </p>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-center py-20 bg-red-50 dark:bg-red-900/10 rounded-xl text-red-500">
          {error}
        </div>
      ) : viewMode === 'cards' ? (
        notes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {notes.map(note => (
              <Card key={note.id} note={note} />
            ))}
          </div>
        ) : (
          <div className="text-center text-slate-400 py-20">No notes found in this file.</div>
        )
      ) : (
        <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-700 flex flex-col animate-fadeIn flex-1 min-h-[500px]">
          <div className="bg-slate-800 px-4 py-3 flex items-center justify-between border-b border-slate-700">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="flex gap-2">
              <button 
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs rounded transition-colors"
                title="Download .txt"
              >
                <ICONS.Download size={14} />
                <span>.txt</span>
              </button>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded font-medium transition-colors"
              >
                {copied ? <span className="text-green-300">Copied!</span> : <ICONS.Copy size={14} />}
                <span>{language === 'zh' ? '复制到 inBox' : 'Copy for inBox'}</span>
              </button>
            </div>
          </div>
          <div className="p-6 overflow-x-auto flex-1">
            <pre className="font-mono text-sm text-emerald-400 whitespace-pre-wrap leading-relaxed">
              {rawContent}
            </pre>
          </div>
        </div>
      )}
      
      {/* Footer hint for raw view */}
      {viewMode === 'raw' && (
        <p className="mt-4 text-center text-sm text-slate-400">
           {language === 'zh' 
             ? '复制以上内容，在 inBox App 首页 > 右上角菜单 > 导入笔记 > 时间戳笔记 即可。' 
             : 'Copy content above. Import in inBox App via Menu > Import Notes > Timestamp Notes.'}
        </p>
      )}
    </div>
  );
};