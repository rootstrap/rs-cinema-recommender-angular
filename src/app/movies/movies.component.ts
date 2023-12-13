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
  showThumbsUpTooltips: boolean[] = [];
  showThumbsDownTooltips: boolean[] = [];
  titleFilter: string = '';

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
        thumbsUpCount: 1,
        thumbsDownCount: 0,
      });
      this.clearSearch();
    }
  }

  voteThumbsUp(movie: Movie, clearAfter?: boolean) {
    const thumbsUp = movie.thumbsUp.find(({ id }) => id === this.currentUser?.id);
    if (thumbsUp) {
      alert('Ya votaste esta película');
    } else {
      const newThumbsUp = [
        ...movie.thumbsUp,
        this.currentUser,
      ];
      const newThumbsDown = movie.thumbsDown.filter(({ id }) => id !== this.currentUser?.id);
      this.moviesService.updateMovie({
        ...movie,
        thumbsUp: newThumbsUp,
        thumbsDown: newThumbsDown,
        thumbsUpCount: newThumbsUp.length,
        thumbsDownCount: newThumbsDown.length,
      });
      clearAfter && this.clearSearch();
    }
  }

  voteThumbsDown(movie: Movie) {
    const thumbsDown = movie.thumbsDown.find(({ id }) => id === this.currentUser?.id);
    if (thumbsDown) {
      alert('Ya votaste esta película')
    } else {
      const newThumbsDown = [
        ...movie.thumbsDown,
        this.currentUser,
      ];
      const newThumbsUp = movie.thumbsUp.filter(({ id }) => id !== this.currentUser?.id);
      this.moviesService.updateMovie({
        ...movie,
        thumbsDown: newThumbsDown,
        thumbsUp: newThumbsUp,
        thumbsDownCount: newThumbsDown.length,
        thumbsUpCount: newThumbsUp.length,
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

  changeThumbsUpTooltip(index: number, value: boolean) {
    this.showThumbsUpTooltips[index] = value;
  }

  changeThumbsDownTooltip(index: number, value: boolean) {
    this.showThumbsDownTooltips[index] = value;
  }

  emptyTooltips() {
    this.showThumbsUpTooltips.fill(false);
    this.showThumbsDownTooltips.fill(false);
  }

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe(movies => {
        this.movies = movies;
        this.showThumbsUpTooltips.fill(false, 0, movies.length - 1);
        this.showThumbsDownTooltips.fill(false, 0, movies.length - 1);
    });
  }

}
