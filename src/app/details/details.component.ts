import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MoviesService } from '../services/movies.service';
import { SeriesService } from '../services/series.service';
import { UsersService } from '../services/users.service';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
  id: string = '';

  constructor(private moviesService: MoviesService, 
    private seriesService: SeriesService, 
    private usersService: UsersService,
    private httpService: HttpService, 
    private route: ActivatedRoute) {}


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
  }
    
}
