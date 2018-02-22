import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeriesRouterModule } from '@routers';

import {
  SeriesComponent,
  SeriesDetailsComponent,
  SeriesEpisodeComponent,
  SeriesSeasonComponent
} from '@components';

@NgModule({
  declarations: [
    SeriesComponent,
    SeriesDetailsComponent,
    SeriesEpisodeComponent,
    SeriesSeasonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SeriesRouterModule
  ]
})
export class SeriesModule { }
