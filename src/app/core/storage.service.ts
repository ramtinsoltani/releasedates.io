import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Pin, PinIdentity } from '@models';

import { FireAgentService } from './fire-agent.service';

@Injectable()
export class StorageService {

  public pinsChanged: Subject<PinIdentity[]> = new Subject<PinIdentity[]>();

  private _pinIds: PinIdentity[] = [];

  constructor(
    private fireAgent: FireAgentService
  ) { }

  public init(): void {

    this.fireAgent.pinsChanged.subscribe((pinIds) => {

      const identities: PinIdentity[] = [];

      for ( const id in pinIds ) {

        identities.push({
          id: +id,
          key: pinIds[id]
        });

      }

      this.pinsChanged.next(identities);
      this._pinIds = identities;

    });

  }

  public get pinIds(): PinIdentity[] {

    return this._pinIds.slice();

  }

  public pinSeries(pin: Pin): Promise<void> {

    return this.fireAgent.savePin(pin);

  }

  public unpinSeries(id: number): Promise<void> {

    return this.fireAgent.deletePin(id);

  }

}
