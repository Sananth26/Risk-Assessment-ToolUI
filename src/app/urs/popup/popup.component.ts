import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ApisProvider } from 'src/app/utility/api';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { FormGroup, FormControl } from '@angular/forms';
import { popUpData, flowRequestBulk, newRequestAPI, deleteRequestAPI } from 'src/app/utility/NewRequestModel';
import { dropDowns, AttachmentTable } from 'src/app/utility/TrainingDetailsModel';
 

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  @Input() details;
  @ViewChild('myTable', {static: true}) table: any;

  popUpRequest: FormGroup;

   popUpRequestData :popUpData = new popUpData();
 
  newRequestApiData : newRequestAPI = new newRequestAPI();
  deleteRequestApi : deleteRequestAPI = new deleteRequestAPI();
  loginUserid : any;

  fields =[];
  displayFields = [];
   data = [
    { id:1,key: 'Accepted', value: 'accepted' },
    { id:2,key: 'Rejected', value: 'rejected' },
  ];
   

  //attachments
  staticAttachment: any[] = [];
  staticAttachmentTable: Array<any> = [];

  
  //file 
  fileNameforExc: string;
  fileBase64: any;
   
   

  constructor(private api: ApisProvider, public activeModal: NgbActiveModal, private sanitizer: DomSanitizer,
    ) { }

  ngOnInit() {

    this.popUpRequest = new FormGroup({
       
       'Remark':new FormControl(), 
  });

  var loginUseridEncode =localStorage.getItem('userId');  ;
  this.loginUserid =this.api.decode(loginUseridEncode)

    this.loadMyRequest();
  }

   
  onActivate(event) { }

  loadMyRequest(){
    this.api.apiMethodFetchDataByGET("api/NewRequest/getRequestDataForDelete?ReqId=" + this.newRequestApiData.id).then(result => {
      if (result.status) {
       this.fields  = result.resultOP;
       this.displayFields = result.resultOP;   
      } else {
        swal(
          'Error!',
          result.description,
          'error'
        )
      }
    });
    
  }

  saveAndGo(){
    
    if (this.newRequestApiData.Remarks == "" ||this.newRequestApiData.Remarks == undefined ) {
      swal({
        title: 'No Data!',
        text: 'Remark is Required. Please Enter the Data',
        type: 'info',
        customClass: 'swal-wide'
      })
      return;
    } 
    
   this.deleteRequestApi.Remarks = this.newRequestApiData.Remarks;
  this.deleteRequestApi.requestDetailsId = this.newRequestApiData.id;
  this.deleteRequestApi.UserId = this.loginUserid;
 
    const formData = new FormData();
   formData.append('DeleteDetails', JSON.stringify(this.deleteRequestApi));

   let MultifilesStatic = this.staticAttachment;
   MultifilesStatic.forEach(element => {
     let fileToUpload = <File>element;
     formData.append('StaticAttachments', fileToUpload, fileToUpload.name); 
   }); 
   

   formData.append('StaticAttachmentsTable', JSON.stringify(this.staticAttachmentTable));
    this.api.sendFormData('api/NewRequest/DeleteData', formData).subscribe(async result => {
     if (result.status) {
      swal("Saved Successfully!", "success").then
        ((result) => {
          this.activeModal.close('success');
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
 
clear(){
  this.activeModal.close();

}

// For Upload 

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
 

 
 
  }

