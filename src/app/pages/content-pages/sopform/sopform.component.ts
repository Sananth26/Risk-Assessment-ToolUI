import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormBuilderCreateor } from 'src/app/formbuilder/form-builder';
import I18N from 'src/app/formbuilder/mi18n';
import { defaultOptions, config, defaultI18n } from '../../../formbuilder/config';
import swal from 'sweetalert2';
import { SOPFormData } from 'src/app/utility/model';
import * as alertFunctions from '../../../shared/data/sweet-alerts';
import { ApisProvider } from 'src/app/utility/api';
import { SOPFormJson, SOPFormDetails, SopDynamicFormData, dropDowns, AttachmentTable, trainingDataView } from 'src/app/utility/TrainingDetailsModel';
import { TemplateNameDTO, TemplateForSop, TableForTemplate } from 'src/app/utility/sopmodels';
import { debug } from 'util';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as FileSaver from 'file-saver';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewfilesComponent } from '../viewfiles/viewfiles.component';

function initJq() {
  (function ($) {
    (<any>$.fn).formBuilder = function (options) {
      defaultOptions.defaultFields = [];
      defaultOptions.fields = []
      if (options) {
        defaultOptions.defaultFields = options;
      } else {
        defaultOptions.defaultFields = [];
      }
      let elems = this;
      let { i18n, ...opts } = $.extend({}, defaultOptions, options, true);
      (<any>config).opts = 'opts';
      let i18nOpts = $.extend({}, defaultI18n, i18n, true);
      let instance = {
        actions: {
          getData: null,
          setData: null,
          save: null,
          showData: null,
          setLang: null,
          addField: null,
          removeField: null,
          clearFields: null
        },
        get formData() {
          return instance.actions.getData('json');
        },
        promise: new Promise(function (resolve, reject) {
          new I18N().init(i18nOpts).then(() => {
            elems.each(i => {
              let formBuilder = new FormBuilderCreateor().getFormBuilder(opts, elems[i]);
              elems.prevObject = {};
              $(elems[i]).data('formBuilder', formBuilder);
              instance.actions = (<any>formBuilder).actions;
            });
            delete instance.promise;
            resolve(instance);
          }).catch(console.error);
        })
      };
      return instance;
    };
  })(jQuery);
}


@Component({
  selector: 'app-sopform',
  templateUrl: './sopform.component.html',
  styleUrls: ['./sopform.component.scss'],
  providers: [ViewfilesComponent]
})
export class SopformComponent implements OnInit {

  sopForm: FormGroup;
  sopViewForm :FormGroup;

  formBuilder: any;
  sopFormData: SOPFormData = new SOPFormData();
  sopViewFormData: SOPFormData = new SOPFormData();

  listDOC: any = [];
  sopDynamicFields: TemplateForSop = new TemplateForSop();
  templateNameDTOList: Array<TemplateNameDTO> = new Array<TemplateNameDTO>();
  fields: any;
  dataForTableView: any;
  tableDetails: TableForTemplate = new TableForTemplate();
  submitted = false;
  oldSOPForm = true;
  tableAvailFlag = false;
  tablelistData: Array<any> = [];
  jsonData = {};
  products: any;
  docNumber : string;
  version : string;
  corsDropdownList :  Array<any> = [];
  corsdropdownSettings : any = {
    singleSelection: false,
    idField: 'id',
    textField: 'docNumber',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 6,
    allowSearchFilter: true
  };
  selectedCORS: Array<any> = [];
  createNewVersion: boolean = false;
  versionList: Array<any> = [];

  departmentList: Array<dropDowns> = [];
  departmentListView :Array<dropDowns> = [];
  docuNumberListView : Array<dropDowns> = [];
  statusList: Array<dropDowns> = [];
  facultyList: Array<dropDowns> = [];

  //attachments
  staticAttachment: any[] = [];
  staticAttachmentTable: Array<any> = [];
  dynamicAttachment: any[] = [];
  dynamicAttachmentTable: Array<any> = [];
  fileBase64: any;
  viewSearchDetails: any = {deptId:0, docNum:''};
  fileNameforExc: string;
   docReadOnlyFlag: boolean = false;
   btnshow :boolean = false;
  viewDocNumberToFetch: string;
  error:any={isError:false,errorMessage:''};

