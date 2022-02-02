import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Stepper } from 'src/app/utility/uasModels';
import { SidebarService } from 'src/app/shared/sidebar/sidebar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApisProvider } from 'src/app/utility/api';
import swal from 'sweetalert2';
import { FirewallrequestComponent } from '../firewallrequest/firewallrequest.component';
import { ViewsummaryuserComponent } from '../viewsummaryuser/viewsummaryuser.component';
import { UserriskdetailrankingComponent } from '../userriskdetailranking/userriskdetailranking.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { dropDowns } from 'src/app/utility/model';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { StepperworkflowComponent } from 'src/app/modals/stepperworkflow/stepperworkflow.component';
import { permissionList } from 'src/app/utility/Usermodel';


@Component({
  selector: 'app-userstepper',
  templateUrl: './userstepper.component.html',
  styleUrls: ['./userstepper.component.scss']
})
export class UserstepperComponent implements OnInit {

  @ViewChild('formWizard', { static: true }) formWizard: any;
  @ViewChild('gxpFORM',null) gxpFormComp: FirewallrequestComponent;
  @ViewChild('userSummary',null) summaryComp:ViewsummaryuserComponent ;
  @ViewChild('userRisk',null) userriskComp:UserriskdetailrankingComponent;

  requestId:string;
  status:string;
  requestDate:any;
  corpid:string;
  requestersName:string;
  requestersPhone:string;
  requestersEmail:string;
  requestersDept:string;
  btnPrev: boolean;
  btnNext: boolean;
  title: any;
  dropdown: any;
  navFixed: boolean = false;
  stepper: Stepper = new Stepper();
  itwfList : any;
  canEdit:boolean=true;
  SubCategoryList:permissionList=new permissionList(); 
  workflowList=[];
  requestSno:string;
  savetoogle:boolean=true;
  summarytab:boolean=false;
  saveRequest:boolean=true;
  saveRisk:boolean=false;
  peerTab=true;
  btnNext1:boolean=true;
  enableNext=false;
  requestSno1='';


jwt:any;
editRequestId:any;
cardView:boolean;
requestSno2:boolean=false;
editPermission=false;
userId:any;
view:any;
  
  constructor( private matDialog:MatDialog,private router: Router,public sidebarservice: SidebarService,private route:ActivatedRoute,
    private api:ApisProvider,private spinnerService: Ng4LoadingSpinnerService) { }



ngOnInit() {
  this.route.queryParams.subscribe(params=>{
    this.editRequestId =  params['requestId'];
    this.userId=params['userId'];
    this.view=params['view'];
    if(this.view=='user'){
      if(this.editRequestId!=undefined){
        this.cardView=true
        this.editPermission=true;
        this.onEditload(this.editRequestId);
        this.editUser()
          //this.userId==this.api.decode(localStorage.getItem("userId"))
      }else{
        this.cardView=false;
        this.editUser()
      }
      this.requestDate=Date.now();
      this.btnPrev  = false;
      this.btnNext  = true;
   }
  })
  }
  
  
getResuestSno(){
  this.requestSno=localStorage.getItem("requestSno")
}

onrolepermissionandlevelpermission() {
  this.SubCategoryList.id=20;//requestid
  this.SubCategoryList.categoryId=2;//userid
  this.SubCategoryList.key ="manager";//module

  this.api.apiMethodFetchDataByPOST("api/RequestFormUser/ManagerPermission", this.SubCategoryList).then(result => {
   if (result.status) {
    alert(JSON.stringify(result.resultOP));
    } else {
      swal(
        'Error Demo!',
        result.description,
        'error'
      )
    }
  });
}




  LoadStepper(){
   this.dropdown   = new dropDowns();
   this.dropdown.key ="";
   this.dropdown.id =10;
   this.api.apiMethodFetchDataByPOST("api/RequestFormUser/Stepper",this.dropdown).then(async result => {
  if (result.status) {
   this.workflowList=result.resultOP
     }
      else
      {
       swal(
         'Error!',
         result.description,
         'error'
       )
     }
   })
  }

