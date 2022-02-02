import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ViewfilesComponent } from 'src/app/pages/content-pages/viewfiles/viewfiles.component';
import { ApisProvider } from 'src/app/utility/api';
import { AttachmentTable, dropDowns } from 'src/app/utility/TrainingDetailsModel';
import swal from 'sweetalert2';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PeerreviewWorkflowComponent } from 'src/app/modals/peerreview-workflow/peerreview-workflow.component';
import { ApproveComponent } from 'src/app/modals/approve/approve.component';
import { StepperworkflowComponent } from 'src/app/modals/stepperworkflow/stepperworkflow.component';
import { permissionList } from 'src/app/utility/Usermodel';
import { ItrejectComponent } from 'src/app/modals/itreject/itreject.component';


@Component({
  selector: 'app-itrequest',
  templateUrl: './itrequest.component.html',
  styleUrls: ['./itrequest.component.scss'],
  providers: [DatePipe,ViewfilesComponent]

})
export class ItrequestComponent implements OnInit {
  @ViewChild('myTable', { static: true }) myTable: any;
  public Category : string;
  SubCategory: string;
  BusinessJustification: string;
  ManagedServices: string;
  FirewallRegion: string;
  NormalExpedited: string;
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
  requestNo="";
  createdBy="";
  date = new Date();
  requestDate= this.datepipe.transform(this.date,"MM/dd/yyyy");
  projectName: any;
  description: any;
  businessImpact: any;
  view:any;
  businessOwner: any;
  editRequestId:any;
  networkEnable=false;
  SubCategoryList:permissionList=new permissionList(); 
  view1:any;
  
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

  summaryEnable:boolean=false;
  auditTrial:any;
isFirst:boolean=true;
fileList:any;
noData=false;
statusName=''
openrequestList:any;
closedrequestList:any;
reviewrequestList:any;
publishedList:any[];
workflowList=[];
dropdown: any;

  
  itOwner: any;
  constructor(private api: ApisProvider, public datepipe: DatePipe,private matDialog:MatDialog,private datePipe: DatePipe,private spinnerService: Ng4LoadingSpinnerService,
    private route:ActivatedRoute,private router: Router, private modalService: NgbModal,private viewPdfComponent: ViewfilesComponent,config: NgbModalConfig
    ) {
    //config: NgbModalConfig 
    config.backdrop = 'static';
    config.keyboard = false;
     }
  
 

