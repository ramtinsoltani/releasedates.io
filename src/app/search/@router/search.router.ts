import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SearchComponent } from '@components';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: SearchComponent }
    ])
  ]
})
export class SearchRouterModule { }
