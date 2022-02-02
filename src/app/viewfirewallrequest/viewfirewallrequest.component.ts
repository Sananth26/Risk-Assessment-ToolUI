import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import swal from 'sweetalert2';
import { ApproveComponent } from '../modals/approve/approve.component';
import { ManagerapprovalcommentComponent } from '../modals/managerapprovalcomment/managerapprovalcomment.component';
import { StepperworkflowComponent } from '../modals/stepperworkflow/stepperworkflow.component';
import { ViewfilesComponent } from '../pages/content-pages/viewfiles/viewfiles.component';
import { ApisProvider } from '../utility/api';
import { dropDowns } from '../utility/model';
import { permissionList } from '../utility/Usermodel';

@Component({
  selector: 'app-viewfirewallrequest',
  templateUrl: './viewfirewallrequest.component.html',
  styleUrls: ['./viewfirewallrequest.component.scss'],
  providers:[DatePipe]
})
export class ViewfirewallrequestComponent implements OnInit {

 jwt: string;
 public Category : string;
 SubCategory: string;
 BusinessJustification: string;
 ManagedServices: string;
 FirewallRegion: string;
 NormalExpedited: string;
 projectName:any;
 description:any;
 businessImpact:any;
 isShownArchi:boolean=false;
 SecurityPolicy = [];
 fileNameforExc: string;
 fileBase64: any;
 Detailedfields = [];
 isCheckListEntered : boolean ;
 fileName: string;  
 staticAttachment: any[] = [];
 staticAttachmentTable: Array<any> = [];
 categoryLst  = [];
 isShown: boolean = true ; 
 loadAuditData = [];
 showStaticFields: boolean = true;
 editRequestId:any;
 isFirst:boolean=true
 enable:boolean=false;
  auditTrial: any;
  openrequestList: any;
  requestNo: any;
  createdBy: any;
  date = new Date();
  requestDate= this.datepipe.transform(this.date,"MM/dd/yyyy");
  businessOwner: any;
  itOwner: any;
  SubCategoryList:permissionList=new permissionList(); 
  view:any;
  dataForValuelikelihood1 = [
    { key: '', value: '0' },
    { key: 'Improbable', value: '1' },
    { key: 'Possible', value: '2' },    
    { key: 'Probable', value: '3' },
   ];

   dataForValueSeverity1 = [
    { key: '', value: '0' },
    { key: 'Acceptable', value: '1' },
    { key: 'Tolerable', value: '2' },    
    { key: 'Undesirable', value: '3' },
    { key: 'Intolerable', value: '4' },
  ];

    
  workflowList=[];
  dropdown: any;
  fileList:any;
  enableSummary:boolean=false;
  statusName='';

 constructor(
  private route:ActivatedRoute, private api: ApisProvider,private datepipe:DatePipe,
  private modalService: NgbModal,  private spinnerService: Ng4LoadingSpinnerService,
  private router: Router,private matDialog:MatDialog,config: NgbModalConfig 
  ) { 
    //config: NgbModalConfig 
    config.backdrop = 'static';
    config.keyboard = false;
  }
 


  ngOnInit() {
  if(localStorage.getItem("token")!=null ){
  this.route.queryParams.subscribe(params =>{
    this.editRequestId=params['requestId'];
    this.view=params['view'];
    if(this.view=='user'){
      this.route.queryParams.subscribe(
        params => {
          this.editRequestId =  params['requestId'];
          if(params['view']=="manager"){
            this.enable=true;
          }
          if(this.editRequestId!=undefined){
            this.loadfirewallrequest(this.editRequestId);
            this.loadAuditHistory(this.editRequestId);
          }
        })
    }else{
      this.SubCategoryList.id=this.editRequestId;//requestid
    this.SubCategoryList.categoryId=Number(this.api.decode(localStorage.getItem("userId")));//userid
    this.SubCategoryList.key ="manager";//module
    this.api.apiMethodFetchDataByPOST("api/RequestFormUser/ManagerPermission", this.SubCategoryList).then(result => {
     console.log(result)
      if (result.status) {
      if(result.resultOP.menuaccess==1 && result.resultOP.levelaccess==1 && localStorage.getItem("token")!=null){
        localStorage.setItem("redirectTo",'')  
        this.route.queryParams.subscribe(
            params => {
              this.editRequestId =  params['requestId'];
              if(params['view']=="manager"){
                this.enable=true;
              }
              if(this.editRequestId!=undefined){
                this.loadfirewallrequest(this.editRequestId);
                this.loadAuditHistory(this.editRequestId);
              }
            })
      }else{
        localStorage.setItem("redirectTo",'')
        /*swal({
         title: "Active session does not exist!",
         text: "Please try after login",
         type: "info",
         timer: 6000
         })*/
         this.router.navigateByUrl('/urs/uasdashboard')     

      }
      } 
    });
    }
  })

 }else{
  localStorage.setItem("redirectTo",this.router.url)
  localStorage.removeItem("token");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userName");
  localStorage.removeItem("userId");
  this.router.navigateByUrl('/auth/signin') 
 }
  
  }



