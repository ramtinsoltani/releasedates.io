import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';
import * as firebaseKey from 'firebase-key';

import { Pin, PinIdentity, FirebaseUser } from '@models';

import { AuthService } from '@core/services/auth';

@Injectable()
export class FireAgentService {

  public pinIdsChanged: Subject<any> = new Subject<any>();
  public pinsChanged: Subject<any> = new Subject<any>();

  private idsRef: firebase.database.Reference = null;
  private pinsRef: firebase.database.Reference = null;
  private isIdsListenerAttached: boolean = false;
  private isPinsListenerAttached: boolean = false;

  constructor(
    private auth: AuthService
  ) { }

  public init(): void {

    this.auth.userChanged.subscribe((user: FirebaseUser) => {

      // If not authenticated or anonymous
      if ( ! user || user.anonymous ) {

        // Detach IDs listeners
        if ( this.idsRef && this.isIdsListenerAttached ) {

          this.idsRef.off();
          this.isIdsListenerAttached = false;

        }

        // Detach Pins listeners
        if ( this.pinsRef && this.isPinsListenerAttached ) {

          this.pinsRef.off();
          this.isPinsListenerAttached = false;

        }

        // Undefine refs
        this.idsRef = null;
        this.pinsRef = null;
        this.pinIdsChanged.next(null);
        this.pinsChanged.next(null);

      }

      // If authenticated and not anonymous
      if ( user && ! user.anonymous ) {

        // Define IDs refs
        if ( ! this.idsRef ) {

          this.idsRef = firebase.database().ref(`/pins/${this.auth.user.firebaseUID}/ids`);

        }

        // Define Pins refs
        if ( ! this.pinsRef ) {

          this.pinsRef = firebase.database().ref(`/pins/${this.auth.user.firebaseUID}/data`);

        }

        // Attach IDs listeners
        if ( ! this.isIdsListenerAttached && this.idsRef ) {

          this.isIdsListenerAttached = true;
          this.idsRef.on('value', (ids: firebase.database.DataSnapshot) => {

            this.pinIdsChanged.next(ids.val());

          });

        }

        // Attach Pins listeners
        if ( ! this.isPinsListenerAttached && this.pinsRef ) {

          this.isPinsListenerAttached = true;
          this.pinsRef.on('value', (pins: firebase.database.DataSnapshot) => {

            this.pinsChanged.next(pins.val());

          });

        }

      }

    });

  }

  public savePin(pin: Pin): Promise<void> {

    return new Promise((resolve, reject) => {

      if ( ! this.auth.isUserLoggedin() || this.auth.isUserAnonymous() || (! this.auth.user.emailVerified && ! this.auth.user.facebook) ) {

        reject();
        return;

      }

      const key = firebaseKey.key();

      firebase.database().ref(`/pins/${this.auth.user.firebaseUID}/data`).update({ [key]: pin })
      .then(() => {

        return firebase.database().ref(`/pins/${this.auth.user.firebaseUID}/ids`).update({ [pin.id]: key });

      })
      .then(() => {

        resolve();

      })
      .catch((error) => {

        console.error(error);
        reject();

      });

    });

  }

  public repin(pins: Pin[], identities: PinIdentity[]): Promise<void> {

    return new Promise((resolve, reject) => {

      if ( ! this.auth.isUserLoggedin() || this.auth.isUserAnonymous() || (! this.auth.user.emailVerified && ! this.auth.user.facebook) ) {

        reject();
        return;

      }

      const newPins = {};
      const newIdentities = {};

      for ( const pin of pins ) {

        const key = firebaseKey.key();

        newPins[key] = pin;
        newIdentities[pin.id] = key;

      }

      firebase.database()
      .ref(`/pins/${this.auth.user.firebaseUID}/data`)
      .set(newPins)
      .then(() => {

        return firebase.database().ref(`/pins/${this.auth.user.firebaseUID}/ids`).set(newIdentities);

      })
      .then(() => {

        resolve();

      })
      .catch((error) => {

        console.error(error);
        reject();

      });

    });

  }

  public updatePin(key: string, pin: Pin): Promise<void> {

    return new Promise((resolve, reject) => {

      if ( ! this.auth.isUserLoggedin() || this.auth.isUserAnonymous() || (! this.auth.user.emailVerified && ! this.auth.user.facebook) ) {

        reject();
        return;

      }

      firebase.database()
      .ref(`/pins/${this.auth.user.firebaseUID}/data/${key}`)
      .update(pin)
      .then(() => {

        resolve();

      })
      .catch((error) => {

        console.error(error);
        reject();

      });

    });

  }

  public deletePin(seriesId: number): Promise<void> {

    return new Promise((resolve, reject) => {

      if ( ! this.auth.isUserLoggedin() || this.auth.isUserAnonymous() || (! this.auth.user.emailVerified && ! this.auth.user.facebook) ) {

        reject();
        return;

      }

      firebase.database()
      .ref(`/pins/${this.auth.user.firebaseUID}/ids/${seriesId}`)
      .once('value', (data: firebase.database.DataSnapshot) => {

        const key = data.val();

        firebase.database()
        .ref(`/pins/${this.auth.user.firebaseUID}/data`)
        .update({
          [key]: null
        })
        .then(() => {

          return firebase.database()
          .ref(`/pins/${this.auth.user.firebaseUID}/ids`)
          .update({
            [seriesId]: null
          });

        })
        .then(() => {

          resolve();

        })
        .catch((error) => {

          console.error(error);
          reject();

        });

      });

    });

  }

}
