import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './add/add.component';
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
export class UsersRoutingModule { }