  SOPRecord: SOPFormDetails = new SOPFormDetails();
  sopRecordView: trainingDataView = new trainingDataView();
  constructor(private _formBuilder: FormBuilder, private api: ApisProvider, private route: ActivatedRoute, private router: Router, private modalService: NgbModal, private viewPdfComponent: ViewfilesComponent) { }

  ngOnInit() {
    this.sopForm = new FormGroup({
      //'DocumentNumber': new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      'DocumentNumber': new FormControl(null, [Validators.required]),
      'Version': new FormControl({ value: null, disabled: true }, [Validators.required]),
      'EffectiveDate': new FormControl(Date),
      'ExpiryDate': new FormControl(Date),
      'Title': new FormControl(null, [Validators.required]),
      'Status': new FormControl(null, [Validators.required]),
      'DepartmentName': new FormControl(null, [Validators.required]),
    }, { updateOn: 'blur' });
    this.sopViewForm = new FormGroup({
       'DocumentNumberView': new FormControl(null, [Validators.required]),      
      'DepartmentNameView': new FormControl(null, [Validators.required]),
    }, { updateOn: 'blur' });
  ;
  this.sopForm.reset();
  
  this.loadTemplateData();
  this.loadDropDowns();
  this.route.queryParams
  .filter(params => params.docNumber)
  .subscribe(params => {
    this.SOPRecord.documentNumber = params.docNumber;
    this.CheckExist('');
  });
  
  }


  loadDropDowns(){
    ;

    this.api.apiMethodFetchDataByGET("api/SOPForm/LoadDropDowns").then(result => {
      if (result.status) {
          this.departmentList =  <dropDowns[]> result.resultOP.departmentDetails;
          this.statusList =  <dropDowns[]> result.resultOP.statusDetails;
          this.departmentListView =  <dropDowns[]> result.resultOP.departmentDetails;
          
      } else {
        swal(
          'Error!',
          result.description,
          'error'
        )
      }
    });

  }

