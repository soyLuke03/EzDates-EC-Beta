import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './shared/error/error.component';
import { AuthGuard } from './auth-guard.service';
import { TermConditionsComponent } from './term-conditions/term-conditions/term-conditions.component';

const routes: Routes = [
  { path: 'logs',
    loadChildren: () => import('./logs/logs.module').then( m => m.LogsModule )
  },

  { path: 'posts',
    canActivate: [AuthGuard],
    loadChildren: () => import('./posts/posts.module').then( m => m.PostsModule ),
    data: {
      title: 'HOME',
      breadcrumb: [
        {
          label: 'HOME',
          url: 'posts'
        }
      ]
    }
  },

  { path: 'trends',
    canActivate: [AuthGuard],
    loadChildren: () => import('./trends/trends.module').then( m => m.TrendsModule ),
    data: {
      title: 'TRENDS',
      breadcrumb: [
        {
          label: 'TRENDS',
          url: 'trends'
        }
      ]
    }
  },

  { path: 'users',
    canActivate: [AuthGuard],
    loadChildren: () => import('./users/users.module').then( m => m.UsersModule ),
    data: {
      title: 'USERS',
      breadcrumb: [
        {
          label: 'USERS',
          url: 'users'
        }
      ]
    }
  },

  { path: 'terms', component: TermConditionsComponent, data: {
    title: 'TERMS',
    breadcrumb: [
      {
        label: 'TERMS',
        url: 'terms'
      }
    ]
  } 
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
