import { Collection, CategoryId } from './types';

export const COLLECTIONS: Collection[] = [
  // --- 创业家与商业洞察 (ENTREPRENEUR) ---
  {
    id: 'duan-yongping',
    name: '段永平语录',
    nameEn: 'Duan Yongping',
    description: '“本分”哲学、价值投资与“慢就是快”的商界洞察。',
    category: CategoryId.ENTREPRENEUR,
    author: 'Duan Yongping',
    coverColor: 'bg-green-600',
    filePath: '/cards/entrepreneur/duan-yongping.txt',
    count: 60
  },
  {
    id: 'steve-jobs',
    name: '乔布斯的现实扭曲力场',
    nameEn: 'Steve Jobs',
    description: '关于极致产品、设计美学与活着就是为了改变世界的执着。',
    category: CategoryId.ENTREPRENEUR,
    author: 'Steve Jobs',
    coverColor: 'bg-zinc-800',
    filePath: '/cards/entrepreneur/steve-jobs.txt',
    count: 30
  },
  {
    id: 'paul-graham',
    name: '保罗·格雷厄姆：黑客与画家',
    nameEn: 'Paul Graham',
    description: '硅谷创业教父关于创业、黑客精神与财富创造的硬核智慧。',
    category: CategoryId.ENTREPRENEUR,
    author: 'Paul Graham',
    coverColor: 'bg-orange-500',
    filePath: '/cards/entrepreneur/paul-graham.txt',
    count: 30
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
    count: 100
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

  // --- 哲学与思想 (PHILOSOPHY) ---
  {
    id: 'nietzsche',
    name: '尼采：重估一切价值',
    nameEn: 'Friedrich Nietzsche',
    description: '上帝已死，超人当立。关于强力意志、痛苦与酒神精神的狂野哲学。',
    category: CategoryId.PHILOSOPHY,
    author: 'Nietzsche',
    coverColor: 'bg-fuchsia-800',
    filePath: '/cards/philosophy/nietzsche.txt',
    count: 30
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
    id: 'mao',
    name: '毛泽东选集',
    nameEn: 'Mao Zedong',
    description: '关于矛盾论、实践论、持久战与人民战争的政治、战略与辩证哲学',
    category: CategoryId.PHILOSOPHY,
    author: 'Mao Zedong',
    coverColor: 'bg-red-600',
    filePath: '/cards/philosophy/mao.txt',
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

  // --- 文学与经典 (LITERATURE) ---
  {
    id: 'luxun',
    name: '鲁迅：呐喊与彷徨',
    nameEn: 'Lu Xun',
    description: '中国现代文学的灵魂，直面惨淡人生的清醒剂与投枪。',
    category: CategoryId.LITERATURE,
    author: 'Lu Xun',
    coverColor: 'bg-stone-700',
    filePath: '/cards/literature/luxun.txt',
    count: 30
  },
  {
    id: 'moyan',
    name: '莫言作品：魔幻与乡土',
    nameEn: 'Mo Yan: The Red Sorghum',
    description: '中国魔幻现实主义大师关于人性、土地、历史与生命的深刻思辨。',
    category: CategoryId.LITERATURE,
    author: 'Mo Yan',
    coverColor: 'bg-orange-600',
    filePath: '/cards/literature/moyan.txt',
    count: 50
  },
  {
    id: 'su-dongpo',
    name: '苏东坡：旷达人生哲学',
    nameEn: 'Su Dongpo\'s Philosophy',
    description: '融诗词、散文于一体的旷达人生观；关于豁达、起伏与自我和解的古典智慧。',
    category: CategoryId.LITERATURE,
    author: '苏轼 (Su Shi)',
    coverColor: 'bg-amber-700',
    filePath: '/cards/literature/su-dongpo.txt',
    count: 30
  },
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
    id: 'yuhua',
    name: '余华语录：活着与人性',
    nameEn: 'Yu Hua: To Live',
    description: '中国当代文学大师关于生命、苦难、时间与人性底色的深刻洞察。',
    category: CategoryId.LITERATURE,
    author: '余华',
    coverColor: 'bg-stone-800',
    filePath: '/cards/literature/yuhua.txt',
    count: 50
  },
    
  // --- 历史与斯多葛 (HISTORY) ---
  {
    id: 'caocao',
    name: '曹操：乱世实用主义',
    nameEn: 'Cao Cao',
    description: '魏武挥鞭的霸气与“唯才是举”的实用主义政治哲学。',
    category: CategoryId.HISTORY,
    author: 'Cao Cao',
    coverColor: 'bg-red-900',
    filePath: '/cards/history/caocao.txt',
    count: 30
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
    id: 'zeng-guofan',
    name: '曾国藩的修身之道',
    nameEn: 'Zeng Guofan',
    description: '晚清第一名臣的自我约束、渐进积累与组织管理智慧。',
    category: CategoryId.HISTORY,
    author: 'Zeng Guofan',
    coverColor: 'bg-red-800',
    filePath: '/cards/history/zen-guofan.txt',
    count: 50
  }
];