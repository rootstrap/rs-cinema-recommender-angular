import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { MoviesService } from '../services/movies.service';
import { SeriesService } from '../services/series.service';
import { UsersService } from '../services/users.service';
import { HttpService } from '../services/http.service';
import { MovieSerie, RecommendType } from '../models/movies-series.model';
import { ChartDataSets } from 'chart.js';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})

export class DetailsComponent implements OnInit {
  id: string = '';
  type: RecommendType = RecommendType.Movies;
  isMovie: boolean = true;
  details?: MovieSerie;
  extraDetails = {};
  title: string = "";

  donutChartData?: ChartDataSets[];
  donutChartLabels: string[] = ['Buena', 'Mala'];
  donutChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
  };
  donutChartType = "doughnut";


  constructor(private moviesService: MoviesService, 
    private seriesService: SeriesService, 
    private usersService: UsersService,
    private httpService: HttpService, 
    private route: ActivatedRoute,
    private location: Location) {}

  goBack() {
    this.location.back();
  }

  getExtraDetails(id?: number) {
    console.log('this.details: ',this.details)
    if (this.details) {
      this.donutChartData = [{
        data: [this.details.thumbsUpCount, this.details.thumbsDownCount],
        backgroundColor: ['#1B946C', '#B61A21'],
      }];
      this.title = this.details?.title ?? this.details?.name ?? '';
      console.log('this.donutChartData: ',this.donutChartData)
    }

    if (id) {
      this.httpService.getDataFromMDB(`${this.isMovie ? 'movie' : 'tv'}/${id}`,{})
      .subscribe((response) => { 
          this.extraDetails = response;
        },
        (error) => { console.log(error); }
      );
    }
    
  }

  ngOnInit(): void {
    this.type = this.route.snapshot.paramMap.get('type') as RecommendType;
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.isMovie = this.type === RecommendType.Movies;

    if (this.id) {
      if (this.isMovie) {
        this.moviesService.getMovie(this.id).subscribe(response => {
          if (!this.details) {
            this.details = response;
            this.getExtraDetails(response?.movieId);
          }
        })
      } else {
        this.seriesService.getSerie(this.id).subscribe(response => {
          if (!this.details) {
            this.details = response;
            this.getExtraDetails(response?.seriesId);
          }
        })
      }
    }
  }  
}
