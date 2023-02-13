import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrendComponent } from './trend/trend.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';
import { ListComponent } from './list/list.component';




const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'trend/:id', component: TrendComponent },
      { path: 'update/:id', component: UpdateComponent },
      { path: 'delete/:id', component: DeleteComponent },
      { path: 'list', component: ListComponent },
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