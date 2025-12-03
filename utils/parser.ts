import { Note } from '../types';

export const parseTimestampNotes = (text: string): Note[] => {
  // Regex to match the timestamp formats supported by inBox (start of line)
  // Supports: 2022-08-21 23:06:24, 2022.08.21 23:06, 2022/08/21 23:06 etc.
  const timeRegex = /^(\d{4}[-./]\d{2}[-./]\d{2}\s+\d{2}:\d{2}(?::\d{2})?)\s*$/gm;
  
  const notes: Note[] = [];
  const matches = [...text.matchAll(timeRegex)];
  
  if (matches.length === 0) return [];

  matches.forEach((match, i) => {
    const timestamp = match[1];
    const startIndex = match.index! + match[0].length;
    const endIndex = i < matches.length - 1 ? matches[i + 1].index! : text.length;
    
    let rawContent = text.substring(startIndex, endIndex).trim();
    
    // 1. Extract Tags (looking for #tag at the very end of content)
    let tags: string[] = [];
    const tagRegex = /(#[\p{L}\p{N}_\/-]+(\s+|$))+$/u;
    const tagMatch = rawContent.match(tagRegex);
    
    if (tagMatch) {
      const tagString = tagMatch[0];
      // Remove tags from rawContent
      rawContent = rawContent.substring(0, tagMatch.index).trim();
      // Parse tags
      tags = tagString.split(/\s+/).filter(t => t.startsWith('#')).map(t => t.slice(1));
    }

    // 2. Extract Source (looking for lines starting with ——, --, or — at the end of the remaining content)
    let source: string | undefined = undefined;
    // Split into lines to safely check the last non-empty line
    const lines = rawContent.split('\n').filter(line => line.trim() !== '');
    
    if (lines.length > 0) {
      const lastLine = lines[lines.length - 1].trim();
      // Match "——", "--", "—" followed by text
      // We allow optional spaces before the dash
      const sourceRegex = /^\s*(?:——|--|—)\s*(.+)$/;
      const sourceMatch = lastLine.match(sourceRegex);

      if (sourceMatch) {
        source = sourceMatch[1].trim();
        // Remove the source line from the lines array
        lines.pop();
        // Reassemble content
        rawContent = lines.join('\n').trim();
      }
    }

    notes.push({
      id: `note-${i}-${Date.now()}`,
      timestamp,
      content: rawContent,
      tags,
      source
    });
  });

  return notes;
};