export const loadNoteContent = async (filePath: string): Promise<string> => {
  const candidates = [filePath];
  if (filePath.startsWith('/')) {
    candidates.push(filePath.slice(1));
  } else {
    candidates.push(`/${filePath}`);
  }

  for (const p of candidates) {
    try {
      const res = await fetch(p);
      if (res.ok) {
        return await res.text();
      }
    } catch {}
  }

  throw new Error(`Note file not found: ${filePath}`);
};