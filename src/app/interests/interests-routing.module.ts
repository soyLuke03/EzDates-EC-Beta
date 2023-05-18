import { RouterModule, Routes } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { NgModule } from '@angular/core';




const routes: Routes = [
    {
      path: '',
      children: [
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
export class InterestsRoutingModule { }