import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { MoviesService } from '../services/movies.service';
import { SeriesService } from '../services/series.service';
import { UsersService } from '../services/users.service';
import { HttpService } from '../services/http.service';
import { RecommendType } from '../models/movies-series.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
  id: string = '';
  type: RecommendType = RecommendType.Movies;

  constructor(private moviesService: MoviesService, 
    private seriesService: SeriesService, 
    private usersService: UsersService,
    private httpService: HttpService, 
    private route: ActivatedRoute,
    private location: Location) {}

  goBack() {
    this.location.back();
  }

  ngOnInit(): void {
    this.type = this.route.snapshot.paramMap.get('type') as RecommendType;
    this.id = this.route.snapshot.paramMap.get('id') || '';
  }
    
}
