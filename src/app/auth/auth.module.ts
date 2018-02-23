import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthRouterModule } from '@routers';

import {
  LoginComponent,
  RegisterComponent,
  ResetComponent
} from '@components';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResetComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    AuthRouterModule
  ]
})
export class AuthModule { }
