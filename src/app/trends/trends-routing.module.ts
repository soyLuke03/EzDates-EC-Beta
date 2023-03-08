import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrendComponent } from './trend/trend.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';




const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'trend/:id', component: TrendComponent,
      data: {
        title: 'TRENDS > {{id}}',
        breadcrumb: [
          {
            label: 'HOME',
            url: 'posts'
          },
          {
            label: 'TRENDS',
            url: 'trends'
          },
          {
            label: 'TREND: {{id}}',
            url: 'trends/trend/:id'
          }
        ]
      } },
      { path: 'update/:id', component: UpdateComponent,
      data: {
        title: 'TRENDS > {{id}} > UPDATE',
        breadcrumb: [
          {
            label: 'HOME',
            url: 'posts'
          },
          {
            label: 'TRENDS',
            url: 'trends'
          },
          {
            label: 'TREND: {{id}}',
            url: 'trends/trend/:id'
          },
          {
            label: 'UPDATE',
            url: 'trends/update/:id'
          }
        ]
      } },
      { path: 'delete/:id', component: DeleteComponent,
      data: {
        title: 'TRENDS > {{id}} > DELETE',
        breadcrumb: [
          {
            label: 'HOME',
            url: 'posts'
          },
          {
            label: 'TRENDS',
            url: 'trends'
          },
          {
            label: 'TREND: {{id}}',
            url: 'trends/trend/:id'
          },
          {
            label: 'DELETE',
            url: 'trends/delete/:id'
          }
        ]
      } },
      { path: 'add', component: AddComponent,
      data: {
        title: 'TRENDS > {{id}} > ADD',
        breadcrumb: [
          {
            label: 'HOME',
            url: 'posts'
          },
          {
            label: 'TRENDS',
            url: 'trends'
          },
          {
            label: 'ADD',
            url: 'trends/add'
          }
        ]
      } },
      { path: 'list', component: ListComponent,
      data: {
        title: 'TRENDS',
        breadcrumb: [
          {
            label: 'HOME',
            url: 'posts'
          },
          {
            label: 'TRENDS',
            url: 'trends'
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
export class TrendsRoutingModule { }