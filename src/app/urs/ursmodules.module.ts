import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullPagesRoutingModule } from '../pages/full-pages/full-pages-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { UrsroutingModule } from './ursrouting.module';
import { MasterDynamicFormComponent } from '../pages/content-pages/master-dynamic-form/master-dynamic-form.component';
import { NgbdModalContent2 } from '../pages/content-pages/look/look.component';
import { ViewfilesComponent } from '../pages/content-pages/viewfiles/viewfiles.component';
import { FullPagesModule } from '../pages/full-pages/full-pages.module';
import { PermissionsettingsComponent } from './permissionsettings/permissionsettings.component';
import { AuditTrailComponent } from './audit-trail/audit-trail.component';
import { UasDashboardComponent } from './uas-dashboard/uas-dashboard.component';
import { PopupComponent } from './popup/popup.component';
import { WorkflowComponent } from './workflow/workflow.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { HolidayPlannerComponent } from './holiday-planner/holiday-planner.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DepartmentComponent } from './department/department.component';
import { HorizontalStepperComponent } from './horizontal-stepper/horizontal-stepper.component';
import { Error404Component } from './error404/error404.component';
import {RemediationplanComponent} from './remediationplan/remediationplan.component'
import {RisksummaryandmitigationComponent} from'./risksummaryandmitigation/risksummaryandmitigation.component'
import {FirewallrequestformnewComponent} from './firewallrequestformnew/firewallrequestformnew.component'
import {StepperComponent} from'./stepper/stepper.component'
import { FormWizardModule } from 'angular2-wizard';
import { FirewallrequestComponent } from './firewallrequest/firewallrequest.component';
import { RiskdetailuserComponent } from './riskdetailuser/riskdetailuser.component';
import { ViewsummaryComponent } from './viewsummary/viewsummary.component';
import { UserstepperComponent } from './userstepper/userstepper.component';
import { ViewsummaryuserComponent } from './viewsummaryuser/viewsummaryuser.component';
import { UserriskdetailrankingComponent } from './userriskdetailranking/userriskdetailranking.component';
import { ProjectdetailsComponent } from './projectdetails/projectdetails.component';
import { UserviewComponent } from './userview/userview.component';
import { ManagerviewComponent } from './managerview/managerview.component';
import { ItreviewComponent } from './itreview/itreview.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ArchwizardModule } from 'angular-archwizard';
import {MatExpansionModule} from '@angular/material/expansion';
import { ViewfirewallrequestComponent } from '../viewfirewallrequest/viewfirewallrequest.component';
import { MatSidenavModule,MatTableModule,MatListModule, MatButtonModule, 
  MatFormFieldModule, MatToolbarModule, MatIconModule, MatInputModule, MatGridListModule,
  MatMenuModule,MatSlideToggleModule,MatDatepickerModule,MatAutocompleteModule,MatRadioModule,
  MatCheckboxModule, MatSelectModule, MatOptionModule, } from '@angular/material';
  import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { NameComponentComponent } from './name-component/name-component.component';
import { ItviewrequestComponent } from './itviewrequest/itviewrequest.component';
import { LookupursComponent } from './lookupurs/lookupurs.component';
import { FilterPipe } from '../shared/filter.pipe.';
import { CommentboxComponent } from '../shared/commentbox/commentbox.component';
import { CommentsComponent, DatacontainerDirective } from '../shared/comments/comments.component';
import { ChildboxComponent } from '../shared/childbox/childbox.component';
import { ManagerapprovalComponent } from './managerapproval/managerapproval.component';
import { NetworkviewComponent } from './networkview/networkview.component';
import { RequestviewComponent } from './requestview/requestview.component';
import { ItrequestComponent } from './itrequest/itrequest.component';
import { ItsummaryComponent } from './itsummary/itsummary.component';
import { polyfill as keyboardEventKeyPolyfill } from 'keyboardevent-key-polyfill';
import { TextInputAutocompleteModule } from 'angular-text-input-autocomplete';


  

keyboardEventKeyPolyfill()

@NgModule({
  
  declarations: [LookupursComponent,FilterPipe,
      PermissionsettingsComponent,
     AuditTrailComponent,
     UasDashboardComponent,
     PopupComponent,
     WorkflowComponent, 
     EmployeeManagementComponent,
     HolidayPlannerComponent,
     DepartmentComponent,
     HorizontalStepperComponent,
     Error404Component,
      ViewfilesComponent,
      RemediationplanComponent,
      FirewallrequestformnewComponent,
     RisksummaryandmitigationComponent,
     FirewallrequestComponent,
     RiskdetailuserComponent,
     StepperComponent,
     ViewsummaryComponent,
     ViewsummaryuserComponent,
     UserstepperComponent,
     ProjectdetailsComponent,
     UserriskdetailrankingComponent,
     UserviewComponent,
     ManagerviewComponent,
     ManagerapprovalComponent,
     ItreviewComponent,
     ViewfirewallrequestComponent,
     NameComponentComponent,
     ItviewrequestComponent,
     CommentboxComponent,
     CommentsComponent,
     ChildboxComponent,
     DatacontainerDirective,
     NetworkviewComponent,
     RequestviewComponent,
     ItrequestComponent,
     ItsummaryComponent
     
     
    ],
  imports: [
    CommonModule,
    AngularMultiSelectModule,NgMultiSelectDropDownModule.forRoot(),MatExpansionModule,
    FormsModule,ArchwizardModule,TextInputAutocompleteModule,
    MatSidenavModule,MatTableModule,MatListModule, MatButtonModule, 
  MatFormFieldModule, MatToolbarModule, MatIconModule, MatInputModule, MatGridListModule,
  MatMenuModule,MatSlideToggleModule,MatDatepickerModule,MatAutocompleteModule,MatRadioModule,
  MatCheckboxModule, MatSelectModule, MatOptionModule, 
    SharedModule,
    ReactiveFormsModule,
    UrsroutingModule,
    NgbModule,
    FormWizardModule,MultiselectDropdownModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    //NgxSpinnerModule
    ],
  entryComponents: [ PopupComponent,ViewfilesComponent,ChildboxComponent], providers: [],

})
export class UrsmodulesModule { }
