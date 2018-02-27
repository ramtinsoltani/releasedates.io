import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
    CommonModule,
    NgbModule
  ],
  exports: [
    SeriesRouterModule
  ]
})
export class SeriesModule { }
