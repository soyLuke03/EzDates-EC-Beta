import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { DeleteComponent } from './delete/delete.component';
import { UpdateComponent } from './update/update.component';
import { AddComponent } from './add/add.component';
import { PostComponent } from './post/post.component';
import { PostsRoutingModule } from './posts-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListComponent,
    DeleteComponent,
    UpdateComponent,
    AddComponent,
    PostComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class PostsModule { }
