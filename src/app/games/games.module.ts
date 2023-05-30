import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { GamesRoutingModule } from './games-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    GamesRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    ListComponent
  ]
})
export class GamesModule { }
