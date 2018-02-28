import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/throw';
import { Subject } from 'rxjs/Subject';

import { FirebaseUser } from '@models';

@Injectable()
export class AuthService {

  private firebaseUser: FirebaseUser;
  public userChanged: Subject<FirebaseUser> = new Subject<FirebaseUser>();

  constructor() { }

  public init(): void {

    firebase.auth().onAuthStateChanged((user: firebase.User) => {

      if ( user ) {

        this.firebaseUser = new FirebaseUser(
          user.isAnonymous,
          user.displayName,
          user.email,
          user.emailVerified,
          user.photoURL,
          user.uid,
          ! user.isAnonymous ? user.providerData[0].uid : null,
          ! user.isAnonymous ? user.providerData[0].providerId === 'facebook.com' : null
        );

      }
      else {

        this.firebaseUser = null;
        firebase.auth().signInAnonymously();

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

  public getToken(): Observable<string> {

    if ( ! this.isUserLoggedin() ) return Observable.throw(new Error('User not logged in!'));

    return Observable.fromPromise(firebase.auth().currentUser.getIdToken());

  }

  public isUserLoggedin(): boolean {

    return !! firebase.auth().currentUser;

  }

  public isUserAnonymous(): boolean {

    return this.isUserLoggedin() && this.firebaseUser.anonymous;

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
