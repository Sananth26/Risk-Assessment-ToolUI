import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm, Validators, FormControl, FormBuilder, FormGroupDirective } from '@angular/forms';
import { ApisProvider } from 'src/app/utility/api';
import { ActivatedRoute, Router } from '@angular/router';
import * as alertFunctions from '../../../shared/data/sweet-alerts';
import swal from 'sweetalert2';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TrainingFormDataDTO, trainingData, dropDowns, AttachmentTable, trainingDataView } from 'src/app/utility/TrainingDetailsModel';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewfilesComponent } from '../viewfiles/viewfiles.component';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-trainingrecords',
  templateUrl: './trainingrecords.component.html',
  styleUrls: ['./trainingrecords.component.scss'],
  providers: [ViewfilesComponent]
})
export class TrainingrecordsComponent implements OnInit {

  TrainingForms: FormGroup;
  TRViewForm : FormGroup;
  rows = [];
  fields: FormBuilder[] = new Array<FormBuilder>();
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  displayedColumns: string[];
  dataSource: any;
  data: any;
  products: any;
  myDates: string;
  formDataView: any;
  fetchedData: any;
  resultBase64 :any;
  uploadPdfFile: any[] = [];
  FileImported: File = null;
  columnToDisplayFiles: any[] = [];
  columnToDisplaySuccessPdf: any[] = [];
  imageBase64 : any;
  csvFileType: string = 'Data';
  filecontentSource : any;
  filecontent : any;
  selectedDepartment: Array<any> = [];
  selectedStatus: Array<any> = [];
  selectedFaculty: Array<any> = [];
  selectedDocumentNumber: Array<any> = [];
  sopName:any;
  deptName :any;
  Id :any;
  documentNumberViewList : Array<dropDowns> = [];
  departmentViewList: Array<dropDowns> = [];

  documentNumberList: Array<dropDowns> = [];
  departmentList: Array<dropDowns> = [];
  statusList: Array<dropDowns> = [];
  facultyList: Array<dropDowns> = [];

  docReadOnlyFlag: boolean = false;
  //attachments
  staticAttachment: any[] = [];
  staticAttachmentTable: Array<any> = [];
  
 
  //file 
  fileNameforExc: string;
  fileBase64: any;


  FacultydropdownSettings : any = {
    singleSelection: false,
    idField: 'id',
    textField: 'key',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 6,
    allowSearchFilter: true
  };
  docNumberdropdownSettings : any = {
    singleSelection: true,
    idField: 'id',
    textField: 'key',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 6,
    allowSearchFilter: true
  };
  
  StatusdropdownSettings : any = {
    singleSelection: true,
    idField: 'id',
    textField: 'key',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 6,
    allowSearchFilter: true
  };
 
   //trainigRecord: TrainigRecord = new TrainigRecord();
   tdFormData: TrainingFormDataDTO= new TrainingFormDataDTO();
 
   trainigRecord : trainingData = new trainingData();
   trainigRecordView : trainingDataView = new trainingDataView();

 
  constructor(private router: Router,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute
    , private _formBuilder: FormBuilder,
    private ApiApisProvider: ApisProvider, private api: ApisProvider,private modalService: NgbModal, private viewPdfComponent: ViewfilesComponent) { } 

  ngOnInit() {

    this.TrainingForms = new FormGroup({
      'DocumentNumber': new FormControl(null, [Validators.required]),
      'Title': new FormControl(),
      'Trainingdate':new FormControl(),
      'Time':new FormControl(),
      'Faculty': new FormControl({ value: "" }, [  Validators.required]),
      'Location': new FormControl(),
      'ParticipantName':new FormControl(),
      'Remarks':new FormControl(),
      'DepartmentName': new FormControl(null, [Validators.required]),
 
 
  }, {updateOn: 'blur'});
  this.TRViewForm = new FormGroup({
    'DocumentNumberView': new FormControl(null, [Validators.required]),      
   'DepartmentNameView': new FormControl(null, [Validators.required]),
 }, { updateOn: 'blur' });

  this.TrainingForms.reset();
//  this.loadTrainingRecord();
  this.loadDropDowns();

  } 
  
  typeSuccess() {
    alertFunctions.typeSuccess();
  }

