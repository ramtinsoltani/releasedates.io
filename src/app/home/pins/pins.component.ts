import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { DragulaService } from 'ng2-dragula';

import { PinComponent } from '@components';

import {
  StorageService,
  ApiService,
  C3Service
} from '@services';

import {
  Pin,
  Update
} from '@models';

@Component({
  selector: 'app-pins',
  templateUrl: './pins.component.html',
  styleUrls: ['./pins.component.scss']
})
export class PinsComponent implements OnInit, OnDestroy {

  public pins: Pin[] = [];
  public isDragging: boolean = false;

  private pinsSubscription: Subscription;
  private dragulaSubscriptions: Subscription[] = [];

  constructor(
    private storage: StorageService,
    private api: ApiService,
    private c3: C3Service,
    private zone: NgZone,
    private dragula: DragulaService
  ) { }

  ngOnInit() {

    this.dragula.setOptions('pinsContainer', {

      removeOnSpill: true

    });

    this.dragulaSubscriptions.push(

      this.dragula.drag.subscribe(() => {

        this.isDragging = true;

      }),

      this.dragula.dragend.subscribe(() => {

        this.isDragging = false;

      }),

      this.dragula.dropModel.subscribe(() => {

        this.storage.repin(this.pins)
        .catch((error) => {

          console.error(error);

        });

      }),

      this.dragula.removeModel.subscribe((args) => {

        const pinComponent: Element = args[1];
        const pinId: number = +pinComponent.getAttribute('id');

        this.storage.unpinSeries(pinId);

      })

    );

    ;

    this.pins = this.storage.pins;
    this.getUpdates();

    this.pinsSubscription = this.storage.pinsChanged.subscribe((pins: Pin[]) => {

      this.zone.run(() => {

        this.pins = pins;

      });

    });

  }

  private getUpdates(): void {

    for ( const pin of this.pins ) {

      this.api.backendUpdates(pin.id, pin.lastUpdated)
      .then((update: Update) => {

        if ( update.hasUpdates ) {

          let hasNewEpisode: boolean = false;

          for ( const episode of update.episodes ) {

            if ( this.c3.isEpisodeUpcoming(episode) ) {

              hasNewEpisode = true;
              break;

            }

          }

          this.storage.updatePin(new Pin(
            pin.id,
            pin.name,
            pin.thumbnail,
            update.lastUpdated,
            hasNewEpisode
          ));

        }

      })
      .catch((error) => {

        console.log(error);

      });

    }

  }

  ngOnDestroy() {

    this.pinsSubscription.unsubscribe();
    this.dragulaSubscriptions.map((subscription: Subscription) => {

      subscription.unsubscribe();

    });
    this.dragula.destroy('pinsContainer');

  }

}
