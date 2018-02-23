import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import { Subject } from 'rxjs/Subject';

import { FirebaseUser } from '@models';

@Injectable()
export class AuthService {

  private firebaseUser: FirebaseUser;
  public userChanged: Subject<FirebaseUser> = new Subject<FirebaseUser>();

  constructor() {

    firebase.auth().onAuthStateChanged((user) => {

      if ( user ) {

        this.firebaseUser = new FirebaseUser(
          user.displayName,
          user.email,
          user.emailVerified,
          user.photoURL,
          user.uid,
          user.providerData[0].uid,
          user.providerData[0].providerId === 'facebook.com'
        );

      }
      else {

        this.firebaseUser = null;

      }

      this.userChanged.next(this.firebaseUser);

    });

  }

  public loginEmail(email: string, password: string): Observable<any> {

    return Observable.fromPromise(firebase.auth().signInWithEmailAndPassword(email, password));

  }

  public registerEmail(email: string, password: string): Observable<any> {

    return Observable.fromPromise(firebase.auth().createUserWithEmailAndPassword(email, password));

  }

  public loginFacebook(): Promise<any> {

    return new Promise((resolve, reject) => {

      firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(() => {

        resolve();

      })
      .catch((error) => {

        reject(error);

      });

    });

  }

  public isUserLoggedin(): boolean {

    return !! firebase.auth().currentUser;

  }

  public get user(): FirebaseUser {

    return this.firebaseUser;

  }

  public sendVerificationEmail() {

    return firebase.auth().currentUser.sendEmailVerification();

  }

  public logout(): void {

    firebase.auth().signOut()
    .catch((error) => {

      console.error(error);

    });

  }

  public resetPassword(email: string): Observable<any> {

    return Observable.fromPromise(firebase.auth().sendPasswordResetEmail(email));

  }

}
