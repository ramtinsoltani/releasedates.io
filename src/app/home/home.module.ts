import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DragulaModule } from 'ng2-dragula';

import {
  HomeComponent,
  PinsComponent,
  PinComponent,
  DiscoverComponent,
  SummaryItemComponent
} from '@components';

@NgModule({
  declarations: [
    HomeComponent,
    PinsComponent,
    PinComponent,
    DiscoverComponent,
    SummaryItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DragulaModule
  ]
})
export class HomeModule { }
