import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthRouterModule } from '@routers';

import {
  LoginComponent,
  RegisterComponent
} from '@components';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    AuthRouterModule
  ]
})
export class AuthModule { }
