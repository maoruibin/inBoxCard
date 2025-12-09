import { COLLECTIONS } from '../../data';
import { parseTimestampNotes } from '../../utils/parser';

export async function onRequest(context: any): Promise<Response> {
  const { request } = context;
  const url = new URL(request.url);
  const origin = `${url.protocol}//${url.host}`;

  const tryCount = 3;

  const cleanSource = (source?: string) => {
    if (!source) return undefined;
    return source.replace(/^[—\-\s]+/, '');
  };

  for (let attempt = 0; attempt < tryCount; attempt++) {
    try {
      if (!Array.isArray(COLLECTIONS) || COLLECTIONS.length === 0) {
        return json({ error: 'No collections available' }, 500);
      }

      const randomIndex = Math.floor(Math.random() * COLLECTIONS.length);
      const collection = COLLECTIONS[randomIndex];

      const fileUrl = new URL(collection.filePath.startsWith('/') ? collection.filePath : `/${collection.filePath}`, origin).toString();
      const res = await fetch(fileUrl);
      if (!res.ok) {
        continue;
      }
      const text = await res.text();
      const notes = parseTimestampNotes(text);
      if (!notes || notes.length === 0) {
        continue;
      }

      const note = notes[Math.floor(Math.random() * notes.length)];

      const payload = {
        id: note.id,
        content: note.content,
        timestamp: note.timestamp,
        tags: note.tags ?? [],
        source: cleanSource(note.source),
        collectionId: collection.id,
        collectionName: collection.name,
        collectionNameEn: collection.nameEn,
        author: collection.author,
        sourceUrl: `${origin}/#/collection/${collection.id}`,
        reviewUrl: `${origin}/#/review`
      };

      return json(payload, 200);
    } catch (e) {
      // continue and retry
    }
  }

  return json({ error: 'No notes found' }, 404);
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

