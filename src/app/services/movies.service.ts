import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Movie } from '../models/movies.model';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private movieRef;

  constructor(private firestore: AngularFirestore) { 
   this.movieRef = this.firestore.collection<Movie>('movies');
  }

  addMovie(movie: Movie) {
    return from(this.movieRef.add(movie));
  }

  updateMovie(movie: Movie) {
    return from(
      this.firestore.doc<Movie>(`movies/${movie.id}`).update(movie),
  ); 
  }

  getMovies(): Observable<Movie[]> {
    return this.movieRef.valueChanges({ idField: 'id' });
  }
}
