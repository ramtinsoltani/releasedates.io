import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import {
  Series,
  Episode
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

        const lastSeason = this.series.seasons[this.series.seasons.length - 1];
        const lastEpisode = lastSeason.episodes[lastSeason.episodes.length - 1];

        this.nextEpisode = this.c3.isEpisodeUpcoming(lastEpisode) ? this.c3.getEpisodeAirDate(lastEpisode, this.series.airDate) : null;

        this.c3.seriesAirDate = this.series.airDate;

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
