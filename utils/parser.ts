import { Note } from '../types';
import { log } from './logger';

export const parseTimestampNotes = (text: string): Note[] => {
  const normalized = text.replace(/^\uFEFF/, '');
  const timeRegex = /^(\d{4}[-./]\d{1,2}[-./]\d{1,2}\s+\d{1,2}:\d{2}(?::\d{2})?)\s*$/gm;
  
  const notes: Note[] = [];
  const matches = [...normalized.matchAll(timeRegex)];
  log.debug('parser matches', matches.length);
  
  if (matches.length === 0) {
    log.warn('parser no matches', normalized.slice(0, 120));
    return [];
  }

  matches.forEach((match, i) => {
    const timestamp = match[1];
    const startIndex = match.index! + match[0].length;
    const endIndex = i < matches.length - 1 ? matches[i + 1].index! : normalized.length;
    
    let rawContent = normalized.substring(startIndex, endIndex).trim();
    
    // Extract tags (looking for #tag at the end of content)
    let tags: string[] = [];
    const tagRegex = /(#[\p{L}\p{N}_\/-]+(\s+|$))+$/u;
    const tagMatch = rawContent.match(tagRegex);
    
    if (tagMatch) {
      const tagString = tagMatch[0];
      rawContent = rawContent.substring(0, tagMatch.index).trim();
      tags = tagString.split(/\s+/).filter(t => t.startsWith('#')).map(t => t.slice(1));
    }

    // Optional: simplistic bilingual support check
    // If content contains a clear separator like "---" or specific logic, we could parse translation.
    // For now, we leave the content as is, as the user didn't specify a translation format for the text files.

    notes.push({
      id: `note-${i}-${Date.now()}`,
      timestamp,
      content: rawContent,
      tags
    });
  });

  return notes;
};