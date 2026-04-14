import { SQLiteDatabase } from 'expo-sqlite';
import { 
  Anime, 
  CreateAnimeInput, 
  UpdateAnimeInput, 
  AnimeFilter,
  JikanAnime 
} from '../types/anime';

// --- SEÇÃO: API EXTERNA (JIKAN) ---
export async function searchAnimeFromJikan(query: string): Promise<JikanAnime[]> {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=10`);
    const json = await response.json();
    return json.data || [];
  } catch (error) {
    console.error("Erro ao buscar na Jikan:", error);
    return [];
  }
}

export async function getAnimes(db: SQLiteDatabase, filter: AnimeFilter = 'all'): Promise<Anime[]> {
  let query = 'SELECT * FROM animes';
  const params: any[] = [];

  if (filter !== 'all') {
    const statusMap: Record<string, string> = {
      watching: 'Watching',
      plan: 'Plan to Watch',
      completed: 'Completed',
      dropped: 'Dropped'
    };
    query += ' WHERE status = ?';
    params.push(statusMap[filter]);
  }

  query += ' ORDER BY updatedAt DESC';
  return await db.getAllAsync<Anime>(query, ...params);
}

export async function getAnimeById(db: SQLiteDatabase, id: number): Promise<Anime | null> {
  return await db.getFirstAsync<Anime>('SELECT * FROM animes WHERE id = ?', id);
}


export async function createAnime(db: SQLiteDatabase, input: CreateAnimeInput): Promise<void> {
  const updatedAt = new Date().toISOString();
  
  await db.runAsync(
    `INSERT INTO animes (id, title, imageUrl, totalEpisodes, releaseYear, currentEpisode, status, rating, comment, updatedAt) 
     VALUES (?, ?, ?, ?, ?, 0, ?, 0, NULL, ?)`,
    input.id,
    input.title,
    input.imageUrl,
    input.totalEpisodes,
    input.releaseYear,
    input.status,
    updatedAt
  );
}

export async function updateAnime(db: SQLiteDatabase, input: UpdateAnimeInput): Promise<void> {
  const updatedAt = new Date().toISOString();
  
  await db.runAsync(
    `UPDATE animes 
     SET currentEpisode = ?, status = ?, rating = ?, comment = ?, updatedAt = ? 
     WHERE id = ?`,
    input.currentEpisode,
    input.status,
    input.rating,
    input.comment,
    updatedAt,
    input.id
  );
}

export async function updateEpisodeProgress(db: SQLiteDatabase, id: number, newEpisode: number): Promise<void> {
  const updatedAt = new Date().toISOString();
  await db.runAsync(
    'UPDATE animes SET currentEpisode = ?, updatedAt = ? WHERE id = ?',
    newEpisode,
    updatedAt,
    id
  );
}

export async function deleteAnime(db: SQLiteDatabase, id: number): Promise<void> {
  await db.runAsync('DELETE FROM animes WHERE id = ?', id);
}