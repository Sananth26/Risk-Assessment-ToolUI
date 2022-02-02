import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from "./shared/shared.module";
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { FullLayoutComponent } from "./layouts/full/full-layout.component";
import { ToastrModule } from 'ngx-toastr';
import { UiSwitchModule } from 'ngx-ui-switch';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { NgImageSliderModule } from 'ng-image-slider';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false
};

import * as $ from 'jquery';

// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApisProvider } from './utility/api';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { util } from './utility/util';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DateAdapter, CalendarModule, CalendarWeekModule, CalendarMonthModule } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DepartmentComponent } from './urs/department/department.component';
import { HorizontalStepperComponent } from './urs/horizontal-stepper/horizontal-stepper.component';
import { LoadRequestData } from './utility/NewRequestModel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent as ModalComponent } from './modals/modal/modal.component';
import { WorkflowmodalComponent } from './modals/workflowmodal/workflowmodal.component';
import { NgSelectModule } from "@ng-select/ng-select";
import { ArchwizardModule } from 'angular-archwizard';
import { PeerreviewWorkflowComponent } from './modals/peerreview-workflow/peerreview-workflow.component';
import { ApproveComponent } from './modals/approve/approve.component';
import { SpinnerComponent } from './modals/spinner/spinner.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { MatSidenavModule,MatTableModule,MatListModule, MatButtonModule, MatExpansionModule,
  MatFormFieldModule, MatToolbarModule, MatIconModule, MatInputModule, MatGridListModule,
  MatMenuModule,MatSlideToggleModule,MatDatepickerModule,MatAutocompleteModule,MatRadioModule,
  MatCheckboxModule, MatSelectModule, MatOptionModule, } from '@angular/material';
import { ItapproveComponent } from './modals/itapprove/itapprove.component';
import { ItrejectComponent } from './modals/itreject/itreject.component';
import { ManagerapprovalcommentComponent } from './modals/managerapprovalcomment/managerapprovalcomment.component';
import { StepperworkflowComponent } from './modals/stepperworkflow/stepperworkflow.component';
import { HelpguideComponent } from './modals/helpguide/helpguide.component';
  
@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    ContentLayoutComponent,
    ModalComponent,
    WorkflowmodalComponent,
    PeerreviewWorkflowComponent,
    ApproveComponent,
    SpinnerComponent,
    ItapproveComponent,
    ItrejectComponent, 
    ManagerapprovalcommentComponent, 
    StepperworkflowComponent, 
    HelpguideComponent
    ],

  imports: [
    BrowserModule,FormsModule,ArchwizardModule,
        Ng4LoadingSpinnerModule.forRoot(),NgImageSliderModule,
    AngularMultiSelectModule,NgSelectModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatTableModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    NgbModule,
    ToastrModule.forRoot(),
    NgIdleKeepaliveModule.forRoot(),
    NgxDatatableModule,
    UiSwitchModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDKXKdHQdtqgPVl2HI2RnUa_1bjCxRCQo4'}),
    PerfectScrollbarModule,
    ReactiveFormsModule ,
    FormsModule,
    ModalModule.forRoot(),
    
    // FormsModule,FlatpickrModule.forRoot()
    // CalendarWeekModule,
    // CalendarMonthModule,
    
    // CalendarModule.forRoot({
    //   provide: DateAdapter,
    //   useFactory:adapterFactory
    // }),
  
  ],
  providers: [
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },ApisProvider,util,LoadRequestData,
  ////  {provide : LocationStrategy , useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent,StepperworkflowComponent,HelpguideComponent,ItrejectComponent,WorkflowmodalComponent,ManagerapprovalcommentComponent,PeerreviewWorkflowComponent,ApproveComponent,ItapproveComponent]
})
export class AppModule { }
