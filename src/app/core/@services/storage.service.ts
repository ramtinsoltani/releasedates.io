import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Pin, PinIdentity } from '@models';

import { FireAgentService } from '@core/services/fire-agent';

@Injectable()
export class StorageService {

  public pinIdsChanged: Subject<PinIdentity[]> = new Subject<PinIdentity[]>();
  public pinsChanged: Subject<Pin[]> = new Subject<Pin[]>();

  private _pinIds: PinIdentity[] = [];
  private _pins: Pin[] = [];

  constructor(
    private fireAgent: FireAgentService
  ) { }

  public init(): void {

    this.fireAgent.pinIdsChanged.subscribe((data) => {

      const identities: PinIdentity[] = [];

      for ( const id in data ) {

        identities.push({
          id: +id,
          key: data[id]
        });

      }

      this.pinIdsChanged.next(identities);
      this._pinIds = identities;

    });

    this.fireAgent.pinsChanged.subscribe((data) => {

      const pins: Pin[] = [];

      for ( const key in data ) {

        pins.push(data[key]);

      }

      this.pinsChanged.next(pins);
      this._pins = pins;

    });

  }

  public get pinIds(): PinIdentity[] {

    return this._pinIds.slice();

  }

  public get pins(): Pin[] {

    return this._pins.slice();

  }

  public pinSeries(pin: Pin): Promise<void> {

    return this.fireAgent.savePin(pin);

  }

  public repin(pins: Pin[]): Promise<void> {

    return this.fireAgent.repin(pins, this._pinIds);

  }

  public updatePin(pin: Pin): Promise<void> {

    let key: string;

    this._pinIds.map((id: PinIdentity) => {

      if ( id.id === pin.id ) key = id.key;

    });

    if ( ! key ) {

      console.error('Cannot find the pin key using the pin ID! The pins map is misaligned with the pins data!');
      return Promise.reject(null);

    }

    return this.fireAgent.updatePin(key, pin);

  }

  public unpinSeries(id: number): Promise<void> {

    return this.fireAgent.deletePin(id);

  }

}
