import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Home } from './pages/Home';
import { CollectionDetail } from './pages/CollectionDetail';
import { AppProvider, useApp } from './context';
import { CategoryId } from './types';
import { ICONS } from './constants';

const MainLayout: React.FC = () => {
  const { theme, toggleTheme, language, setLanguage } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      
      {/* Sidebar */}
      <Sidebar 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-full md:ml-0 transition-all">
        
        {/* Mobile Header / Toolbar */}
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <button 
               onClick={() => setIsSidebarOpen(true)}
               className="md:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
             >
               <ICONS.Menu size={20} />
             </button>
             {/* Search placeholder */}
             <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800 rounded-full px-4 py-2 w-64 border border-transparent focus-within:border-blue-500/50 transition-all">
               <ICONS.Search size={16} className="text-slate-400 mr-2" />
               <input 
                 type="text" 
                 placeholder={language === 'zh' ? "搜索笔记..." : "Search notes..."}
                 className="bg-transparent border-none outline-none text-sm w-full dark:text-white placeholder-slate-400"
               />
             </div>
          </div>

          <div className="flex items-center gap-3">
             <button 
               onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
               className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors font-medium text-xs flex items-center gap-1"
             >
               <ICONS.Globe size={16} />
               <span>{language === 'zh' ? 'EN' : '中'}</span>
             </button>
             <button 
               onClick={toggleTheme}
               className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
             >
               {theme === 'light' ? <ICONS.Moon size={18} /> : <ICONS.Sun size={18} />}
             </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Home selectedCategory={selectedCategory} />} />
            <Route path="/collection/:id" element={<CollectionDetail />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <MainLayout />
      </HashRouter>
    </AppProvider>
  );
};

export default App;
