import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';

import movies from 'src/api/movies/movies';
import { MoviesSeriesSearch } from '../models/movies-series.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private BASE_URL = 'https://api.themoviedb.org/3/';
  private API_KEY = '37b2654d338023c318312c90b5eee0ba';
  private IMAGE_URL= 'https://image.tmdb.org/t/p/original/'

  constructor(private http: HttpClient) { }

  getDataFromMDB(url2: string, params: any) {
    return this.http.get(`${this.BASE_URL}${url2}`,{
      params: {
        ...params,
        api_key: this.API_KEY,
      }
    });
  }

  getHardcodedMovies(): MoviesSeriesSearch {
    return movies as MoviesSeriesSearch;
  }

  getPosterUrl(path:string) {
    return `${this.IMAGE_URL}${path}`;
  }

}
