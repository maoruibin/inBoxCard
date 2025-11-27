import { NOTES_CONTENT } from '../src/resources';

export const loadNoteContent = async (filePath: string): Promise<string> => {
  // Normalize path if necessary, but data.ts uses absolute paths like '/cards/...'
  // We match exactly what is used as the key in resources.ts
  if (NOTES_CONTENT[filePath]) {
    return NOTES_CONTENT[filePath];
  }
  
  // Fallback: try removing the leading slash if not found
  const relativePath = filePath.startsWith('/') ? filePath.slice(1) : filePath;
  if (NOTES_CONTENT[relativePath]) {
      return NOTES_CONTENT[relativePath];
  }

  throw new Error(`Note file not found: ${filePath}`);
};