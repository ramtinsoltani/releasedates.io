import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import {
  Series,
  Episode,
  Season
} from '@models';

import {
  ApiService,
  C3Service
} from '@services';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {

  public pending: boolean = false;
  public showError: boolean = false;
  public id: number = null;
  public series: Series = null;
  public nextEpisode: string;

  constructor(
    private api: ApiService,
    private c3: C3Service,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {

      this.pending = true;
      this.showError = false;
      this.series = null;

      this.api.backendSeries(+params.id)
      .then((results: Series) => {

        this.pending = false;
        this.showError = false;
        this.series = results;

        // Sanitize seasons
        this.series.seasons = this.series.seasons.map((season: Season) => {

          return this.c3.sanitizeSeason(season);

        });

        // Reverse the order of seasons
        this.series.seasons = this.series.seasons.reverse();
        // Get next new episode of that last season (if any)
        this.nextEpisode = this.c3.getNextEpisodeAirDate(this.series.seasons[0], this.series.airDate);

        // Set variables for child components
        this.c3.seriesAirDate = this.series.airDate;
        this.c3.seriesName = this.series.name;

      })
      .catch(() => {

        this.pending = false;
        this.id = params.id;
        this.showError = true;
        this.series = null;

      });

    });

  }

}
