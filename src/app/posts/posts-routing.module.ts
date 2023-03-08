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
      { path: 'post/:id', component: PostComponent,    
      data: {
        title: 'POSTS > {{ id }}',
        breadcrumb: [
          {
            label: 'HOME',
            url: 'posts'
          },
          {
            label: 'POSTS',
            url: 'posts'
          },
          {
            label: 'POST ID: {{id}}',
            url: 'posts/post/:id'
          }
        ]
      } },
      { path: 'update/:id', component: UpdateComponent,
      data: {
        title: 'POSTS > {{ id }} > UPDATE',
        breadcrumb: [
          {
            label: 'HOME',
            url: 'posts'
          },
          {
            label: 'POSTS',
            url: 'posts'
          },
          {
            label: 'POST ID: {{id}}',
            url: 'posts/post/:id'
          },
          {
            label: 'UPDATE',
            url: 'posts/update/:id'
          }
        ]
      } },
      { path: 'list', component: ListComponent,
      data: {
        title: 'POSTS',
        breadcrumb: [
          {
            label: 'HOME',
            url: 'posts'
          },
          {
            label: 'POSTS',
            url: 'posts'
          }
        ]
      } },
      { path: 'delete/:id', component: DeleteComponent,
      data: {
        title: 'POSTS > {{ id }} > DELETE',
        breadcrumb: [
          {
            label: 'HOME',
            url: 'posts'
          },
          {
            label: 'POSTS',
            url: 'posts'
          },
          {
            label: 'POST ID: {{id}}',
            url: 'posts/post/:id'
          },
          {
            label: 'DELETE',
            url: 'posts/delete/:id'
          }
        ]
      } },
      { path: 'add', component: AddComponent,
      data: {
        title: 'HOME',
        breadcrumb: [
          {
            label: 'HOME',
            url: 'posts'
          },
          {
            label: 'POSTS',
            url: 'posts'
          },
          {
            label: 'ADD',
            url: 'posts/add'
          }
        ]
      } },
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