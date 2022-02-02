import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ItapproveComponent } from 'src/app/modals/itapprove/itapprove.component';
import { ViewfilesComponent } from 'src/app/pages/content-pages/viewfiles/viewfiles.component';
import { ApisProvider } from 'src/app/utility/api';
import { AttachmentTable, dropDowns } from 'src/app/utility/TrainingDetailsModel';
import { rankrequestListDTO } from 'src/app/utility/uasModels';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import swal from 'sweetalert2';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { StepperworkflowComponent } from 'src/app/modals/stepperworkflow/stepperworkflow.component';
import { permissionList } from 'src/app/utility/Usermodel';
import { RemediationParams } from 'src/app/utility/model';

@Component({
  selector: 'app-itsummary',
  templateUrl: './itsummary.component.html',
  styleUrls: ['./itsummary.component.scss'],
  providers: [DatePipe, ViewfilesComponent]

})
export class ItsummaryComponent implements OnInit {
  @ViewChild('myTable', { static: true }) myTable: any;

  public Category : string;
  SubCategory: string;
  BusinessJustification: string;
  ManagedServices: string;
  FirewallRegion: string;
  NormalExpedited: string;
  isShownArchi:boolean=false;

  SecurityPolicy = [];


  //file 
   fileNameforExc: string;
   fileBase64: any;
  Detailedfields = [];
  isCheckListEntered : boolean ;
  fileName: string;

   //attachments
   staticAttachment: any[] = [];
   staticAttachmentTable: Array<any> = [];
   categoryLst  = [];
  isShown: boolean = true ; // shown by default
  RiskSummaryMitigation  =[];

  DetailedfieldsRemedtonPlan = [];
  loadAuditData = [];
  showStaticFields: boolean = true;
  peerReviewComment : string;
  view: any;
  userView: boolean;
  itView: boolean;
  date = new Date();
  requestDate= this.datepipe.transform(this.date,"MM/dd/yyyy");
  summaryEnable: boolean=false;
  projectName: any;
  description: any;
  businessImpact: any;
  businessOwner: any;
  itOwner: any;
  

  editRequestId:any;
  userId:any;
  fileList:any;
workflowList=[];
dropdown: any;
requestNo:any;
createdBy:any;
statusName=''

remediationparams:any;
list: any[] = new Array();
pageNo=0
categoryLst1:any;
primaryRequestId:any;
isNotEmpty=true;
RequestDTO:rankrequestListDTO=new rankrequestListDTO();
dataForValueSeverity = [
  { key: 'Acceptable', value: '1' },
  { key: 'Tolerable', value: '2' },    
  { key: 'Undesirable', value: '3' },
  { key: 'Intolerable', value: '4' },
];
dataForValuelikelihood = [
  { key: 'Improbable', value: '1' },
  { key: 'Possible', value: '2' },    
  { key: 'Probable', value: '3' },
 ];

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

lookupArray:any[][] = [[0,0,0,0,0],[0,1,4,6,8],[0,2,5,8,11],[0,3,7,9,12]]  
openrequestList:any;
auditTrial:any;


  constructor(private api: ApisProvider,public datepipe: DatePipe,private route:ActivatedRoute, private matDialog:MatDialog,
    private datePipe: DatePipe,config: NgbModalConfig ,private router: Router, private spinnerService: Ng4LoadingSpinnerService,private modalService: NgbModal,private viewPdfComponent: ViewfilesComponent
    ) { 
      //config: NgbModalConfig 
    config.backdrop = 'static';
    config.keyboard = false;
    }

