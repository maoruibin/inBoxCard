import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context';
import { COLLECTIONS } from '../data';
import { Note, Collection } from '../types';
import { loadNoteContent } from '../utils/loader';
import { parseTimestampNotes } from '../utils/parser';
import { ICONS } from '../constants';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';

export const RandomReview: React.FC = () => {
  const { language } = useApp();
  const navigate = useNavigate();
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [sourceCollection, setSourceCollection] = useState<Collection | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Preview State
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  
  const mountedRef = useRef(false);
  const exportRef = useRef<HTMLDivElement>(null);

  // Helper to clean up source string
  const cleanSource = (source: string) => {
    return source.replace(/^[—\-\s]+/, '');
  };

  // Core logic to pick a random note
  const pickRandomNote = useCallback(async (retryCount = 0) => {
    if (retryCount > 3) {
      setLoading(false);
      return;
    }

    setLoading(true);
    
    try {
      if (COLLECTIONS.length === 0) throw new Error("No collections available");
      
      const randomCollectionIndex = Math.floor(Math.random() * COLLECTIONS.length);
      const randomCollection = COLLECTIONS[randomCollectionIndex];
      
      const content = await loadNoteContent(randomCollection.filePath);
      const notes = parseTimestampNotes(content);
      
      if (notes.length > 0) {
        const randomNoteIndex = Math.floor(Math.random() * notes.length);
        
        // Artificial delay for UX smoothness
        if (retryCount === 0) {
           await new Promise(resolve => setTimeout(resolve, 300));
        }

        setCurrentNote(notes[randomNoteIndex]);
        setSourceCollection(randomCollection);
        setLoading(false);
      } else {
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

  // Generate Image Logic
  const handleGenerateImage = async () => {
    if (!exportRef.current || isGenerating) return;
    setIsGenerating(true);
    
    try {
      // Small delay to ensure styles are stable
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(exportRef.current, {
        useCORS: true,
        scale: 3, // High resolution
        backgroundColor: null, // Transparent background for the canvas itself
        logging: false,
      });

      const image = canvas.toDataURL("image/png");
      setPreviewImage(image);
      setShowPreview(true);
    } catch (err) {
      console.error("Failed to generate share image", err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Save Image Logic
  const handleSaveImage = () => {
    if (!previewImage) return;
    const link = document.createElement("a");
    link.href = previewImage;
    link.download = `inbox-card-${currentNote?.id || Date.now()}.png`;
    link.click();
    setShowPreview(false);
  };

  // Dynamic Background Color based on collection
  const glowColorClass = sourceCollection ? sourceCollection.coverColor : 'bg-blue-500';
  const shareUrl = "https://card.gudong.site/#/review";
  const scanText = language === 'zh' ? '扫码阅读更多' : 'Scan to read more';

  return (
    <div className="h-full flex flex-col relative overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors duration-700">
      
      {/* ---------------------------------------------------------------------------
          HIDDEN EXPORT VIEW 
          This is the DOM node that gets captured. 
          Styled specifically for the output image (fixed width, distinct look).
      --------------------------------------------------------------------------- */}
      <div className="fixed -left-[9999px] top-0 pointer-events-none">
        <div 
          ref={exportRef} 
          className="w-[800px] bg-[#f8fafc] p-[60px] flex flex-col items-center justify-center relative overflow-hidden"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
           {/* Abstract Background Blobs for Export */}
          <div className={`absolute -top-[20%] -right-[20%] w-[600px] h-[600px] rounded-full blur-[100px] opacity-10 ${glowColorClass}`}></div>
          <div className={`absolute -bottom-[20%] -left-[20%] w-[600px] h-[600px] rounded-full blur-[100px] opacity-10 ${glowColorClass}`}></div>

          {/* Card Container */}
          <div className="w-full bg-white rounded-[40px] p-12 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-100/50 z-10 relative flex flex-col">
             
             {/* Quote Icon */}
             <div className="text-slate-200 mb-8">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                </svg>
             </div>
             
             <div className="flex-1 min-h-[300px] flex flex-col justify-center">
               {currentNote && (
                 <>
                   <p className="text-[32px] font-serif leading-[1.6] text-slate-800 text-left mb-8 whitespace-pre-wrap tracking-wide">
                     {currentNote.content}
                   </p>
                   {currentNote.translation && (
                      <p className="text-slate-500 text-left text-2xl italic mb-8 border-l-[6px] border-slate-200 pl-6 py-2">
                        {currentNote.translation}
                      </p>
                   )}
                   {currentNote.source && (
                     <div className="flex justify-end mt-auto mb-8">
                        <div className="text-2xl text-slate-500 font-medium italic relative flex items-center gap-4">
                          <span className="w-12 h-[3px] bg-slate-200 rounded-full"></span>
                          {cleanSource(currentNote.source)}
                        </div>
                     </div>
                   )}
                 </>
               )}
             </div>

             {/* Footer Section - Redesigned */}
             <div className="border-t-2 border-slate-100 pt-8 flex items-center justify-between mt-6">
                
                {/* Left: QR Code & Brand Info */}
                <div className="flex items-center gap-6">
                   <div className="p-2 bg-white rounded-2xl border border-slate-200 shadow-sm">
                      <QRCodeSVG value={shareUrl} size={88} fgColor="#1e293b" bgColor="transparent" />
                   </div>
                   <div className="flex flex-col gap-1.5 justify-center">
                      <div className="flex items-center gap-2">
                         <span className="text-2xl font-bold text-slate-800 tracking-tight">inBox Card</span>
                      </div>
                      <span className="text-sm text-slate-400 font-medium uppercase tracking-widest">{scanText}</span>
                   </div>
                </div>
                
                {/* Right: Source Badge (Clean Version) */}
                {sourceCollection && (
                  <div className="flex items-center gap-3">
                     <span className="text-xl font-bold text-slate-700 tracking-wide pt-1">
                       {sourceCollection.name}
                     </span>
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------------
          PREVIEW MODAL
      --------------------------------------------------------------------------- */}
      {showPreview && previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 animate-fadeIn">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setShowPreview(false)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200 dark:border-slate-700">
             <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <h3 className="font-bold text-slate-800 dark:text-white pl-2">
                   {language === 'zh' ? '分享预览' : 'Share Preview'}
                </h3>
                <button 
                  onClick={() => setShowPreview(false)}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 transition-colors"
                >
                  <ICONS.X size={20} />
                </button>
             </div>
             
             <div className="flex-1 overflow-y-auto p-6 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-center">
                <img 
                  src={previewImage} 
                  alt="Share Preview" 
                  className="w-full h-auto rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"
                />
             </div>

             <div className="p-4 border-t border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 flex gap-3">
               <button
                 onClick={() => setShowPreview(false)}
                 className="flex-1 py-3 rounded-xl text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
               >
                 {language === 'zh' ? '取消' : 'Cancel'}
               </button>
               <button
                 onClick={handleSaveImage}
                 className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md hover:bg-blue-500 active:scale-95 transition-all flex items-center justify-center gap-2"
               >
                 <ICONS.Download size={18} />
                 {language === 'zh' ? '保存图片' : 'Save Image'}
               </button>
             </div>
          </div>
        </div>
      )}


      {/* ---------------------------------------------------------------------------
          MAIN UI 
      --------------------------------------------------------------------------- */}
      
      {/* Dynamic Ambient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-[120px] opacity-15 dark:opacity-10 transition-colors duration-1000 ${glowColorClass}`}></div>
        <div className={`absolute -bottom-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[100px] opacity-10 dark:opacity-5 transition-colors duration-1000 ${glowColorClass}`}></div>
      </div>

      {/* Header: Serendipity Label */}
      <div className="flex-shrink-0 pt-6 pb-2 text-center z-10">
        <div 
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 shadow-sm transition-all hover:bg-white/80 dark:hover:bg-slate-800/80 cursor-pointer group"
        >
           <ICONS.Sparkles size={14} className="text-purple-500" />
           <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
             {language === 'zh' ? '随机漫步' : 'Serendipity'}
           </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-8 z-10 relative">
        <div className="w-full max-w-2xl perspective-1000">
          
          {loading ? (
             <div className="w-full bg-white dark:bg-slate-800 rounded-3xl p-12 shadow-xl border border-slate-100 dark:border-slate-700/50 flex flex-col items-center justify-center min-h-[400px]">
               <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-200 border-t-blue-500 mb-4"></div>
               <p className="text-slate-400 text-sm font-medium animate-pulse">
                 {language === 'zh' ? '正在寻找灵感...' : 'Seeking wisdom...'}
               </p>
             </div>
          ) : currentNote ? (
              <div 
                key={currentNote.id} 
                className="w-full bg-white dark:bg-slate-800 rounded-3xl px-8 py-12 md:px-12 md:py-14 shadow-2xl shadow-slate-200/50 dark:shadow-black/30 border border-slate-100 dark:border-slate-700 flex flex-col animate-fadeIn min-h-[400px] relative overflow-hidden group/card"
              >
                
                {/* 1. Watermark Quote Icon */}
                <div className="absolute top-6 left-6 md:top-8 md:left-8 text-slate-100 dark:text-slate-700/50 pointer-events-none transition-colors duration-500">
                   <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" className="opacity-100 scale-75 md:scale-100 origin-top-left">
                     <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                   </svg>
                </div>

                {/* 2. Header: Collection Badge */}
                {sourceCollection && (
                  <div className="flex justify-end mb-8 relative z-10">
                    <button 
                      onClick={() => navigate(`/collection/${sourceCollection.id}`)}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50/80 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-blue-600 dark:text-slate-500 dark:hover:text-blue-400 transition-all group/tag backdrop-blur-sm"
                    >
                      <ICONS.BookOpen size={10} />
                      <span className="text-[10px] font-bold uppercase tracking-wider">
                        {language === 'zh' ? sourceCollection.name : sourceCollection.nameEn}
                      </span>
                      <ICONS.ArrowLeft className="rotate-180 w-3 h-3 opacity-0 -ml-2 group-hover/tag:opacity-100 group-hover/tag:ml-0 transition-all" />
                    </button>
                  </div>
                )}

                {/* 3. Main Content */}
                <div className="flex-1 flex flex-col justify-center relative z-10 pt-2 pb-6">
                   <div className="max-w-prose">
                     {/* Text */}
                     <p className="text-xl md:text-3xl font-serif leading-[1.7] text-slate-800 dark:text-slate-100 text-left select-text tracking-wide">
                       {currentNote.content}
                     </p>

                     {/* Translation */}
                     {language === 'en' && currentNote.translation && (
                        <p className="text-slate-500 dark:text-slate-400 text-left text-base italic mt-6 border-l-2 border-slate-200 dark:border-slate-700 pl-4">
                          {currentNote.translation}
                        </p>
                     )}
                   </div>

                   {/* Source Signature */}
                   {currentNote.source && (
                    <div className="w-full max-w-prose mt-12 md:mt-20 flex justify-end">
                      <div className="text-sm md:text-base text-slate-400 dark:text-slate-500 font-medium italic relative flex items-center gap-3 group-hover/card:text-slate-600 dark:group-hover/card:text-slate-400 transition-colors">
                        <span className="w-8 h-[1px] bg-slate-200 dark:bg-slate-700"></span>
                        {cleanSource(currentNote.source)}
                      </div>
                    </div>
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
          <>
            <button
              onClick={() => {
                if (currentNote) {
                  navigator.clipboard.writeText(currentNote.content);
                }
              }}
              className="w-14 h-14 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 shadow-lg shadow-slate-200/50 dark:shadow-black/20 border border-slate-100 dark:border-slate-700 transition-all hover:-translate-y-1 active:scale-95 group"
              title={language === 'zh' ? '复制' : 'Copy'}
            >
              <ICONS.Copy size={20} className="group-hover:scale-110 transition-transform" />
            </button>

            <button
              onClick={handleGenerateImage}
              disabled={isGenerating}
              className="w-14 h-14 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-300 shadow-lg shadow-slate-200/50 dark:shadow-black/20 border border-slate-300 dark:border-slate-600 transition-all hover:-translate-y-1 active:scale-95 group"
              title={language === 'zh' ? '分享图片' : 'Share Image'}
            >
              {isGenerating ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent"></div>
              ) : (
                <ICONS.Share2 size={24} className="group-hover:scale-110 transition-transform font-bold" strokeWidth={2.5} />
              )}
            </button>
          </>
        )}

        <button
          onClick={() => pickRandomNote(0)}
          disabled={loading}
          className="flex items-center gap-3 px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-lg shadow-xl shadow-slate-900/20 dark:shadow-white/10 hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
        >
          <ICONS.Shuffle size={20} className={loading ? 'animate-spin' : ''} />
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