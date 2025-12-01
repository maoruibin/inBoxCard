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
    count: 50
  },
  {
    id: 'duan-yongping',
    name: '段永平语录',
    nameEn: 'Duan Yongping',
    description: '“本分”哲学、价值投资与“慢就是快”的商界洞察。',
    category: CategoryId.ENTREPRENEUR,
    author: 'Duan Yongping',
    coverColor: 'bg-green-600',
    filePath: '/cards/entrepreneur/duan-yongping.txt',
    count: 30
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
    count: 50
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
    count: 50
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
    count: 50
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
    count: 50
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
    count: 50
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
    count: 50
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
    count: 50
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
    count: 50
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
    count: 50
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
    count: 50
  },
  {
    id: 'wang-yangming',
    name: '王阳明的知行合一',
    nameEn: 'Wang Yangming',
    description: '心学核心：关于致良知、知行合一的个人修身与实践哲学。',
    category: CategoryId.PHILOSOPHY,
    author: 'Wang Yangming',
    coverColor: 'bg-indigo-700',
    filePath: '/cards/philosophy/wang-yangming.txt',
    count: 50
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
    count: 50
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
    count: 50
  },
    
  // --- Historical ---
  {
    id: 'zeng-guofan',
    name: '曾国藩的修身之道',
    nameEn: 'Zeng Guofan',
    description: '晚清第一名臣的自我约束、渐进积累与组织管理智慧。',
    category: CategoryId.HISTORY,
    author: 'Zeng Guofan',
    coverColor: 'bg-red-800',
    filePath: '/cards/history/zeng-guofan.txt',
    count: 50
  },
  {
    id: 'sun-tzu',
    name: '孙子兵法',
    nameEn: 'Sun Tzus Art of War',
    description: '战略思维的源头：知彼知己、不战而屈人之兵的竞争哲学。',
    category: CategoryId.HISTORY,
    author: 'Sun Tzu',
    coverColor: 'bg-gray-700',
    filePath: '/cards/history/sun-tzu.txt',
    count: 50
  },
  {
    id: 'marcus-aurelius',
    name: '马可·奥勒留《沉思录》',
    nameEn: 'Marcus Aurelius',
    description: '古罗马帝王的斯多葛哲学：关于理性、责任和接受命运的指引。',
    category: CategoryId.HISTORY,
    author: 'Marcus Aurelius',
    coverColor: 'bg-blue-700',
    filePath: '/cards/history/marcus-aurelius.txt',
    count: 50
  }
];