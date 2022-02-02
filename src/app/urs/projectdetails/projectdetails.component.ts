import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewfilesComponent } from 'src/app/pages/content-pages/viewfiles/viewfiles.component';
import { ApisProvider } from 'src/app/utility/api';
import { dropDowns } from 'src/app/utility/model';
import {projectdetails} from 'src/app/utility/uasModels';

@Component({
  selector: 'app-projectdetails',
  templateUrl: './projectdetails.component.html',
  styleUrls: ['./projectdetails.component.scss'],
  providers :[DatePipe,ViewfilesComponent]
})
export class ProjectdetailsComponent implements OnInit {

  fileList: any[] = new Array();
  deleteFileList: any[] = new Array();
  isCheckListEntered: boolean;
  securitypolicygrid =[]
  
  singleFileUploadFlag: Boolean = false; 
  public fileUploadspinnerFlag = false;
  public newFileLength:number=0;

   //file 
   fileNameforExc: string;
   fileBase64: any;
   
   //attachments
   staticAttachment: any[] = [];
   staticAttachmentTable: Array<any> = [];
   documentNumberList: Array<dropDowns> = [];
   selectedDocNum: any = [];

  constructor( private api: ApisProvider, private router: Router,public datepipe: DatePipe, private modalService: NgbModal,private viewPdfComponent: ViewfilesComponent) { }
  docNumdropdownSettings:any={
    singleSelection: true,
    idField: 'id',
    textField: 'documentNumber',
    itemsShowLimit: 6,
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };
  ngOnInit() {
    
    this.addChecklistItem();
    this.documentNumberList  = [ { id: 1 , key: 'Open'},
    { key: 'CLosed', id: 2 },
    { key: 'In-Progress', id: 3 }]
  }

  
      addChecklistItem() {
        //https://stackoverflow.com/questions/48986419/how-to-show-the-dynamic-table-with-dropdown-in-angular-and-how-to-push-each-row
        this.isCheckListEntered = false;
          ;
        this.securitypolicygrid.forEach(checkList => {
          
        //  if (this.api.isEmpty(checkList.Completed) || this.api.isEmpty(checkList.ResponsibleParty) || this.api.isEmpty(checkList.Condition))
        //     this.isCheckListEntered = true;
         });
        ;
        //if (!this.isCheckListEntered) {
           let data = new projectdetails();
           data.id=0;
           data.Completed='';
           data.Condition='';
             data.ResponsibleParty='';
           this.securitypolicygrid.push(data);
       // }
          setTimeout(() => {
            $('#check_list_name_id_' + (this.securitypolicygrid.length - 1)).focus();
          }, 600);
       }
       
       
deleteSecurityTable(value:any,i:number){
  const index: number = this.securitypolicygrid.indexOf(value);
  this.securitypolicygrid.splice(index, 1);

}

onFileChange(event,single?:boolean) {
  ;
  this.fileUploadspinnerFlag = true;
  this.newFileLength=event.target.files.length
  if (event.target.files.length != 0) {
    for (let index = 0; index < event.target.files.length; index++) {
 
      const date = Date.now();
      
      event.target.files[index].displayDate  =this.datepipe.transform(date, 'dd-MM-yyyy');
    
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
        
    }
  }else{
    this.fileUploadspinnerFlag = false;
  }
}


// view File
 
viewFile(data: any, fileIndex, type: string){
  ;
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

deleteUploadedFileForDoc(value:any,i:number){

  const index: number = this.fileList.indexOf(value);
      this.fileList.splice(index, 1);
  
    }


}
