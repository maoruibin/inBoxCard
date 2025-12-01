import { log } from './logger'

export const loadNoteContent = async (filePath: string): Promise<string> => {
  const candidates = [filePath];
  if (filePath.startsWith('/')) {
    candidates.push(filePath.slice(1));
    if (filePath.startsWith('/cards/')) {
      candidates.push(filePath.replace('/cards/', '/'));
      candidates.push(filePath.replace('/cards/', ''));
    }
  } else {
    candidates.push(`/${filePath}`);
    if (filePath.startsWith('cards/')) {
      candidates.push(filePath.replace('cards/', '/'));
      candidates.push(filePath.replace('cards/', ''));
    }
  }

  for (const p of candidates) {
    try {
      const res = await fetch(p);
      if (res.ok) {
        log.debug('loadNoteContent ok', { filePath, resolved: p, status: res.status });
        return await res.text();
      }
      log.warn('loadNoteContent not ok', { filePath, resolved: p, status: res.status });
    } catch {}
  }

  const msg = `Note file not found: ${filePath}`;
  log.error('loadNoteContent fail', msg, { candidates });
  throw new Error(msg);
};