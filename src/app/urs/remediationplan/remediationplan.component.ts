 import { Component, OnInit, ViewChild } from '@angular/core';
import { ApisProvider } from 'src/app/utility/api';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { debounceTime, map } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
 import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from '../popup/popup.component';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { rankrequestListDTO, RemediationClass } from 'src/app/utility/uasModels';
import { AttachmentTable } from 'src/app/utility/TrainingDetailsModel';
import { ViewfilesComponent } from '../../pages/content-pages/viewfiles/viewfiles.component'; // '../viewfiles/viewfiles.component';
import * as Quill from 'quill';
import { UserAccess, UserPrincipalDTO ,DocumentForumDTO,dropDownDto, dropDowns, ApproveDTO, RemediationDTOList, RemediationDTO, RemediationParams} from 'src/app/utility/model';
import { angular2userdropdown, RemediationCheckedandlike } from 'src/app/utility/Usermodel';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';


@Component({
  selector: 'app-remediationplan',
  templateUrl: './remediationplan.component.html',
  styleUrls: ['./remediationplan.component.scss'],
  providers: [DatePipe, ViewfilesComponent]

})
export class RemediationplanComponent implements OnInit {
  @ViewChild('search', { static: true }) search: any;
  public stepTwoForm: FormGroup;

  
   //file 
   fileNameforExc: string;
   fileBase64: any;
  Detailedfields = [];
  isCheckListEntered : boolean ;
  //filter or search   
  filteredData = [];
  columnsWithSearch: string[] = [];
  DetaileddisplayFields: any[];
  Remediationgrid =[]

  
   //attachments
   staticAttachment: any[] = [];
   staticAttachmentTable: Array<any> = [];
   users: any = [];
   selectedItem: any = [];
   dropdownSettings: any = {};
   closeDropdownSelection=false;
   disabled=false;


   mySettings: IMultiSelectSettings = {
    enableSearch: true,
    selectionLimit: 3,
};

myTexts: IMultiSelectTexts = {
  checkAll: 'Select all',
  uncheckAll: 'Unselect all',
  checked: 'item selected',
  checkedPlural: 'items selected',
  searchPlaceholder: 'Find',
  defaultTitle: 'Select Responsible Party',
  allSelected: 'All selected',
};



userdropdownSettings = { 
  singleSelection: false,
  text: '',
  limitSelection:2,
  enableCheckAll:false,
  selectAllText: 'Select All',
  unSelectAllText: 'UnSelect All',
  enableSearchFilter: true,
  enableFilterSelectAll :false,
  badgeShowLimit: 3,
  classes: "myclass inputField",
  labelKey: 'name',
  position:"bottom",
  autoPosition:false,
  maxHeight:150
}; 

count: number;
  workflowList: any;

   constructor(private api: ApisProvider, public datePipe: DatePipe,private spinnerService: Ng4LoadingSpinnerService,
     private route: ActivatedRoute,private router: Router, private modalService: NgbModal,private viewPdfComponent: ViewfilesComponent
    ) { }
    @ViewChild('commentField', {static: true})  commentField: any;
    replyCommentField: any;
    constant: any = null;
   itemId: any = 0;
     id: any = null;
   isDocumentWorkFlow: any = false;
    isModalSlide: any = true;
    documentList: any;
    chapter: any;
    isExterApproval: boolean = false;
    exterApprovalReferenceId: String = "";
 
   list: any[] = new Array();
   listTemp:any[]=new Array();
   documentType: any;
   documentId: any;
   documentTitle: any;
   documentCode: any;
   comments: any;
   replyComments: string;
   spinnerFlag: boolean = false;
   isReply: boolean = false;
   public subscription: any = [];
   currentUser: UserPrincipalDTO = new UserPrincipalDTO();
   pageNo: number = 0;
   currentUserBadge: string = "TV";
   isLastPage: boolean = false;
   usersList: any[] = new Array();
   suggestions: any[] = [];
   copyOfAllSuggestion: any[] = [];
   suggestionCharacter = '';
   show: boolean;
   commentForm: FormControl = new FormControl();
   replyCommentsForm: FormControl = new FormControl();
   selectedFormId: any;
   groupingFlg = false;
   isShowCheckedItems: boolean = false;
   checkedItemsCount: number = 0;
   hideButtonText: string = "Show checked items";
   calculateDate:any;
   startDate:any;
   endDate:any;
   diff:any;

  
   receiveComment($event) {
    this.comments = $event;
    this.count = this.comments.length;
    console.log(this.comments);
  }

