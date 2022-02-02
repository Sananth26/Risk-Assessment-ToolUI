import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentPagesRoutingModule } from './content-pages-routing.module';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { Error4Component } from './error4/error4.component';
import { Error3Component } from './error3/error3.component';
import { Error500Component } from './error500/error500.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterDynamicFormComponent } from './master-dynamic-form/master-dynamic-form.component';
import { OrganisationComponent } from './organisation/organisation.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
 import { TrainingrecordsComponent } from './trainingrecords/trainingrecords.component';
import { SopboardComponent } from './sopboard/sopboard.component';
import { ViewfilesComponent } from './viewfiles/viewfiles.component';
import { TestformComponent } from './testform/testform.component';
 
@NgModule({
  declarations: [ComingSoonComponent, Error4Component, Error3Component, Error500Component,
 ],
  imports: [
    CommonModule,
    ContentPagesRoutingModule,
     FormsModule,
  ]
})
export class ContentPagesModule { }
