import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './shared/error/error.component';
import { AuthGuard } from './auth-guard.service';

const routes: Routes = [
  { 
    path: 'logs',
    loadChildren: () => import('./logs/logs.module').then( m => m.LogsModule )
  },
  { 
    path: 'posts',
    canActivate: [AuthGuard],
    loadChildren: () => import('./posts/posts.module').then( m => m.PostsModule )
  },
  { 
    path: 'trends',
    canActivate: [AuthGuard],
    loadChildren: () => import('./trends/trends.module').then( m => m.TrendsModule )
  },
  { 
    path: 'users',
    canActivate: [AuthGuard],
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
