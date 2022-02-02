import { Component, OnInit, ViewEncapsulation , ViewChild, ElementRef} from '@angular/core';
import { FormBuilderCreateor } from 'src/app/formbuilder/form-builder';
import I18N from 'src/app/formbuilder/mi18n';
import { config } from 'rxjs';
import { defaultOptions, defaultI18n } from 'src/app/formbuilder/config';
import { DynamicTemplateMaster } from 'src/app/utility/model';
import {TemplateForQA , VideoMaster} from 'src/app/utility/QAModel';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { debug, debuglog } from 'util';
import { ApisProvider } from '../../../utility/api';
import swal from 'sweetalert2';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import {  dropDowns } from 'src/app/utility/TrainingDetailsModel';
import { Observable } from 'rxjs';

function initJq() {
  (function ($) {
    (<any>$.fn).formBuilder = function (options) {
      defaultOptions.defaultFields = [];
      defaultOptions.fields = []
      if (options) {
        defaultOptions.disableFields = options;
      } else {
        defaultOptions.disableFields = [];
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
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class QuestionAnswerComponent implements OnInit {
  dynamicFieldsMaster: DynamicTemplateMaster = new DynamicTemplateMaster();
  QAForm: FormGroup;
  formBuilder: any;
  formData: any;
  fields: FormBuilder[] = new Array<FormBuilder>();
  QAFields: TemplateForQA = new TemplateForQA();
  VideoMaster: VideoMaster = new VideoMaster();
  public status: any = '';
  showDynamic: boolean;
  disableFieldsQA = [
    'autocomplete',
    //'button',
    'checkbox',
    'date',
    'file',
    'header',
    'hidden',
    'paragraph',
    'select',
    'textarea'
   ];
    isLoading: boolean= false;
    txtquestion: string= "";
    displayedColumns: string[];
    dataSource: any;
    data: any;
    products: any;
    @ViewChild('t', {static: true}) tabset: NgbTabset;
   
    filecontent: any;
    fileToUpload: any;
    qavideo: any;
    departmentList: Array<dropDowns> = [];
    documentNumberList: Array<dropDowns> = [];
    myFiles: string[] = [];    
    myVideos: Observable<VideoMaster[]>; 

    @ViewChild('videoPlayer', {static: true}) videoplayer: ElementRef;
    videolocation :string;
    isPlay: boolean = true;

  constructor(private api: ApisProvider, private _formBuilder: FormBuilder) { }
  

  ngOnInit() {
     ;
    initJq();
    this.QAForm = new FormGroup({
      'question': new FormControl(null, [ Validators.required]),
      'documentnumber': new FormControl(null, [ Validators.required]),
     'departmentName': new FormControl(null, [ Validators.required]),
    },{updateOn: 'blur'});
    this.loadDropDowns();
    this.formBuilder = (<any>jQuery('.build-wrapQA')).formBuilder(this.disableFieldsQA);
    this.status='new';
    this.showDynamic = false;
    this.loadQARecord();
this.videolocation='D:\I-Val\Pictures\testvideo.mp4'
  }

  toggleVideo(event: any) {
    this.videoplayer.nativeElement.focus();
    this.videoplayer.nativeElement.play();
  }

  playPause() {
    var myVideo: any = document.getElementById("my_video_1");
    if (myVideo.paused) myVideo.play();
    else myVideo.pause();
  }

  makeBig() {
    var myVideo: any = document.getElementById("my_video_1");
    myVideo.width = 560;
  }

  makeSmall() {
    var myVideo: any = document.getElementById("my_video_1");
    myVideo.width = 320;
  }

  makeNormal() {
    var myVideo: any = document.getElementById("my_video_1");
    myVideo.width = 420;
  }

  skip(value) {
    let video: any = document.getElementById("my_video_1");
    video.currentTime += value;
  }

  restart() {
    let video: any = document.getElementById("my_video_1");
    video.currentTime = 0;
  }

   

  fetchNews(ID: any) {
    ;
    console.log(ID);
    if(ID.nextId == "ViewQuestionAndAnswersDetails"){
      this.showDynamic = true;
    } else
    {  this.showDynamic = false;  }
  }

  loadDropDowns(){

    this.api.apiMethodFetchDataByGET("api/QuestionAnswer/getLookupItems").then(result => {
      if (result) {
        this.departmentList =  <dropDowns[]> result;
        } else {
        swal(
          'Error!',
          result.description,
          'error'
        )
      }
    });

  }

 onDepartmentNameChange(data:any){
   console.log(data);
   // this.QAFields.lookupitemid =data;
    ;
    if (data!="" || data!=undefined){
    this.api.apiMethodFetchDataByGET('api/QuestionAnswer/documentList?lookupid=' + data).then(result => {
      
      
       this.documentNumberList =  <dropDowns[]> result;
       

    });
  }
  }

  ondocumentNumberChange (data:any)
  {
    ;
    this.QAFields.sopid =data;
     
  }

  saveAndGoto(){
    
  
    if (this.QAFields.id === 0 || this.QAFields.id === undefined )
   {  this.QAFields.id = 0; } else
   { }
         const formData: FormData = new FormData();
         //  formData.append('organizationId', 'test');
         //  formData.append('typeId', 'test');
        if (this.fileToUpload == undefined || this.fileToUpload == null){
         
        }
        else
        { formData.append('file', this.fileToUpload, this.fileToUpload.name);}
          console.log(this.fileToUpload); 
         //  formData.append('file',  this.fileToUpload) ;
          this.QAFields.qacorrectanswer = this.formBuilder.formData;
          this.QAFields.createdby= 1;
          this.QAFields.deleteFlag = "N";
          //this.QAFields.sopid=1;
          this.QAFields.qaformdata= this.QAForm.get('question').value;
          formData.append( 'listiformfiledto', JSON.stringify(this.QAFields));
          //   Uncaught (in promise): SyntaxError: Unexpected end of JSON input
       
      this.api.sendFormData('api/QuestionAnswer/CraeteQuestionAnswer', formData).subscribe(async result => {
        if (result) {
          swal("Saved Successfully!", "success").then
            ((result) => {
              this.QAFields.id = 0;
              this.QAForm.reset();
              this.formBuilder.actions.setData("");
            })
        } else {
          swal(
            'Error!',
            'Something went wrong',
            'error'
          )
       }
      });
   
 }

 
//onSelectFile(files: FileList){
  onSelectFile(event) {

 const file = (event.target as HTMLInputElement).files[0];

  this.fileToUpload = file;
 
  }
 

 //Load view record
 loadQARecord() {
  ;
  this.displayedColumns = [];
  this.api.apiMethodFetchDataByGET("api/QuestionAnswer/LoadQuestionAnswer").then(data => {
    ;
    this.fields = [];
    this.products = data;
    this.products.forEach(element => {
        this.formData = {
        "id": element.id,
        "sop_id" : element.sop_id,
        "document_number" : element.document_number,
        "qa_form_data" : element.qa_form_data,
        "lookupitemname" : element.lookupitemname,
        "Action": ""
      }
      this.fields.push(this.formData);
    })

  });
 }

  //Edit record
  editQARecord(element)
  {
   //this.QAFields.lookupitemid = '3';
    this.api.apiMethodFetchDataByGET('api/QuestionAnswer/QAEditData?id=' + element).then(data => {
            
      console.log(data);
      setTimeout(() => {
      this.QAForm.patchValue ({ 
        
       question : data[0].qa_form_data.substring(1, data[0].qa_form_data.length - 1),
     // question : data[0].qa_form_data,
     });
    this.QAFields.lookupitemid = data[0].lookupitemid;
    this.QAFields.sopid = data[0].sop_id;
    this.QAFields.id= data[0].id;
    this.formBuilder.actions.setData(data[0].qa_correct_answer);
  },500);
    });

  }

 

  OneditDepartmentload()
  {
   // this.countryForm.controls['countryControl'].patchValue(  {id : '68c61e29', name, code})
  }


  //Delete  record
  deleteQARecord(element) {

    swal({
      title: 'Are you sure?',
      text: 'Delete  QA',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      
      if (result) {
        
        this.api.apiMethodForDelete('api/QuestionAnswer/QADeleteData?id=' + element+ '&', "").then(async result => {
          
          console.log(element.id)
          
          if (result.success == true) {
            swal(
              'Deleted!',
              'Your Data has been Deleted.',
              'success'
            ).then((result) => {
             // this.loadCompany();
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

  cancel(status: string) {
     this.QAFields.id = 0;
     this.QAForm.reset();
     this.formBuilder.actions.setData("");
     }

    }



 