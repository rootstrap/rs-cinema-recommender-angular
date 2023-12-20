import { User } from "./users.model";

export enum RecommendType {
  Movies = "movie",
  TVShows = "tv"
}

export interface RecommendData {
    thumbsDown: User[];
    thumbsUp: User[];
    thumbsDownCount: number;
    thumbsUpCount: number;   
}

export type MovieSerie = MovieSeriesSearchInfo & RecommendData;

export interface MoviesSeriesSearch { 
    page: number;
    results: MovieSeriesSearchInfo[];
    total_pages:  number;
    total_results:  number;
}

export interface MovieSeriesSearchInfo {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    movieId?: number;
    seriesId?: number;
    origin_country?: string[];
    original_language: string;
    original_name?: string;
    original_title?: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date?: string;
    first_air_date?: string;
    name?: string;
    title?: string;
    video?: boolean;
    vote_average: number;
    vote_count: number;
}
