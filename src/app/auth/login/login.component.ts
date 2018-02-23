import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@services';
import { FirebaseError } from '@models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public firebaseErrorMessage: string;
  public facebookErrorMessage: string;
  public showFacebookError: boolean = false;
  public loginDisabled: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {}

  public getError(emailControl: FormControl, passwordControl: FormControl): string {

    if ( this.firebaseErrorMessage ) return this.firebaseErrorMessage;

    if ( emailControl.errors && emailControl.touched ) {

      return emailControl.errors.required ? 'Email is required!' : 'Email is invalid!';

    }

    if ( passwordControl.errors && passwordControl.touched ) {

      return passwordControl.errors.required ? 'Password is required!' : 'Password must be at least 8 characters!';

    }

    return '';

  }

  public onInputChange(): void {

    this.firebaseErrorMessage = null;

  }

  public onSubmit(form: NgForm): void {

    this.loginDisabled = true;
    this.firebaseErrorMessage = null;
    this.facebookErrorMessage = null;

    let subscription = this.auth.loginEmail(form.value.email, form.value.password)
    .subscribe(() => {

      subscription.unsubscribe();

      this.router.navigate(['/']);

    }, (error: FirebaseError) => {

      subscription.unsubscribe();

      switch (error.code) {
        case 'auth/user-not-found':
          this.firebaseErrorMessage = 'The email address is not registered!';
          break;
        case 'auth/wrong-password':
          this.firebaseErrorMessage = 'The password in incorrect!';
          break;
        default:
          this.firebaseErrorMessage = 'Oops! Something went wrong with the login, please try again.';
      }

      this.loginDisabled = false;

    });

  }

  public onFacebookLogin(): void {

    this.loginDisabled = true;
    this.facebookErrorMessage = null;
    this.firebaseErrorMessage = null;

    this.auth.loginFacebook()
    .then(() => {

      this.loginDisabled = false;

      this.router.navigate(['/']);

    })
    .catch((error: FirebaseError) => {

      switch (error.code) {
        case 'auth/account-exists-with-different-credential':
          this.facebookErrorMessage = `An account already exists with the email associated to your Facebook (${error.email}). Please use your email instead to login.`;
          break;
        case 'auth/popup-closed-by-user':
          this.facebookErrorMessage = 'Can\'t login because the pop-up was closed!';
          break;
        default:
          this.facebookErrorMessage = 'Oops! Something went wrong with the Facebook login, please try again.';
      }

      this.loginDisabled = false;

    });

  }

}
