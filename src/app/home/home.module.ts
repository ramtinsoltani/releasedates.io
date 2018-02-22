import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  HomeComponent,
  PinsComponent,
  RecentsComponent,
  SummaryItemComponent
} from '@components';

@NgModule({
  declarations: [
    HomeComponent,
    PinsComponent,
    RecentsComponent,
    SummaryItemComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
