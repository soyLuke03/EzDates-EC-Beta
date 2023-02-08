import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from '../posts/post/post.component';
import { UpdateComponent } from '../posts/update/update.component';
import { ListComponent } from '../posts/list/list.component';
import { DeleteComponent } from '../posts/delete/delete.component';
import { AddComponent } from '../posts/add/add.component';



const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'post/:id', component: PostComponent },
      { path: 'update/:id', component: UpdateComponent },
      { path: 'list', component: ListComponent },
      { path: 'delete/:id', component: DeleteComponent },
      { path: 'add', component: AddComponent },
      { path: '**', redirectTo: 'list' }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class PostsRoutingModule { }