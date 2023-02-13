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
      { path: 'user/:id', component: UserComponent },
      { path: 'update/:id', component: UpdateComponent },
      { path: 'list', component: ListComponent },
      { path: 'delete/:id', component: DeleteComponent },
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