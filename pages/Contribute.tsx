import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context';
import { ICONS } from '../constants';

const PREREQS_ZH = `前置条件：\n1. 拥有 GitHub 账号并完成登录。\n2. 在仓库页面点击 Fork，将项目复制到你的账户。\n3. 将 Fork 后的仓库克隆到本地并安装依赖。`;
const PREREQS_EN = `Prerequisites:\n1. Have a GitHub account and sign in.\n2. Click Fork on the repository to copy it to your account.\n3. Clone your fork locally and install dependencies.`;

const GIT_STEPS = `git clone https://github.com/<your-username>/inBoxCard.git
cd inBoxCard
npm install
npm run dev
git checkout -b feature/add-your-collection
# make changes, then commit and push
git add .
git commit -m "add collection"
git push origin feature/add-your-collection`;

const TIMESTAMP_SAMPLE_ZH = `2023-10-01 10:00:00
这里是笔记的正文内容，可以是名言、摘抄或感悟。
支持多行文本。
#标签1 #标签2

2023-10-01 10:05:00
这是第二条笔记。
必须以 YYYY-MM-DD HH:mm:ss 或类似的时间戳开头。`;

const TIMESTAMP_SAMPLE_EN = `2023-10-01 10:00:00
Here is the note content, such as quotes or reflections.
Support multi-line text.
#tag1 #tag2

2023-10-01 10:05:00
This is the second note.
Must start with a timestamp like YYYY-MM-DD HH:mm:ss.`;

const COLLECTION_SNIPPET_ZH = `{
  id: 'luxun',
  name: '鲁迅全集',
  nameEn: 'Lu Xun',
  description: '横眉冷对千夫指，俯首甘为孺子牛。',
  category: CategoryId.LITERATURE,
  author: 'Lu Xun',
  coverColor: 'bg-stone-600',
  filePath: '/cards/literature/luxun.txt',
  count: 10
}`;

const COLLECTION_SNIPPET_EN = `{
  id: 'luxun',
  name: 'Lu Xun Anthology',
  nameEn: 'Lu Xun',
  description: 'Classic quotes and reflections.',
  category: CategoryId.LITERATURE,
  author: 'Lu Xun',
  coverColor: 'bg-stone-600',
  filePath: '/cards/literature/luxun.txt',
  count: 10
}`;

