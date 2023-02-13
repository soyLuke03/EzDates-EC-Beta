import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrendComponent } from './trend/trend.component';
import { DeleteComponent } from './delete/delete.component';
import { UpdateComponent } from './update/update.component';
import { ListComponent } from './list/list.component';
import { TrendsRoutingModule } from './trends-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TrendComponent,
    DeleteComponent,
    UpdateComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    TrendsRoutingModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class TrendsModule { }
