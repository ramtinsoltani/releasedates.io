import { Component, OnInit, HostListener } from '@angular/core';

import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';

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
  styleUrls: ['./discover.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate(500, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class DiscoverComponent implements OnInit {

  public discovered: Discovered[] = [];
  public pending: boolean = false;

  constructor(
    private api: ApiService,
    private c3: C3Service
  ) { }

  ngOnInit() {

    this.loadDiscover();

  }

  private loadDiscover(): void {

    if ( this.pending ) return;

    this.discovered = [];
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

  @HostListener('window: keyup', ['$event'])
  private shortcuts(event: KeyboardEvent): void {

    if ( event.target instanceof HTMLInputElement ) return;

    if ( event.key.toLowerCase() === 'r' && event.shiftKey ) {

      this.loadDiscover();

    }

  }

}