export const Contribute: React.FC = () => {
  const { language } = useApp();
  const navigate = useNavigate();
  const [copiedBlock, setCopiedBlock] = useState<string | null>(null);

  const timestampText = useMemo(() => language === 'zh' ? TIMESTAMP_SAMPLE_ZH : TIMESTAMP_SAMPLE_EN, [language]);
  const collectionSnippet = useMemo(() => language === 'zh' ? COLLECTION_SNIPPET_ZH : COLLECTION_SNIPPET_EN, [language]);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedBlock(key);
      setTimeout(() => setCopiedBlock(null), 2000);
    });
  };

  const handleDownloadTemplate = () => {
    const element = document.createElement('a');
    const file = new Blob([timestampText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = language === 'zh' ? '时间戳笔记模板.txt' : 'timestamp-note-template.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
            {language === 'zh' ? '参与贡献' : 'Contribute'}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            {language === 'zh' 
              ? '欢迎你一起共建高质量的时间戳知识卡片，让更多人受益。' 
              : 'Join us to curate high-quality timestamped knowledge cards for everyone.'}
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

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6">
          <div className="flex items-center gap-2 mb-3">
            <ICONS.Sparkles size={18} className="text-green-600 dark:text-green-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {language === 'zh' ? '前置条件与准备' : 'Prerequisites & Setup'}
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
            {language === 'zh' ? PREREQS_ZH : PREREQS_EN}
          </p>
          <div className="flex flex-wrap gap-3 mb-4">
            <a
              href="https://github.com/maoruibin/inBoxCard"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm"
            >
              <ICONS.Github size={16} />
              <span>Repo</span>
              <ICONS.ExternalLink size={12} />
            </a>
            <a
              href="https://github.com/maoruibin/inBoxCard/fork"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm"
            >
              <span>{language === 'zh' ? 'Fork 仓库' : 'Fork Repository'}</span>
              <ICONS.ExternalLink size={12} />
            </a>
          </div>
          <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700">
            <div className="bg-slate-800 px-4 py-3 flex items-center justify-between border-b border-slate-700">
              <span className="text-xs text-slate-300">shell</span>
              <button
                onClick={() => handleCopy(GIT_STEPS, 'git-steps')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded"
              >
                {copiedBlock === 'git-steps' ? <span>Copied!</span> : <ICONS.Copy size={14} />}
                <span>{language === 'zh' ? '复制命令' : 'Copy Commands'}</span>
              </button>
            </div>
            <div className="p-6">
              <pre className="font-mono text-sm text-emerald-400 whitespace-pre-wrap leading-relaxed">{GIT_STEPS}</pre>
            </div>
          </div>
          <div className="mt-4 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/50 rounded-xl p-4">
            <p className="text-sm text-green-700 dark:text-green-300">
              {language === 'zh' 
                ? '遇到问题可直接联系开发者微信：mw08032231' 
                : 'If you have any questions, contact the developer via WeChat: mw08032231'}
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6">
          <div className="flex items-center gap-2 mb-3">
            <ICONS.Info size={18} className="text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {language === 'zh' ? '步骤一：准备笔记文件' : 'Step 1: Prepare note file'}
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
            {language === 'zh' 
              ? '在 cards/ 目录选择分类，新建 .txt 文件，采用下方“时间戳笔记”格式。' 
              : 'Pick a category in cards/ and create a .txt file using the timestamped note format below.'}
          </p>
          <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700">
            <div className="bg-slate-800 px-4 py-3 flex items-center justify-between border-b border-slate-700">
              <span className="text-xs text-slate-300">.txt</span>
              <div className="flex gap-2">
                <button
                  onClick={handleDownloadTemplate}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs rounded"
                >
                  <ICONS.Download size={14} />
                  <span>{language === 'zh' ? '下载模板' : 'Download Template'}</span>
                </button>
                <button
                  onClick={() => handleCopy(timestampText, 'ts')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded"
                >
                  {copiedBlock === 'ts' ? <span>Copied!</span> : <ICONS.Copy size={14} />}
                  <span>{language === 'zh' ? '复制示例' : 'Copy Example'}</span>
                </button>
              </div>
            </div>
            <div className="p-6">
              <pre className="font-mono text-sm text-emerald-400 whitespace-pre-wrap leading-relaxed">{timestampText}</pre>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6">
          <div className="flex items-center gap-2 mb-3">
            <ICONS.BookOpen size={18} className="text-orange-600 dark:text-orange-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {language === 'zh' ? '步骤二：注册集合' : 'Step 2: Register collection'}
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
            {language === 'zh' 
              ? '在 data.ts 的 COLLECTIONS 中添加你的集合配置，参考示例片段：' 
              : 'Add your collection entry to data.ts -> COLLECTIONS using the snippet below:'}
          </p>
          <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700">
            <div className="bg-slate-800 px-4 py-3 flex items-center justify-between border-b border-slate-700">
              <span className="text-xs text-slate-300">typescript</span>
              <button
                onClick={() => handleCopy(collectionSnippet, 'ts-snippet')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded"
              >
                {copiedBlock === 'ts-snippet' ? <span>Copied!</span> : <ICONS.Copy size={14} />}
                <span>{language === 'zh' ? '复制片段' : 'Copy Snippet'}</span>
              </button>
            </div>
            <div className="p-6">
              <pre className="font-mono text-sm text-emerald-400 whitespace-pre-wrap leading-relaxed">{collectionSnippet}</pre>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6">
          <div className="flex items-center gap-2 mb-3">
            <ICONS.Sparkles size={18} className="text-purple-600 dark:text-purple-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {language === 'zh' ? '步骤三：提交 PR' : 'Step 3: Submit a PR'}
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
            {language === 'zh' 
              ? '将你的变更提交到 GitHub 仓库，我们会进行审核并发布更新。' 
              : 'Submit your changes to the GitHub repo; we will review and publish updates.'}
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/maoruibin/inBoxCard"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm"
            >
              <ICONS.Github size={16} />
              <span>GitHub</span>
              <ICONS.ExternalLink size={12} />
            </a>
            <a
              href="https://github.com/maoruibin/inBoxCard/pulls"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm"
            >
              <span>{language === 'zh' ? '打开 Pull Requests' : 'Open Pull Requests'}</span>
              <ICONS.ExternalLink size={12} />
            </a>
            <a
              href="https://github.com/maoruibin/inBoxCard/issues/new/choose"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm"
            >
              <span>{language === 'zh' ? '反馈问题或建议' : 'Report Issue or Suggestion'}</span>
              <ICONS.ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contribute;