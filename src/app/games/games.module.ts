import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { GamesRoutingModule } from './games-routing.module';



@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    GamesRoutingModule
  ],
  exports: [
    ListComponent
  ]
})
export class GamesModule { }
