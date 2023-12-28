import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';

import { MovieSerie } from '../models/movies-series.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private movieRef;

  constructor(private firestore: AngularFirestore) { 
   this.movieRef = this.firestore.collection<MovieSerie>('movies', ref => ref.orderBy('thumbsUpCount','desc').orderBy('thumbsDownCount').orderBy('title'));
  }

  addMovie(movie: MovieSerie) {
    return from(this.movieRef.add(movie));
  }

  updateMovie(movie: MovieSerie) {
    return from(
      this.firestore.doc<MovieSerie>(`movies/${movie.id}`).update(movie),
  ); 
  }

  getMovies(): Observable<MovieSerie[]> {
    return this.movieRef.valueChanges({ idField: 'id' });
  }

  getMovie(id: string): Observable<MovieSerie | undefined> {
    return this.firestore.doc<MovieSerie>(`movies/${id}`).valueChanges();
  }
}
