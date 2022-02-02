import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LookupursComponent } from './lookupurs/lookupurs.component';
 import { PermissionsettingsComponent } from './permissionsettings/permissionsettings.component';
import { AuditTrailComponent } from './audit-trail/audit-trail.component';
import { UasDashboardComponent } from './uas-dashboard/uas-dashboard.component';
import { WorkflowComponent } from './workflow/workflow.component';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { HolidayPlannerComponent } from './holiday-planner/holiday-planner.component';
import { DepartmentComponent } from './department/department.component';
import { HorizontalStepperComponent } from './horizontal-stepper/horizontal-stepper.component';
import { AuthGuard } from '../auth.guard';
import { Error404Component } from './error404/error404.component';
import { RemediationplanComponent } from './remediationplan/remediationplan.component';
import { RisksummaryandmitigationComponent } from './risksummaryandmitigation/risksummaryandmitigation.component';
import { FirewallrequestformnewComponent } from './firewallrequestformnew/firewallrequestformnew.component';
import {StepperComponent} from'./stepper/stepper.component'
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
import { ViewfirewallrequestComponent } from '../viewfirewallrequest/viewfirewallrequest.component';
import { WorkspaceComponent } from '../shared/workspace/workspace.component';
import { ItviewrequestComponent } from './itviewrequest/itviewrequest.component';
import { ProfileComponent } from '../shared/profile/profile.component';
import { ChangepasswordComponent } from '../shared/changepassword/changepassword.component';
import { ManagerapprovalComponent } from './managerapproval/managerapproval.component';
import { NetworkviewComponent } from './networkview/networkview.component';
import { RequestviewComponent } from './requestview/requestview.component';
import { ItrequestComponent } from './itrequest/itrequest.component';
import { ItsummaryComponent } from './itsummary/itsummary.component';
import { SigninComponent } from '../auth/signin/signin.component';


const routes: Routes = [
  {
    path: '',
    
  
    children: [
      {
        path: 'itrequest',
        component: ItrequestComponent,
        //canActivate: [AuthGuard],
        data: {
          title: 'IT View'
        }
      },
      
      {
        path: 'itsummary',
        component: ItsummaryComponent,
        //canActivate: [AuthGuard],
        data: {
          title: 'IT Summaru'
        }
      },
      {
        path: 'request',
        component: RequestviewComponent,
        //canActivate: [AuthGuard],
        data: {
          title: 'User View'
        }
      },
      {
        path: 'networkrequest',
        component: NetworkviewComponent,
        //canActivate: [AuthGuard],
        data: {
          title: 'Network View'
        }
      },
      {
        path: 'F',
        component: ChangepasswordComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Change Password'
        }
      },
      {
        path: 'managerapproval',
        component: ManagerapprovalComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Change Password'
        }
      },
      {
        path: 'lookupurs',
        component: LookupursComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Look Up Master'
        }
      },
      {
        path: 'viewITRequest',
        component: ItviewrequestComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'IT View Request'
        }
      },
      {
        path: 'permissionsettings',
        component: PermissionsettingsComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Permission Settings'
        }
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Profile'
        }
      },
      {
        path: 'workspace',
        component: WorkspaceComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Main Menu'
        }
      },
      {
        path: 'audittrail',
        component: AuditTrailComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Audit Trail'
        }
      },
      {
        path: 'uasdashboard',
        component: UasDashboardComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Dashboard'
        }
      },
      {
        path: 'workflow',
        component: WorkflowComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Workflow'
        }
      },
      {
        path: 'employeemanagement',
        component: EmployeeManagementComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Employee Management'
        }
      },
      {
        path: 'viewrequest',
        component: ViewfirewallrequestComponent,
        //canActivate: [AuthGuard],
        data: {
          title: 'View Request'
        }
      },
      {
        path: 'holidayplanner',
        component: HolidayPlannerComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Holiday Planner'
        }
      },
      {
        path: 'department',
        component: DepartmentComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Department'
        }
      },
      {
        path: 'horizontalstepper',
        component: HorizontalStepperComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'horizontalstepper'
        }
      }, 
      {
        path:'remediationplan',
        component : RemediationplanComponent,
        data:{
          title: 'Remediation Plan'

        }
      },
      {
        path:'risksummaryandmitigation',
        component : RisksummaryandmitigationComponent,
        data:{
          title: 'Risk Summary and Mitigation'
        }
      },
      {
        path:'firewallrequestformnew',
        component : FirewallrequestformnewComponent,
        data:{
          title: 'Firewallrequestform new'
        }
      },
      {
        path:'stepper',
        component : StepperComponent,
        canActivate: [AuthGuard],
        data:{
          title: 'Stepper'
        }
      }, 
      { 
        path:'firewallrequest',
      component : FirewallrequestComponent,
      data:{
        title: 'Firewallrequest '
      }
    },
    {
      path:'riskdetailuser',
      component : RiskdetailuserComponent,
      data:{
        title: 'Riskdetail User'
      }
    },
    
    {
      path:'viewsummary',
      component : ViewsummaryComponent,
      data:{
        title: 'View Summary '
      }
    },
    {
      path:'viewsummaryuser',
      component : ViewsummaryuserComponent,
      data:{
        title: 'View Summary '
      }
    },{
      path:'userstepper',
      component : UserstepperComponent,
      data:{
        title: 'User Form'
      }
    },
    {
      path:'userriskdetailranking',
      component : UserriskdetailrankingComponent,
      data:{
        title: 'User Risk Detail and Ranking'
      }
    },
    {
      path:'projectdetails',
      component : ProjectdetailsComponent,
      data:{
        title: 'Project Details '
      }
    },
    {
      path:'userview',
      component : UserviewComponent,
      data:{
        title: 'User View'
      }
    },
    {
      path:'networkview',
      component : ManagerviewComponent,
      //canActivate: [AuthGuard],
      data:{
        title: 'Network View'
      }
    },
    {
      path:'itreview',
      component : ItreviewComponent,
      data:{
        title: 'It Review'
      }
    },
    {
      path: '**',
      component: Error404Component,
      data: {
        title: 'Error 404'
      }
    },

    ]
    
 //   { useHash: true }
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class UrsroutingModule { }