  recieveCount($event) {
    this.comments = $event;
    this.count = this.comments.length;
  }
 
   
    todayDate=this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    dataForStatus = [      
        { key: 'Open', value: '1' },
        { key: 'Closed', value: '2' },
        { key: 'In-Progress', value: '3' }, 
    ]

    shareCheckedList(item:any[]){
      console.log(item);
    }
    shareIndividualCheckedList(item:{}){
      console.log(item);
    }

    list1 : any[];

    UsersList2=[];
    userList=[];
    userList2=[];
    ArrayObject=[];
    LoadUsers(){
      this.api.apiMethodFetchDataByGET("api/WorkFlow/loadRolesAndCategory").then(result => {
        if (result.status) {
          console.log(result)
          this.UsersList2 = <angular2userdropdown[]>result.resultOP.users;
          for(let x = 0; x < this.UsersList2.length ; x++ ){
            console.log(this.UsersList2[x].userFirstName)
            let temp={id:this.UsersList2[x].userFirstName,name:this.UsersList2[x].userFirstName};
            this.ArrayObject[x]=temp;
            this.userList2=this.ArrayObject
        }
        }
         else 
        {
          swal(
            'Error!',
            result.description,
            'error'
          )
        }
      });
    }


    UsersList1=[];
    userList1=[];
    ArrayObject1=[];
    userNames=[]
    LoadUsers1(){
      this.api.apiMethodFetchDataByGET("api/WorkFlow/loadRolesAndCategory").then(result => {
        if (result.status) {
          console.log(result)
          this.UsersList1 = <angular2userdropdown[]>result.resultOP.users;
          for(let x = 0; x < this.UsersList1.length ; x++ ){
          this.userNames.push(this.UsersList1[x].userFirstName)
            console.log("User DEMO user List1",this.userNames)
        }  
      }  
      });
    }

isNotEmpty=true
ArrayObject2=[];
userList3=[];
  onEditLoad(){
    let id=this.editRequestId

    this.api.apiMethodFetchDataByGET('api/RequestFormUser/EditRequestLoadonId?reqid=' + id).then(data => {
      console.log("Edit Data",JSON.parse(data.resultOP.riskandRankDetails))
      this.categoryLst1 = JSON.parse(data.resultOP.riskandRankDetails)
      console.log(JSON.parse(data.resultOP.riskandRankDetails))
      for(let i=0;i<this.categoryLst1.length;i++){
        console.log("Rank",this.categoryLst1[i].calcualtnRanking)
        if(this.categoryLst1[i].calcualtnRanking>=7){
          console.log("Not empty")
          this.isNotEmpty=false;
        }
      }
      })
  }

  
  showHighRisk(rank){
    if(rank>=7)
      return true;
    else
      return false;
  }

  riskstrvalue: dropDowns = new dropDowns();
  editRequestId:any;
  model:ApproveDTO=new ApproveDTO();
  riskSu
nextFlag=false;
remediationValidation=true;

