import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { UsersModule } from '../users/users.module';



@NgModule({
  declarations: [
    ErrorComponent,
    SidebarComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    UsersModule
  ],
  exports: [
    ErrorComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
