import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  LoginComponent,
  RegisterComponent
} from '@components';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', redirectTo: '/404', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
  ])],
  exports: [RouterModule]
})
export class AuthRouterModule { }