  saveAndGo(){
    this.remediationValidation=true;
    console.log(this.categoryLst1)
    console.log(this.remediationValidation)
    for(let i=0;i<this.categoryLst1.length;i++){
      if(this.categoryLst1[i].calcualtnRanking>=7){
          if(this.categoryLst1[i].status=="" ||
          this.categoryLst1[i].plannedCompletion=="" || this.categoryLst1[i].remediationPlan==""
          || this.categoryLst1[i].responsibleParty.length<2){
            this.remediationValidation=false

          }
    }
    console.log("Risk Summary Tab 3",this.remediationValidation)

  }
    if(this.remediationValidation){
      this.remediationValidation=true;
      console.log("Risk Summary Tab 3",this.categoryLst1)
    this.spinnerService.show();
    this.primaryRequestId=this.editRequestId
    this.riskstrvalue.id=Number(this.primaryRequestId);
    this.riskstrvalue.key=(JSON.stringify(this.categoryLst1));
    this.model.requestId=Number(this.editRequestId)
    this.model.QuestionJSON=(JSON.stringify(this.categoryLst1));
    this.model.status='securityplan'
    console.log("++++++++",this.model,"++++++++++++++++")
    this.api.apiMethodFetchDataByPOST("api/RequestFormUser/InsertRequestRiskandRank", this.model).then(result => {
     if (result.status) {
        this.spinnerService.hide();
        this.nextFlag=true
        swal({
          title: "Updated!",
          text: "Remediation Plan/Action",
          type: "success",
          timer: 2000
          }).then
          ((result) => {

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
  }

categoryLst1:any;
primaryRequestId:any;
RequestDTO:rankrequestListDTO=new rankrequestListDTO();
count1=0;
counter(){
  this.count1=this.count1+1
  return this.count1
  
}

findChoices(searchText: string) {
  console.log(this.count,"count")
  const names = [
    "thiru001",
    "thiru002",
    "thiru003",
    "William",
    "Sam",
    "Raj",
    "Bhavin",
    "Sananth",
    "User 01",
    "User 02",
    "User 03",
    "User 04",
    "sam1",
    "sss",
    "Sam3",
    "sam7",
    "Requestor",
    "Manager",
    "Network Admin",
    "Security Admin",
    "Risk Admin",
    "User 05",
    "thiru001",
    "thiru002",
    "thiru003",
    "William",
    "Sam",
    "Raj",
    "Bhavin",
    "Sananth",
    "User 01",
    "User 02",
    "User 03",
    "User 04",
    "sam1",
    "sss",
    "Sam3",
    "sam7",
    "Requestor",
    "Manager",
    "Network Admin",
    "Security Admin",
    "Risk Admin",
    "User 05"
  ]
  
  return names
    .filter(item => item.toLowerCase().includes(searchText.toLowerCase()))
    .slice(0, 5);
}

getChoiceLabel(choice: string) {
  return `@${choice}`;
}

shortcut(event: KeyboardEvent): boolean {
  return (event.keyCode === 32 || event.code === '32') && event.ctrlKey;
}


  loadData(){
    this.spinnerService.show(); 
    this.primaryRequestId=localStorage.getItem("primaryRequestId");
    this.RequestDTO.id=  this.primaryRequestId;
     this.RequestDTO.key="2";
     this.RequestDTO.categoryId=0;
      this.api.apiMethodFetchDataByPOST("api/RequestMethods/getRequestITInfo",this.RequestDTO).then(async result => {
        if (result.status) {
          console.log("Status",result)
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
    
    onSaveLoad(){
      console.log("+++++++++++++++++",this.userList)
      this.onEditLoad()
      this.Loadremidationdiary();
    }

   currentUserName;
   currentUserId;
  ngOnInit() {   
   this.pageNo=0
   this.loadRemediationplan()
   this.currentUserName=this.api.decode(localStorage.getItem("userName"))
   this.currentUserId=this.api.decode(localStorage.getItem("userId"))
    this.route.queryParams.subscribe(
      params => {
        this.editRequestId =  params['requestId'];
        if(this.editRequestId!=undefined){
          //this.onEditLoad(this.editRequestId)
          console.log("if")
        }else{
          console.log("else")
          this.loadData();
        }
      })

     this.selectedItem=['Deva', 'deepika']
    this.LoadUsers() 
   
      this.api.apiMethodFetchDataByGET("api/WorkFlow/loadRolesAndCategory").then(result => {
        if (result.status) {
          console.log(result)
          this.UsersList2 = <angular2userdropdown[]>result.resultOP.users;
          for(let x = 0; x < this.UsersList2.length ; x++ ){
            console.log(this.UsersList2[x].userFirstName)
            let temp=({id:x,value:this.UsersList2[x].userFirstName});
            this.ArrayObject[x]=temp;
            this.userList=this.ArrayObject
          
        }
        this.usersList=JSON.parse(JSON.stringify(this.userList))
        console.log(this.usersList,"_______________________________---")
        }
      });


      this.api.apiMethodFetchDataByGET('api/RequestFormUser/EditRequestLoadonId?reqid=' + this.editRequestId).then(data => {
        console.log("Edit Data",JSON.parse(data.resultOP.riskandRankDetails))
        this.categoryLst1 = JSON.parse(data.resultOP.riskandRankDetails)
        let riskList=[];
      if(true){
       for(let i=0;i<this.categoryLst1.length;i++){
            let temp=({id:i,value:"Risk-"+(i+1)});
            console.log(i,temp,"_________________________________________________________=====")
            this.ArrayObject2[i]=temp
            riskList=this.ArrayObject2
         
        }
      }
      console.log(riskList,"+++++++________________________---")
        this.documentList=JSON.parse(JSON.stringify(riskList))
        console.log(this.documentList,"+++++++________________________---")
        })

     //this.usersList= JSON.stringify(this.userList)


    this.calculateDate=Date.now();
    this.calculateDate= this.datePipe.transform(new Date(),"yyyy-MM-dd hh:mm");
    this.loadAll();
  }

  
toggleCloseDropdownSelection() {
  this.closeDropdownSelection = !this.closeDropdownSelection;
  this.dropdownSettings = Object.assign({}, 
    this.dropdownSettings,{closeDropDownOnSelection: this.closeDropdownSelection});
}

  loadRemediationplan(){

       /* this.Detailedfields = [{ RiskBeingMitigated: '1)User Access and Authentication related Risks',PlannedCompletion:'', RemediationPlan:'',ResponsibleParty:'' ,Status:''},
        { RiskBeingMitigated: '2)Supplier Related Risks', PlannedCompletion:'', RemediationPlan:'',ResponsibleParty:'' ,Status:''},
      ];
        this.DetaileddisplayFields = this.Detailedfields
        this.filteredData = this.Detailedfields
        this.columnsWithSearch = Object.keys(this.Detailedfields[0]);*/
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


fileName: string;
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

remediation = new  RemediationDTOList();
  Saveremidationdiary(model){
    this.spinnerService.show()
    console.log(model)
    this.api.apiMethodFetchDataByPOST("api/RequestFormUser/RemediationDiarySaveandUpdate",model).then(async result => {
    console.log(result)
   if (result.status) {
      this.pageNo = 0;
      this.list = [];
      this.loadAll();
      this.comments = "";
      this.replyComments = "";
      this.commentForm.reset();
      this.replyCommentsForm.reset();
      this.spinnerService.hide()
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


  remediationparams:any;
  Loadremidationdiary(){
    this.spinnerService.show()
    console.log("Remediation")
   this.remediationparams = new  RemediationParams();
   this.remediationparams.RequestId= this.editRequestId;
   this.remediationparams.PageNumber=this.pageNo;
   this.api.apiMethodFetchDataByPOST("api/RequestFormUser/RemediationDiaryLoad",this.remediationparams).then(async result => {
   console.log(result)
   if (result.status) {
     this.spinnerService.hide()
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

  
handleReaderLoaded(e) {
  this.fileBase64 = (btoa(e.target.result));
  this.viewPdf(this.fileBase64, this.fileNameforExc);
}

viewPdf(fileContent: any, fileName: string)
{
  let jsonObj = {status: true, filecontentSource: fileContent, fileName: fileName}
  const modalRef = this.modalService.open(ViewfilesComponent, {size: 'xl'});
  modalRef.componentInstance.details = jsonObj;
}

deleteStaticUploadedFile(data: any, fileIndex)
{
  this.staticAttachmentTable.splice(fileIndex,1);

 var elementExists = this.staticAttachment.find(x => x.name == data.FileName); //  .splice(fileIndex,1);
  if (elementExists)
  elementExists.remove();

}

RemediationCheckedandlike = new  RemediationCheckedandlike();
  UpdateLike(item){
    console.log(item)
    item.UserLikeFlag=!item.UserLikeFlag
    this.RemediationCheckedandlike.CommentId=item.Id;//requestid
          this.RemediationCheckedandlike.Status=item.UserLikeFlag;
          this.api.apiMethodFetchDataByPOST("api/RequestFormUser/RemediationLikeUpdate", this.RemediationCheckedandlike).then(result => {
            console.log(result)
            if (result.status) {
              this.Loadremidationdiary()
           }
          })
  }
   
  UpdateStrikeout(item){
          console.log(item)
          item.CheckedFlag=!item.CheckedFlag
          item.CheckedFlag=!item.CheckedFlag
          this.RemediationCheckedandlike.CommentId=item.Id//requestid
          this.RemediationCheckedandlike.Status=item.CheckedFlag;
          this.api.apiMethodFetchDataByPOST("api/RequestFormUser/RemediationStrikeUpdate", this.RemediationCheckedandlike).then(result => {
           console.log(result)
            if (result.status) {
              this.Loadremidationdiary()
           }
          })
  }


onSubmit() {
  
  console.log(this.list)
  if (this.comments) {
    const data: DocumentForumDTO = new DocumentForumDTO();
  const selectedDocumentList: dropDownDto[] = new Array();
  const selecteduserIds = new Array();
  let listOfComments = this.comments.split(" ");
  let userList = this.usersList ? this.usersList.map(u => u.value) : [];
  let documentList = this.documentList ? this.documentList.map(u => u.value) : [];
  let section = this.chapter ? this.chapter.map(u => u.value) : [];
  this.comments = "";
  listOfComments.forEach(e => {
  if (e.includes("@")) {
       if (userList.includes(e.replace("@", ''))) {
          this.comments += ` <b class="text-primary">` + e + "</b>";
         } else {
          this.comments += e;
         }
       } else if (e.includes("#")) {
         if (documentList.includes(e.replace("#", ''))) {
           this.comments += ` <b class="text-warning">` + e + "</b>";
       } else {
           this.comments += e;
         }
       } else if (e.includes("*")) {
        if (section.includes(e.replace("*", ''))) {
          this.comments += ` <b class="text-primary">` + e + "</b>";
         } else {
           this.comments += e;
         }
      } else {
         this.comments += " " + e;
       }

       if (e.includes("@")) {
         let element = this.usersList.filter(d => d.value == e.replace('@', ''));
         if (element.length > 0) {
           selecteduserIds.push(element[0].id);
         }
       }

       if (e.includes("#")) {
         let element = this.documentList.filter(d => d.value == e.replace('#', ''));
         if (element.length > 0) {
          const dropDown: dropDownDto = new dropDownDto();
          dropDown.key = element[0].id;
          dropDown.value = element[0].value;
          selectedDocumentList.push(dropDown);
        }
       }
     });
     let remediation=new RemediationDTO();
     remediation.id=0;
     remediation.replyId=0;
     remediation.itemId=0;
     remediation.comments=this.comments
     remediation.documentType=this.editRequestId
     remediation.userName=this.currentUserName
     let name = this.currentUserName.split(" ");
     console.log(name)
     remediation.userBadge=name[0].charAt(0).toUpperCase();
     remediation.userLikeFlag=false;
     remediation.userLikesCount=0;
     remediation.childFlag=false;
     remediation.editFlag=true;
     remediation.editIndividualFlag=false;
     remediation.replyFlag=false;
     remediation.date = this.calculateDate;

console.log("Remediation Diary+++++",remediation)

this.remediation.list= [remediation];
this.remediation.RequestId=this.editRequestId;
console.log("Remediation Diary Model+++++",this.remediation)
this.Saveremidationdiary(this.remediation)

   
  }
}


replySelectSuggestion(s:any)
{
  this.suggestions = this.copyOfAllSuggestion;
  this.isReply = true;
  this.replyComments = this.replyCommentsForm.value;
  this.replyComments = this.replyComments.substring(0, this.replyComments.lastIndexOf(this.getAnnotation(s.type)));
  this.replyComments = this.replyComments.concat("" + this.getAnnotation(s.type) + s.value);
  this.replyCommentsForm.patchValue(this.replyComments);
  this.show = false;
  if (this.replyCommentField)
    this.replyCommentField.nativeElement.focus();
}



onClickLike(s:any){
  for (let i = 0; i < this.list.length; i++) {
    ;
    if(this.list[i].id == s.id){

      const data: DocumentForumDTO = new DocumentForumDTO();
      data.id=s.id;
      data.comments = s.comments;
      data.editIndividualFlag= false;
      data.childFlag =true;
      data.groupingFlag= false;
      data.showBadge=false;
      data.userName="userA";
      data.userBadge="TV";
      data.enterdate=s.enterdate;
      if (!s.userLikeFlag){
        data.userLikeFlag=true;
      data.userLikesCount =  data.userLikesCount+1;
      }
      else{
        data.userLikeFlag=false;
        data.userLikesCount =  0;
      }

      this.list[i] = data;
    }
  }
}

save(data: any) {
  console.log(this.Detailedfields)
  /*this.spinnerFlag = true;
  this.comments = "";
  this.replyComments = "";
  this.commentForm.reset();
  this.list.unshift(data);
  this.dateRefersh();*/
   // this.list = [];
  // this.service.createDocumentForum(data, this.isExterApproval).subscribe(jsonResp => {
  //   this.pageNo = 0;
  //   this.list = [];
  //   this.loadAll();
  //   this.comments = "";
  //   this.replyComments = "";
  //   this.commentForm.reset();
  //   this.replyCommentsForm.reset();
  //   this.spinnerFlag = false;
  // },
  //   err => {
  //     this.spinnerFlag = false
  //   }
  // );

}

dateRefersh(){

;
this.listTemp=[];
  this.list.forEach((stu) => {
;
    const data: DocumentForumDTO = new DocumentForumDTO();
    data.id=stu.id;
    data.comments = stu.comments;
    data.editIndividualFlag= false;
    data.childFlag =true;
    data.groupingFlag= false;
    data.showBadge=false;
    data.userName="userA";
    data.userBadge="TV";
    data.enterdate=stu.enterdate;
    var entd = stu.enterdate;
    var date = new Date();
    let diff = date.getTime() - entd.getTime();
    let days = Math.floor(diff / (60 * 60 * 24 * 1000));
    let hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
    let minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
    let seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
if (days!=0)
{data.datediff= String(days+'days ago');}
else if (hours!=0)
{data.datediff = String(hours+' hours ago'); }
else if (minutes!=0)
{data.datediff= String (minutes+'minutes ago'); }
else
{data.datediff =String(minutes+'minutes ago'); }
 this.listTemp.push(data);
  });
this.list=[];
;
this.list=this.listTemp;
}
loadAll() {
  var myCurrentDate=new Date();
  var myPastDate=new Date(myCurrentDate);
  myPastDate.setDate(myPastDate.getDate() - 8);
  this.Loadremidationdiary()
let list3= [
    {
      "Id": 1,
      "Comments": " okay demo tour",
      "ReplyId": 0,
      "DocumentType": null,
      "ItemId": 0,
      "RequestId": 10007,
      "UserName": "thiru002",
      "UserBadge": "th",
      "Date": "0001-01-01T00:00:00",
      "Diffdate": "1hours ago",
      "UserLikeFlag": false,
      "UserLikeCount": 0,
      "ChildFlag": false,
      "EditFlag": true,
      "EditIndividualFlag": false,
      "ReplyFlag": false,
      "CheckedFlag": false,
      "list": [
        {
          "Id": 1,
          "Comments": "Demo",
          "ReplyId": 1,
          "DocumentType": null,
          "ItemId": 0,
          "RequestId": 10007,
          "UserName": "thiru002",
          "UserBadge": "th",
          "Date": "0001-01-01T00:00:00",
          "Diffdate": "37minutes ago",
          "UserLikeFlag": false,
          "UserLikeCount": 0,
          "ChildFlag": true,
          "EditFlag": true,
          "EditIndividualFlag": false,
          "ReplyFlag": false,
          "CheckedFlag": false,
          "list": [  ]
        },
        {
          "Id": 1,
          "Comments": "Demo",
          "ReplyId": 1,
          "DocumentType": null,
          "ItemId": 0,
          "RequestId": 10007,
          "UserName": "thiru002",
          "UserBadge": "th",
          "Date": "0001-01-01T00:00:00",
          "Diffdate": "37minutes ago",
          "UserLikeFlag": false,
          "UserLikeCount": 0,
          "ChildFlag": true,
          "EditFlag": true,
          "EditIndividualFlag": false,
          "ReplyFlag": false,
          "CheckedFlag": false,
          "list": [  ]
        }
        
      ]
    }
  ]
   

this.dateRefersh();

 // this.list = this.list.concat(response.result);
  // this.isLastPage = false;
  // this.spinnerFlag = true;
  // this.service.loadDocumentForum(this.documentType, this.itemId, this.documentId, this.pageNo, this.currentUser.versionId, this.isExterApproval, this.groupingFlg, this.isShowCheckedItems).subscribe(response => {
  //   this.spinnerFlag = false
  //   if (response.result != null) {
  //     this.list = this.list.concat(response.result);
  //     this.isLastPage = response.isLastPage;
  //     this.checkedItemsCount = response.checkedItemsCount;
  //     this.hideButtonText = this.isShowCheckedItems ? 'Hide checked items' : 'Show checked items(' + this.checkedItemsCount + ')';
  //   }
  // }, error => { this.spinnerFlag = false });
}


searchSuggestions(query: string): any {
  console.log(query)
  setTimeout(() => {
    if (!query) {
      this.suggestions = new Array();
      return;
    }
    let split = query.split(this.suggestionCharacter);
    query = split[split.length - 1].trim();
    this.suggestions = this.copyOfAllSuggestion.filter(r => r.value.toLowerCase().includes(query.toLowerCase()));
  }, 100);
}

selectSuggestion(s) {
  console.log(this.suggestionCharacter,"--------------------------")
  if(this.suggestionCharacter=="@"){
    s.type="user"
  }else{
    s.type="code"
  }
  this.suggestions = this.copyOfAllSuggestion;
  this.isReply = false;
  this.comments = this.commentForm.value;
  this.comments = this.comments.substring(0, this.comments.lastIndexOf(this.getAnnotation(s.type)));
  this.comments = this.comments.concat(" " + this.getAnnotation(s.type) + s.value);
  this.commentForm.patchValue(this.comments);
  this.show = false;
  this.commentField.nativeElement.focus();
}

onClickOut() {
  if (this.commentForm.value) {
    this.comments = this.commentForm.value;
  }
}

getAnnotation(s) {
  switch (s) {
    case 'code':
      return '#';
    case 'chapter':
      return '*';
    case 'user':
      return '@';
  }
}

onCLickReply(item: any) {
  this.replyComments = "";
  this.replyCommentsForm.setValue('');
  this.list.map(data => {
    data.ReplyFlag = false;
    data.EditIndividualFlag = false;
  });
  item.ReplyFlag = true;
  
}

onClickDelete(item) {
  var obj = this;
  // obj.service.deleteDocumentForum(item).subscribe(jsonResp => {
  //   obj.pageNo = 0;
  //   obj.list = [];
  //   this.loadAll();
  // });
}


strickComment(id: any) {
  /*this.service.strickComment(id, this.isExterApproval).subscribe(res => {
  });*/
}

suggest(event, flag) {
  console.log(event,flag)
  this.isReply = flag;
   
  let inputChar = String.fromCharCode(event.charCode);
    switch (inputChar) {
      case '@':
        this.suggestions = JSON.parse(JSON.stringify(this.usersList));
        this.suggestionCharacter = inputChar;
        break;
      case '#':
        if (this.documentList) {
          this.suggestions = JSON.parse(JSON.stringify(this.documentList));
        } else {
          this.suggestions = new Array();
        }
        this.suggestionCharacter = inputChar;
        break;
      case '*':
        this.suggestionCharacter = inputChar;
        if (this.chapter) {
          this.suggestions = JSON.parse(JSON.stringify(this.chapter));
        } else {
          this.suggestions = new Array();
        }

        break;
      case ' ':
        this.suggestions = new Array();
        break;
      default:
        break;
    }
    if (this.suggestionCharacter) {
      this.show = true;
      this.copyOfAllSuggestion = JSON.parse(JSON.stringify(this.suggestions));
    }
}

checkBackSpace(event) {
  var key = event.keyCode || event.charCode;
  if (key == 8 || key == 46)
    this.suggestions = new Array();
}

onReplySubmit(item: any, newComments) {
  console.log(newComments)
  let comment=newComments
  if (newComments) {
    let listOfComments = newComments.split(" ");
    const selectedDocumentList: dropDownDto[] = new Array();
    const selecteduserIds = new Array();
    this.replyComments = "";
    let userList = this.usersList? this.usersList.map(u => u.value) : [];
    let documentList = this.documentList ? this.documentList.map(u => u.value) : [];
    let section = this.chapter ? this.chapter.map(u => u.value) : [];
    listOfComments.forEach(e => {
      if (e.includes("@")) {
        if (userList.includes(e.replace("@", ''))) {
          this.replyComments += ` <b class="text-primary">` + e + "</b>";
        } else {
          this.replyComments += e;
        }
      } else if (e.includes("#")) {
        if (documentList.includes(e.replace("#", ''))) {
          this.replyComments += `<b class="text-warning">` + e + "</b>";
        } else {
          this.replyComments += e;
        }
      } else if (e.includes("*")) {
        if (section.includes(e.replace("*", ''))) {
          this.replyComments += ` <b class="text-primary">` + e + "</b>";
        } else {
          this.replyComments += e;
        }
      } else {
        this.replyComments += " " + e;
      }
      if (e.includes("@")) {
        let element = this.usersList.filter(d => d.value == e.replace('@', ''));
        if (element.length > 0) {
          selecteduserIds.push(element[0].id);
        }
      }

      if (e.includes("#")) {
        let element = this.documentList.filter(d => d.value == e.replace('#', ''));
        if (element.length > 0) {
          const dropDown: dropDownDto = new dropDownDto();
          dropDown.key = element[0].id;
          dropDown.value = element[0].value;
          selectedDocumentList.push(dropDown);
        }
      }
    });
    const data: DocumentForumDTO = new DocumentForumDTO();
  /*
    if (item.editIndividualFlag) {
      data.id = item.id;
      data.replyId = 0;
    } else if (item.replyFlag) {
      data.replyId = item.id;
      data.id = 0;
    }
  */
 


    let remediation=new RemediationDTO();
    remediation.id=item.Id;
    remediation.replyId=item.Id;
    remediation.itemId=0;
    remediation.comments=newComments
    remediation.documentType=this.editRequestId
    remediation.userName=this.currentUserName
    let name = this.currentUserName.split(" ");
    remediation.userBadge=name[0].charAt(0).toUpperCase();
    remediation.userLikeFlag=false;
    remediation.userLikesCount=0;
    remediation.childFlag=false;
    remediation.editFlag=true;
    remediation.editIndividualFlag=false;
    remediation.replyFlag=true;
    remediation.date = this.calculateDate;

console.log("Remediation Diary+++++",remediation)
this.remediation.list= [remediation];
this.remediation.RequestId=this.editRequestId;
console.log("Remediation Diary Model+++++",this.remediation)
this.Saveremidationdiary(this.remediation)

  }
}


onClickLike1(item: any) {
  item.userLikeFlag = !item.userLikeFlag;
  this.spinnerFlag = true;
  item.referenceId = this.exterApprovalReferenceId;
  /*this.service.saveuserLikes(item).subscribe(jsonResp => {
    this.pageNo = 0;
    this.list = [];
    this.loadAll();
    this.spinnerFlag = false;
  },
    err => {
      this.spinnerFlag = false
    }
  );*/
}

onClickOutClose(item) {
  setTimeout(() => {
    item.ReplyFlag = false;
    item.EditIndividualFlag = false;
  }, 500)

}

} 