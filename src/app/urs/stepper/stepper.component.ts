import { DatePipe } from '@angular/common';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { StepperworkflowComponent } from 'src/app/modals/stepperworkflow/stepperworkflow.component';
import { ViewfilesComponent } from 'src/app/pages/content-pages/viewfiles/viewfiles.component';
import { ApisProvider } from 'src/app/utility/api';
import { Stepper } from 'src/app/utility/uasModels';
import { permissionList } from 'src/app/utility/Usermodel';
import swal from 'sweetalert2';
import { FirewallrequestComponent } from '../firewallrequest/firewallrequest.component';
import { FirewallrequestformnewComponent } from '../firewallrequestformnew/firewallrequestformnew.component';
import { RemediationplanComponent } from '../remediationplan/remediationplan.component';
import { RisksummaryandmitigationComponent } from '../risksummaryandmitigation/risksummaryandmitigation.component';
import { ViewsummaryComponent } from '../viewsummary/viewsummary.component';
import { ViewsummaryuserComponent } from '../viewsummaryuser/viewsummaryuser.component';



@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [DatePipe,ViewfilesComponent]
})
export class StepperComponent implements OnInit {
  @ViewChild('formWizard', { static: true }) formWizard: any;
  @ViewChild('firewallrequest',null) firewallRequestComp: FirewallrequestComponent;
  @ViewChild('firewallsummary',null) firewallRequestSummaryComp: ViewsummaryuserComponent;
  @ViewChild('riskdetails',null) riskdetailRankingComp: FirewallrequestformnewComponent;
  @ViewChild('risksummarymitigation',null) riskSummaryComp: RisksummaryandmitigationComponent;
  @ViewChild('remediation',null) remediationPlanComp: RemediationplanComponent;
  @ViewChild('summaryIT',null) summaryComp: ViewsummaryComponent;

  saveRequest:boolean=true;
  saveRisk:boolean=false;
  saveRiskSummary:boolean=false;
  saveRemediation:boolean=false;
  saveSummary:boolean=false;
  name = 'Progress Bar';

  public counts = ["Recieved","In Progress","Ready for Billing",
  "Billed","Order Closed"];
  public orderStatus = "Billed"


  requestId:string;
  status:string;
  requestDate:any;
  corpid:string;
  requestersName:string;
  requestersPhone:string;
  requestersEmail:string;
  requestersDept:string;
  title: any;
  btnNext: boolean;
  btnPrev: boolean;
  SubCategoryList:permissionList=new permissionList(); 
  noData: boolean;
  fileList: any;
  summaryEnable: boolean=false;
  Category: any;
  SubCategory: any;
  requestNo: any;
  createdBy: any;
  BusinessJustification: any;
  ManagedServices: any;
  FirewallRegion: any;
  NormalExpedited: any;
  SecurityPolicy: any;
  businessOwner: any;
  itOwner: any;
  categoryLst: any;
  projectName: any;
  description: any;
  businessImpact: any;
  date = new Date();
  editRequestId:any;
  view:any;
  requestSno:string;
  enableNext:boolean=false;
  navFixed: boolean = false;
  enableStepper: boolean = false;
  private scrollOffset: number = 70;
  stepper: Stepper = new Stepper();
  itwfList : any;

  constructor(private modalService: NgbModal,private viewPdfComponent: ViewfilesComponent,
    public datepipe: DatePipe,private matDialog:MatDialog,public router:Router,private route:ActivatedRoute, private spinnerService: Ng4LoadingSpinnerService,private api:ApisProvider) { }

@HostListener('window:scroll')
onWindowScroll() {
  this.navFixed = (window.pageYOffset 
    || document.documentElement.scrollTop 
    || document.body.scrollTop || 0
  ) > this.scrollOffset;
}


