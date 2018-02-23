import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import {
  AuthService,
  ApiService
} from '@services';
import { FirebaseUser } from '@models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private trapTriggered: boolean = false;

  public user: FirebaseUser = null;
  @ViewChild('detectTrap')
  public detectTrap: ElementRef;

  constructor(
    private router: Router,
    private auth: AuthService,
    private api: ApiService
  ) { }

  ngOnInit() {

    this.user = this.auth.user;

    this.subscription = this.auth.userChanged
    .subscribe((user: FirebaseUser) => {

      this.user = user;

      if ( ! this.trapTriggered ) {

        this.detectTrap.nativeElement.click();
        this.trapTriggered = true;

      }

    });

  }

  public onFind(value: string): void {

    if ( value && value.trim() ) this.router.navigate(['/search'], { queryParams: { q: value.trim() } });

  }

  public onVerify(): void {

    this.auth.sendVerificationEmail()
    .catch(error => {

      console.log(error);

    });

  }

  public onLogout(): void {

    this.auth.logout();

  }

  public getGravatar(): string {

    return this.api.getGravatar(this.user.email);

  }

  ngOnDestroy() {

    this.subscription.unsubscribe();

  }

}