  loadTemplateData() {
    this.api.apiMethodFetchDataByGET("api/SOPForm/LoadTemplateNames").then(result => {
      if (result.status) {
        if (result.resultOP.length >= 1) {
          this.templateNameDTOList = <TemplateNameDTO[]>result.resultOP;
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

  onDepartmentNameChange(data: any)
  {

  }

  onDeptNameChangeView(id:any){
 
    this.docuNumberListView =[];
      this.api.apiMethodFetchDataByGET('api/trainigrecords/DocumnetLoad?id=' + id).then(data => {       
        this.docuNumberListView =  <dropDowns[]> data.resultOP;
 
    });
  }

  onDocNumView(event){
    
  }
//To add the Dynamic fields
  onTemplateNameChange(data) {
    this.tablelistData = [];
    this.api.apiMethodFetchDataByGET("api/DynamicSOPForm/FetchSOPTemplateForm?id=" + data).then(result => {
      if (result.status) {
        this.sopDynamicFields = result.resultOP;
        let jsonData = {};
        this.fields = JSON.parse(this.sopDynamicFields.templateStructure);
        console.log("before", this.fields);
        this.tableDetails = JSON.parse(this.sopDynamicFields.tableContent);
        this.tableAvailFlag = this.tableDetails.tableActiveFlag;
        if (this.tableAvailFlag) {
          this.tableAvailFlag = this.tableDetails.tableActiveFlag;
          if (this.tableAvailFlag) {
            this.tableDetails.columnNameList.forEach((element, index) => {
              jsonData[element.columnName] = '';
            });
            this.tablelistData.push(jsonData);
            this.jsonData = JSON.parse(JSON.stringify(jsonData));
          }
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

  //Dynamic table data
  addRows() {
    this.tablelistData.push(JSON.parse(JSON.stringify(this.jsonData)));
  }

  //Dynamic table data
  getHeaders() {
    let headers: string[] = [];
    if (this.tablelistData) {
      this.tablelistData.forEach((value) => {
        Object.keys(value).forEach((key) => {
          if (!headers.find((header) => header == key)) {
            headers.push(key)
          }
        })
      })
    }
    return headers;
  }

  cancel() {
    if (!this.createNewVersion) {
      alertFunctions.typeCancel();
    }
    this.clearAll();
  }

    
  clearAll() {
    this.sopForm.reset();
    this.clear();
  }

  clear(){
    this.submitted = false;
    this.createNewVersion = false;
    this.fields = [];
    this.tableDetails = new TableForTemplate();
    this.tableAvailFlag = false;
    this.jsonData = {};
    this.tablelistData = [];
    this.docReadOnlyFlag = false;
    this.corsDropdownList = [];
    this.selectedCORS = [];
    this.staticAttachment = [];
    this.staticAttachmentTable = [];
    this.dynamicAttachment = [];
    this.dynamicAttachmentTable = [];
    this.SOPRecord = new SOPFormDetails();
  }


  save() {
    ;

    this.submitted = true;
    let required = false;
    if (this.fields != undefined && this.fields.length >= 1) {
      for (let index = 0; index < this.fields.length; index++) {
        const element = this.fields[index];
   
        if ((element.type == "checkbox-group" || element.type == "select" || element.type == "radio-group") && element.required == true) {
          if (element.values === undefined || element.values.length == 0) {
            required = true;
            break;
          }
        } else if ((element.type == "number" || element.type == "text" || element.type == "date" || element.type == "textarea") && element.required == true) {
          if (element.value === undefined || element.value.length == 0) {
            required = true;
            break;
          }
        }  
      }
    }
 
    if (required || this.sopForm.status != "VALID") {
      return;
    }else{

      let sopdynamicField: SopDynamicFormData = {
        SopDynamicFieldsData: JSON.stringify(this.fields),
        TableAvailable: this.tableAvailFlag,
        TableContent: this.tablelistData,
        CORSelected: this.selectedCORS
      }
      this.SOPRecord.sopDynamicFormData = JSON.stringify(sopdynamicField);
  
      const formData = new FormData();
      formData.append('SopFormData', JSON.stringify(this.SOPRecord));
  
      let MultifilesStatic = this.staticAttachment;
      MultifilesStatic.forEach(element => {
        let fileToUpload = <File>element;
        formData.append('StaticAttachments', fileToUpload, fileToUpload.name); 
      });
  
      let MultifilesDynamic = this.dynamicAttachment;
      MultifilesDynamic.forEach(element => {
        let fileToUpload = <File>element;
        formData.append('DynamicAttachments', fileToUpload, fileToUpload.name); 
      });
  
      formData.append('StaticAttachmentsTable', JSON.stringify(this.staticAttachmentTable));
      formData.append('DynamicAttachmentsTable', JSON.stringify(this.dynamicAttachmentTable));
  
      this.api.sendFormData('api/SOPForm/CreateSopForm', formData).subscribe(async result => {
        if (result.status) {
          swal("Saved Successfully!", "success").then
            ((result) => {
              this.clearAll();
            })
        } else {
          swal(
            'Error!',
            result.description,
            'error'
          )
          this.clearAll();
        }
      });
     
    }
  }

  editSOPRecord(element) {
    this.clearAll();
    this.api.apiMethodFetchDataByGET('api/SOPForm/SopEditData?id=' + element).then(data => {

      if (data.status) {
        this.docReadOnlyFlag = true;
        let dataParsed = data["resultOP"];
        this.oldSOPForm = dataParsed.documentPresent;
        this.corsDropdownList = dataParsed.templateDetails.crossReferenceSOP;

        this.SOPRecord = <SOPFormDetails>dataParsed.templateDetails;
        if (this.SOPRecord.attachments != null && this.SOPRecord.attachments != undefined) {
          var attachmentTableDetails = JSON.parse(this.SOPRecord.attachments);
          this.staticAttachmentTable = <AttachmentTable[]>attachmentTableDetails.StaticTB;
          this.dynamicAttachmentTable = <AttachmentTable[]>attachmentTableDetails.DynamicTB;
        }

        if (this.oldSOPForm) {
          this.createNewVersion = true;
          this.versionList = dataParsed.listOfNextVersion;
         
          let tableDetails = JSON.parse(dataParsed.templateDetails.sopDynamicFormData)
          this.fields = JSON.parse(tableDetails.SopDynamicFieldsData);
          this.selectedCORS = tableDetails.CORSelected;
          if (tableDetails.TableAvailable) {
            this.tableAvailFlag = true;
            this.tablelistData = tableDetails.TableContent;
          }

        } else {
          //Set version and Status
         
        }

      } else {
        swal(
          'Error!',
          data.description,
          'error'
        )
      }
    });
  }

  newVersionVersionDetails(data: any){
    // let docNo = this.SOPRecord.documentNumber;
    // this.clear();
    // this.SOPRecord.documentNumber = docNo;
    this.CheckExist(data);
    // this.SOPRecord.version = data;
    // this.createNewVersion = false;
  }

  CheckExist(nextVersion: string) {

    if (nextVersion != null && nextVersion != '') {
      this.docReadOnlyFlag = false;
    }

    if (!this.docReadOnlyFlag && this.SOPRecord.documentNumber != undefined && this.SOPRecord.documentNumber != "" && this.SOPRecord.documentNumber.length >= 1) {
      this.api.apiMethodFetchDataByGET('api/SOPForm/CheckDocNumber?docNumber=' + this.SOPRecord.documentNumber).then(data => {
         
        if (data.status) {
         this.clear();
          this.docReadOnlyFlag = true;
          let dataParsed = data["resultOP"];
          this.oldSOPForm = dataParsed.documentPresent;
          this.corsDropdownList = dataParsed.templateDetails.crossReferenceSOP;

          this.SOPRecord = <SOPFormDetails>dataParsed.templateDetails;
          if (this.SOPRecord.attachments != null && this.SOPRecord.attachments != undefined) {
            var attachmentTableDetails = JSON.parse(this.SOPRecord.attachments);
            this.staticAttachmentTable = <AttachmentTable[]>attachmentTableDetails.StaticTB;
            this.dynamicAttachmentTable = <AttachmentTable[]>attachmentTableDetails.DynamicTB;
          }

          if (this.oldSOPForm) {
            this.createNewVersion = true;
            this.versionList = dataParsed.listOfNextVersion;
           
            let tableDetails = JSON.parse(dataParsed.templateDetails.sopDynamicFormData)
            this.fields = JSON.parse(tableDetails.SopDynamicFieldsData);
            this.selectedCORS = tableDetails.CORSelected;
            if (tableDetails.TableAvailable) {
              this.tableAvailFlag = true;
              this.tablelistData = tableDetails.TableContent;
            }
          } else {
            //Set version and Status
           
          }

          if (nextVersion != null && nextVersion != '') {
            this.SOPRecord.version = nextVersion;
            this.createNewVersion = false;
          }

        } else {
          swal(
            'Error!',
            data.description,
            'error'
          )
        }
      },error=>{ });
    }

  }


  fetchVersionDetails(dataNB: any){

    this.SOPRecord.type = dataNB;
    this.api.apiMethodFetchDataByPOST('api/SOPForm/FetchVersionDetails', this.SOPRecord).then(data => {
 
      if (data.status) {
        let dataParsed = data["resultOP"];
       
        this.oldSOPForm = dataParsed.documentPresent;
        if (this.oldSOPForm) {
          this.clear();
          this.createNewVersion = true;
          this.docReadOnlyFlag = true;
          this.corsDropdownList = dataParsed.templateDetails.crossReferenceSOP;

          this.SOPRecord = <SOPFormDetails>dataParsed.templateDetails;
          if (this.SOPRecord.attachments != null && this.SOPRecord.attachments != undefined) {
            var attachmentTableDetails = JSON.parse(this.SOPRecord.attachments);
            this.staticAttachmentTable = <AttachmentTable[]>attachmentTableDetails.StaticTB;
            this.dynamicAttachmentTable = <AttachmentTable[]>attachmentTableDetails.DynamicTB;
          }

          let tableDetails = JSON.parse(dataParsed.templateDetails.sopDynamicFormData)
          this.fields = JSON.parse(tableDetails.SopDynamicFieldsData);
          this.selectedCORS = tableDetails.CORSelected;
          if (tableDetails.TableAvailable) {
            this.tableAvailFlag = true;
            this.tablelistData = tableDetails.TableContent;
          }
        } else {
          this.oldSOPForm = true;
          let message = '';

          if (dataNB == 'Next') {
            message = 'This is the highest version of this document..';
          }else{
            message = 'This is the lowest version of this document...';
          }

          swal(
            message,
            '',
            'info'
          )
        }

      } else {
        swal(
          'Error!',
          data.description,
          'error'
        )
      }
    },error=>{ });
    
  }

  loadSOPRecord() {
    ;
    this.btnshow = true;
    this.sopRecordView.SopIdView = this.sopViewForm.get('DocumentNumberView').value; 
    this.sopRecordView.deptidView = this.sopViewForm.get('DepartmentNameView').value; 
    // if (this.sopRecordView.SopIdView == undefined || this.sopRecordView.deptidView == "" || this.sopRecordView.SopIdView <= 0) {
    //   swal(
    //     'Error!',
    //     'Enter valid Document number...!',
    //     'error'
    //   )
    //   return;
    // } 

    this.api.apiMethodFetchDataByPOST("api/SOPForm/LoadSOPData" , this.sopRecordView).then(data => {
      if (data.status) {
        this.dataForTableView = [];
        this.products = data.resultOP;
        this.products.forEach(element => {
          let formData = {
            "id": element.id,
            "DocumentNumber": element.documentNumber,
            "Status": element.status,
            "Title": element.title,
            "Version": element.version,
            "ExpiryDate": element.expiryDate,
            "EffectiveDate": element.effectiveDate,
            "CreatedDate": element.createdDate,
            "DepartmentName": element.departmentName,
            "LastModifiedDate": element.updatedDate,
            "ISDeleted": element.isDeleted == 'N' ? 'No' : 'Yes',
            "Action": ""
          }
          this.dataForTableView.push(formData);
        })
      } else {
        swal(
          'could not fetch the Data.',
          data.description,
          'error'
        )
      }
    });
 
  }

  deleteSopRecord(element) {

    swal({
      title: 'Are you sure?',
      text: 'Delete SOP Record',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      
      if (result.value) {
        
        this.api.apiMethodFetchDataByGET('api/SOPForm/SOPDeleteData?id=' + element).then(async result => {
          
          console.log(element.id)
          
          if (result.success == true) {
            swal(
              'Deleted!',
              'Your Data has been Deleted.',
              'success'
            ).then((result) => {
             // this.loadSOPRecord(0,0);
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
          'Record not Deleted :)',
          'error'
        )
      }
    })
  }

  //Two date configuration/Validation
  compareTwoDates(){
     if(new Date(this.sopForm.controls['ExpiryDate'].value) < new Date(this.sopForm.controls['EffectiveDate'].value)){
        this.error={isError:true,errorMessage:'Expiry Date should be greater than Effective Date...!'};
     }else{
      this.error={isError:false,errorMessage:''};
     }
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

  onFileUploadDynamic(event: any){

    let  totalFiles= event.target.files.length;
    for (let index = 0; index < totalFiles; index++) {
       let file = event.target.files[index];
       let fileName = file.name;
        var date =new Date();
       let json: AttachmentTable = {FileName:fileName, Date: date, FilePath:'', AttachementType:'Dynamic' }
       this.dynamicAttachmentTable.push(json);
       this.dynamicAttachment.push(file);
    }

    event.target.value = ''
  }

  deleteDynamicUploadedFile(data: any, fileIndex)
  {
    this.dynamicAttachmentTable.splice(fileIndex,1);
    var elementExists = this.dynamicAttachment.find(x => x.name == data.FileName); //  .splice(fileIndex,1);
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
      }else{
        elementExists = this.dynamicAttachment.find(x => x.name == data.FileName);
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
      }else{
        elementExists = this.dynamicAttachment.find(x => x.name == data.FileName);
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

  onFileUpload(event, input, groupedFormName?) {
    ;
    input.value=""
    if (document.getElementById("iframeView" + input.name)) {
      document.getElementById("iframeView" + input.name).remove();
      document.getElementById("#" + input.name).setAttribute("class", "form-group row");
    }
    const filePath = 'test/';
    // this.currentUser.projectName + '/' +
    // this.currentUser.versionName + '/DYNAMIC FORMS/'+(this.isMapping?(this.dynamicForm.templateName+'/'+groupedFormName):(this.dynamicForm.templateName))+'/'
      if(!input.values||!input.multiple)
      input.values=new Array();
    if (event.target.files.length != 0) {
    let  totalFiles= event.target.files.length;
      for (let index = 0; index < totalFiles; index++) {
       // this.spinnerFlag = true;
        let file = event.target.files[index];
        let fileName = file.name;
        const formData: FormData = new FormData();
        formData.append('file', file, fileName);
        formData.append('filePath', filePath);
        formData.append('extension', fileName.split(".")[fileName.split(".").length - 1]);
        let date=Date.now();
        var json={path:filePath,fileName:fileName,date:date,displayDate:date};
        input.values.unshift(json);

        // this.commonService.singleFileUpload(formData).subscribe(resp => {
        //  let date=Date.now();
        //   this.permissionService.getCurrentDate(date).subscribe(res=>{
           
        //     this.spinnerFlag = false;
        //   },error=>{ //this.spinnerFlag = false;
        //   });
         
        // }, error => {
        //   //this.spinnerFlag = false;
        // })
      }
    }
  }

}
