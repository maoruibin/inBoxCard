import React from 'react';
import { CATEGORIES, ICONS } from '../constants';
import { useApp } from '../context';
import { CategoryId } from '../types';

interface SidebarProps {
  selectedCategory: CategoryId | 'all';
  onSelectCategory: (id: CategoryId | 'all') => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ selectedCategory, onSelectCategory, isOpen, onClose }) => {
  const { language } = useApp();

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar Content */}
      <div className={`
        fixed top-0 left-0 bottom-0 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 
        transform transition-transform duration-300 ease-in-out z-30
        md:translate-x-0 md:static md:h-screen
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center space-x-2 mb-10 text-slate-800 dark:text-white">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              i
            </div>
            <h1 className="text-xl font-bold tracking-tight">inBox Hub</h1>
          </div>

          <nav className="space-y-1 flex-1">
            <button
              onClick={() => { onSelectCategory('all'); onClose(); }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                selectedCategory === 'all' 
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 font-medium shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <span className="w-5 h-5 flex items-center justify-center">
                <ICONS.Sparkles size={18} />
              </span>
              <span>{language === 'zh' ? '全部精选' : 'All Collections'}</span>
            </button>

            <div className="my-4 border-t border-slate-100 dark:border-slate-800/50" />
            
            <div className="space-y-1">
              <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                {language === 'zh' ? '分类' : 'Categories'}
              </p>
              {CATEGORIES.map(category => {
                const Icon = ICONS[category.iconName];
                return (
                  <button
                    key={category.id}
                    onClick={() => { onSelectCategory(category.id); onClose(); }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                      selectedCategory === category.id 
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 font-medium shadow-sm' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{language === 'zh' ? category.label : category.labelEn}</span>
                  </button>
                );
              })}
            </div>
          </nav>

          <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
             <div className="text-xs text-slate-400 text-center">
               In Memory of the Code
             </div>
          </div>
        </div>
      </div>
    </>
  );
};