  ngOnInit() {
    
    this.spinnerService.show();
    if(localStorage.getItem("token")!=null ){
    this.route.queryParams.subscribe(params=>{
      this.editRequestId =  params['requestId'];
      this.userId=params['userId'];
     if(this.userId==this.api.decode(localStorage.getItem("userId"))){
      localStorage.setItem("redirectTo",'')
      this.itView=true;
      this.onLoadData();
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
    })
  }else{
    localStorage.setItem("redirectTo",this.router.url)
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    this.router.navigateByUrl('/auth/signin')  
  }   
      this.loadAuditHistory(this.editRequestId);
}



openModal1() {
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

spinnerFunc(){
  setInterval(() => {
    this.spinnerService.show();
  }, 2000);
  this.spinnerService.hide();
}


onEditLoad(){
  let id=this.editRequestId
  this.api.apiMethodFetchDataByGET('api/RequestFormUser/EditRequestLoadonId?reqid=' + id).then(data => {
      let list=JSON.parse(data.resultOP.attachment)
      this.fileList=list.StaticTB
      this.categoryLst = JSON.parse(data.resultOP.riskandRankDetails)
      this.SecurityPolicy=JSON.parse(data.resultOP.securityPolicy);
      this.Category= data.resultOP.categoryName
    this.SubCategory= data.resultOP.subcategoryName
    this.LoadStepper(id)
    this.requestNo=data.resultOP.requestSno
    this.createdBy=data.resultOP.userName
    this.BusinessJustification = data.resultOP.businessJustification
    this.ManagedServices    = data.resultOP.managedServices
    this.FirewallRegion    = data.resultOP.firewallRegionName
    this.NormalExpedited    = data.resultOP.normalExpecticationName
    this.projectName    = data.resultOP.nameOfProject
    this.description    = data.resultOP.description
    this.businessImpact    = data.resultOP.businessImpact
    this.businessOwner=JSON.parse(data.resultOP.businessOwner)
    this.itOwner=JSON.parse(data.resultOP.itOwner)
    this.spinnerService.hide();
    })
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



onClickMore() {
  this.pageNo = this.pageNo + 1;
  this.Loadremidationdiary();
}


Loadremidationdiary(){
 this.remediationparams = new  RemediationParams();
 this.remediationparams.RequestId= this.editRequestId;
 this.remediationparams.PageNumber=this.pageNo;
 this.api.apiMethodFetchDataByPOST("api/RequestFormUser/RemediationDiaryLoad",this.remediationparams).then(async result => {
 if (result.status) {
  if(this.pageNo==0)
    this.list=JSON.parse(result.resultOP)
  else
   this.list = this.list.concat(JSON.parse(result.resultOP));
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


onLoadData(){
  let id=this.editRequestId;
  this.pageNo=0;
  this.Loadremidationdiary();
  this.api.apiMethodFetchDataByGET('api/RequestFormUser/EditRequestLoadonId?reqid=' + id).then(data => {
    let list=JSON.parse(data.resultOP.attachment)
     this.fileList=list.StaticTB
     
    this.categoryLst = JSON.parse(data.resultOP.riskandRankDetails)
    for(let i=0;i<this.categoryLst.length;i++){
      if(this.categoryLst[i].calcualtnRanking>=7){
        this.isNotEmpty=false;
      }
    }
    this.SecurityPolicy=JSON.parse(data.resultOP.securityPolicy);
    this.Category= data.resultOP.categoryName
    this.SubCategory= data.resultOP.subcategoryName
    this.statusName=data.resultOP.status
    this.requestNo=data.resultOP.requestSno
    this.createdBy=data.resultOP.userName
    this.summaryEnable=true;
    this.LoadStepper(id)
    this.BusinessJustification = data.resultOP.businessJustification
    this.ManagedServices    = data.resultOP.managedServices
    this.FirewallRegion    = data.resultOP.firewallRegionName
    this.NormalExpedited    = data.resultOP.normalExpecticationName
    this.projectName    = data.resultOP.nameOfProject
    this.description    = data.resultOP.description
    this.businessImpact    = data.resultOP.businessImpact
    this.businessOwner=JSON.parse(data.resultOP.businessOwner)
    this.itOwner=JSON.parse(data.resultOP.itOwner)
    this.spinnerService.hide();
    })

}



loadData(){
  this.primaryRequestId=localStorage.getItem("primaryRequestId");
  this.RequestDTO.id=  this.primaryRequestId;
   this.RequestDTO.key="2";
   this.RequestDTO.categoryId=0;
    this.api.apiMethodFetchDataByPOST("api/RequestMethods/getRequestITInfo",this.RequestDTO).then(async result => {
      if (result.status) {
        this.categoryLst = result.resultOP;
        this.categoryLst1 = result.resultOP;
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



   valueLikelihood(i){
     if(i==1)
     return 'Improbable'
     else if(i==2)
     return 'Possible'
     else
     return 'Probable'
   }

   valueSeverity(i){
    if(i==1)
    return 'Acceptable'
    else if(i==2)
    return 'Tolerable'
    else if(i==3)
    return 'Undesirable'
    else
    return 'Intolerable'
  }



   calculateLikihood(likelihood){
     let data=this.dataForValuelikelihood1[likelihood].key
     return likelihood +'('+data+')'
   }

   calculateSeverity(likelihood){
    let data=this.dataForValueSeverity1[likelihood].key
    return likelihood +'('+data+')'
  }

  
   calculateRank(i,likelihood,severity){
     let data=this.lookupArray[likelihood][severity]
      if(data>0&&data<=2){
      this.categoryLst[i].calcualtnRanking=data
      return data +'(Low)'
    }
    else if(data>2&&data<=6){
      this.categoryLst[i].calcualtnRanking=data
      return data +'(Medium)'
    }
    else if(data>6&&data<=10){
      this.categoryLst[i].calcualtnRanking=data
      return data +'(High)'
    }
     else if(data>10&&data<=12){
      this.categoryLst[i].calcualtnRanking=data
      return data +'(Extreme)';
     }
     else{
       return '()'
     }
   }

   basicRequest = [
    " Category:Firewall",
    " Sub-Category:FirewallSub",
    " Business Justification:  ththth",
    " Managed Services : thth",
    " Firewall Region:  AWS N.Virginia",
    "Normal/Expedited:  Normal",
    "Business Owners:vivi,Thiru001",
    "IT Owners:vivi,Thiru001",
    " Description : ththt",
    " Business Impact:thth",
    " Name of Project/Effort/Application : thth"
  ];

   getColorEvent(i,rank){
    let data=rank
    if(data>0&&data<=2){
      this.categoryLst1[i].color='#d2e06f'
      return '#d2e06f'
    }
    else if(data>2&&data<=6){
      this.categoryLst1[i].color='#fdd969'
      return '#fdd969'
    }
    else if(data>6&&data<=10){
      this.categoryLst1[i].color='#ffbe60'
      return '#ffbe60'
    }
     else{
      this.categoryLst1[i].color='#ec997b'
      return '#ec997b';
     }
  }


  calculateRanking(i,rank){
    let data=rank
    if(data<=2){
      this.categoryLst1[i].ranking='L'
      return 'L'
    }
    else if(data>2&&data<=6){
      this.categoryLst1[i].ranking='M'
      return 'M'
    }
    else if(data>6&&data<=10){
      this.categoryLst1[i].ranking='H'
      return 'H'
    }
    else if(data>10&&data<=12){
      this.categoryLst1[i].ranking='E'
      return 'E';
    }
     else{
      this.categoryLst1[i].ranking=''
      return '';
     }
  }

  showHighRisk(rank){
    if(rank>=7)
      return true;
    else
      return false;
  }


   
 
// File Upload
onFileUploadStatic(event: any){

  let  totalFiles= event.target.files.length;
  for (let index = 0; index < totalFiles; index++) {
     let file = event.target.files[index];
     let fileName = file.name;
     var date = Date.now();
     let json: AttachmentTable = {FileName:fileName, Date: date, FilePath:'', AttachementType:'Static' }
     this.staticAttachmentTable.push(json);
     this.staticAttachment.push(file);
  }

  event.target.value = ''
}


viewFile(data: any, fileIndex, type: string){
  this.fileNameforExc = data.FileName;
  this.fileBase64 = "";
  if (data.FilePath == '' || data.FilePath == undefined) {
  var elementExists: any;
    if (type == 'Static') {
      elementExists = this.staticAttachment.find(x => x.name == data.FileName);
    }
    if (elementExists){
      let files: File = <File>elementExists;
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(files);
    }
  }   
}


handleReaderLoaded(e) {
  this.fileBase64 = (btoa(e.target.result));
  this.viewPdf(this.fileBase64, this.fileNameforExc);
}



openApprove() {
  let id=this.editRequestId;
  let catList=this.categoryLst
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.position= {top: '3%'}
  dialogConfig.id = "modal-component";
  dialogConfig.height = "290px";
  dialogConfig.width = "500px";
  dialogConfig.data={id,catList};
  const modalDialog = this.matDialog.open(ItapproveComponent, dialogConfig);
  modalDialog.afterClosed().subscribe(result => {
    this.loadOpenRequest("manager");
    this.router.navigate( ['urs/itreview']);

  });
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



save(){
  console.log("load Summary")
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
  })
}
}


