import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Subject } from 'rxjs/Subject';

import { Pin, FirebaseUser } from '@models';

import { AuthService } from './auth.service';

@Injectable()
export class FireAgentService {

  public pinsChanged: Subject<any> = new Subject<any>();
  private idsRef: firebase.database.Reference = null;
  private isListenerAttached: boolean = false;

  constructor(
    private auth: AuthService
  ) { }

  public init(): void {

    this.auth.userChanged.subscribe((user: FirebaseUser) => {

      // Detach listener
      if ( this.idsRef && this.isListenerAttached && ( ! user || user.anonymous ) ) {

        this.idsRef.off();
        this.isListenerAttached = false;

      }

      // Undefine ref
      if ( ! user || user.anonymous ) {

        this.idsRef = null;
        this.pinsChanged.next(null);

      }

      // Define ref
      if ( ! this.idsRef && user && ! user.anonymous ) {

        this.idsRef = firebase.database().ref(`/pins/${this.auth.user.firebaseUID}/ids`);

      }

      // Attach listener
      if ( ! this.isListenerAttached && this.idsRef && user && ! user.anonymous ) {

        this.isListenerAttached = true;
        this.idsRef.on('value', (ids: firebase.database.DataSnapshot) => {

          this.pinsChanged.next(ids.val());

        });

      }

    });

  }

  public savePin(pin: Pin): Promise<void> {

    return new Promise((resolve, reject) => {

      if ( ! this.auth.isUserLoggedin() || this.auth.isUserAnonymous() || (! this.auth.user.emailVerified && ! this.auth.user.facebook) ) {
console.log('DENIED')
        reject();
        return;

      }

      const pinRef = firebase.database().ref(`/pins/${this.auth.user.firebaseUID}/data`).push(pin);

      pinRef.then(() => {

        firebase.database().ref(`/pins/${this.auth.user.firebaseUID}/ids`).update({ [pin.id]: pinRef.key })
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

  public deletePin(seriesId: number): Promise<void> {

    return new Promise((resolve, reject) => {

      if ( ! this.auth.isUserLoggedin() || this.auth.isUserAnonymous() || (! this.auth.user.emailVerified && ! this.auth.user.facebook) ) {
console.log('DENIED')
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
