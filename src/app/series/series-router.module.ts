import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SeriesComponent } from '@components';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: ':id', component: SeriesComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class SeriesRouterModule { }
