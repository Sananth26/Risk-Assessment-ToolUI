import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { defaultOptions, config, defaultI18n } from '../../../formbuilder/config';
import { FormBuilderCreateor } from '../../../formbuilder/form-builder';
import I18N from '../../../formbuilder/mi18n';
import swal from 'sweetalert2';
import { DynamicTemplateMaster, Module, PermissionDTO, ButtonPermisionDTO, ListofColumnNames } from '../../../utility/model';
import { ApisProvider } from '../../../utility/api';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { OrganisationComponent } from '../organisation/organisation.component';
import { TemplateForSop, TemplateNameDTO, TableForTemplate } from 'src/app/utility/sopmodels';

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
  selector: 'app-master-dynamic-form',
  templateUrl: './master-dynamic-form.component.html',
  //styleUrls: ['../../../../../node_modules/sweetalert2/dist/sweetalert2.min.css'],
  encapsulation: ViewEncapsulation.None
})
export class MasterDynamicFormComponent implements OnInit {

  @ViewChild('organisation', { static: true }) org: OrganisationComponent;
  formBuilder: any;
  dynamicSOPForm: FormGroup;
  dynamicFieldsMaster: DynamicTemplateMaster = new DynamicTemplateMaster();
  public arrayList: any;
  public modules: Module[] = new Array();
  public status: any = '';
  public selectedStage: any = '';
  urlList: any;
  formData: any;
  fields: FormBuilder[] = new Array<FormBuilder>();
  URLChildList: any;
  permissionData: PermissionDTO = new PermissionDTO();
  moduleName: any;
  listDOC: any = [];
  showStaticFields: boolean = true;
  addTableFlag: boolean = false;
  tableColumnCount: number = 0;
  ActiveFlag: boolean = false;
  DeleteFlag: boolean = false;
  TableFlag: boolean = false;
  tableDetails: TableForTemplate = new TableForTemplate();
  sopDynamicFields: TemplateForSop = new TemplateForSop();
  templateNameDTOList: Array<TemplateNameDTO> = new Array<TemplateNameDTO>();
  disableFieldsSOP = [
    'autocomplete',
        //'button',
        'hidden',
        'paragraph',
   ];
 
  constructor(private api: ApisProvider, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    ;
    initJq();
    this.formBuilder = (<any>jQuery('.build-wrap')).formBuilder(this.disableFieldsSOP);

    this.dynamicSOPForm = new FormGroup({
    'templateName': new FormControl({ value: "" }, [Validators.required]),

    }, {updateOn: 'blur'});

    this.loadTemplateData();
    this.status = 'new';
  }


  loadData(data) {

    this.dynamicFieldsMaster.templateURL = data;
    this.api.apiMethod("api/dynamicTemplate/loadDynamicFieldsForTemplate", this.dynamicFieldsMaster).then(result => {
      let responseMsg: string = result;
      if (result["success"]) {
        this.dynamicFieldsMaster = result["dynamicTemplateMasterDTO"]
        this.formBuilder.actions.setData(this.dynamicFieldsMaster.templateDynamicData);
      } else
        this.formBuilder.actions.setData("");
    }).then(data => {
    });

  }

  loadTemplateData() {

    this.api.apiMethodFetchDataByGET("api/DynamicSOPForm/LoadTemplateNames").then(result => {
      if (result.status) {
        if (result.resultOP.length >= 1) {
          this.templateNameDTOList = <TemplateNameDTO[]>result.resultOP;
        }
      }else{
        swal(
          'Error!',
          result.description,
          'error'
        )
      }
    });

  }

  onTemplateNameChange(data) {
    this.sopDynamicFields = new TemplateForSop();
    this.removeTable();
    this.api.apiMethodFetchDataByGET("api/DynamicSOPForm/FetchSOPTemplateForm?id=" + data).then(result => {
      if (result.status) {
        this.tableDetails = new TableForTemplate();
        this.sopDynamicFields = result.resultOP;
        this.ActiveFlag = this.sopDynamicFields.activeFlag == "N" ? false : true;
        this.DeleteFlag = this.sopDynamicFields.deleteFlag == "N" ? false : true;
        this.formBuilder.actions.setData(this.sopDynamicFields.templateStructure);
        this.tableDetails =  JSON.parse(this.sopDynamicFields.tableContent);
         this.tableColumnCount = this.tableDetails.columnNameList.length;
        this.addTableFlag = this.tableDetails.tableAvailable;

      } else {
        swal(
          'Error!',
           result.description,
          'error'
        )
      }
    });
  }

  removeTable() {
    this.addTableFlag = false;
    this.tableDetails = new TableForTemplate();
    this.tableColumnCount = 0;
  }

