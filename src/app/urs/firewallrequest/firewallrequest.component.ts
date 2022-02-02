import { Component, ElementRef, Input, OnInit, ViewChild, Injector, Output, EventEmitter, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {rankrequestListDTO, Securitypolicygrid} from 'src/app/utility/uasModels';
import { ApisProvider } from 'src/app/utility/api';
import { ActivatedRoute, Router } from '@angular/router';
 import swal from 'sweetalert2';
 import { DatePipe } from '@angular/common'
 import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
 import * as FileSaver from 'file-saver';
import { ViewfilesComponent } from 'src/app/pages/content-pages/viewfiles/viewfiles.component';
import { ApproveDTO, dropDowns } from 'src/app/utility/model';
import { angular2dropdown, angular2userdropdown, UserRequest } from 'src/app/utility/Usermodel';
import { SidebarService } from 'src/app/shared/sidebar/sidebar.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { isThisSecond } from 'date-fns';
import { UserstepperComponent } from '../userstepper/userstepper.component';
@Component({
  selector: 'app-firewallrequest',
  templateUrl: './firewallrequest.component.html',
  styleUrls: ['./firewallrequest.component.scss'],
  providers: [DatePipe,ViewfilesComponent,UserstepperComponent]
})
export class FirewallrequestComponent implements OnInit {
 
  newRequestForms: FormGroup;
  firewallFlag =true;
  accessCategoryList=[];
  checklist=[];
  securitypolicygrid =[]
  TempTableData =[]
  isCheckListEntered=false;
  accept:any;

  newRequestFormData: UserRequest = new UserRequest();
  loginUserid: any;
 
   //file 
   fileNameforExc: string;
   fileBase64: any;
   
   //attachments
   staticAttachment: any[] = [];
   staticAttachmentTable: Array<any> = [];
  
  fileList: any[] = new Array();
  loadFileList: any[] = new Array();
  deleteFileList: any[] = new Array();
  public count:number = 0;
  public newFileLength:number=0;
  public sizeOfProgressBar:number=0;
  fileName: String = '';
   fileValidationMessage: any = "";
  videoURL: any;
  isVideo: boolean = false;
  singleFileUploadFlag: Boolean = false; 
  public fileUploadspinnerFlag = false;
  docID: any;
  docUniqCode: any;
  isShown:boolean=true;
  isShownArchi:boolean=false;
ispageone:boolean =true;
ispagetwo:boolean=false;
BusinessOwners: any  = [];
documentNumberList: Array<dropDowns> = [];

    closeDropdownSelection=false;
   disabled=false;
 
// arrNormalexpecticated=['Normal', 'Expedited']
// arrsourcevpacc=['Value1', 'MA-6','STS-95', 'Apollo 1', 'MR-4']
// arrdestination=['Des1', 'Des2','Des3', 'Des4', 'Des5']
// arrprotocol=['Protocol1', 'Protocol2','Protocol3', 'Protocol4', 'Protocol5']
// categoryList=['Des1', 'Des2','Des3', 'Des4', 'Des5']
// subCategoryList=['subcategory1', 'subcategory2','subcategory3', 'subcategory4', 'subcategory5']
// firewallRegionList=['one','two','three'];
requestId:string;
status:string;
peerStatus:string;
requestDate:any;
corpid:string;
requestersName:string;
requestersPhone:string;
requestersEmail:string;
requestersDept:string;
selectedDocNum: any = [];
  categoryList: dropDowns[];
  subCategoryList: any[];
  userNameList: dropDowns[];
  userNameListCopy: dropDowns[];
  firewallRegionList: dropDowns[];
  Normalexpecticated: dropDowns[];
   VPCAccount: dropDowns[];
   protocolList: dropDowns[];
  ResponsibleParty: any;

  multi:any[][] = [[1,4,6,8],[2,5,8,11],[3,7,9,12]]  

  userList:angular2userdropdown=new angular2userdropdown();
constructor( private api: ApisProvider, public sidebarservice: SidebarService,private renderer: Renderer2,
  private ApiApisProvider: ApisProvider,private route:ActivatedRoute,private spinnerService: Ng4LoadingSpinnerService,private userstepper:UserstepperComponent,
  private router: Router,public datepipe: DatePipe, private modalService: NgbModal,private viewPdfComponent: ViewfilesComponent,config: NgbModalConfig ) { 
    //config: NgbModalConfig 
    config.backdrop = 'static';
    config.keyboard = false;
  }

docNumdropdownSettings:any={
  singleSelection: true,
  idField: 'id',
  textField: 'firstName',
  itemsShowLimit: 6,
  allowSearchFilter: true,
  closeDropDownOnSelection: false
};
dropdownSettings:any={
  singleSelection: true,
  idField: 'id',
  textField: 'firstName',
  itemsShowLimit: 6,
  allowSearchFilter: true,
  closeDropDownOnSelection: true
};

protocaldropdownSettings = { 
  singleSelection: true, 
  text:"",
  selectAllText:'Select All',
  unSelectAllText:'UnSelect All',
  enableSearchFilter: false,
  classes: "myclass inputField",
  autoPosition: false,
  position:'bottom',
  labelKey: 'key'
};    


categorydropdownSettings :any;

subcategorydropdownSettings  = {
  singleSelection: true, 
  text: "Select Sub Category",
  enableCheckAll:false,
  selectAllText: 'Select All',
  unSelectAllText: 'UnSelect All',
  enableSearchFilter: true,
  enableFilterSelectAll :false,
  badgeShowLimit: 4,
  classes: "myclass inputField",
  labelKey: 'key',
  autoPosition: false,
  position:'bottom',
  maxHeight:150
};

firewalldropdownSettings = { 
  singleSelection: true, 
  text:"Select Firewall Region",
  enableCheckAll:false,
  selectAllText: 'Select All',
  unSelectAllText: 'UnSelect All',
  enableSearchFilter: true,
  enableFilterSelectAll :false,
  badgeShowLimit: 4,
  classes: "myclass inputField",
  labelKey: 'key',
  autoPosition: false,
  position:'bottom',
  maxHeight:150
};

normaldropdownSettings = { 
  singleSelection: true, 
  text:"Select Normal/Expedited",
  enableCheckAll:false,
  selectAllText: 'Select All',
  unSelectAllText: 'UnSelect All',
  enableSearchFilter: true,
  enableFilterSelectAll :false,
  badgeShowLimit: 4,
  classes: "myclass inputField",
  labelKey: 'key',
  autoPosition: false,
  position:'bottom',
  maxHeight:150
};

businessownerdropdownSettings = { 
  singleSelection: false, 
  text:"Select Business Owners",
  enableCheckAll:false,
  selectAllText: 'Select All',
  unSelectAllText: 'UnSelect All',
  enableSearchFilter: true,
  enableFilterSelectAll :false,
  badgeShowLimit: 4,
  classes: "myclass inputField",
  labelKey: 'firstName',
  autoPosition: false,
  position:'bottom',
  maxHeight:150
};

itownerdropdownSettings = { 
  singleSelection: false, 
  text:"Select IT Owners",
  enableCheckAll:false,
  selectAllText: 'Select All',
  unSelectAllText: 'UnSelect All',
  enableSearchFilter: true,
  enableFilterSelectAll :false,
  badgeShowLimit: 4,
  classes: "myclass inputField",
  labelKey: 'firstName',
  autoPosition: false,
  position:'bottom',
  maxHeight:150
};
panelOpenState = false;
selectedProtocol:any;
selectedCategory:any;
jwt:any;

item:angular2dropdown=new angular2dropdown();
editRequestId:any;
selectedSubCategory:any;
selectedFirewallRegion:any;
businessData=[];
data;any;
businesOwnersData:angular2userdropdown[];
itOwnersData:angular2userdropdown[];
cannotDelete=false
businessOwnerItem:angular2userdropdown=new angular2userdropdown();
itOwnerItem:angular2userdropdown=new angular2userdropdown();
firewallItem:angular2dropdown=new angular2dropdown();
nomrmalorexpeditedItem:angular2dropdown=new angular2dropdown();
subCategoryItem:angular2dropdown=new angular2dropdown();
requestPrimaryId:any;
requestSno:any;
requestSno3:any;
nextFlag:boolean=false;
formValidation:boolean=false;
policyValidation=false;
diagramVAlidation=false;
requestValidation=true;
RequestDTO:rankrequestListDTO=new rankrequestListDTO();
model:ApproveDTO=new ApproveDTO();
categoryLst=[];
selctedOwnerList:any;
reqeditList:any;
categoryId:any;
subCategoryId:any;
firewallId:any
normalorExpeditedId:any;
isFirst:boolean=false;
isSecond:boolean=false
requestSno1:any
requestids:any
userList1:any;
userList2:any;

onOpen($event){
  var scrollElm = document.scrollingElement;
  scrollElm.scrollTop = 300;
  this.renderer.setStyle(this.getElementDropdown(), 'display', 'block');

}


  private getElementDropdown(): HTMLElement{
    return document.getElementsByClassName("businessOwnerDropdown")[0] as HTMLElement;
  }
step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }


 viewFile1(data:any){
  this.spinnerService.show();
   setTimeout(() => {

     this.spinnerService.hide();
   }, 2000);

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

  ngOnInit() {

  this.newRequestFormData.ispeerreview='no'  
    this.requestDate=Date.now();
    this.route.queryParams.subscribe(
      params => {
        this.editRequestId =  params['requestId'];
        if(this.editRequestId!=undefined){
          this.userstepper.editUser();
          this.userstepper.editPermission=true;
          this.userstepper.ngOnInit();
          this.onEditload(this.editRequestId)
          this.onLoadDropDowns();
          this.categorydropdownSettings={
            singleSelection: true,
            disabled	:true, 
            text:"Select Category",
            enableCheckAll:false,
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: true,
            enableFilterSelectAll :false,
            badgeShowLimit: 4,
            classes: "myclass inputField",
            labelKey: 'key',
            autoPosition: false,
            position:'bottom',
            maxHeight:150,
            disbaled:true
          }
          // this.loadUserDetails();
        }else{
          this.onLoadDropDowns();
          this.loadUserDetails();
          this.categorydropdownSettings={
            singleSelection: true, 
            text:"Select Category",
            enableCheckAll:false,
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: true,
            enableFilterSelectAll :false,
            badgeShowLimit: 4,
            classes: "myclass inputField",
            labelKey: 'key',
            autoPosition: false,
            position:'bottom',
            maxHeight:150
          }
        }
      }
    )

    this.renderer.selectRootElement('#documentName').focus()

  this.sidebarservice.setSidebarState(true);


    var loginUseridEncode = localStorage.getItem('userId');;

    this.loginUserid = this.ApiApisProvider.decode(loginUseridEncode)
    this.requestId="FR-202110-000100";
    this.status="Draft";
    this.requestDate=Date.now();
    this.corpid="emp100";
    this.requestersName="Aswin";
    this.requestersPhone="123456789";
    this.requestersEmail="Aswin@gmail.com";
    this.requestersDept="Sales";

    // this.newRequestForms = new FormGroup({
    //   'UserId': new FormControl(null),
    //   'Name': new FormControl(),
    //   // // 'EmailId':new FormControl(),
    //   // 'Location': new FormControl(),
    //   // 'Department': new FormControl(),
    //   // 'RequestDate': new FormControl(this.jstoday),
    //   // 'AccessCategory': new FormControl(),
    //   // 'SubCategory': new FormControl(),
    //   // 'AccessType': new FormControl(),
    //   // 'UserName': new FormControl(),
    //   // 'Remark': new FormControl(),
    //   // 'Manager': new FormControl()
    // });
    var date = new Date();
    this.requestDate= this.datepipe.transform(date,"MM/dd/yyyy");

   this.addChecklistItem();  
  //  this.documentNumberList  = [ {  key: 'Bhavin', id: 1},
  //   { key: 'Thiru', id: 2 },
  //   { key: 'Shruti', id: 3 },
  //   { key: 'Girish', id: 4 },
  //   { key: 'Sandya', id: 5 },
  //   { key: 'Shreedha', id: 6 }]
  
   }


   loadUserDetails() {
    this.api.apiMethodFetchDataByGET('api/UserMaster/LoadAllUserDatas').then(result => {
      if (result.status) {
        this.data=result.resultOP;
        this.userNameList = <dropDowns[]>result.resultOP;
        this.userNameListCopy = <dropDowns[]>result.resultOP;
        for(let j=0;j<this.userNameList.length-1;j++){
          this.businessData.push({"id":this.data[j].id,"firstName":this.data[j].firstName})
          this.businesOwnersData=this.businessData
          this.itOwnersData=this.businessData
        }
      } else {
        swal(

          'Error!',
          result.description,
          'error'
        )
      }
    });
  }
 
  Firewallexpand(){

   //http://localhost:4200/urs/firewallrequest

  }
  toggleShow() {

    this.isShown = ! this.isShown;
    
    }
    toggleShowArchi(){
this.isShownArchi=!this.isShownArchi;


    }

    nextPageClick(){
      this.ispageone=!this.ispageone;
      this.ispagetwo=!this.ispagetwo;

    }
  deleteUploadedFileForDoc(value:any,i:number){

const index: number = this.fileList.indexOf(value);
    this.fileList.splice(index, 1);

  }

  onFileChange(event,single?:boolean) {
    
    this.fileUploadspinnerFlag = true;
    this.newFileLength=event.target.files.length
    if (event.target.files.length != 0) {
      for (let index = 0; index < event.target.files.length; index++) {

        //const now = Date.now();
//const myFormattedDate = this.pipe.transform(now, 'short');
        const date = Date.now();
        
        event.target.files[index].displayDate  =this.datepipe.transform(date, 'dd-MM-yyyy');
        event.target.files[index].fileName= event.target.files[index].name ;
      //  this.permissionService.getCurrentDate(date).subscribe(res => {
          // const contentType = this.commonService.getContentType(event.target.files[index].name.split(".")[event.target.files[index].name.split(".").length - 1]);
          // if (this.fileList.filter(data => data.name == event.target.files[index].name).length == 0 && !contentType.match(".zip")) 
          // {

            event.target.files[index].displayDate = date;
            if(single){
              this.deleteFileList=JSON.parse(JSON.stringify(this.fileList));
              this.fileList=new Array();
              this.fileList.push(event.target.files[index]);
            }else
            {
              ;
              this.fileList.push(event.target.files[index]);
             //  alert(JSON.stringify( this.fileList));
            }
            this.fileUploadspinnerFlag = false;
          // }
          // else{
          //   this.fileUploadspinnerFlag = false;
          // }
     //   }, error => { this.fileUploadspinnerFlag = false; });
      }
    }else{
      this.fileUploadspinnerFlag = false;
    }
  }

  onFileUpload(event) {
    this.fileUploadspinnerFlag = true;
    this.newFileLength=event.target.files.length
    //const filePath = 'IVAL/' + this.currentUser.orgId + '/' +this.currentUser.projectName + '/' +this.documentCode+'/' +this.currentUser.versionName + '/Attachements/';
    if (event.target.files.length != 0) {
    let  totalFiles= event.target.files.length;
      for (let index = 0; index < totalFiles; index++) {
      //  const contentType = this.commonService.getContentType(event.target.files[index].name.split(".")[event.target.files[index].name.split(".").length - 1]);
      const contentType ='.txt'
      if (this.fileList.filter(data => data.name == event.target.files[index].name).length == 0 && !contentType.match(".zip")) {
          let file = event.target.files[index];
        let fileName = file.name;
        const formData: FormData = new FormData();
        formData.append('file', file, fileName);
       // formData.append('filePath', filePath);
        formData.append('extension', fileName.split(".")[fileName.split(".").length - 1]);
      //  this.commonService.singleFileUpload(formData).subscribe(resp => {
         let date=Date.now();
          let resp="C:";
         // this.permissionService.getCurrentDate(date).subscribe(res=>{
            var json={filePath:resp,name:fileName,date:date,displayDate:''};
            this.fileUploadspinnerFlag = false;
            this.fileList.push(json);
            //this.onfileUpload.emit(json);
          // },error=>{ this.fileUploadspinnerFlag = false;}
          // );
        // }, error => {
        //   this.fileUploadspinnerFlag = false;
        // })

        }else{
          this.fileUploadspinnerFlag = false;
        }
      }
    }else{
      this.fileUploadspinnerFlag = false;
    }
  }

  addChecklistItem() {
    //https://stackoverflow.com/questions/48986419/how-to-show-the-dynamic-table-with-dropdown-in-angular-and-how-to-push-each-row
    this.isCheckListEntered = false;
    this.cannotDelete=false
    let tempdt;

      ;
    this.securitypolicygrid.forEach(checkList => {
      
     if (this.api.isEmpty(checkList.Sourcevpcaccount) || this.api.isEmpty(checkList.Sourceipaddress) || 
        this.api.isEmpty(checkList.Destinationvpcaccount)|| this.api.isEmpty(checkList.Destination) ||
        this.api.isEmpty(checkList.protocal)|| this.api.isEmpty(checkList.Application)|| this.api.isEmpty(checkList.Portservice) )
        this.isCheckListEntered = true;
    });
    ;
    if (!this.isCheckListEntered) {
       let data = new Securitypolicygrid();
       data.id=0;
       data.Sourcevpcaccount='';
       data.Sourceipaddress='';
       data.Destinationvpcaccount='';
       data.Destination='';
       data.Application='';
       data.Portservice='';
       data.Protocol='';
       this.securitypolicygrid.push(data);
    }
     setTimeout(() => {
       $('#check_list_name_id_' + (this.securitypolicygrid.length - 1)).focus();
     }, 600);
     
   }
 
    

  onChangesorcevpcacc(deviceValue) {
     
}

deleteSecurityTable(value:any,i:number){
  this.cannotDelete=false
  if(i==0){
    this.cannotDelete=true
  }else{
    this.cannotDelete=false
    const index: number = this.securitypolicygrid.indexOf(value);
    this.securitypolicygrid.splice(index, 1);
  }


}

 
viewFile(data: any, fileIndex, type: string){

  this.spinnerService.show();
  if(data.FilePath==undefined){
    this.fileNameforExc = data.name;
    this.fileBase64 = "";
    if (data.FilePath == '' || data.FilePath == undefined) {
    var elementExists: any;
      if (type == 'Static') {
        elementExists = this.fileList.find(x => x.name == data.name);
      }
      if (elementExists){
        let files: File = <File>elementExists;
        const reader = new FileReader();
        reader.onload = this.handleReaderLoaded.bind(this);
        reader.readAsBinaryString(files);
      }
    }   
  }else{
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
}

onEditCategoryDropDowns(categoryId,subCategoryId){
    this.api.apiMethodFetchDataByGET("api/RequestFormUser/LoadDropDowns").then(result => {
    if (result.status) {
      this.categoryList = <dropDowns[]>result.resultOP.CategoryDetails;
      for(let i=0;i<this.categoryList.length;i++){
        this.item.id=categoryId
        if(this.categoryList[i].id==this.item.id){
          this.item.key=this.categoryList[i].key;
          let catData=[];
          catData.push(this.item)
          this.newRequestFormData.category=catData
          this.api.apiMethodFetchDataByGET('api/LookUPMaster/getLookupSubItems?subCategoryId=' + this.item.id).then(data => {           
            this.subCategoryList = <dropDowns[]>data.resultOP;
            for(let i=0;i<this.subCategoryList.length;i++){
              this.subCategoryItem.id=subCategoryId
              if(this.subCategoryList[i].id==this.subCategoryItem.id){
                this.subCategoryItem.key=this.subCategoryList[i].key;
                let Data=[];
                Data.push(this.subCategoryItem)
                this.newRequestFormData.subCategory=Data
              }
            }
           });
        }
      }

        
        this.protocolList = <dropDowns[]>result.resultOP.Protocol;
     } else {
      swal(
        'Error!',
        result.description,
        'error'
      )
    }
  });
}


onEditBusinessOwner(businessOwnerId){
  this.api.apiMethodFetchDataByGET('api/UserMaster/LoadAllUserDatas').then(async result => {
    if (result.status) {
      this.userList2 = <angular2userdropdown[]>result.resultOP;
      for(let i=0;i<this.userList2.length;i++){
        this.businessOwnerItem.id=businessOwnerId
        if(this.userList2[i].id==this.businessOwnerItem.id){
          this.businessOwnerItem.firstName=this.userList2[i].firstName;
          let Data=[];
          Data.push(this.businessOwnerItem)
          this.newRequestFormData.businessOwner=Data;
        }
      }
    } 
  });
}


onEditItOwner(itOwnerId){
  this.api.apiMethodFetchDataByGET('api/UserMaster/LoadAllUserDatas').then(async result => {
    if (result.status) {
      this.userList1 = <angular2userdropdown[]>result.resultOP;
      for(let i=0;i<this.userList1.length;i++){
        this.itOwnerItem.id=itOwnerId
        if(this.userList1[i].id==this.itOwnerItem.id){
          this.itOwnerItem.firstName=this.userList1[i].firstName;
          let Data=[];
          Data.push(this.itOwnerItem)
          this.newRequestFormData.itOwner=Data;
        }
      }
    } 
  });
}

onEditFirewall(firewallId){
  this.api.apiMethodFetchDataByGET("api/RequestFormUser/LoadDropDowns").then(result => {
    if (result.status) {
      this.firewallRegionList = <dropDowns[]>result.resultOP.FirewallRegion;
      for(let i=0;i<this.firewallRegionList.length-1;i++){
        this.firewallItem.id=firewallId
        if(this.firewallRegionList[i].id==this.firewallItem.id){
          this.firewallItem.key=this.firewallRegionList[i].key;
          let Data=[];
          Data.push(this.firewallItem)
          this.newRequestFormData.firewall=Data;
        }
      }
     }      
  }); 
}


onEditNormal(normalId){
  this.api.apiMethodFetchDataByGET("api/RequestFormUser/LoadDropDowns").then(result => {
    if (result.status) {
      this.Normalexpecticated = <dropDowns[]>result.resultOP.NormalExpedited
      for(let i=0;i<this.Normalexpecticated.length;i++){
        this.nomrmalorexpeditedItem.id=normalId
        if(this.Normalexpecticated[i].id==this.nomrmalorexpeditedItem.id){
          this.nomrmalorexpeditedItem.key=this.Normalexpecticated[i].key;
          let Data=[];
          Data.push(this.nomrmalorexpeditedItem)
          this.newRequestFormData.nomrmalorexpedited=Data;
        }
      }
     }      
  }); 
}

onLoadDropDowns() { 
  this.api.apiMethodFetchDataByGET("api/RequestFormUser/LoadDropDowns").then(result => {
    if (result.status) {
      this.categoryList = <dropDowns[]>result.resultOP.CategoryDetails;
      this.firewallRegionList = <dropDowns[]>result.resultOP.FirewallRegion;
      this.Normalexpecticated = <dropDowns[]>result.resultOP.NormalExpedited;
      this.VPCAccount = <dropDowns[]>result.resultOP.VPCAccount;
      this.protocolList = <dropDowns[]>result.resultOP.Protocol;
     } else {
      swal(
        'Error!',
        result.description,
        'error'
      )
    }
  });
}


onCategoryChange(event: any) {
  let id = this.newRequestFormData.category[0].id
  this.newRequestFormData.CategoryId = this.newRequestFormData.category[0].id
  this.subCategoryList = [];

  this.api.apiMethodFetchDataByGET('api/LookUPMaster/getLookupSubItems?subCategoryId=' + id).then(data => {
    this.subCategoryList = <dropDowns[]>data.resultOP;
  });
 }

 onSubCategoryChange(event: any) {
  let id = this.newRequestFormData.subCategory[0].id
  this.newRequestFormData.SubcategoryId = id;   
 }
 onFirewallRegionChange(event: any) {
  let id =  this.newRequestFormData.firewall[0].id
  this.newRequestFormData.FirewallRegion = id;   
 }
 onNormalexpecticatedChange(event: any) {
  let id =  this.newRequestFormData.nomrmalorexpedited[0].id
  this.newRequestFormData.NormalExpedited = id;   
 }

handleReaderLoaded(e) {
  this.fileBase64 = (btoa(e.target.result));
  this.viewPdf(this.fileBase64, this.fileNameforExc);
}

viewPdf(fileContent: any, fileName: string)
{
  let jsonObj = {status: true, filecontentSource: fileContent, fileName: fileName}
  const modalRef = this.modalService.open(ViewfilesComponent, {size: 'xl', scrollable: true });
  modalRef.componentInstance.details = jsonObj;
}
 

onBusinessOwnersSelect(event){
  let id = this.newRequestFormData.businessOwner[0].id
  this.newRequestFormData.BusinessOwnersId = id;   
}

onResponsiblePartySelect(event){
  let id = this.newRequestFormData.itOwner[0].id
  this.newRequestFormData.ItownersId = id;   
}


saveAndGo() {
  this.spinnerService.show();
  setTimeout(() => {
  }, 5000);
  this.requestValidation=true
 if(this.editRequestId==undefined){
  if(this.newRequestFormData.NameOfProject==null || this.newRequestFormData.CategoryId==undefined ||
    this.newRequestFormData.SubcategoryId==undefined||this.newRequestFormData.BusinessJustification==undefined ||
    this.newRequestFormData.BusinessImpact==undefined ||this.newRequestFormData.Description==undefined||
    this.newRequestFormData.firewall==undefined ||this.newRequestFormData.nomrmalorexpedited==undefined ||
    this.newRequestFormData.businessOwner==undefined ||this.newRequestFormData.itOwner==undefined ||
    this.fileList.length==0 || this.newRequestFormData.businessOwner.length==0||this.newRequestFormData.itOwner.length==0 ){
      this.requestValidation=false
  } 

  for(let i=0;i<this.securitypolicygrid.length;i++){
    if(this.securitypolicygrid[i].Sourcevpcaccount.length==0||this.securitypolicygrid[i].Destinationvpcaccount.length==0
      ||this.securitypolicygrid[i].Sourceipaddress==''|| this.securitypolicygrid[i].Destination==''||
      this.securitypolicygrid[i].Portservice=='' || this.securitypolicygrid[i].protocal.length==0){
        this.requestValidation=false
      }
  }

  for(let i=0;i<this.securitypolicygrid.length;i++){
    if(this.securitypolicygrid[i].Sourcevpcaccount==undefined||this.securitypolicygrid[i].Destinationvpcaccount==undefined
      ||this.securitypolicygrid[i].Sourceipaddress==undefined|| this.securitypolicygrid[i].Destination==undefined||
      this.securitypolicygrid[i].Portservice==undefined || this.securitypolicygrid[i].protocal==undefined){
        this.requestValidation=false
      }
  }
  this.spinnerService.hide();
 }

  if(this.editRequestId!=undefined){
    if(this.newRequestFormData.NameOfProject==undefined ||this.newRequestFormData.BusinessJustification==undefined ||
      this.newRequestFormData.BusinessImpact==undefined ||this.newRequestFormData.Description==undefined||
      this.newRequestFormData.firewall==undefined ||this.newRequestFormData.nomrmalorexpedited==undefined ||
      this.newRequestFormData.businessOwner.length==0||this.newRequestFormData.itOwner.length==0 ||
      this.fileList.length==0){
      this.requestValidation=false
    } 

    
  for(let i=0;i<this.securitypolicygrid.length;i++){
    if(this.securitypolicygrid[i].Sourcevpcaccount.length==0||this.securitypolicygrid[i].Destinationvpcaccount.length==0
      ||this.securitypolicygrid[i].Sourceipaddress==''|| this.securitypolicygrid[i].Destination==''||
      this.securitypolicygrid[i].Portservice=='' || this.securitypolicygrid[i].protocal.length==0){
        this.requestValidation=false
      }
  }
this.spinnerService.hide();
  }
        if(this.editRequestId==undefined){
          setTimeout(()=>{
            if(this.requestValidation){
              this.spinnerService.show();
              this.requestValidation=true
              this.newRequestFormData.SecurityPolicy  = JSON.stringify(this.securitypolicygrid);   
              this.newRequestFormData.UserId = this.loginUserid;
              const formData = new FormData();
              formData.append('NewRequestData', JSON.stringify(this.newRequestFormData));
            
                let MultifilesStatic = this.fileList;
                MultifilesStatic.forEach(element => {
                  let fileToUpload = <File>element;
                  formData.append('StaticAttachments', fileToUpload, fileToUpload.name);
                });
                formData.append('StaticAttachmentsTable', JSON.stringify(this.fileList));
                if(this.requestValidation){
                  if(!this.nextFlag){
                    this.spinnerService.show();
                  this.api.sendFormData('api/RequestFormUser/InsertRequest', formData).subscribe(result => {
                    if (result.status) {
                      this.spinnerService.hide()
                      let stringToSplit = result.description;
                      let stringToSplit1 = result.description;
                      let x1 = stringToSplit.split(":");
                      this.requestSno=x1[1];
                      this.userstepper.loadrequestSno()
                      this.userstepper.requestSno=x1[1]
                      let x = stringToSplit.split("*");
                      this.requestPrimaryId=x[0];
                      this.requestSno3=x1[1]
                      localStorage.setItem("primaryRequestId",this.requestPrimaryId );
                      localStorage.setItem("requestSno",this.requestSno );
                      this.nextFlag=true

                      swal({
                        title: "Saved!",
                        text: x[1],
                        type: "success",
                        timer: 2000
                        }).then
                        ((result) => {
                          this.RequestDTO.id=  this.requestPrimaryId;
                          this.RequestDTO.key="2";
                          this.RequestDTO.categoryId=0;
                          let categoryLst
                           this.api.apiMethodFetchDataByPOST("api/RequestMethods/getRequestITInfo",this.RequestDTO).then(async result => {
                             if (result.status) {
                               categoryLst = result.resultOP;
                               for(let i=0;i<this.categoryLst.length;i++){
                                for(let j=0;j<this.categoryLst[i].questions.length;j++){
                                  this.categoryLst[i].questions[j].yesNo="Yes"
                                }
                              }

                               for(let i=0;i<this.categoryLst.length;i++){
                                for(let j=0;j<this.categoryLst[i].questions.length;j++){
                                  this.categoryLst[i].questions[j].yesNo="Yes"
                                }
                              }
                              }
                            })
                            
                            setTimeout(() => {
                              this.model.requestId=Number(this.requestPrimaryId);
                              this.model.QuestionJSON=(JSON.stringify(categoryLst));
                              this.model.status="nonaudit"
                              this.spinnerService.hide();
                              this.api.apiMethodFetchDataByPOST("api/RequestFormUser/InsertRequestRiskandRank", this.model).then(result => {
                              });
                            }, 2000);
                        })
                    } else {
                      swal(
                        'Error!',
                        result.description,
                        'error'
                      )
                    }
                  });
                  }else{ 
                  this.spinnerService.show();
                  this.newRequestFormData.Requestid=Number(localStorage.getItem("primaryRequestId"))
                  this.newRequestFormData.SecurityPolicy  = JSON.stringify(this.securitypolicygrid);   
                  this.newRequestFormData.UserId = this.loginUserid;
                 
                if(this.newRequestFormData.CategoryId==undefined){
                  this.newRequestFormData.CategoryId=this.categoryId
                }
                
                if(this.newRequestFormData.SubcategoryId==undefined){
                  this.newRequestFormData.SubcategoryId=this.subCategoryId
                }
                
                if(this.newRequestFormData.FirewallRegion==undefined){
                  this.newRequestFormData.FirewallRegion=this.firewallId
                }
                
                if(this.newRequestFormData.NormalExpedited==undefined){
                  this.newRequestFormData.NormalExpedited=this.normalorExpeditedId
                }
                
                
                    const formData = new FormData();
                    formData.append('NewRequestData', JSON.stringify(this.newRequestFormData));
                
                    let MultifilesStatic = this.fileList;
                    MultifilesStatic.forEach(element => {
                      let fileToUpload = <File>element;
                      if (fileToUpload.size!=null)
                      {
                        formData.append('StaticAttachments', fileToUpload, fileToUpload.name);
                        formData.append('StaticAttachments', fileToUpload, fileToUpload.name);
                      }
                    });
                    formData.append('StaticAttachmentsTable', JSON.stringify(this.fileList));
            
                  this.api.sendFormData('api/RequestFormUser/InsertRequest', formData).subscribe(result => { 
                    if (result.status) {
                      this.spinnerService.hide();

                  //this.nextFlag=true
                      swal({
                        title: "Updated!",
                        text:  localStorage.getItem("requestSno")+" Request Updated Successfully ",
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
                  })

                  }
                }
            } 
          },2000)           
        }else{
          this.spinnerService.show();
          setTimeout(()=>{
            if(this.requestValidation){
              this.newRequestFormData.SecurityPolicy  = JSON.stringify(this.securitypolicygrid);   
              this.newRequestFormData.UserId = this.loginUserid;
              this.newRequestFormData.Requestid=this.editRequestId

            if(this.newRequestFormData.CategoryId==undefined){
              this.newRequestFormData.CategoryId=this.categoryId
            }
            
            if(this.newRequestFormData.SubcategoryId==undefined){
              this.newRequestFormData.SubcategoryId=this.subCategoryId
            }
            
            if(this.newRequestFormData.FirewallRegion==undefined){
              this.newRequestFormData.FirewallRegion=this.firewallId
            }
            
            if(this.newRequestFormData.NormalExpedited==undefined){
              this.newRequestFormData.NormalExpedited=this.normalorExpeditedId
            }
            
            
                const formData = new FormData();
                formData.append('NewRequestData', JSON.stringify(this.newRequestFormData));
            
                let MultifilesStatic = this.fileList;
                MultifilesStatic.forEach(element => {
                  let fileToUpload = <File>element;
                  if (fileToUpload.size!=null)
                  {
                    formData.append('StaticAttachments', fileToUpload, fileToUpload.name);
                    formData.append('StaticAttachments', fileToUpload, fileToUpload.name);
                  }
                });
                formData.append('StaticAttachmentsTable', JSON.stringify(this.fileList));
        
              this.api.sendFormData('api/RequestFormUser/InsertRequest', formData).subscribe(result => { 
                if (result.status) {
                  this.spinnerService.hide();
                  let stringToSplit = result.description;
                  let x = stringToSplit.split("*");
                  this.requestPrimaryId=x[0];
                  localStorage.setItem("primaryRequestId",this.requestids);
                  localStorage.setItem("requestSno",this.requestSno1 );
              //this.nextFlag=true
                  swal({
                    title: "Updated!",
                    text:  this.requestSno1+" Request Updated Successfully ",
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
              })
            }
          },2000)
     }

   

}


onEditload(requestId) {
  this.loadUserDetails();
  this.reqeditList=[];
  this.spinnerService.show();
   this.api.apiMethodFetchDataByGET('api/RequestFormUser/EditRequestLoadonId?reqid=' + requestId).then(data => {
    this.isFirst=true
     this.isSecond=true;
    let list=JSON.parse(data.resultOP.attachment)
    this.fileList=list.StaticTB   
    this.spinnerService.show()
    setTimeout( () => { 
      this.requestSno1=data.resultOP.requestSno;
      this.requestids=data.resultOP.id
      this.newRequestFormData.category=this.onEditCategoryDropDowns(data.resultOP.categoryId,data.resultOP.subCategoryId)
      this.newRequestFormData.firewall=this.onEditFirewall(data.resultOP.firewallRegion);
      this.newRequestFormData.nomrmalorexpedited=this.onEditNormal(data.resultOP.normalExpedited);
      this.newRequestFormData.businessOwner=JSON.parse(data.resultOP.businessOwner)
      this.newRequestFormData.itOwner=JSON.parse(data.resultOP.itOwner)
      this.securitypolicygrid=JSON.parse(data.resultOP.securityPolicy)
     }, 2000 );
    this.newRequestFormData.BusinessJustification=data.resultOP.businessJustification
    this.newRequestFormData.ManagedServices=data.resultOP.managedServices
    this.newRequestFormData.NameOfProject=data.resultOP.nameOfProject
    this.newRequestFormData.Description=data.resultOP.description
    this.newRequestFormData.BusinessImpact=data.resultOP.businessImpact
    this.newRequestFormData.ispeerreview=data.resultOP.status=="Peer Review"?'yes':'no'
    this.categoryId=data.resultOP.categoryId
    this.subCategoryId=data.resultOP.subCategoryId
    this.firewallId=data.resultOP.firewallRegion
    this.normalorExpeditedId=data.resultOP.normalExpedited;
    this.spinnerService.hide();
   });
  }

  save(){
    console.log('firewall')
  }

  onFileDownload(totlist:any){
  let filepath = totlist.filepath;
 this.api.apiMethodFetchDataByGET('api/RequestFormUser/FetchFile?path=' + filepath).then(async result => {

  if (result.status) {
    this.downloadFileSave(result.resultOP);
    // let pdfSrc = this.viewPdfComponent.convertBase64DataToBinary(result.resultOP);
    // const file = new File([pdfSrc], data.FileName, { type: 'application/pdf' });
    // FileSaver.saveAs(file);
  } else {
    swal(
      'could not fetch the file.',
      result.description,
      'error'
    )
  }
});
}

downloadFileSave(data: any) {
  let fileName = this.fileNameforExc;
  let contentType = this.viewPdfComponent.getContentType(fileName.split('?')[0].split('.').pop());
  let pdfSrc = this.viewPdfComponent.convertBase64DataToBinary(data);
  const file = new File([pdfSrc], fileName, { type: contentType });
  FileSaver.saveAs(file);
}
}

