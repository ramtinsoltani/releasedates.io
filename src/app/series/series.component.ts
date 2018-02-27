import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import {
  Series,
  Season,
  Episode,
  Poster
} from '@models';

import {
  ApiService
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

  constructor(
    private api: ApiService,
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