  cancel(status: string) {
    this.status = status;
    this.removeTable();
    this.showStaticFields = true;
    this.sopDynamicFields = new TemplateForSop();
    this.formBuilder.actions.setData("");
  }

  columnChange(eventData: any) {

    if (this.tableDetails.columnNameList == undefined || this.tableDetails.columnNameList == null) {
      this.tableDetails.columnNameList = [];
    }

    let presentCount = this.tableDetails.columnNameList.length;
    if (presentCount > this.tableColumnCount) {
      let count = presentCount - this.tableColumnCount;
      this.tableDetails.columnNameList.splice(this.tableColumnCount, count);
    }
    else {
      let count = this.tableColumnCount - presentCount;
      for (let index = 1; index <= count; index++) {
        let columns: ListofColumnNames = { id: 1, columnName: "" };
        this.tableDetails.columnNameList.push(columns);
      }
    }
  }

  deleteColumnIndex(index) {
    this.tableDetails.columnNameList.splice(index, 1);
    this.tableColumnCount = this.tableDetails.columnNameList.length;
  }

  saveOrUpdateTemplate() {

   if (this.dynamicSOPForm.status == "VALID") {
    this.tableDetails.tableAvailable = this.addTableFlag;
    //if (this.addTableFlag) {
      this.sopDynamicFields.tableContent = JSON.stringify(this.tableDetails);
      this.sopDynamicFields.templateStructure = this.formBuilder.formData;
    //}
    this.sopDynamicFields.deleteFlag = this.DeleteFlag == false ? "N" : "Y";
    this.sopDynamicFields.activeFlag = this.ActiveFlag == false ? "N" : "Y";
    
    this.api.apiMethodSaveDataByPOST('api/DynamicSOPForm/CreateSOP', this.sopDynamicFields).then(async result => {
      
      if (result.status) {
          this.cancel('new');
          this.loadTemplateData();
          swal(
            'Saved!',
            'Your Data has been saved.', 
            'success'
          )
          return;
      } else {
        this.cancel('new');
        swal(
          'Error!',
           result.description,
          'error'
        )
        return;
      }
    });
   } 
  }


  checkTemplateName() {

    if (this.status == 'new') {
      let exist = this.templateNameDTOList.filter(x => x.templateName ==  this.sopDynamicFields.templateName);
      if (exist.length >= 1) {
        this.sopDynamicFields.templateName = "";
        swal(
          'This Name already taken..!',
          'Looks like Template already created in this name, Give a different Name.',
          'info'
        )
        return;
      }
    } else {

      let exist = this.templateNameDTOList.filter(x => x.templateName ==  this.sopDynamicFields.templateName && x.id != this.sopDynamicFields.id);
      if (exist.length >= 1) {
        this.sopDynamicFields.templateName = "";
        swal(
          'This Name already taken..!',
          'Looks like Template already created in this name, Give a different Name.',
          'info'
        )
        return;
      }

    }
  }





  saveAndGoto(valid) {
    ;
    //if (valid=true) {
    //this.dynamicFieldsMaster = new DynamicFieldsMaster();
    this.dynamicFieldsMaster.templateDynamicData = this.formBuilder.formData;

    //this.formExtend.jsonStructure = this.formBuilder.formData;
    this.api.apiMethod('api/formbuilder/saveOrUpdateDynamicFieldsForStaticTemplate', this.dynamicFieldsMaster).then(async result => {
      if (result.success) {
        swal(
          'Saved!',
          'Your Data has been saved.',
          'success'
        )
      } else {
        swal(
          'Error!',
          'Your Data has not been saved.',
          'error'
        )
      }
    });
    // } else {
    //   return;
    // }
  }


  test1(data, index) {
    //
    this.dynamicFieldsMaster.templateURL = data;
    this.api.apiMethod('api/formbuilder/loadDynamicFieldsForStaticTemplate', this.dynamicFieldsMaster).then(async result => {
      
      if (result.success) {
        this.dynamicFieldsMaster = result.dynamicFieldsMasterDTO
        this.formBuilder.actions.setData(result.dynamicFieldsMasterDTO.templateDynamicData)
      } else {
        // if (this.count == 0) {
        this.formBuilder.actions.setData("")
        // this.count++;
        //}


      }


    });
  }

  test(data, index) {
    this.dynamicFieldsMaster.templateURL = data;
    this.api.apiMethod('api/formbuilder/loadDynamicFieldsForStaticTemplate', this.dynamicFieldsMaster).then(async result => {
      
      if (result.success) {
        this.dynamicFieldsMaster = result.dynamicFieldsMasterDTO
        this.formBuilder.actions.setData(result.dynamicFieldsMasterDTO.templateDynamicData)
      } else {
        // if (this.count == 0) {
        this.formBuilder.actions.setData("")
        // this.count++;
        //}


      }


    });



  }

}
