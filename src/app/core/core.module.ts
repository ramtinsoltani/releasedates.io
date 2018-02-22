import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRouterModule } from '@routers';

import {
  HeaderComponent,
  FooterComponent,
  NotFoundComponent
} from '@components';

import {
  ApiService,
  AuthService,
  C3Service,
  FireAgentService,
  StorageService
} from '@services';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    CoreRouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    CoreRouterModule
  ],
  providers: [
    ApiService,
    AuthService,
    C3Service,
    FireAgentService,
    StorageService
  ]
})
export class CoreModule { }