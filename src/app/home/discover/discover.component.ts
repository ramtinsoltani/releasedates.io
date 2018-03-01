import { Component, OnInit } from '@angular/core';

import {
  Discovered
} from '@models';

import {
  ApiService,
  C3Service
} from '@services';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {

  public discovered: Discovered[] = [];
  public pending: boolean = false;

  constructor(
    private api: ApiService,
    private c3: C3Service
  ) { }

  ngOnInit() {

    this.pending = true;

    this.api.backendDiscover(50)
    .then((results: Discovered[]) => {

      this.pending = false;
      this.discovered = this.c3.sanitizeDiscovered(results);

    })
    .catch(() => {

      this.pending = false;

    });

  }

}
