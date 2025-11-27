import React, { useMemo } from 'react';
import { useApp } from '../context';
import { COLLECTIONS } from '../data';
import { CategoryId } from '../types';
import { ICONS } from '../constants';
import { useNavigate } from 'react-router-dom';

interface HomeProps {
  selectedCategory: CategoryId | 'all';
}

export const Home: React.FC<HomeProps> = ({ selectedCategory }) => {
  const { language } = useApp();
  const navigate = useNavigate();

  const filteredCollections = useMemo(() => {
    if (selectedCategory === 'all') return COLLECTIONS;
    return COLLECTIONS.filter(c => c.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          {language === 'zh' ? '发现知识' : 'Discover Knowledge'}
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          {language === 'zh' 
            ? '探索精心整理的卡片笔记集合，支持一键导出到 inBox。' 
            : 'Explore curated timestamped note collections, ready for inBox.'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCollections.map(collection => (
          <div 
            key={collection.id}
            onClick={() => navigate(`/collection/${collection.id}`)}
            className="group cursor-pointer bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className={`h-32 ${collection.coverColor} relative p-6 flex flex-col justify-end`}>
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-lg text-white">
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
                <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full text-slate-500 dark:text-slate-300">
                  {collection.count || 0} Cards
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};