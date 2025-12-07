export interface Note {
  id: string;
  content: string;
  timestamp: string; // YYYY-MM-DD HH:mm:ss
  tags?: string[];
  translation?: string; // For bilingual support (parsed from content if available)
  source?: string; // New field for the origin/author/citation
}

export interface Collection {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  category: CategoryId;
  author: string;
  coverColor: string;
  filePath: string; // Path to the .txt file in the cards directory
  count?: number; // Approximate number of cards for display
  notes?: Note[]; // Optional now, loaded async
}

export enum CategoryId {
  ENTREPRENEUR = 'entrepreneur',
  PHILOSOPHY = 'philosophy',
  LITERATURE = 'literature',
  HISTORY = 'history'
}

export interface Category {
  id: CategoryId;
  label: string;
  labelEn: string;
  iconName: string;
}

export type Language = 'zh' | 'en';
export type Theme = 'light' | 'dark';


export interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  installPrompt: any; // Holds the beforeinstallprompt event
  handleInstallClick: () => void;
}