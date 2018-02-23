import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '@services';
import { FirebaseError } from '@models';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  public firebaseErrorMessage: string;
  public resetDisabled: boolean = false;
  public emailSent: boolean = false;

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  public onInputChange(): void {

    this.firebaseErrorMessage = null;

  }

  public onSubmit(form: NgForm): void {

    this.resetDisabled = true;

    let subscription = this.auth.resetPassword(form.value.email)
    .subscribe(() => {

      this.emailSent = true;

    }, (error) => {

      this.resetDisabled = false;

      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/invalid-email':
          this.firebaseErrorMessage = 'The email address in not registered!';
          break;
        default:
          this.firebaseErrorMessage = 'Oops! Something went wrong, please try again.'
      }

    });

  }

}