  openModal() {
    let id=this.editRequestId
    this.spinnerService.show()
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.position= {top: '3%'}
    dialogConfig.id = "modal-component";
    dialogConfig.height = "290px";
    dialogConfig.width = "1000px";
    dialogConfig.data={id};
    const modalDialog = this.matDialog.open(StepperworkflowComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {

    });
  }


  onEditload(requestId) {    
     this.api.apiMethodFetchDataByGET('api/RequestFormUser/EditRequestLoadonId?reqid=' + requestId).then(data => {
      this.requestSno=data.resultOP.requestSno;
      this.status=data.resultOP.status
      if(this.status=="Peer Review"){
        this.canEdit=data.resultOP.canEdit
      }
     });
    }


  editUser() {
    var loginUseridEncode =localStorage.getItem('userId'); 
    const elementId=this.api.decode(loginUseridEncode)
    this.api.apiMethodFetchDataByGET('api/UserMaster/LoadUsersForEdit?userId=' +elementId).then(result => {
      this.corpid=result.resultOP[0].corporateId
      this.requestersName=result.resultOP[0].firstName
      this.requestersPhone=result.resultOP[0].mobileNo
      this.requestersEmail=result.resultOP[0].email
      this.requestersDept=result.resultOP[0].departmentName
    });
    
}


 
  loadUserDetails() {
    this.api.apiMethodFetchDataByGET('api/UserMaster/LoadAllUserDatas').then(result => {
      if (result.status) {
        let data=result.resultOP;
      } else {
          swal(
          'Error!',
          result.description,
          'error'
        )
      }
    });
  }
 
 
loadrequestSno(){
  this.requestSno1=localStorage.getItem("requestSno")
}

navigatePrevious() {
  this.formWizard.previous();
}
navigateNext() {
  this.formWizard.next();
}

navigateDone() {
  this.formWizard.done();
}


onStepChangedLoadData(event) {
  if(event.title=="Request Information"){
    this.spinnerService.show();
   setTimeout(() => {
     /** spinner ends after 5 seconds */
     this.spinnerService.hide();
   }, 2000);
   //this.userriskComp.nextSummary=false
    this.btnNext=true;
    this.btnPrev=false;
    this.saveRisk=false
    this.saveRequest=true;
    this.summarytab=false
    this.peerTab=true
    
 if(this.gxpFormComp.nextFlag){
      this.onEditload(localStorage.getItem("primaryRequestId"))
    }

  }

  if(event.title=="Risk Detail and Ranking"){
    this.spinnerService.show();
   setTimeout(() => {
     /** spinner ends after 5 seconds */
     this.spinnerService.hide();
   }, 2000);
    this.enableNext=false
    if(this.editRequestId==undefined){
      this.cardView=true
      this.requestSno=localStorage.getItem("requestSno")
      if(this.status==undefined){
        this.status="Draft"
      }
    }
    this.userriskComp.loadData()
    this.btnNext1=true;
    this.btnNext=false
    this.btnPrev=true;
    this.saveRequest=false;
    this.saveRisk=true;
    this.summarytab=false;
    this.peerTab=true
  }

  if(event.title=="Summary"){
    this.spinnerService.show();
   setTimeout(() => {
     /** spinner ends after 5 seconds */
     this.spinnerService.hide();
   }, 2000);
    this.summaryComp.onSummaryLoad()
    this.btnNext=true;
    this.btnNext1=false;
    this.btnPrev=true;
    this.saveRisk=false;
    this.saveRequest=false;
    this.enableNext=true
    
    if(this.status=="Peer Review"){
      this.summarytab=false;
      this.peerTab=false
    }else{
    this.summarytab=true;
    this.peerTab=true
  }
  }
}

}
