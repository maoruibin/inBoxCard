import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [showPromo, setShowPromo] = useState(true);
  const navigate = useNavigate();

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
        md:translate-x-0 md:static md:h-full flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Fixed Header */}
        <div className="p-6 pb-4 flex-shrink-0">
          <div className="flex items-center space-x-2 text-slate-800 dark:text-white">
            <img 
              src="https://gudong.s3.bitiful.net/icon/inbox.svg?no-wait=on" 
              alt="inBox Logo" 
              className="w-8 h-8 object-contain"
            />
            <h1 className="text-xl font-bold tracking-tight">inBox Card</h1>
          </div>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-6">
          <nav className="space-y-1 pb-4">
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
        </div>

        {/* Fixed Footer */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex-shrink-0 space-y-4 bg-white dark:bg-slate-900 z-10">
           {/* GongZhongHao Promo */}
           {showPromo && (
             <div className="relative bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50 animate-fadeIn">
                <button 
                  onClick={(e) => { e.stopPropagation(); setShowPromo(false); }}
                  className="absolute top-2 right-2 text-slate-300 hover:text-slate-500 dark:text-slate-600 dark:hover:text-slate-400 transition-colors p-1"
                  title={language === 'zh' ? '关闭' : 'Close'}
                >
                  <ICONS.X size={14} />
                </button>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  关注公众号：咕咚同学
                </p>
                <div className="bg-white p-2 rounded-lg shadow-sm mb-3">
                   <img 
                    src="https://gudong.s3.bitiful.net/asset/gongzhonghao.jpg" 
                    alt="咕咚同学" 
                    className="w-full rounded-md aspect-square object-cover"
                  />
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 text-center leading-relaxed">
                  回复 <b className="text-blue-600 dark:text-blue-400">inbox</b> 加入<br/>用户交流微信群
                </p>
             </div>
           )}

           {/* Github Link */}
           <a 
             href="https://github.com/maoruibin/inBoxCard" 
             target="_blank" 
             rel="noopener noreferrer"
             className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold transition-transform hover:scale-[1.02] active:scale-95 shadow-md"
           >
             <ICONS.Github size={16} />
             <span>GitHub</span>
           </a>

           <div className="text-xs text-slate-300 dark:text-slate-600 text-center font-mono">
             Designed by Gemini&咕咚
           </div>
        </div>
      </div>
    </>
  );
};