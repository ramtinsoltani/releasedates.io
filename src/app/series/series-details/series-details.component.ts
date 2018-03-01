import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import {
  transition,
  style,
  animate,
  trigger
} from '@angular/animations';

import {
  Poster,
  Pin,
  PinIdentity,
  FirebaseUser
} from '@models';

import {
  StorageService,
  C3Service,
  AuthService
} from '@services';

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
export class SeriesDetailsComponent implements OnInit, OnDestroy {

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
  public isPinningDisabled: boolean = true;
  public isPinningPending: boolean = false;
  public isPinned: boolean = false;
  public authSubscription: Subscription;
  public pinIdsSubscription: Subscription;

  constructor(
    private storage: StorageService,
    private c3: C3Service,
    private auth: AuthService
  ) { }

  ngOnInit() {

    this.isPinningDisabled = ! this.auth.isUserLoggedin() || this.auth.isUserAnonymous() || (! this.auth.user.emailVerified && ! this.auth.user.facebook);

    this.authSubscription = this.auth.userChanged.subscribe((user: FirebaseUser) => {

      this.isPinningDisabled = (! user || user.anonymous || (! user.emailVerified && ! user.facebook));

    });

    this.checkIsPinned(this.storage.pinIds);

    this.pinIdsSubscription = this.storage.pinIdsChanged.subscribe((ids: PinIdentity[]) => {

      this.checkIsPinned(ids);

    });

  }

  private checkIsPinned(ids: PinIdentity[]): void {

    this.isPinned = false;

    ids.map((id: PinIdentity) => {

      if ( id.id === this.c3.seriesId ) {

        this.isPinned = true;

      }

    });

  }

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

  public onPinUnpin(): void {

    this.isPinningPending = true;

    if ( this.isPinned ) {

      this.storage.unpinSeries(this.c3.seriesId)
      .then(() => {

        this.isPinningPending = false;

      })
      .catch(() => {

        this.isPinningPending = false;

      });

    }
    else {

      this.storage.pinSeries(new Pin(
        this.c3.seriesId,
        this.name,
        this.posters[this.selectedPoster].thumbnail,
        this.c3.seriesLastUpdated,
        this.c3.seriesHasNewEpisode
      ))
      .then(() => {

        this.isPinningPending = false;

      })
      .catch(() => {

        this.isPinningPending = false;

      });

    }

  }

  ngOnDestroy() {

    this.authSubscription.unsubscribe();
    this.pinIdsSubscription.unsubscribe();

  }

}
