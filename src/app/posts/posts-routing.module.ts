import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './post/post.component';
import { UpdateComponent } from '../trends/update/update.component';
import { ListComponent } from '../trends/list/list.component';
import { DeleteComponent } from '../trends/delete/delete.component';
import { AddComponent } from './add/add.component';



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