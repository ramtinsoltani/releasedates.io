import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CoreRouterModule } from '@routers';

import { BackendInterceptor } from '@interceptors';

import {
  HeaderComponent,
  FooterComponent,
  NotFoundComponent,
  PrivacyComponent
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
    NotFoundComponent,
    PrivacyComponent
  ],
  imports: [
    CommonModule,
    CoreRouterModule,
    FormsModule,
    HttpClientModule
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
    StorageService,
    { provide: HTTP_INTERCEPTORS, useClass: BackendInterceptor, multi: true}
  ]
})
export class CoreModule {

  constructor(
    private auth: AuthService,
    private storage: StorageService,
    private fireAgent: FireAgentService
  ) {

    this.auth.init();
    this.fireAgent.init();
    this.storage.init();

  }

}
