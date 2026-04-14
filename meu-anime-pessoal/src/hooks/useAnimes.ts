import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import * as AnimeService from '../services/animeService';
import { Anime, AnimeFilter } from '../types/anime';

export function useAnimes() {
  const db = useSQLiteContext();
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [filter, setFilter] = useState<AnimeFilter>('all');
  const [loading, setLoading] = useState(true);

  const loadAnimes = useCallback(async () => {
    try {
      setLoading(true);
      const data = await AnimeService.getAnimes(db, filter);
      setAnimes(data);
    } catch (error) {
      console.error('Erro ao carregar animes:', error);
    } finally {
      setLoading(false);
    }
  }, [db, filter]);

  useFocusEffect(
    useCallback(() => {
      loadAnimes();
    }, [loadAnimes])
  );

  const updateProgress = useCallback(
    async (id: number, newEpisode: number) => {
      await AnimeService.updateEpisodeProgress(db, id, newEpisode);
      await loadAnimes();
    },
    [db, loadAnimes],
  );

  const removeAnime = useCallback(
    async (id: number) => {
      await AnimeService.deleteAnime(db, id);
      await loadAnimes();
    },
    [db, loadAnimes],
  );

  return {
    animes,
    filter,
    loading,
    setFilter,
    updateProgress,
    removeAnime,
    reload: loadAnimes,
    stats: {
      total: animes.length,
      watching: animes.filter(a => a.status === 'Watching').length,
      completed: animes.filter(a => a.status === 'Completed').length,
    }
  };
}