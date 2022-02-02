import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterDynamicFormComponent } from '../content-pages/master-dynamic-form/master-dynamic-form.component';
import { OrganisationComponent } from '../content-pages/organisation/organisation.component';
import { UsermanagementComponent } from '../content-pages/usermanagement/usermanagement.component';
 import { TrainingrecordsComponent } from '../content-pages/trainingrecords/trainingrecords.component';
import { SopformComponent } from '../content-pages/sopform/sopform.component';
import { QuestionAnswerComponent } from '../content-pages/question-answer/question-answer.component';
 import { LookComponent } from '../content-pages/look/look.component';
import { SopboardComponent } from '../content-pages/sopboard/sopboard.component';
import { TestformComponent } from '../content-pages/testform/testform.component';
import { CertificateComponent } from '../content-pages/certificate/certificate.component';
 
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dynamicForms',
        component: MasterDynamicFormComponent,
        data: {
          title: 'Dynamic Form'
        }
      },
      {
        path: 'organisation',
        component: OrganisationComponent,
        data: {
          title: 'Organisation'
        },
      },
      {
        path: 'usermanagement',
        component: UsermanagementComponent,
        data: {
          title: 'Usermanagement'
        }
      },
     
      {
        path: 'trainingrecords',
        component: TrainingrecordsComponent,
        data: {
          title: 'Training Records'
        }
      },
      {
        path: 'sopboard',
        component: SopboardComponent,
        data: {
          title: 'SOP Board'
        }
      },
      {
        path: 'sopform',
        component: SopformComponent,
        data: {
          title: 'SOP Form'
        }
      },
      {
        path: 'questionAnswer',
        component: QuestionAnswerComponent,
        data: {
          title: 'Question Answer Form'
        }
      },
      {
        path: 'testform',
        component: TestformComponent,
        data: {
          title: 'Test Application'
        }
      },
      {
        path: 'lookup',
        component: LookComponent,
        data: {
          title: 'Look up pop'
        }
      },
      {
        path: 'certificate',
        component: CertificateComponent,
        data: {
          title: 'Certificate'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FullPagesRoutingModule { }
 