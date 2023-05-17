import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { DeleteComponent } from './delete/delete.component';
import { UpdateComponent } from './update/update.component';
import { UserComponent } from './user/user.component';
import { UsersRoutingModule } from './users-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgDynamicBreadcrumbModule } from 'ng-dynamic-breadcrumb';
import { ProfileComponent } from './profile/profile.component';
import { MaterialExampleModule } from 'src/material.module';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    ListComponent,
    DeleteComponent,
    UpdateComponent,
    UserComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    MatNativeDateModule,
    NgDynamicBreadcrumbModule,
    MaterialExampleModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule
  ],
  exports: [
    ListComponent
  ]
})
export class UsersModule { }
