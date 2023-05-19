import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { InterestsRoutingModule } from './interests-routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    InterestsRoutingModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    ListComponent
  ]
})
export class InterestsModule { }
