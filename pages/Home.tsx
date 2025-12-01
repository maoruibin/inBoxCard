import React, { useMemo, useState, useEffect } from 'react';
import { useApp } from '../context';
import { COLLECTIONS } from '../data';
import { CategoryId, Note } from '../types';
import { ICONS } from '../constants';
import { useNavigate } from 'react-router-dom';
import { NOTES_CONTENT } from '../src/resources';
import { parseTimestampNotes } from '../utils/parser';
import { Card } from '../components/Card';

interface HomeProps {
  selectedCategory: CategoryId | 'all';
}

interface SearchResult extends Note {
  collectionName: string;
  collectionId: string;
}

export const Home: React.FC<HomeProps> = ({ selectedCategory }) => {
  const { language, searchQuery, setSearchQuery } = useApp();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Filter collections for the grid view
  const filteredCollections = useMemo(() => {
    if (searchQuery.trim()) return []; // Use search results view instead
    
    let result = COLLECTIONS;
    if (selectedCategory !== 'all') {
      result = result.filter(c => c.category === selectedCategory);
    }
    return result;
  }, [selectedCategory, searchQuery]);

  // Perform deep search on content
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const query = searchQuery.toLowerCase();
    const results: SearchResult[] = [];

    // Simple delay to avoid blocking UI on every keystroke (debounce simulation)
    const timeoutId = setTimeout(() => {
      COLLECTIONS.forEach(col => {
        // Try to retrieve content. Handle potential path differences.
        const content = NOTES_CONTENT[col.filePath] || NOTES_CONTENT[col.filePath.replace('/', '')];
        
        if (content) {
          const notes = parseTimestampNotes(content);
          notes.forEach(note => {
            if (
              note.content.toLowerCase().includes(query) || 
              (note.tags && note.tags.some(t => t.toLowerCase().includes(query)))
            ) {
              results.push({
                ...note,
                collectionName: language === 'zh' ? col.name : col.nameEn,
                collectionId: col.id
              });
            }
          });
        }
      });
      setSearchResults(results);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, language]);

  // Render Search Results
  if (searchQuery.trim()) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <ICONS.Search size={24} className="text-blue-500" />
            {language === 'zh' ? '搜索结果' : 'Search Results'}
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            {isSearching 
              ? (language === 'zh' ? '正在搜索...' : 'Searching...') 
              : (language === 'zh' ? `找到 ${searchResults.length} 条关于 "${searchQuery}" 的笔记` : `Found ${searchResults.length} notes for "${searchQuery}"`)}
          </p>
        </div>

        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {searchResults.map(note => (
              <Card 
                key={note.id} 
                note={note} 
                collectionName={note.collectionName}
                collectionId={note.collectionId}
              />
            ))}
          </div>
        ) : (
          !isSearching && (
            <div className="text-center py-20 text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700">
              <ICONS.Search size={48} className="mx-auto mb-4 opacity-50" />
              <p>{language === 'zh' ? '没有找到相关笔记' : 'No matching notes found'}</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-4 text-blue-500 hover:underline"
              >
                {language === 'zh' ? '清除搜索' : 'Clear search'}
              </button>
            </div>
          )
        )}
      </div>
    );
  }

  // Render Default Collection Grid
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          {language === 'zh' ? '发现知识' : 'Discover Knowledge'}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-lg">
          {language === 'zh' 
            ? '探索精粹，一键收纳。' 
            : 'Curated knowledge, instantly captured.'}
        </p>
        <div className="mt-3">
          <button
            onClick={() => navigate('/contribute')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
          >
            {language === 'zh' ? '想贡献卡片？查看贡献指南' : 'Want to contribute? See the guide'}
            <ICONS.ExternalLink size={12} />
          </button>
        </div>
      </div>

      {filteredCollections.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCollections.map(collection => (
            <div 
              key={collection.id}
              onClick={() => navigate(`/collection/${collection.id}`)}
              className="group cursor-pointer bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`h-32 ${collection.coverColor} relative p-6 flex flex-col justify-end`}>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-lg text-white group-hover:scale-110 transition-transform">
                  <ICONS.BookOpen size={20} />
                </div>
                <h3 className="text-white font-bold text-xl drop-shadow-md">
                  {language === 'zh' ? collection.name : collection.nameEn}
                </h3>
              </div>
              <div className="p-5">
                <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mb-4 h-10">
                  {collection.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span className="flex items-center gap-1">
                    <ICONS.Feather size={12} />
                    {collection.author}
                  </span>
                  <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full text-slate-500 dark:text-slate-300 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                    {collection.count || 0} Cards
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-slate-400">
          <p>{language === 'zh' ? '没有找到相关分类' : 'No collections found'}</p>
        </div>
      )}
    </div>
  );
};