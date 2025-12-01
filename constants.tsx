import React from 'react';
import { 
  Briefcase, 
  BookOpen, 
  Feather, 
  History, 
  Globe, 
  Moon, 
  Sun,
  Copy,
  Download,
  ArrowLeft,
  Search,
  Menu,
  X,
  Sparkles,
  Github,
  ExternalLink,
  Info,
  Dices,
  Shuffle
} from 'lucide-react';
import { Category, CategoryId } from './types';

export const CATEGORIES: Category[] = [
  { id: CategoryId.ENTREPRENEUR, label: '商业巨擘', labelEn: 'Entrepreneurs', iconName: 'Briefcase' },
  { id: CategoryId.PHILOSOPHY, label: '哲学思想', labelEn: 'Philosophy', iconName: 'BookOpen' },
  { id: CategoryId.LITERATURE, label: '文学经典', labelEn: 'Literature', iconName: 'Feather' },
  { id: CategoryId.HISTORY, label: '历史智慧', labelEn: 'History', iconName: 'History' },
];

export const ICONS: Record<string, React.FC<any>> = {
  Briefcase,
  BookOpen,
  Feather,
  History,
  Globe,
  Moon,
  Sun,
  Copy,
  Download,
  ArrowLeft,
  Search,
  Menu,
  X,
  Sparkles,
  Github,
  ExternalLink,
  Info,
  Dices,
  Shuffle
};