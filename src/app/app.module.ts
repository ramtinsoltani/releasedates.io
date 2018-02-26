import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import * as firebase from 'firebase';
import * as credentials from '../credentials.json';

import {
  CoreModule,
  HomeModule
} from '@modules';

import { AppComponent } from './app.component';

firebase.initializeApp((<any>credentials).firebase);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
