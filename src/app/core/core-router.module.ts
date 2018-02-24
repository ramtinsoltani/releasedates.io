import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';

import {
  HomeComponent,
  NotFoundComponent,
  PrivacyComponent
} from '@components';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'search', loadChildren: '../search/search.module#SearchModule' },
      { path: 'auth', loadChildren: '../auth/auth.module#AuthModule' },
      { path: 'series', loadChildren: '../series/series.module#SeriesModule' },
      { path: 'privacy', component: PrivacyComponent },
      { path: '**', component: NotFoundComponent }
    ], { preloadingStrategy: PreloadAllModules })
  ],
  exports: [
    RouterModule
  ]
})
export class CoreRouterModule { }
