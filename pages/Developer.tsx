import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context';
import { ICONS } from '../constants';

const SHOWCASE_DATA = [
  {
    name: 'Thinking 思绪',
    desc: '交流笔记方法、工具的极简小社群',
    descEn: 'A minimalist thinking log tool displaying random inspiration.',
    url: 'https://thinking.gudong.site/',
    status: 'live'
  },
  // Add more here in the future
];

export const Developer: React.FC = () => {
  const { language } = useApp();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const apiUrl = 'https://card.gudong.site/api/random-note';
  
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(apiUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
            <ICONS.Terminal size={32} className="text-blue-600 dark:text-blue-400" />
            <span>{language === 'zh' ? '开放 API' : 'Open API'}</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            {language === 'zh' 
              ? '连接智慧的基础设施。让高质量的知识卡片流动到你的应用中。' 
              : 'Infrastructure for wisdom. Let high-quality knowledge cards flow into your apps.'}
          </p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
        >
          <ICONS.ArrowLeft size={16} />
          <span>{language === 'zh' ? '返回首页' : 'Back Home'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-10">
        
        {/* API Endpoint Section */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 border-l-4 border-blue-500 pl-3">
            {language === 'zh' ? '接口调用' : 'Endpoint'}
          </h2>
          <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-700">
            <div className="bg-slate-800 px-4 py-3 flex items-center justify-between border-b border-slate-700">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-green-500 text-white">GET</span>
                <span className="text-xs text-slate-300 font-mono">/api/random-note</span>
              </div>
              <button 
                onClick={handleCopyUrl}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded transition-colors"
              >
                {copied ? <span>Copied!</span> : <ICONS.Copy size={14} />}
                <span>{language === 'zh' ? '复制地址' : 'Copy URL'}</span>
              </button>
            </div>
            <div className="p-6 overflow-x-auto">
              <code className="font-mono text-sm text-blue-300 block mb-4">
                {apiUrl}
              </code>
              <div className="text-slate-400 text-xs mb-2 uppercase tracking-wider font-bold">Response Example (JSON)</div>
              <pre className="font-mono text-sm text-emerald-400 whitespace-pre-wrap leading-relaxed">
{`{
  "id": "note-31-1765327494006",
  "content": "暴力本身并没有善恶，它只是人性深处欲望的外化。",
  "timestamp": "2024-09-01 21:30:00",
  "tags": [
    "莫言/人性与暴力"
  ],
  "source": "《红高粱家族》",
  "collectionId": "moyan",
  "collectionName": "莫言作品：魔幻与乡土",
  "author": "Mo Yan",
  "sourceUrl": "https://card.gudong.site/#/collection/moyan",
  "reviewUrl": "https://card.gudong.site/#/review"
}`}
              </pre>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            {language === 'zh' 
              ? '此接口完全公开，无需鉴权。支持跨域 (CORS)，可直接在前端项目中调用。' 
              : 'This endpoint is public and requires no authentication. CORS is enabled for direct frontend usage.'}
          </p>
        </section>

        {/* Showcase Section */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 border-l-4 border-purple-500 pl-3">
            {language === 'zh' ? '应用展示' : 'Showcase'}
          </h2>
          <p className="mb-6 text-slate-600 dark:text-slate-300">
            {language === 'zh' 
              ? '这些很酷的产品已经接入了 inBox Card API，为用户提供随机灵感。' 
              : 'These cool products are already using the inBox Card API to provide random inspiration.'}
          </p>
          
          <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {language === 'zh' ? '产品名称' : 'Product'}
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {language === 'zh' ? '简介' : 'Description'}
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {language === 'zh' ? '链接' : 'Link'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-700">
                {SHOWCASE_DATA.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                        <span className="text-sm font-medium text-slate-900 dark:text-white">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                      {language === 'zh' ? item.desc : item.descEn}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium inline-flex items-center gap-1"
                      >
                        Visit <ICONS.ExternalLink size={12} />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {language === 'zh' 
                ? '你的产品也接入了吗？欢迎提交 Pull Request 或 Issue 告诉我们！' 
                : 'Did you build something with it? Submit a PR or Issue to get listed!'}
            </p>
            <a 
              href="https://github.com/maoruibin/inBoxCard/discussions" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
            >
              <ICONS.Github size={16} />
              {language === 'zh' ? '提交案例' : 'Submit Showcase'}
            </a>
          </div>
        </section>

      </div>
    </div>
  );
};