import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { InterestsRoutingModule } from './interests-routing.module';



@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    InterestsRoutingModule
  ],
  exports: [
    ListComponent
  ]
})
export class InterestsModule { }
