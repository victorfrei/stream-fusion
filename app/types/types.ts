
export type ApiResponse = {
  page: number;
  results: ResultType[];
};

export type ResultType = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  /**
   * Only if __media_type__ is __movie__
   */
  title?: string;
  /**
   * Only if __media_type__ is __tv__
   */
  name?: string;
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: 'tv' | 'movie'; // assuming these are the only two possible values
  genre_ids: number[];
  popularity: number;
  /**
   * Only if __media_type__ is __tv__
   */
  first_air_date?: string;
  /**
   * Only if __media_type__ is __movie__
   */
  release_date?: string;
  vote_average: number;
  vote_count: number;
  origin_country?: string[];
};


export type ResultDetail = {
  adult: boolean;
  backdrop_path: string;
  budget?: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id?: string;
  original_language: string;
  original_title?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date?: string;
  revenue?: number;
  runtime?: number;
  spoken_languages: SpokenLanguage[];
  status: 'Released' | 'Post Production' | 'In Production' | 'Canceled' | 'Planned' | 'Returning Series';
  tagline: string;
  /**
   * Only if __media_type__ is __movie__
   */
  title?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;

  // TV Series specific properties
  created_by?: Creator[];
  episode_run_time?: number[];
  first_air_date?: string;
  in_production?: boolean;
  languages?: string[];
  last_air_date?: string;
  last_episode_to_air?: Episode;
  /**
   * Only if __media_type__ is __tv__
   */
  name?: string;
  next_episode_to_air?: Episode | null;
  networks?: Network[];
  number_of_episodes?: number;
  number_of_seasons?: number;
  origin_country?: string[];
  original_name?: string;
  seasons?: Season[];
  type?: 'Scripted' | 'Reality' | 'Documentary' | 'News' | 'Talk Show';
};

type Genre = {
  id: number;
  name: string;
};

type ProductionCompany = {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
};

type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

type Creator = {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string | null;
};

type Episode = {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  episode_type?: string;
  production_code?: string;
  runtime?: number;
  season_number: number;
  show_id?: number;
  still_path?: string;
};

type Network = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

type Season = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
};
