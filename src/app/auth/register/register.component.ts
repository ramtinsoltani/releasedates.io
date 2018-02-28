import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import {
  AuthService,
  C3Service
} from '@services';

import { FirebaseError } from '@models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public firebaseErrorMessage: string;
  public registerDisabled: boolean = false;

  constructor(
    private auth: AuthService,
    private c3: C3Service,
    private router: Router
  ) { }

  ngOnInit() {
  }

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

    this.registerDisabled = true;

    let subscription = this.auth.registerEmail(form.value.email, form.value.password)
    .subscribe(() => {

      subscription.unsubscribe();

      this.auth.sendVerificationEmail()
      .then(() => {

        this.router.navigate([this.c3.lastRoute ? this.c3.lastRoute : '/']);

      })
      .catch(error => {

        console.log(error);

      });

    }, (error: FirebaseError) => {

      subscription.unsubscribe();

      this.firebaseErrorMessage = error.message;
      this.registerDisabled = false;

    });

  }

}
