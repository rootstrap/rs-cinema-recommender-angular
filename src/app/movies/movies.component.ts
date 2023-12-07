import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movies.model';

import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];

  newMovie: string = '';

  constructor(private moviesService: MoviesService) {}

  addMovie() {
    if (this.newMovie) {
      const currentMovie = this.movies.find(({title}) => title.toLowerCase() === this.newMovie.toLowerCase());
      if (currentMovie) {
        this.moviesService.updateMovie({
          ...currentMovie,
          voteCount: ++currentMovie.voteCount,
        });
      } else { 
        this.moviesService.addMovie({
          title: this.newMovie.toUpperCase(),
          voteCount: 1,
        });
      }
      this.newMovie = '';
    }
  }

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe(movies => {
        this.movies = movies;
    });
  }
}
