import { User } from "./users.model";

export interface MovieData {
    thumbsDown: User[];
    thumbsUp: User[];
    thumbsDownCount: number;
    thumbsUpCount: number;   
}

export type Movie = MovieSearchInfo & MovieData;

export interface MovieSearch { 
    page: number;
    results: MovieSearchInfo[];
    total_pages:  number;
    total_results:  number;
}

export interface MovieSearchInfo {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    movieId?: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
