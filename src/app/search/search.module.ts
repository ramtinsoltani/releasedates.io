import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SearchRouterModule } from '@routers';

import {
  SearchComponent
} from '@components';

@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SearchRouterModule
  ]
})
export class SearchModule { }
