import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './shared/error/error.component';

const routes: Routes = [
  { 
    path: 'logs',
    loadChildren: () => import('./logs/logs.module').then( m => m.LogsModule )
  },
  { 
    path: 'posts',
    loadChildren: () => import('./posts/posts.module').then( m => m.PostsModule )
  },
  { 
    path: 'trends',
    loadChildren: () => import('./trends/trends.module').then( m => m.TrendsModule )
  },
  { 
    path: 'users',
    loadChildren: () => import('./users/users.module').then( m => m.UsersModule )
  },
  {
    path: '',
    redirectTo: 'logs',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
