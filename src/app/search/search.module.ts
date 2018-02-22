import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRouterModule } from '@routers';

import {
  SearchComponent,
  ResultsItemComponent,
  ResultsListComponent
} from '@components';

@NgModule({
  declarations: [
    SearchComponent,
    ResultsItemComponent,
    ResultsListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SearchRouterModule
  ]
})
export class SearchModule { }
