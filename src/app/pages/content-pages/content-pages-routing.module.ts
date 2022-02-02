import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { Error3Component } from './error3/error3.component';
import { Error500Component } from './error500/error500.component';
import { Error4Component } from './error4/error4.component';
import { MasterDynamicFormComponent } from './master-dynamic-form/master-dynamic-form.component';
import { TestformComponent } from './testform/testform.component';
import { SigninComponent } from 'src/app/auth/signin/signin.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'coming-soon',
        component: ComingSoonComponent,
        data: {
          title: 'Coming Soon'
        }
      },
      {
        path: 'testform',
        component: TestformComponent,
        data: {
          title: 'testform'
        }
      },
      {
        path: 'error-403',
        component: Error3Component,
        data: {
          title: 'Error 403'
        }
      },
      {
        path: 'auth/signin',
        component: SigninComponent,
        data: {
          title: 'Error 404'
        }
      },
      {
        path: 'error-500',
        component: Error500Component,
        data: {
          title: 'Error 500'
        }
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentPagesRoutingModule { }
