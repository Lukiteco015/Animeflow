export interface Anime {
  id: number;
  title: string;
  imageUrl: string;
  totalEpisodes: number;
  releaseYear: number | null;
  currentEpisode: number;
  status: 'Watching' | 'Plan to Watch' | 'Completed' | 'Dropped';
  rating: number;
  comment: string | null;
  updatedAt: string;
}

export type AnimeFilter = 'all' | 'watching' | 'plan' | 'completed' | 'dropped';

export interface JikanAnime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  episodes: number | null;
  year: number | null;
}

export interface CreateAnimeInput {
  id: number; 
  title: string;
  imageUrl: string;
  totalEpisodes: number;
  releaseYear: number | null;
  status: 'Watching' | 'Plan to Watch';
}

export interface UpdateAnimeInput {
  id: number;
  currentEpisode: number;
  status: 'Watching' | 'Plan to Watch' | 'Completed' | 'Dropped';
  rating: number;
  comment: string | null;
}