   calculateLikihood(likelihood){
     let data=this.dataForValuelikelihood1[likelihood].key
     return likelihood +'('+data+')'
   }

   calculateSeverity(likelihood){
    let data=this.dataForValueSeverity1[likelihood].key
    return likelihood +'('+data+')'
  }


  LoadStepper(id){
    this.dropdown   = new dropDowns();
   this.dropdown.key ="";
   this.dropdown.id =id;
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

  loadfirewallrequest(id){
    this.api.apiMethodFetchDataByGET('api/RequestFormUser/EditRequestLoadonId?reqid=' + id).then(data => {
     let list=JSON.parse(data.resultOP.attachment)
     this.fileList=list.StaticTB
     this.categoryLst = JSON.parse(data.resultOP.riskandRankDetails)
     this.Category= data.resultOP.categoryName
     this.SubCategory= data.resultOP.subcategoryName
     this.requestNo=data.resultOP.requestSno
     this.statusName=data.resultOP.status
     this.createdBy=data.resultOP.userName
     this.enableSummary=true;
     this.LoadStepper(id)
     this.BusinessJustification = data.resultOP.businessJustification
     this.ManagedServices    = data.resultOP.managedServices
     this.FirewallRegion    = data.resultOP.firewallRegionName
     this.NormalExpedited    = data.resultOP.normalExpecticationName
     this.projectName    = data.resultOP.nameOfProject
     this.description    = data.resultOP.description
     this.businessImpact    = data.resultOP.businessImpact
     this.SecurityPolicy=JSON.parse(data.resultOP.securityPolicy);
     this.categoryLst = JSON.parse(data.resultOP.riskandRankDetails)
     this.businessOwner=JSON.parse(data.resultOP.businessOwner)
     this.itOwner=JSON.parse(data.resultOP.itOwner)  
     })
  }

  openApprove() {
    let id=this.editRequestId
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.position= {top: '3%'}
    dialogConfig.id = "modal-component";
    dialogConfig.height = "290px";
    dialogConfig.width = "500px";
    dialogConfig.data={id};
    const modalDialog = this.matDialog.open(ManagerapprovalcommentComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      this.loadOpenRequest("manager");
    });
  }

  viewFile1(data:any){
    this.spinnerService.show();
  let filepath=data.FilePath
    this.api.apiMethodFetchDataByGET('api/RequestFormUser/FetchFile?path=' + filepath).then(async result => {
      if (result.status) {
       this.viewPdf(result.resultOP, data.FileName);
      } else {
        swal(
          'could not fetch the file.',
          result.description,
          'error'
        )
      }
    });
  }


  viewPdf(fileContent: any, fileName: string){
  let jsonObj = {status: true, filecontentSource: fileContent, fileName: fileName}
  const modalRef = this.modalService.open(ViewfilesComponent, {size: 'xl', scrollable: true });
  modalRef.componentInstance.details = jsonObj;
}


   loadOpenRequest(status:any){
     this.spinnerService.show();
     this.api.apiMethodFetchDataByGET("api/Myrequest/Myrequest?status=" + status).then(result => {
       if (result.status) {
        this.openrequestList = result.resultOP;
         this.spinnerService.hide()
       } else {
         swal(
           'Error!',
           result.description,
           'error'
         )
       }
     });
   }

 

  loadAuditHistory(id){
    this.api.apiMethodFetchDataByGET("api/Audit/GetRequestData?requestid=" + id).then(result => {
      if (result.status) {
        this.auditTrial = result.resultOP;
      } else {
        swal(
          'Error!',
        result.description,
          'error'
        )
      }
    });
  }
}
