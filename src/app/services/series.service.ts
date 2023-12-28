import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';

import { MovieSerie } from '../models/movies-series.model';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  private seriesRef;

  constructor(private firestore: AngularFirestore) { 
   this.seriesRef = this.firestore.collection<MovieSerie>('series', ref => ref.orderBy('thumbsUpCount','desc').orderBy('thumbsDownCount').orderBy('name'));
  }

  addSeries(series: MovieSerie) {
    return from(this.seriesRef.add(series));
  }

  updateSeries(series: MovieSerie) {
    return from(
      this.firestore.doc<MovieSerie>(`series/${series.id}`).update(series),
  ); 
  }

  getSeries(): Observable<MovieSerie[]> {
    return this.seriesRef.valueChanges({ idField: 'id' });
  }

  getSerie(id: string): Observable<MovieSerie | undefined> {
    return this.firestore.doc<MovieSerie>(`series/${id}`).valueChanges();
  }
}