  ngOnInit() {
    if(localStorage.getItem("token")!=null ){
      this.route.queryParams.subscribe(params =>{
        this.editRequestId=params['requestId'];
        this.view1=params['view'];
        if(this.view1=="user"){
          if(localStorage.getItem("token")==''){
            this.router.navigate( ['auth/signin'])
          }else{
            this.route.queryParams.subscribe(
              params => {
                this.editRequestId =  params['requestId'];
                this.view=params['view'];
                if(this.view=="IT"){
                  this.loadfirewallrequest(this.editRequestId);
                  this.loadAuditHistory(this.editRequestId);
                  this.networkEnable=true
                }      
              })
          }
        }else{
          this.SubCategoryList.id=this.editRequestId;//requestid
          this.SubCategoryList.categoryId=Number(this.api.decode(localStorage.getItem("userId")));//userid
          this.SubCategoryList.key ="security";//module
          this.api.apiMethodFetchDataByPOST("api/RequestFormUser/ManagerPermission", this.SubCategoryList).then(result => {
           if (result.status) {
            if(result.resultOP.menuaccess==1 && result.resultOP.levelaccess==1 && localStorage.getItem("token")!=null){
              localStorage.setItem("redirectTo",'')        
              this.route.queryParams.subscribe(
                  params => {
                    this.editRequestId =  params['requestId'];
                    this.view=params['view'];
                    if(this.view=="IT"){
                      this.loadfirewallrequest(this.editRequestId);
                      this.loadAuditHistory(this.editRequestId);
                      this.networkEnable=true
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

  navigate(){
    let id=this.editRequestId
     this.spinnerService.show();
     setTimeout(() => {
       /** spinner ends after 5 seconds */
       this.spinnerService.hide();
     }, 2000);
       this.router.navigate( ['urs/stepper'], { queryParams: { requestId:id,view:'user'}})
   }
   

  openReject(editRequestId) {
    let id=editRequestId;
    let catList=this.categoryLst
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.position= {top: '3%'}
    dialogConfig.id = "modal-component";
    dialogConfig.height = "290px";
    dialogConfig.width = "500px";
    dialogConfig.data={id,catList};
    const modalDialog = this.matDialog.open(ItrejectComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      this.loadOpenRequest("ITApprove");
      this.loadITClosed("ITClosed");
      this.router.navigate( ['urs/itreview']);
    });
  }


   calculateLikihood(likelihood){
     let data=this.dataForValuelikelihood1[likelihood].key
     return likelihood +'('+data+')'
   }

   calculateSeverity(likelihood){
    let data=this.dataForValueSeverity1[likelihood].key
    return likelihood +'('+data+')'
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

  loadITClosed(status:any)
  {this.spinnerService.show();
    this.api.apiMethodFetchDataByGET("api/Myrequest/Myrequest?status=" + status).then(result => {
      if (result.status) {
        
        setTimeout(()=>{ 
         this.closedrequestList = result.resultOP;
           },2000);
           this.spinnerService.hide();
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
    console.log("Load Summary")
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


  onSummaryLoad(){
    if(this.editRequestId!=undefined){
      this.loadfirewallrequest(this.editRequestId);
      this.loadAuditHistory(this.editRequestId);
    }else{
    this.loadAuditHistory(localStorage.getItem("primaryRequestId"));
    this.loadfirewallrequest(localStorage.getItem("primaryRequestId")); 
    }
  }


  publish(){
    this.spinnerService.show()
    const id=localStorage.getItem("primaryRequestId")
    this.api.apiMethodFetchDataByGET("api/RequestFormUser/DraftToPublish?id=" + id).then(result => {
      if (result.status) {
        this.spinnerService.hide()
        swal({
          title: "Published!",
          text: "Published Successfully",
          type: "success",
          timer: 2000
          }).then
        ((result) => {
          this.router.navigate( ['urs/userview']);
          this.loadManagerapproveandpublished("publishandmanagerapprove");
          this.loadOpenRequest("DraftOpen");
        })  
      } else {
        swal(
          'Error!',
          result.description,
          'error'
        )
      }
    });
  }

  openModal() {
    this.spinnerService.show()
    const id=localStorage.getItem("primaryRequestId")
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.position= {top: '3%'}
    dialogConfig.id = "modal-component";
    dialogConfig.height = "290px";
    dialogConfig.width = "500px";
    dialogConfig.data={'name':'Sunil'};
    dialogConfig.data={id};
    const modalDialog = this.matDialog.open(PeerreviewWorkflowComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      this.router.navigate( ['urs/userview']);
      this.loadOpenRequest("DraftOpen");
      this.loadReviewRequest("Review");
    });
  }

  openApprove() {
    this.spinnerService.show()
    let id=this.editRequestId
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.position= {top: '3%'}
    dialogConfig.id = "modal-component";
    dialogConfig.height = "290px";
    dialogConfig.width = "500px";
    dialogConfig.data={id};
    const modalDialog = this.matDialog.open(ApproveComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      this.loadOpenRequest("userpublish");
      this.loadOpenRequest("manager");
      this.router.navigate( ['urs/networkview'])
    });
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


  loadReviewRequest(status:any)
  {this.spinnerService.show();
    this.api.apiMethodFetchDataByGET("api/Myrequest/Myrequest?status=" + status).then(result => {
      if (result.status) {
        this.reviewrequestList = result.resultOP;
        this.spinnerService.hide();
      } else {
        swal(
          'Error!',
          result.description,
          'error'
        )
      }
    });
  }


loadManagerapproveandpublished(status:any)
  {
    this.api.apiMethodFetchDataByGET("api/Myrequest/Myrequest?status=" + status).then(result => {
      if (result.status) {
        this.publishedList = result.resultOP;
      } else {
        swal(
          'Error!',
          result.description,
          'error'
        )
      }
    });
  }

  
  loadRejectandSuccess(status:any)
  {this.spinnerService.show();
    this.api.apiMethodFetchDataByGET("api/Myrequest/Myrequest?status=" + status).then(result => {
      if (result.status) {
        this.closedrequestList = result.resultOP;
        this.spinnerService.hide();
      } else {
        swal(
          'Error!',
          result.description,
          'error'
        )
      }
    });
  }

 

  loadOpenRequest(status:any)
  {this.spinnerService.show();
    this.api.apiMethodFetchDataByGET("api/Myrequest/Myrequest?status=" + status).then(result => {
      if (result.status) {
        this.openrequestList = result.resultOP;
        this.spinnerService.hide();
         
      } else {
        swal(
          'Error!',
          result.description,
          'error'
        )
      }
    });
  }
  

loadfirewallrequest(id){
  this.noData=false;
  this.api.apiMethodFetchDataByGET('api/RequestFormUser/EditRequestLoadonId?reqid=' + id).then(data => {
   let list=JSON.parse(data.resultOP.attachment)
  this.fileList=list.StaticTB
  this.categoryLst = JSON.parse(data.resultOP.riskandRankDetails)
  this.summaryEnable=true;
  this.Category= data.resultOP.categoryName
  this.SubCategory= data.resultOP.subcategoryName
  this.requestNo=data.resultOP.requestSno
  this.createdBy=data.resultOP.userName
  this.statusName=data.resultOP.status
  this.LoadStepper(id)
  this.BusinessJustification = data.resultOP.businessJustification
  this.ManagedServices    = data.resultOP.managedServices
  this.FirewallRegion    = data.resultOP.firewallRegionName
  this.NormalExpedited    = data.resultOP.normalExpecticationName
  this.SecurityPolicy=JSON.parse(data.resultOP.securityPolicy);
  this.businessOwner=JSON.parse(data.resultOP.businessOwner)
  this.itOwner=JSON.parse(data.resultOP.itOwner)
  this.categoryLst = JSON.parse(data.resultOP.riskandRankDetails)
  if(this.categoryLst.length==0){
    this.noData=true
  }else{
    this.noData=false
  }

  this.projectName    = data.resultOP.nameOfProject
  this.description    = data.resultOP.description
  this.businessImpact    = data.resultOP.businessImpact

   })
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



// Ranking Screen 
loadDataRanking(){ 
  this.categoryLst = [
    {
      id: "1", RiskCategory: "1)User Access and Authentication related Risks", CalcualtnLikelihood: "Possible-2", CalcualtnSeverity: "Tolerable-2", CalcualtnRanking: "Medium-5", questions: [
        { id: "1.1", Risk: "Unauthorized user access", QuestionToAsk: "Is this application SSO Enabled?", Explanation: "Easier to manage access when someone leaves the company", yesNo: "Yes", Comments: "Easier to manage access when someone leaves the company", decisionLikelihood: "Improbable", decisionSeverity: "Acceptable", decisionRanking: "" },
        { id: "1.2", Risk: "Unauthorized user access", QuestionToAsk: "Can external users access this application? Are they authenticated?", Explanation: "Customer facing sites require extra diligence for Privacy etc.", yesNo: "Yes", Comments: "Customer facing sites require extra diligence for Privacy etc.", decisionLikelihood: "Possible", decisionSeverity: "Tolerable", decisionRanking: "" },
        { id: "1.3", Risk: "Unauthorized user access", QuestionToAsk: "Do you provide Automated Access to this system using Service/Application accounts?", Explanation: "Reduces the risk of access being available longer than needed", yesNo: "No", Comments: "Reduces the risk of access being available longer than needed", decisionLikelihood: "Probable", decisionSeverity: "Undesirable", decisionRanking: "" },
        { id: "1.4", Risk: "Non-Repudiation", QuestionToAsk: "Is Authentication over SSL", Explanation: "Want to ensure that Auth happens over SSL", yesNo: "No", Comments: "Want to ensure that Auth happens over SSL", decisionLikelihood: "Improbable", decisionSeverity: "Intolerable", decisionRanking: "" },
        { id: "1.5", Risk: "Non-Repudiation", QuestionToAsk: "Is this request simply to allows internet access to your application/system?", Explanation: "", yesNo: "Yes", Comments: "Is this request simply to allows internet access to your application/system?", decisionLikelihood: "Possible", decisionSeverity: "Tolerable", decisionRanking: "" },
        { id: "1.6", Risk: "Non-Repudiation", QuestionToAsk: "Is this site 2FA Enabled?", Explanation: "Weak authentication defeats many of the controls because it allows user information to be compromised", yesNo: "Yes", Comments: "Weak authentication defeats many of the controls because it allows user information to be compromised", decisionLikelihood: "Probable", decisionSeverity: "Acceptable", decisionRanking: "" },

      ],
    },
    {
      id: "2", RiskCategory: "2)Impacts to Privileged Access Security", CalcualtnLikelihood: "Probable-3", CalcualtnSeverity: "Undesirable-3", CalcualtnRanking: "High-9", questions: [
        { id: "2.1", Risk: "Unauthorized Administrative Access", QuestionToAsk: "Admin accounts are Vaulted?", Explanation: "They should be vaulted to reduce chances of compromise", yesNo: "Yes", Comments: "They should be vaulted to reduce chances of compromise", decisionLikelihood: "Probable", decisionSeverity: "Acceptable", decisionRanking: "" },
        { id: "2.2", Risk: "Privilege Escalation", QuestionToAsk: "Admin accounts used for application authentication over these protocols?", Explanation: "Accounts accessing the system through these firewalls should NOT be Admin accounts - they should be application accounts that are not used for other purposes", yesNo: "Yes", Comments: "Yes, Admin accounts used for application authentication.", decisionLikelihood: "Improbable", decisionSeverity: "Intolerable", decisionRanking: "" },
        { id: "2.3", Risk: "Shared Account Exploits", QuestionToAsk: "Are shared and group accounts used? If so, are they vaulted?", Explanation: "Shared accounts defy attempts to tie activity down to users, which means that any anomalous activity is difficult to detect, trace and remediate. Shared accounts are also easy to compromise since the crednetials tend to be shared across multiple staff members or even teams.", yesNo: "No", Comments: "No, shared and group accounts not used", decisionLikelihood: "Possible", decisionSeverity: "Tolerable", decisionRanking: "" },
      ],
    },
    {
      id: "3", RiskCategory: "3)Supplier Related Risks", CalcualtnLikelihood: "Possible-2", CalcualtnSeverity: "Tolerable-2", CalcualtnRanking: "Medium-5", questions: [
        { id: "3.1", Risk: "Vulnerabilities in the application", QuestionToAsk: "Is your application patched to the latest levels", Explanation: "This is from OWASP Top 10.", yesNo: "Yes", Comments: "Yes, The application patched to the latest levels", decisionLikelihood: "Possible", decisionSeverity: "Acceptable", decisionRanking: "" },
        { id: "3.2", Risk: "Vulnerabilities in the application", QuestionToAsk: "Have you conducted a Pen test for your application", Explanation: "This is from OWASP Top 10.", yesNo: "No", Comments: "Not conducted a Pen test for your application", decisionLikelihood: "Improbable", decisionSeverity: "Tolerable", decisionRanking: "" },
        { id: "3.3", Risk: "Cross-Site Scripting", QuestionToAsk: "Have you tested against XSS vulnerabilities", Explanation: "This is from OWASP Top 10.", yesNo: "No", Comments: "Not tested against XSS vulnerabilities", decisionLikelihood: "Probable", decisionSeverity: "Undesirable", decisionRanking: "" },
        { id: "3.4", Risk: "Input Validation", QuestionToAsk: "Does your application perform input validation and have you tested your functions and interfaces against input validation attacks?", Explanation: "This is from OWASP Top 10.", yesNo: "Yes", Comments: "Yes, Application perform input validation", decisionLikelihood: "Possible", decisionSeverity: "Acceptable", decisionRanking: "" },

      ],
    },
    {
      id: "4", RiskCategory: "4)Data  Security (DLP, Encryption,Privacy)",CalcualtnLikelihood: "Probable-3", CalcualtnSeverity: "Undesirable-3", CalcualtnRanking: "High-9", questions: [
        { id: "4.1", Risk: "Data Classification", QuestionToAsk: "What type of data can be potentially exposed through this application? ", Explanation: "Data Classification levels are part of the Information Asset Management Policy.", yesNo: "No", Comments: "", decisionLikelihood: "Improbable", decisionSeverity: "Undesirable", decisionRanking: "" },
        { id: "4.2", Risk: "Data Classification", QuestionToAsk: "Does the Application contain or have access to any PII data - and is it encrypting that data when not in use?", Explanation: "Data Classification levels are part of the Information Asset Management Policy.", yesNo: "Yes", Comments: "The Application contain or have access to any PII data", decisionLikelihood: "Probable", decisionSeverity: "Tolerable", decisionRanking: "" },
        { id: "4.3", Risk: "Sensitive Data Exposure", QuestionToAsk: "Is this a Business Critical Application containing Financial Data?", Explanation: "Data Classification levels are part of the Information Asset Management Policy.", yesNo: "Yes", Comments: "Yes, Business Critical Application containing Financial Data", decisionLikelihood: "Intolerable", decisionSeverity: "Undesirable", decisionRanking: "" },
        { id: "4.4", Risk: "Data Privacy", QuestionToAsk: "Is this a non-Financial Mission Critical Application?", Explanation: "Data Classification levels are part of the Information Asset Management Policy.", yesNo: "No", Comments: "No, this is a non-Financial Mission Critical Application", decisionLikelihood: "Probable", decisionSeverity: "", decisionRanking: "" },
        { id: "4.5", Risk: "Data Encryption", QuestionToAsk: "Is there any Business Secret Data in this application", Explanation: "Data Classification levels are part of the Information Asset Management Policy.", yesNo: "Yes", Comments: "Yes,Business Secret Data in this application", decisionLikelihood: "Probable", decisionSeverity: "Acceptable", decisionRanking: "" },

      ],
    },
    {
      id: "5", RiskCategory: "5)Business Continuity Risks", CalcualtnLikelihood: "Possible-2", CalcualtnSeverity: "Tolerable-2", CalcualtnRanking: "Medium-5", questions: [
        { id: "5.1", Risk: "Change Managemrnt", QuestionToAsk: "Can you revert your application to previous state if required?", Explanation: "", yesNo: "", Comments: "", decisionLikelihood: "Improbable", decisionSeverity: "Acceptable", decisionRanking: "" },
        { id: "5.2", Risk: "Single Point of Failure", QuestionToAsk: "Is the application set up for redundancy.", Explanation: "A DR Plan is not required unless this is a Critical Application", yesNo: "", Comments: "Yes", decisionLikelihood: "Improbable", decisionSeverity: "Undesirable", decisionRanking: "" },
        { id: "5.3", Risk: "BIA", QuestionToAsk: "Does the application oir integration have a BIA on file that outlines the impact of a failure?", Explanation: "A BIA is not required unless this is a Critical Application", yesNo: "No", Comments: "", decisionLikelihood: "Probable", decisionSeverity: "Acceptable", decisionRanking: "" },
      ],
    },
    {
      id: "6", RiskCategory: "6)Network Security Risks", CalcualtnLikelihood: "Probable-3", CalcualtnSeverity: "Undesirable-3", CalcualtnRanking: "High-9", questions: [
        { id: "6.1", Risk: "Encrypted Channel", QuestionToAsk: "Do you use TLS v1.0 or newer", Explanation: "Data should not be traversing over an unencrypted channel", yesNo: "Yes", Comments: "Yes,Data should not be traversing over an unencrypted channel", decisionLikelihood: "Probable", decisionSeverity: "Tolerable", decisionRanking: "" },
        { id: "6.2", Risk: "Shadow IT and unregulated traffic", QuestionToAsk: "Does the application or integration use a Well Known Port? Can the data  be packet-inspected?", Explanation: "We'd like the ability to inspect the traffic to see if it might be sending malicious commands etc. or unsanctioned use of Cloud environments.", yesNo: "Yes", Comments: "Yes, The application or integration use a Well Known Port ", decisionLikelihood: "Improbable", decisionSeverity: "Undesirable", decisionRanking: "" },
      ],
    },
    {
      id: "7", RiskCategory: "7)Endpoint Security (Virus/Malware/APT related), Mobile Apps etc", CalcualtnLikelihood: "Possible-2", CalcualtnSeverity: "Tolerable-2", CalcualtnRanking: "Medium-5", questions: [
        { id: "7.1", Risk: "AntiVirus and MalWare", QuestionToAsk: "Does your system have AntiMalware enabled?", Explanation: "Ensures that infected systems connecting to exchange information (whether mobile devices or remote servers) are not likely to infect us in some way", yesNo: "Yes", Comments: "Yes, System have AntiMalware enabled", decisionLikelihood: "Improbable", decisionSeverity: "Undesirable", decisionRanking: "" },
      ],
    },
    {
      id: "8", RiskCategory: "8)Deployed Application and Server security (APT, Hardening etc.) risks", CalcualtnLikelihood: "Probable-3", CalcualtnSeverity: "Undesirable-3", CalcualtnRanking: "High-9", questions: [
        { id: "8.1", Risk: "Insecure Servers", QuestionToAsk: "Is the application environment hardened?", Explanation: "(Hardening typically means that unnecessary services are disabled, ports blocked by default etc.)", yesNo: "No", Comments: "", decisionLikelihood: "Probable", decisionSeverity: "Undesirable", decisionRanking: "" },
        { id: "8.2", Risk: "Insecure Servers", QuestionToAsk: "Does the environment have isolation from other systems containing confidential data?", Explanation: " Not required unless the system is either unpacched or contains high value data", yesNo: "Yes", Comments: "", decisionLikelihood: "Improbable", decisionSeverity: "Intolerable", decisionRanking: "" },

      ],
    },
    {
      id: "9", RiskCategory: "9)SDLC Security Risks", CalcualtnLikelihood: "Possible-2", CalcualtnSeverity: "Tolerable-2", CalcualtnRanking: "Medium-5", questions: [
        { id: "9.1", Risk: "Using Components With Known Vulnerabilities", QuestionToAsk: "Have we verified that the components used to build the system did not contain known vulnerabilities?", Explanation: "Only required if the system is developed at Syngenta", yesNo: "Yes", Comments: "Yes, Verified that the components used to build the system.", decisionLikelihood: "Possible", decisionSeverity: "Tolerable", decisionRanking: "" },
        { id: "9.2", Risk: "Secure Coding", QuestionToAsk: "Steps taken to perform Static Code Analysis or other approaches to ensure secure coding practices are used", Explanation: "This is more aimed at simple scripts and internally developed software to ensure that we don't deploy insuecure code and scripts that could be used to undermine the systems", yesNo: "Yes", Comments: "Yes, Approaches to ensure secure coding practices are used.", decisionLikelihood: "Possible", decisionSeverity: "Intolerable", decisionRanking: "" },

      ],
    },
    {
      id: "10", RiskCategory: "10)Other",CalcualtnLikelihood: "Probable-3", CalcualtnSeverity: "Undesirable-3", CalcualtnRanking: "High-9", questions: [
        { id: "10.1", Risk: "Security Misconfiguration", QuestionToAsk: "Ensure that the application security configuration is well documented and doesn't expose the application to external attacks.", Explanation: "Security configurations (file permissions, admin permissions etc.) should not be left at their defaults but rather have validated settings set to known secure configurations. Any defaults shou;d have been vetted and documented reason for why fail-secure approach was not used.", yesNo: "Yes", Comments: "Yes, Application security configuration is well documented.", decisionLikelihood: "Improbable", decisionSeverity: "Acceptable", decisionRanking: "" },
      ],
    },



  ];
}
 

toggleShow() {
this.isShown = ! this.isShown;
}

toggleExpandRow(row) {
   ;   
   this.myTable.rowDetail.toggleExpandRow(row);  
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
function ApprovalComponent(ApprovalComponent: any, dialogConfig: MatDialogConfig<any>) {
  throw new Error('Function not implemented.');
}

