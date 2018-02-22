import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {
  CoreModule,
  HomeModule
} from '@modules';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
