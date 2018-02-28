export interface Poster {

  poster: string;
  thumbnail: string;

}

export interface SearchResult {

  id: number;
  name: string;
  posters: Poster[];

}

export interface Episode {

  number: number;
  name: string;
  overview: string;
  airDate: string;

}

export interface Season {

  number: number;
  episodes: Episode[];

}

export interface Series {

  id: number;
  name: string;
  status: string;
  overview: string;
  network: string;
  rating: number;
  imdbLink: string;
  airDate: string;
  runtime: string;
  genre: string[];
  posters: Poster[];
  totalSeasons: number;
  totalEpisodes: number;
  lastUpdated: number;
  seasons: Season[];

}

export interface VideosResult {

  title: string;
  duration: string;
  url: string;
  thumbnail: string;

}
