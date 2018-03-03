import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';

import {
  SearchResult
} from '@models';

import {
  ApiService
} from '@services';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    trigger('searchResultAnimation', [
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate(500, style({
          opacity: 1
        }))
      ]),
      transition('* => void', [
        animate(500, style({
          opacity: 0
        }))
      ])
    ])
  ]
})
export class SearchComponent implements OnInit {

  public results: SearchResult[] = [];
  public showError: boolean = false;
  public searchQuery: string = '';
  public pending: boolean = false;
  public imageErrors = {};

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.route.queryParams.subscribe((params) => {

      this.results = [];
      this.pending = true;
      this.showError = false;

      this.api.backendSearch(params.q)
      .then((results: SearchResult[]) => {

        this.results = results;
        this.showError = false;
        this.pending = false;

      })
      .catch(() => {

        this.results = [];
        this.showError = true;
        this.searchQuery = params.q;
        this.pending = false;

      });

    });

  }

  public getThumbnail(index: number): string {

    if ( this.results[index].posters[0].thumbnail && ! this.imageErrors[index] ) return this.results[index].posters[0].thumbnail;

    return '/assets/placeholder.jpg';

  }

  public onImageError(index: number): void {

    this.imageErrors[index] = true;

  }

}
