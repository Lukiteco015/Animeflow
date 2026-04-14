import { useSQLiteContext } from 'expo-sqlite';

import { 
  Anime, 
  CreateAnimeInput, 
  UpdateAnimeInput, 
  AnimeFilter 
} from '../types/anime';

export async function getAnimes(db: any, filter: AnimeFilter = 'all'): Promise<Anime[]> {
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
  return await db.getAllAsync(query, ...params);
}

export async function getAnimeById(db: any, id: number): Promise<Anime | null> {
  return await db.getFirstAsync('SELECT * FROM animes WHERE id = ?', id);
}

export async function createAnime(db: any, input: CreateAnimeInput): Promise<Anime> {
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

  return (await getAnimeById(db, input.id))!;
}

export async function updateAnime(db: any, input: UpdateAnimeInput): Promise<void> {
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

export async function updateEpisodeProgress(db: any, id: number, newEpisode: number): Promise<void> {
  const updatedAt = new Date().toISOString();
  await db.runAsync(
    'UPDATE animes SET currentEpisode = ?, updatedAt = ? WHERE id = ?',
    newEpisode,
    updatedAt,
    id
  );
}

export async function deleteAnime(db: any, id: number): Promise<void> {
  await db.runAsync('DELETE FROM animes WHERE id = ?', id);
}