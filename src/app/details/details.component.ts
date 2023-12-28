import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ChartColor, ChartDataSets } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { MoviesService } from '../services/movies.service';
import { SeriesService } from '../services/series.service';
import { UsersService } from '../services/users.service';
import { HttpService } from '../services/http.service';
import { MovieSerie, RecommendType } from '../models/movies-series.model';

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

  donutChartData: ChartDataSets[] = [];
  donutChartLabels: string[] = ['Buena', 'Mala'];
  donutChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
  };
  donutChartType = "doughnut";

  @ViewChild(BaseChartDirective) donutChart?: BaseChartDirective;

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
    if (this.details) {
      this.donutChartData = [{
        data: [this.details.thumbsUpCount, this.details.thumbsDownCount],
        backgroundColor: this.getGradient() as ChartColor,
      }];
      this.title = this.details?.title ?? this.details?.name ?? '';
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

  getGradient() {
    if (this.donutChart) {
      var thumbsUpGradient = null;
      var thumbsDownGradient = null;
      var width = null;
      var height = null;
      const chartArea = this.donutChart.chart.chartArea;
    
      if (!chartArea) {
        return null;
      }
      
      const chartWidth = chartArea.right - chartArea.left;
      const chartHeight = chartArea.bottom - chartArea.top;
      if (thumbsUpGradient === null || thumbsDownGradient === null || width !== chartWidth || height !== chartHeight) {
        width = chartWidth;
        height = chartHeight;
        let centerX = (chartArea.left + chartArea.right) / 2;
        let centerY = (chartArea.top + chartArea.bottom) / 2;
        let r = Math.min(
          (chartArea.right - chartArea.left) / 2,
          (chartArea.bottom - chartArea.top) / 2
        );
        var ctx = this.donutChart.chart.ctx!;
        thumbsUpGradient = ctx?.createRadialGradient(centerX, centerY, 0, centerX, centerY, r);
        thumbsUpGradient.addColorStop(0, 'white');
        thumbsUpGradient.addColorStop(0.5, '#4CD9AA');
        thumbsUpGradient.addColorStop(1, '#1B946C');
        thumbsDownGradient = ctx?.createRadialGradient(centerX, centerY, 0, centerX, centerY, r);
        thumbsDownGradient.addColorStop(0, 'white');
        thumbsDownGradient.addColorStop(0.5, '#E84046');
        thumbsDownGradient.addColorStop(1, '#B61A21');
      }
      
      return [thumbsUpGradient, thumbsDownGradient];
    }
    
    return ['#1B946C', '#B61A21'];
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
