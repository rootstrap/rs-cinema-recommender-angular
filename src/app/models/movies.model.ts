import { User } from "./users.model";

export interface Movie {
    id?: string;
    title: string;
    thumbsUp: User[];
    thumbsDown: User[];
}

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
