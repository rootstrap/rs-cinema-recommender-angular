import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movies.model';

import { MoviesService } from '../services/movies.service';
import { LocalService } from '../services/local.service';
import { User } from '../models/users.model';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];

  newMovie: string = '';
  currentUser: User;

  constructor(private moviesService: MoviesService, private usersService: UsersService) {
    this.currentUser  = this.usersService.getCurrentUserOrGuest();
  }

  addMovie() {
    if (this.newMovie) {
      const currentMovie = this.movies.find(({title}) => title.toLowerCase() === this.newMovie.toLowerCase());
      if (currentMovie) {
        this.voteThumbsUp(currentMovie);
      } else { 
        this.moviesService.addMovie({
          title: this.newMovie.toUpperCase(),
          thumbsUp: [ this.currentUser ],
          thumbsDown: [],
        });
      }
      this.newMovie = '';
    }
  }

  voteThumbsUp(movie: Movie) {
    const thumbsUp = movie.thumbsUp.find(({id}) => id === this.currentUser?.id);
    if (thumbsUp) {
      alert('Ya votaste esta película')
    } else {
      this.moviesService.updateMovie({
        ...movie,
        thumbsUp: [
          ...movie.thumbsUp,
          this.currentUser,
        ],
        thumbsDown: movie.thumbsDown.filter(({id}) => id !== this.currentUser?.id),
      });
    }
  }

  voteThumbsDown(movie: Movie) {
    const thumbsDown = movie.thumbsDown.find(({id}) => id === this.currentUser?.id);
    if (thumbsDown) {
      alert('Ya votaste esta película')
    } else {
      this.moviesService.updateMovie({
        ...movie,
        thumbsDown: [
          ...movie.thumbsDown,
          this.currentUser,
        ],
        thumbsUp: movie.thumbsUp.filter(({id}) => id !== this.currentUser?.id),
      });
    }
  }

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe(movies => {
        this.movies = movies;
    });
  }
}
