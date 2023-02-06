import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { DeleteComponent } from './delete/delete.component';
import { UpdateComponent } from './update/update.component';
import { UserComponent } from './user/user.component';
import { UsersRoutingModule } from './users-routing.module';



@NgModule({
  declarations: [
    ListComponent,
    AddComponent,
    DeleteComponent,
    UpdateComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