  loadDropDowns(){

    this.api.apiMethodFetchDataByGET("api/SOPForm/LoadDropDowns").then(result => {
      if (result.status) {
           this.departmentList =  <dropDowns[]> result.resultOP.departmentDetails;
          this.statusList =  <dropDowns[]> result.resultOP.statusDetails;
          this.facultyList =  <dropDowns[]> result.resultOP.facultyDetails;
          this.departmentViewList =  <dropDowns[]> result.resultOP.departmentDetails;

          
      } else {
        swal(
          'Error!',
          result.description,
          'error'
        )
      }
    });

  }
  
  saveAndGo( ) {
    ;
    //if (this.TrainingForms.status == "VALID") {
      
      this.tdFormData = <TrainingFormDataDTO> this.TrainingForms.getRawValue();

      let trJsonField1: TrainingFormDataDTO = {
        Title  : this.tdFormData.Title, 
        Trainingdate : this.tdFormData.Trainingdate,
        Time : this.tdFormData.Time,
        Location : this.tdFormData.Location,
        Remarks : this.tdFormData.Remarks,
 
      }
      ;

      // this.trainigRecord.Id = parseInt(this.Id);
       if(this.Id != null){
        this.trainigRecord.Id =parseInt(this.Id);
       }
       this.trainigRecord.TrainingFormData = JSON.stringify(trJsonField1);
       this.trainigRecord.ParticipantName  = this.TrainingForms.get('ParticipantName').value; 
       this.trainigRecord.deptid = parseInt(this.TrainingForms.get('DepartmentName').value);
       this.trainigRecord.SopId = parseInt(this.TrainingForms.get('DocumentNumber').value);
       this.trainigRecord.facultyId =JSON.stringify(this.selectedFaculty); 
       const formData = new FormData();
      formData.append('TrainigRecordFormDTO', JSON.stringify(this.trainigRecord));
  
      let MultifilesStatic = this.staticAttachment;
      MultifilesStatic.forEach(element => {
        let fileToUpload = <File>element;
        formData.append('StaticAttachments', fileToUpload, fileToUpload.name); 
      }); 
      
  
      formData.append('StaticAttachmentsTable', JSON.stringify(this.staticAttachmentTable));
       this.api.sendFormData('api/SOPForm/CreateTraining', formData).subscribe(async result => {
        if (result.status) {
          swal("Saved Successfully!", "success").then
            ((result) => {
              this.cancel();
              //this.loadTrainingRecord();
            })
        } else {
          swal(
            'Error!',
            result.description,
            'error'
          )
          this.cancel();
          //this.loadTrainingRecord();
        }
      });
     
  }
   
