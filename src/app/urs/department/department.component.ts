import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Department, slaData } from 'src/app/utility/uasModels';
import swal from 'sweetalert2';
import { ApisProvider } from 'src/app/utility/api';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import {UserAccess, RolePermission } from 'src/app/utility/model';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  @ViewChild('t', { static: false }) tabset: NgbTabset;
  form: FormGroup;
  departmentsList: any = [];
  fields = [];
  displayFields = [];
  isActive: boolean = false;
  slaFlag: boolean = false;
  levels : Array<slaData> =[];
  department: Department = new Department();

  filteredData = [];
  columnsWithSearch : string[] = [];
 
 
  //sla related
  
  // levels = [

  //   { levelNo: 1, slaDays: 11 },
  //   { levelNo: 2, slaDays: 13 },
  //   { levelNo: 3, slaDays: 12 },
  // ]

 
  //sla related to get slaActive
  item = [
    { slaDays: 3, slaActive: true }
  ]

  UserAccessModel: UserAccess = new UserAccess();
  RolePermissionModel: RolePermission = new  RolePermission();
  

  constructor(private api: ApisProvider) { }

  ngOnInit() {
    this.form = new FormGroup({
      'deptName': new FormControl(null, [Validators.required]),
      'level': new FormControl(null),
      // 'activeFlag': new FormControl(null, [Validators.required])
    });
    this.loadDepartments();
    this.OnLoadButtonPermission();
  }
  saveAndGo(tabActiveId) {
    ;
    console.log("save department", this.form)
    //api for save
    this.department.isActive = this.isActive == false ? "N" : "Y";
    this.department.slaFlag = this.slaFlag == false ? "N" : "Y";

    if(this.department.slaFlag == "Y"){
      this.department.slaJson = JSON.stringify(this.levels);
      this.department.noOfLevel = this.levels[(this.levels.length) - 1].levelNo ;
    }
    else{
      this.department.slaJson =null;
      this.department.noOfLevel = this.department.noOfLevel;
    }
    
 console.log(this.department);
    this.api.apiMethodSaveDataByPOST('api/Department/CreateOrUpdateDpet', this.department).then(async data => {
      if (data.status) {
        swal("Saved Successfully!", "success").then
          ((result) => {
            this.tabset.select(tabActiveId);
            this.loadDepartments();
            this.cancel();
          })
      } else {
        swal(
          'Error!',
          data.description,
          'error'
        )
        this.cancel();
        this.loadDepartments();

      }
    });
  }
  cancel() {
    this.isActive = false;
    this.slaFlag = false;
    this.levels =[];

    this.department.id =0;
    this.department.departmentName = "";
    this.department.noOfLevel=0;
    this.department.slaJson = "";
    this.form.reset();

  }
  checkDeptName() {
    console.log("check department");

  }
  // editDept(element){
  //   console.log("edit department",element);

  // }
  // deleteDept(element){
  //   console.log("delete department",element);

  // }
  editDept(elementId) {
    ;

    console.log(elementId)
    this.api.apiMethodFetchDataByGET('api/Department/LoadDeptForEdit?deptId=' + elementId).then(result => {
      ;
      let data = result.resultOP;
      console.log(data);
      ;
      if(data.slaJson != ""){
        
      let parse = JSON.parse(data.slaJson);
      this.levels = parse

      }
      this.department.departmentName = data.departmentName,
        this.department.id = data.id,
        this.isActive = data.isActive == "N" ? false : true;
        this.department.isActive = this.isActive,
        this.slaFlag = data.slaFlag == "N" ? false : true;
        this.department.slaFlag = this.slaFlag,
        this.department.noOfLevel = data.noOfLevel,
        this.department.slaJson = data.slaJson ,
        
        console.log(this.department);
    });
  }

  slaFlagChange(){
   this.levels =[];
   this.department.noOfLevel = "";
   this.department.slaJson =[];
  }

  deleteDept(elementId) {
    console.log(elementId);
    swal({
      title: 'Are you sure?',
      text: 'Delete User Record',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      ;
      if (result.value) {
        ;
        this.api.apiMethodFetchDataByGET('api/Department/DeleteDept?userId=' + elementId).then(async result => {
          if (result.status == true) {
            swal(
              'Deleted!',
              result.description,
              'success'
            ).then((result) => {
              this.loadDepartments();
            })
          } else {
            swal(
              'Deleted!',
              result.description,
              'error'
            )
            this.loadDepartments();

          }
        });
      } else if (result.dismiss === swal.DismissReason.cancel) {
        swal(
          'Cancelled',
          'User not Deleted :)',
          'error'
        )
      }
    })

  }
  //map accordingly
  loadDepartments() {
    ;
    this.departmentsList = [];
   
    this.api.apiMethodFetchDataByGET("api/Department/LoadDeptDatas").then(result => {
      if (result.status) {
        this.departmentsList = result.resultOP;
        this.displayFields = result.resultOP;
        this.fields = result.resultOP;
        this.filteredData = result.resultOP;
        this.columnsWithSearch = Object.keys(this.departmentsList[0]);
      } else {
        swal(
          'Error!',
          result.description,
          'error'
        )
      }
    });
  }
  //for search plz chk with actual list
  updateFilter(val: any) {
    const value = val.toString().toLowerCase().trim();
    const count = this.fields.length;
    const keys = Object.keys(this.displayFields[0]);
    this.fields = this.displayFields.filter(item => {
      for (let i = 0; i < count; i++) {
        if (
          (item[keys[i]] &&
            item[keys[i]]
              .toString()
              .toLowerCase()
              .indexOf(value) !== -1) ||
          !value
        ) {
          return true;
        }
      }
    });
    if (value.length == 0)
      this.fields = this.displayFields
  }

  deleteLevel(id) {
    console.log(id);
    this.levels = this.levels.filter(element => element.levelNo != id);
    this.levels = this.levels.sort((a, b) => a.levelNo - b.levelNo);
    this.levels.forEach((element, i) => {
      element.levelNo = (i + 1);
    });
  }
  
  addEvent(): void {
    console.log("gfh");
    ;
    let levelNo =1;
    if(this.levels != undefined && this.levels.length > 0){
     levelNo = this.levels[(this.levels.length) - 1].levelNo + 1 ;
      
    }
    this.levels = [       
      ...this.levels,
      {
        levelNo: levelNo, //this.levels[(this.levels.length) - 1].levelNo + 1,
        slaDays: 1
      }
    ];
  }
  
// User role and permission
OnLoadButtonPermission() {
  ;

    var loginUseridEncode =localStorage.getItem('userId'); 
    this.RolePermissionModel.userId =parseInt(this.api.decode(loginUseridEncode));
    this.RolePermissionModel.url= "/urs/department";

this.api.apiMethodFetchDataByPOST("api/Login/RoleandPermission",this.RolePermissionModel).then(async data => {
       ;
       if (data.status) {
         ;
        this.UserAccessModel = data.resultOP[0];
        if (this.UserAccessModel.menuAccess == 0 || this.UserAccessModel.menuAccess == 0 )
         {
        //  this.router.navigate(['/error-404']);
          return;
         }
        else
         {
          console.log(this.UserAccessModel);
         }


       } else {
         
       }
     })

}

// filters results
filterDatatable(event){
  let filter = event.target.value.toLowerCase();
  this.departmentsList = this.filteredData.filter(item => {
  for (let i = 0; i < this.columnsWithSearch.length; i++){
      var colValue = item[this.columnsWithSearch[i]] ;
      if (!filter || (!!colValue && colValue.toString().toLowerCase().indexOf(filter) !== -1)) {
         return true;
      }
    }
  });
}
}

