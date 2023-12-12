import { Component, OnInit } from '@angular/core';
import { Movie, MovieSearch, MovieSearchInfo } from '../models/movies.model';

import { MoviesService } from '../services/movies.service';
import { User } from '../models/users.model';
import { UsersService } from '../services/users.service';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];

  newMovie: string = '';
  currentUser: User;
  moviesSearch?: MovieSearch;
  showMoviesSearch: boolean = false;

  constructor(private moviesService: MoviesService, private usersService: UsersService, private httpService: HttpService) {
    this.currentUser  = this.usersService.getCurrentUserOrGuest();
  }

  clearSearch() {
    this.newMovie = '';
    this.cancelSearch();
  }

  addMovie(movie: MovieSearchInfo) {
    const currentMovie = this.movies.find(({ movieId }) => movieId === movie.id);
    if (currentMovie) {
      this.voteThumbsUp(currentMovie, true);
    } else { 
      this.moviesService.addMovie({
        ...movie,
        movieId: movie.id,
        thumbsUp: [ this.currentUser ],
        thumbsDown: [],
      });
      this.clearSearch();
    }
  }

  voteThumbsUp(movie: Movie, clearAfter?: boolean) {
    const thumbsUp = movie.thumbsUp.find(({ id }) => id === this.currentUser?.id);
    if (thumbsUp) {
      alert('Ya votaste esta película');
    } else {
      this.moviesService.updateMovie({
        ...movie,
        thumbsUp: [
          ...movie.thumbsUp,
          this.currentUser,
        ],
        thumbsDown: movie.thumbsDown.filter(({ id }) => id !== this.currentUser?.id),
      });
      clearAfter && this.clearSearch();
    }
  }

  voteThumbsDown(movie: Movie) {
    const thumbsDown = movie.thumbsDown.find(({ id }) => id === this.currentUser?.id);
    if (thumbsDown) {
      alert('Ya votaste esta película')
    } else {
      this.moviesService.updateMovie({
        ...movie,
        thumbsDown: [
          ...movie.thumbsDown,
          this.currentUser,
        ],
        thumbsUp: movie.thumbsUp.filter(({ id }) => id !== this.currentUser?.id),
      });
    }
  }

  searchMovie() {
    this.httpService.getMoviesFromName('search/movie', {
      'query': this.newMovie,
      'include_adult': false,
    }).subscribe(
      (response) => { 
        this.moviesSearch = response as MovieSearch;
        this.showMoviesSearch = true;
       },
      (error) => { console.log(error); });

      // use this for hardcoded data
      /* this.moviesSearch = this.httpService.getHardcodedMovies();
      this.showMoviesSearch = true; */
  }

  cancelSearch() {
    this.showMoviesSearch = false;
  }

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe(movies => {
        this.movies = movies;
    });
  }
}
