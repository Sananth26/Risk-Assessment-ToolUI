import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullPagesRoutingModule } from './full-pages-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
 
import { MasterDynamicFormComponent } from '../content-pages/master-dynamic-form/master-dynamic-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrganisationComponent } from '../content-pages/organisation/organisation.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UsermanagementComponent } from '../content-pages/usermanagement/usermanagement.component';
import {TrainingrecordsComponent} from '../content-pages/trainingrecords/trainingrecords.component';
import { SopformComponent } from '../content-pages/sopform/sopform.component';
import { QuestionAnswerComponent } from '../content-pages/question-answer/question-answer.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown'
 import { LookComponent, NgbdModalContent2 } from '../content-pages/look/look.component';
import { SopboardComponent } from '../content-pages/sopboard/sopboard.component';
import { viewClassName } from '@angular/compiler';
import { ViewfilesComponent } from '../content-pages/viewfiles/viewfiles.component';
import { TestformComponent } from '../content-pages/testform/testform.component';
import { CertificateComponent } from '../content-pages/certificate/certificate.component';

@NgModule({
  declarations: [
    MasterDynamicFormComponent,
    OrganisationComponent,
    UsermanagementComponent,
    TrainingrecordsComponent,
    SopformComponent,
    QuestionAnswerComponent,
  NgbdModalContent2,LookComponent,
    SopboardComponent,
    //ViewfilesComponent,
    TestformComponent, CertificateComponent,  
 ], 
  imports: [
    CommonModule,
    FullPagesRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgMultiSelectDropDownModule,
    NgbModule,
  
  ],
  entryComponents: [NgbdModalContent2, ViewfilesComponent], providers: [],
  
})
export class FullPagesModule { }
