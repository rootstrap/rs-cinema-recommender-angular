import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieSerie, MoviesSeriesSearch, MovieSeriesSearchInfo, RecommendType } from '../models/movies-series.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { MoviesService } from '../services/movies.service';
import { User } from '../models/users.model';
import { UsersService } from '../services/users.service';
import { HttpService } from '../services/http.service';
import { SeriesService } from '../services/series.service';


@Component({
  selector: 'app-movies',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css']
})
export class MoviesComponent implements OnInit, OnDestroy {
  userSubscription?: Subscription;
  type: RecommendType = RecommendType.Movies;
  isMovies: boolean = true;
  recommendations: MovieSerie[] = [];

  newRecommendation: string = '';
  currentUser: User;
  recommendSearch?: MoviesSeriesSearch;
  showMoviesSearch: boolean = false;
  showThumbsUpTooltips: boolean[] = [];
  showThumbsDownTooltips: boolean[] = [];
  titleFilter: string = '';
  title: string = '';
  searchTitle: string = '';
  searchPlaceholder: string = '';
  searchMessage: string = '';

  constructor(private moviesService: MoviesService, 
              private seriesService: SeriesService, 
              private usersService: UsersService,
              private httpService: HttpService, 
              private route: ActivatedRoute,
              private router: Router) {
    this.currentUser  = this.usersService.getCurrentUserOrGuest();
  }

  clearSearch() {
    this.recommendSearch = undefined;
    this.newRecommendation = '';
    this.showMoviesSearch = false;
  }

  addRecommendation(recommendation: MovieSeriesSearchInfo) {
    const currentRecommendation = this.recommendations.find(({ movieId, seriesId }) => 
      this.isMovies && movieId === recommendation.id || 
      !this.isMovies && seriesId === recommendation.id
    );
    if (currentRecommendation) {
      this.voteThumbsUp(currentRecommendation, true);
    } else { 
      if (this.isMovies) {
        this.moviesService.addMovie({
          ...recommendation,
          movieId: recommendation.id,
          thumbsUp: [ this.currentUser ],
          thumbsDown: [],
          thumbsUpCount: 1,
          thumbsDownCount: 0,
        });
      } else {
        this.seriesService.addSeries({
          ...recommendation,
          seriesId: recommendation.id,
          thumbsUp: [ this.currentUser ],
          thumbsDown: [],
          thumbsUpCount: 1,
          thumbsDownCount: 0,
        });
      }  
      this.clearSearch();
    }
  }

  voteThumbsUp(recommendation: MovieSerie, clearAfter?: boolean) {
    const thumbsUp = recommendation.thumbsUp.find(({ id }) => id === this.currentUser?.id);
    if (thumbsUp) {
      alert('Ya votaste esta película');
    } else {
      const newThumbsUp = [
        ...recommendation.thumbsUp,
        this.currentUser,
      ];
      const newThumbsDown = recommendation.thumbsDown.filter(({ id }) => id !== this.currentUser?.id);
      const newRecommendationData = {
        ...recommendation,
        thumbsUp: newThumbsUp,
        thumbsDown: newThumbsDown,
        thumbsUpCount: newThumbsUp.length,
        thumbsDownCount: newThumbsDown.length,
      };
      if (this.isMovies) {
        this.moviesService.updateMovie(newRecommendationData);
      } else {
        this.seriesService.updateSeries(newRecommendationData)
      }
      
      clearAfter && this.clearSearch();
    }
  }

  voteThumbsDown(recommendation: MovieSerie) {
    const thumbsDown = recommendation.thumbsDown.find(({ id }) => id === this.currentUser?.id);
    if (thumbsDown) {
      alert('Ya votaste esta película')
    } else {
      const newThumbsDown = [
        ...recommendation.thumbsDown,
        this.currentUser,
      ];
      const newThumbsUp = recommendation.thumbsUp.filter(({ id }) => id !== this.currentUser?.id);
      const newRecommendationData = {
        ...recommendation,
        thumbsDown: newThumbsDown,
        thumbsUp: newThumbsUp,
        thumbsDownCount: newThumbsDown.length,
        thumbsUpCount: newThumbsUp.length,
      };
      if (this.isMovies) {
        this.moviesService.updateMovie(newRecommendationData);
      } else {
        this.seriesService.updateSeries(newRecommendationData)
      }
    }
  }

  enterSearchMode() {
    this.showMoviesSearch = true;
    this.titleFilter = '';
  }

  searchRecommendation () {
    this.httpService.getDataFromMDB(`search/${this.type}`, {
      'query': this.newRecommendation,
      'include_adult': false,
    }).subscribe(
      (response) => { 
        this.recommendSearch = response as MoviesSeriesSearch;
        },
      (error) => { console.log(error); });

    // use this for hardcoded data
    /* this.recommendSearch = this.httpService.getHardcodedMovies();
    this.showMoviesSearch = true; */
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

  goToDetails(recommendation: MovieSerie) {
    this.router.navigate(['/details',recommendation.id]);
  }

  ngOnInit(): void {
    this.userSubscription = this.route.params.subscribe((params: Params) => {
      this.type = params?.type as RecommendType ?? RecommendType.Movies;
      this.isMovies = this.type === RecommendType.Movies;
      if (this.isMovies) {
        this.moviesService.getMovies().subscribe(movies => {
            this.recommendations = movies;
            this.showThumbsUpTooltips.fill(false, 0, movies.length - 1);
            this.showThumbsDownTooltips.fill(false, 0, movies.length - 1);
        });
      } else {
        this.seriesService.getSeries().subscribe(series => {
          this.recommendations = series;
          this.showThumbsUpTooltips.fill(false, 0, series.length - 1);
          this.showThumbsDownTooltips.fill(false, 0, series.length - 1);
        });
      }
      this.title = `Qué ${this.isMovies ? 'películas' : 'series'} recomiendan los Rootstrappers?`
      this.searchTitle = `Buscá la ${this.isMovies ? 'película' : 'serie'} que querés recomendar:`
      this.searchPlaceholder = `Search ${this.isMovies ? 'Movie' : 'TV Show'}`
      this.searchMessage = `Alguna de estas es la ${this.isMovies ? 'película' : 'serie'} que buscabas?`
      this.clearSearch();
    })
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe()
}
}
