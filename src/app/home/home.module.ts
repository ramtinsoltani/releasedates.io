import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragulaModule } from 'ng2-dragula';

import {
  HomeComponent,
  PinsComponent,
  PinComponent,
  RecentsComponent,
  SummaryItemComponent
} from '@components';

@NgModule({
  declarations: [
    HomeComponent,
    PinsComponent,
    PinComponent,
    RecentsComponent,
    SummaryItemComponent
  ],
  imports: [
    CommonModule,
    DragulaModule
  ]
})
export class HomeModule { }