  onFileUploadStatic1(event: any){

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
  cancel() {
     this.TrainingForms.reset();
     this.facultyList =[];
     this.staticAttachmentTable =[];
     this.selectedFaculty =[];
     this.docReadOnlyFlag = false;
    this.TRViewForm.reset();
    this.displayedColumns = [];
     this.fields = [];
   }

   deleteTrainingRecord(element) {

    swal({
      title: 'Are you sure?',
      text: 'Delete  Trainig Record',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
       if (result.value) {
         this.api.apiMethodFetchDataByGET('api/trainigrecords/TRDeleteData?id=' + element ).then(async result => {
        
          if (result.success == true) {
            swal(
              'Deleted!',
              'Your Data has been Deleted.',
              'success'
            ).then((result) => {
             // this.loadTrainingRecord();
            })
          } else {
            swal(
              'Deleted!',
              'Your Data has not been Deleted.',
              'success'
            )
          }
        });
      } else if (result.dismiss === swal.DismissReason.cancel) {
        swal(
          'Cancelled',
          'Company not Deleted :)',
          'error'
        )
      }
    })
  }
  

  editTrainingRecord(element,event) {
    if (event) {
      this.docReadOnlyFlag = true;
    }
    
    console.log(this.docReadOnlyFlag)
    this.api.apiMethodFetchDataByGET('api/trainigrecords/TREditData?id=' + element).then(data => {
      
       let parseData = data["resultOP"]; 
        
       let parse = JSON.parse(parseData.trainingFormData)
       this.Id =parseData.id; 
       this.trainigRecord.Id = parseData.id;

        this.onDepartmentNameChange(parseData.department);
        this.ondocumentNumberChange(parseData.sop_id);
        
       this.selectedFaculty =JSON.parse(parseData.faculty) ;
 
       this.TrainingForms.controls['Title'].setValue(parse.Title);
       this.TrainingForms.controls['Trainingdate'].setValue(parse.Trainingdate);
       this.TrainingForms.controls['Time'].setValue(parse.Time);
       this.TrainingForms.controls['Location'].setValue(parse.Location);
       this.TrainingForms.controls['ParticipantName'].setValue(parseData.participantName);
       this.TrainingForms.controls['Remarks'].setValue(parse.Remarks);
       this.TrainingForms.controls['DepartmentName'].setValue(parseData.department);
       this.TrainingForms.controls['DocumentNumber'].setValue(parseData.sop_id);
       ;
       if (parseData.attachment != null && parseData.attachment != undefined) {
        var attachmentTableDetails =JSON.parse(parseData.attachment);
        this.staticAttachmentTable = <AttachmentTable[]>attachmentTableDetails.StaticTB;
       }

    });
  }

  loadTRRecord() {
    ;
    this.trainigRecordView.SopIdView = this.TRViewForm.get('DocumentNumberView').value; 
    this.trainigRecordView.deptidView = this.TRViewForm.get('DepartmentNameView').value; 

     this.displayedColumns = [];
     this.fields = [];

    this.api.apiMethodFetchDataByPOST("api/trainigrecords/LoadTrainigRecord",this.trainigRecordView).then(data => {
 
      this.fields = [];
      this.products = data["resultOP"];
       this.products.forEach(element => {
        let parseData = JSON.parse(element.trainingFormData);
        this.formDataView = {
          "id": element.id,
          "sop_id" : element.sop_id,
          "Time": parseData.Time,
          "Title": parseData.Title,
          "Faculty" : parseData.Faculty,
          "Location" : parseData.Location,
          "Remarks": parseData.Remarks,
          "Trainingdate" : parseData.Trainingdate,
          "DepartmentName" : element.deptName,
           "ParticipantName": element.participantName, 
          "Action": ""
        }
        this.fields.push(this.formDataView);
      })

    });
  }

  onDepartmentNameChange(id:any){
    this.documentNumberList =[];
    this.tdFormData.Title ="";
     this.api.apiMethodFetchDataByGET('api/trainigrecords/DocumnetLoad?id=' + id).then(data => {       
        this.documentNumberList =  <dropDowns[]> data.resultOP;
    });
  }
  
  
  ondocumentNumberChange(id:any){
     this.api.apiMethodFetchDataByGET('api/trainigrecords/getTitile?id=' + id).then(data => {       
       this.tdFormData.Title = data.resultOP.title;
 
    });
  }
  onDepartmentNameChangeView(id:any){
    this.documentNumberViewList =[];
          this.api.apiMethodFetchDataByGET('api/trainigrecords/DocumnetLoad?id=' + id).then(data => {       
        this.documentNumberViewList =  <dropDowns[]> data.resultOP;
 
    });
  }
  ondocumentNumberChangeView(id:any){
  }

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

  deleteStaticUploadedFile(data: any, fileIndex)
  {
    this.staticAttachmentTable.splice(fileIndex,1);
 
   var elementExists = this.staticAttachment.find(x => x.name == data.FileName); //  .splice(fileIndex,1);
    if (elementExists)
    elementExists.remove();

  }

   
  downloadFile(data: any, fileIndex, type: string){
    
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
        reader.onload = this.handleReaderLoadedDownload.bind(this);
        reader.readAsBinaryString(files);
      }
      
    }else{
      this.api.apiMethodFetchDataByGET('api/SOPForm/FetchFile?path=' + data.FilePath).then(async result => {
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
    }else{
      this.api.apiMethodFetchDataByGET('api/SOPForm/FetchFile?path=' + data.FilePath).then(async result => {
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

  handleReaderLoaded(e) {
    this.fileBase64 = (btoa(e.target.result));
    this.viewPdf(this.fileBase64, this.fileNameforExc);
  }

  handleReaderLoadedDownload(e) {
    this.fileBase64 = (btoa(e.target.result));
    this.downloadFileSave(this.fileBase64);
  }
  
  viewPdf(fileContent: any, fileName: string)
  {
    let jsonObj = {status: true, filecontentSource: fileContent, fileName: fileName}
    const modalRef = this.modalService.open(ViewfilesComponent, {size: 'xl'});
    modalRef.componentInstance.details = jsonObj;
  }

  downloadFileSave(data:any){
    let fileName = this.fileNameforExc;
    let contentType = this.viewPdfComponent.getContentType(fileName.split('?')[0].split('.').pop());
    let pdfSrc = this.viewPdfComponent.convertBase64DataToBinary(data);
    const file = new File([pdfSrc], fileName, { type:contentType});
   FileSaver.saveAs(file);
  } 

}