  ngOnInit() {
    this.summaryEnable=false;
    this.route.queryParams.subscribe(params =>{
      this.editRequestId=params['requestId'];
      this.loadfirewallrequest(this.editRequestId)
      this.view=params['view'];
          if(this.editRequestId!=undefined){
            this.onEditload(this.editRequestId);
            this.enableStepper=true
          }else{
          }
          this.requestDate=this.datepipe.transform(this.date,"MM/dd/yyyy");
          this.editUser1()
          this.btnPrev  = false;
          this.btnNext  = true;
    })  
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
  loadfirewallrequest(id){
    this.noData=false;
    this.api.apiMethodFetchDataByGET('api/RequestFormUser/EditRequestLoadonId?reqid=' + id).then(data => {
      let list=JSON.parse(data.resultOP.attachment)
    this.fileList=list.StaticTB
    this.Category= data.resultOP.categoryName
    this.SubCategory= data.resultOP.subcategoryName
    this.requestNo=data.resultOP.requestSno
    this.createdBy=data.resultOP.userName
    this.BusinessJustification = data.resultOP.businessJustification
    this.ManagedServices    = data.resultOP.managedServices
    this.FirewallRegion    = data.resultOP.firewallRegionName
    this.NormalExpedited    = data.resultOP.normalExpecticationName
    this.SecurityPolicy=JSON.parse(data.resultOP.securityPolicy);
    this.businessOwner=JSON.parse(data.resultOP.businessOwner)
    this.itOwner=JSON.parse(data.resultOP.itOwner)
    this.projectName    = data.resultOP.nameOfProject
    this.description    = data.resultOP.description
    this.businessImpact    = data.resultOP.businessImpact
    this.summaryEnable=true;
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


  editUser1() {
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

  onEditload(requestId) {    
     this.api.apiMethodFetchDataByGET('api/RequestFormUser/EditRequestLoadonId?reqid=' + requestId).then(data => {
      this.requestSno=data.resultOP.requestSno;
      this.status=data.resultOP.status
     });
    }


  functionOne(): Promise<any> {
    return Promise.resolve((() => {
        return 'from first'; 
    })());
}

functionTwo(): Promise<any> {
    return Promise.resolve((() => {
      this.riskSummaryComp.onSaveLoad();
        return 'from second'; 
    })());
}

functionThree() {
  this.riskSummaryComp.onSaveLoad();

}

task(){
  this.functionOne().then(data1 => {
   this.functionTwo().then(data2 => {
        this.functionThree();
    });
});

}
 
navigatePrevious() {
  this.formWizard.previous();
}

navigateNext() {
  this.formWizard.next();
}

spinnerFunc(){
  setInterval(() => {
    this.spinnerService.show();
  }, 5000);
  this.spinnerService.hide();
}
onStepChangedLoadData(event) {
  this.saveRisk=false;
  if(event.title=="Request Information"){
    var scrollElm = document.scrollingElement;
    scrollElm.scrollTop = 0;
    this.spinnerService.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinnerService.hide();
    }, 2000);
   this.btnNext=true;
   this.btnPrev=false;
   this.enableNext=false;
   this.riskSummaryComp.nextFlag=false
   this.riskdetailRankingComp.nextFlag=false
   this.remediationPlanComp.nextFlag=false
   this.enableNext=false;
  }

if(event.title=="Risk Detail and Ranking"){
  var scrollElm = document.scrollingElement;
  scrollElm.scrollTop = 0;
  this.spinnerService.show();
  setTimeout(() => {
    /** spinner ends after 5 seconds */
    this.spinnerService.hide();
  }, 2000);
 this.saveRisk=true
 this.saveRiskSummary=false;
 this.saveSummary=false;
 this.saveRequest=false
 this.saveRemediation=false;
 this.btnNext=false;
 this.btnPrev=true;
 this.riskSummaryComp.nextFlag=false
 this.remediationPlanComp.nextFlag=false
 this.enableNext=false;
}
if(event.title=="Risk Summary & Mitigation"){
  var scrollElm = document.scrollingElement;
  scrollElm.scrollTop = 0;
  this.spinnerService.show();
  this.spinnerService.show();

  setTimeout(() => {
    /** spinner ends after 5 seconds */
    this.spinnerService.hide();
  }, 2000);
  this.riskSummaryComp.onSaveLoad()
  this.saveRisk=false
  this.saveRiskSummary=true;
  this.saveSummary=false;
  this.saveRequest=false
  this.saveRemediation=false;
  this.btnNext=false;
  this.btnPrev=true;
 this.riskdetailRankingComp.nextFlag=false
 this.remediationPlanComp.nextFlag=false
 this.enableNext=false;
}
if(event.title=="Remediation Plan"){
  var scrollElm = document.scrollingElement;
  scrollElm.scrollTop = 0;
  this.spinnerService.show();
  this.spinnerService.show();
  setTimeout(() => {
    /** spinner ends after 5 seconds */
    this.spinnerService.hide();
  }, 2000);
  this.remediationPlanComp.onSaveLoad();
  this.saveRisk=false
  this.saveRiskSummary=false;
  this.saveSummary=false;
  this.saveRequest=false
  this.saveRemediation=true;
  this.btnNext=false;
  this.btnPrev=true;
  this.riskSummaryComp.nextFlag=false
  this.riskdetailRankingComp.nextFlag=false
  this.enableNext=false;
}

if(event.title=="Summary"){
  var scrollElm = document.scrollingElement;
  scrollElm.scrollTop = 0;
  this.spinnerService.show();
  setTimeout(() => {
    /** spinner ends after 5 seconds */
    this.spinnerService.hide();
  }, 2000);
  this.summaryComp.onLoadData()
  this.saveRisk=false
  this.saveRiskSummary=false;
  this.saveSummary=true;
  this.saveRequest=false
  this.saveRemediation=false;
  this.btnNext=false;
  this.btnPrev=true;
  this.riskSummaryComp.nextFlag=false
  this.riskdetailRankingComp.nextFlag=false
  this.remediationPlanComp.nextFlag=false
  this.enableNext=true;
}}

}
