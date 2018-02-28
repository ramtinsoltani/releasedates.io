import { Component, OnInit, Input } from '@angular/core';

import {
  transition,
  style,
  animate,
  trigger
} from '@angular/animations';

import {
  Poster
} from '@models';

@Component({
  selector: 'app-series-details',
  templateUrl: './series-details.component.html',
  styleUrls: ['./series-details.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate(500, style({
          opacity: 1
        }))
      ])
    ])
  ]
})
export class SeriesDetailsComponent implements OnInit {

  @Input('name')
  public name: string;

  @Input('status')
  public status: string;

  @Input('overview')
  public overview: string;

  @Input('network')
  public network: string;

  @Input('rating')
  public rating: number;

  @Input('imdbLink')
  public imdbLink: string;

  @Input('airDate')
  public airDate: string;

  @Input('genre')
  public genre: string[];

  @Input('posters')
  public posters: Poster[];

  @Input('totalSeasons')
  public totalSeasons: number;

  @Input('totalEpisodes')
  public totalEpisodes: number;

  @Input('nextEpisode')
  public nextEpisode: string;

  public selectedPoster = 0;

  constructor() { }

  ngOnInit() { }

  public getSelectedPoster(): string {

    if ( ! this.posters[0].poster ) {

      return '/assets/placeholder.jpg';

    }

    return this.posters[this.selectedPoster].poster;

  }

  public nextPoster(): void {

    if ( ! this.posters[0].poster ) return;

    if ( this.selectedPoster === this.posters.length - 1 ) {

      this.selectedPoster = 0;

    }
    else {

      this.selectedPoster++;

    }

  }

  public previousPoster(): void {

    if ( ! this.posters[0].poster ) return;

    if ( this.selectedPoster === 0 ) {

      this.selectedPoster = this.posters.length - 1;

    }
    else {

      this.selectedPoster--;

    }

  }

  public getRatingColor(): string {

    if ( this.rating >= 9 ) return '#dc3545';
    if ( this.rating > 5 ) return '#ffc107';
    return '#6c757d';

  }

}
