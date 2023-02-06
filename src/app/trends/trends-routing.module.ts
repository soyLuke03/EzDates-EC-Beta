import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrendComponent } from './trend/trend.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';
import { AddComponent } from '../posts/add/add.component';



const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'trend/:id', component: TrendComponent },
      { path: 'update/:id', component: UpdateComponent },
      { path: 'delete/:id', component: DeleteComponent },
      { path: 'list', component: AddComponent },
      { path: '**', redirectTo: 'list' }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class TrendsRoutingModule { }