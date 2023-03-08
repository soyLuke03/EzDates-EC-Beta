import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeleteComponent } from './delete/delete.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'user/:id', 
      component: UserComponent,
      data: {
        title: 'USERS > {{id}}',
        breadcrumb: [
          {
            label: 'HOME',
            url: 'posts'
          },
          {
            label: 'USERS',
            url: 'users'
          },
          {
            label: 'USUARIO: {{id}}',
            url: 'users/user/:id'
          }
        ]
      } },
      { path: 'update/:id', component: UpdateComponent,data: {
        title: 'USERS > {{id}} > UPDATE',
        breadcrumb: [
          {
            label: 'HOME',
            url: 'posts'
          },
          {
            label: 'USERS',
            url: 'users'
          },
          {
            label: 'USUARIO: {{id}}',
            url: 'users/user/:id'
          },
          {
            label: 'UPDATE',
            url: 'users/update/:id'
          }
        ]
      } },
      { path: 'list', component: ListComponent,data: {
        title: 'USERS',
        breadcrumb: [
          {
            label: 'HOME',
            url: 'posts'
          },
          {
            label: 'USERS',
            url: 'users'
          }
        ]
      } },
      { path: 'delete/:id', component: DeleteComponent,data: {
        title: 'USERS > {{id}} > DELETE',
        breadcrumb: [
          {
            label: 'HOME',
            url: 'posts'
          },
          {
            label: 'USERS',
            url: 'users'
          },
          {
            label: 'USUARIO: {{id}}',
            url: 'users/user/:id'
          },
          {
            label: 'DELETE',
            url: 'users/delete/:id'
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
export class UsersRoutingModule { }