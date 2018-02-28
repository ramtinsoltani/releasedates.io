import { Component } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

import { C3Service } from '@services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'ReleaseDates.io';

  constructor(
    private c3: C3Service,
    private router: Router
  ) {

    this.router.events.subscribe((event: RouterEvent) => {

      if ( event instanceof NavigationEnd ) {

        if ( event.url.substr(0, 5) !== '/auth' ) {

          this.c3.lastRoute = event.url;

        }

      }

    });

  }

}
