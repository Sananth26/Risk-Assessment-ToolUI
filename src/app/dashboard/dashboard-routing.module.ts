import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { V1Component } from './v1/v1.component';
 

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'v1',
        component: V1Component,
        data: {
          title: 'V1'
        }
      }
   
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
