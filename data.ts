import { Collection, CategoryId } from './types';

export const COLLECTIONS: Collection[] = [
  // --- Entrepreneurs ---
  {
    id: 'naval',
    name: '纳瓦尔宝典',
    nameEn: 'Naval Ravikant',
    description: '关于财富与幸福的指南。',
    category: CategoryId.ENTREPRENEUR,
    author: 'Naval Ravikant',
    coverColor: 'bg-blue-500',
    filePath: '/cards/entrepreneur/naval.txt',
    count: 6
  },
  {
    id: 'zhang-yiming',
    name: '张一鸣语录',
    nameEn: 'Zhang Yiming',
    description: '字节跳动创始人的深度思考与平常心。',
    category: CategoryId.ENTREPRENEUR,
    author: 'Zhang Yiming',
    coverColor: 'bg-indigo-500',
    filePath: '/cards/entrepreneur/zhang-yiming.txt',
    count: 5
  },
  {
    id: 'wang-xing',
    name: '王兴饭否',
    nameEn: 'Wang Xing',
    description: '美团创始人的碎片化洞察，既往不恋，纵情向前。',
    category: CategoryId.ENTREPRENEUR,
    author: 'Wang Xing',
    coverColor: 'bg-cyan-500',
    filePath: '/cards/entrepreneur/wang-xing.txt',
    count: 5
  },
  {
    id: 'elon-musk',
    name: '马斯克第一性原理',
    nameEn: 'Elon Musk',
    description: '火星人的物理学思维与疯狂愿景。',
    category: CategoryId.ENTREPRENEUR,
    author: 'Elon Musk',
    coverColor: 'bg-slate-800',
    filePath: '/cards/entrepreneur/elon-musk.txt',
    count: 5
  },
  {
    id: 'munger',
    name: '查理·芒格',
    nameEn: 'Charlie Munger',
    description: '普世智慧、多元思维模型与投资哲学。',
    category: CategoryId.ENTREPRENEUR,
    author: 'Charlie Munger',
    coverColor: 'bg-amber-700',
    filePath: '/cards/entrepreneur/munger.txt',
    count: 5
  },

  // --- Philosophy ---
  {
    id: 'confucius',
    name: '论语·孔子',
    nameEn: 'Confucius',
    description: '儒家思想的源头，修身齐家治国平天下。',
    category: CategoryId.PHILOSOPHY,
    author: 'Kong Zi',
    coverColor: 'bg-amber-600',
    filePath: '/cards/philosophy/confucius.txt',
    count: 5
  },
  {
    id: 'tao',
    name: '道德经',
    nameEn: 'Tao Te Ching',
    description: '道法自然，无为而无不为。',
    category: CategoryId.PHILOSOPHY,
    author: 'Lao Zi',
    coverColor: 'bg-emerald-600',
    filePath: '/cards/philosophy/tao.txt',
    count: 5
  },
  {
    id: 'buddhism',
    name: '佛学智慧',
    nameEn: 'Buddhism',
    description: '缘起性空，明心见性。',
    category: CategoryId.PHILOSOPHY,
    author: 'Buddha',
    coverColor: 'bg-yellow-600',
    filePath: '/cards/philosophy/buddhism.txt',
    count: 5
  },
  {
    id: 'zen',
    name: '禅宗公案',
    nameEn: 'Zen Koans',
    description: '直指人心，见性成佛，不立文字。',
    category: CategoryId.PHILOSOPHY,
    author: 'Zen Masters',
    coverColor: 'bg-stone-500',
    filePath: '/cards/philosophy/zen.txt',
    count: 5
  },
  {
    id: 'mao',
    name: '毛泽东选集',
    nameEn: 'Mao Zedong',
    description: '战略战术、辩证法与实事求是。',
    category: CategoryId.PHILOSOPHY,
    author: 'Mao Zedong',
    coverColor: 'bg-red-600',
    filePath: '/cards/philosophy/mao.txt',
    count: 5
  },

  // --- Literature ---
  {
    id: 'tiandao',
    name: '天道 (遥远的救世主)',
    nameEn: 'Way of Heaven',
    description: '丁元英的强势文化与文化属性。',
    category: CategoryId.LITERATURE,
    author: 'Dou Dou',
    coverColor: 'bg-gray-700',
    filePath: '/cards/literature/tiandao.txt',
    count: 5
  },
  {
    id: 'moyan',
    name: '莫言作品',
    nameEn: 'Mo Yan',
    description: '魔幻现实主义的中国乡土与人性。',
    category: CategoryId.LITERATURE,
    author: 'Mo Yan',
    coverColor: 'bg-orange-600',
    filePath: '/cards/literature/moyan.txt',
    count: 5
  },
  {
    id: 'yuhua',
    name: '余华·活着',
    nameEn: 'Yu Hua',
    description: '人是为了活着本身而活着。',
    category: CategoryId.LITERATURE,
    author: 'Yu Hua',
    coverColor: 'bg-zinc-600',
    filePath: '/cards/literature/yuhua.txt',
    count: 5
  }
];