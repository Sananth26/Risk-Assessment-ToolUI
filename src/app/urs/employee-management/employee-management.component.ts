import { Component, OnInit, ViewChild , AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApisProvider } from 'src/app/utility/api';
import { dropDowns } from 'src/app/utility/TrainingDetailsModel';
import swal from 'sweetalert2';
import { user } from 'src/app/utility/uasModels';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import * as FileSaver from 'file-saver';
import {UserAccess, RolePermission } from 'src/app/utility/model';
import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.scss']
})
export class EmployeeManagementComponent implements OnInit  {
  @ViewChild('search', { static: false }) search: any;

  @ViewChild('t', { static: false }) tabset: NgbTabset;
  form: FormGroup;
  departmentsList: Array<dropDowns> = [];
  rolesList: Array<dropDowns> = [];
  immediateSupervisorList: Array<dropDowns> = [];
  dataForTableView: any;
  users: any;
  user: user = new user();
  ItProcessAccess: boolean = false;
  
  ManagerAccess: boolean = false;
  IsActive: boolean = true;
  FileImported : File = null;
  loginUserid : any;
   fields =[];
  displayFields = [];
  filteredData = [];
  temp =[];
  columns = [];
  columnsWithSearch : string[] = [];
  rows = [];

  //load all users
  UserAccessModel: UserAccess = new UserAccess();
  RolePermissionModel: RolePermission = new  RolePermission();

  constructor(private router: Router,private formBuilder: FormBuilder, private api: ApisProvider) { }

  ngOnInit() {
    
    this.form = this.formBuilder.group({
      'id': ['0'],
      // companyId: [''],
      'corporateId': new FormControl(null, [Validators.required]),
      'firstName': new FormControl(null, [Validators.required]),
     
      'immediateSupervisorId': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'mobileNo': new FormControl(null, [Validators.required]),
      'departmentId': new FormControl({ value: "" }, [Validators.required]),
      'roleId': new FormControl(null, [Validators.required]),
      'Location' :new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
     // 'ItProcessAccess' : new FormControl()
    });
    this.loadDepartments();
    this.loadRoles();
    this.loadUserData();
    // var loginUseridEncode =localStorage.getItem('userId');  ;
    // this.loginUserid =this.api.decode(loginUseridEncode)
     this.OnLoadButtonPermission();
  }

  Mail()
  {
    
    this.api.apiMethodFetchDataByGET("api/Email/Emailapproval").then(result => {
      if (result=="Success") {
        swal("Mail sent Successfully!", "success").then
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

  validationMsg:boolean=false;
  isUpdate:boolean=false;
  saveAndGo(tabActiveId) {
    console.log("if Valid")
    this.validationMsg=false;
    if (this.form.status == "VALID") {
      if(this.user.immediateSupervisorId == undefined){
        this.user.immediateSupervisorId = this.loginUserid;
      }
      this.user.ItProcessAccess = this.ItProcessAccess == false ? "N" : "Y";
      this.user.ManagerAccess = this.ManagerAccess == false ? "N" : "Y";
      this.user.IsActive = this.IsActive == false ? "N" : "Y";
      console.log("User",this.user)
      if(!this.isUpdate){
        this.api.apiMethodFetchDataByPOST("api/UserMaster/CreateOrUpdateUser", this.user).then(result => {
          console.log(result)
          this.form.controls['email'].enable();
          this.isUpdate=false;
          if (result.status) {
            swal({
              title: "Saved Successfully!",
              type: "success",
              timer: 2000
              }).then
              ((result) => {
                this.tabset.select(tabActiveId);
                this.form.reset();
                this.loadUserData();
              })
          } else {
            swal({
              title: "Error!",
              text: result.description,
              type: "error",
              timer: 2000
              })
            this.form.reset();
          }
        })
      }else{
        this.api.apiMethodFetchDataByPOST("api/UserMaster/CreateOrUpdateUser", this.user).then(result => {
          console.log(result)
          this.form.controls['email'].enable();
          this.isUpdate=false;
          if (result.status) {
            swal({
              title: "Updated Successfully!",
              type: "success",
              timer: 2000
              }).then
              ((result) => {
                this.tabset.select(tabActiveId);
                this.form.reset();
                this.loadUserData();
              })
          } else {
            swal({
              title: "Error!",
              text: result.description,
              type: "error",
              timer: 2000
              })
            this.form.reset();
          }
        })
      }
      
    }
    else{
    console.log("Is invalid")
    this.validationMsg=true;    
    }
    console.log(this.form);
  }

  loadDepartments() {
    this.departmentsList = [];
    this.api.apiMethodFetchDataByGET("api/UserMaster/LoadDepartments").then(result => {
      if (result.status) {
        this.departmentsList = <dropDowns[]>result.resultOP;
      } else {
        swal(
          'Error!',
          result.description,
          'error'
        )
      }
    });
  }
 
  onDeptChnage(event:any){
    this.immediateSupervisorList =[];
    let id = event;
    
    this.loadSupervisors(id); 
       
  }

  
  //no Api yet
  loadRoles() {
    this.api.apiMethodFetchDataByGET("api/UserMaster/LoadRoles").then(result => {
       if (result.status) {
        this.rolesList = <dropDowns[]>result.resultOP;
      } else {
        swal(
          'Error!',
          result.description,
          'error'
        )
      }
    });
  }

  loadSupervisors(deptId) {
    this.api.apiMethodFetchDataByGET("api/UserMaster/LoadUsers?deptId=" + deptId).then(result => {
      if (result.status) {
        this.immediateSupervisorList = <dropDowns[]>result.resultOP;
      } else {
        swal(
          'Error!',
          result.description,
          'error'
        )
      }
    });
  }

  loadUserData() {
    this.api.apiMethodFetchDataByGET("api/UserMaster/LoadUserDatas").then(data => {
      console.log("data",data)
      if (data.status) {
         this.users = data.resultOP;   
         console.log(this.users);
         this.fields = data.resultOP;   
         this.displayFields = data.resultOP;   
         this.filteredData = data.resultOP;
         this.columnsWithSearch = Object.keys(this.users[0]);
      } else {
        swal(
          'could not fetch the Data.',
          data.description,
          'error'
        )
      }
    });
  }

  cancel() {
    this.ItProcessAccess = false;
    this.ManagerAccess=false;
    this.isUpdate=false
    this.form.reset();
    this.loadUserData();
    this.form.controls['email'].enable();
    this.router.navigate( ['urs/uasdashboard']);
  }

  editUser(elementId) {
   this.isUpdate=true;
   this.form.controls['email'].disable();
      this.api.apiMethodFetchDataByGET('api/UserMaster/LoadUsersForEdit?userId=' + elementId).then(result => {
          let data = result.resultOP[0];
;
        this.user.firstName = data.firstName,
        this.user.corporateId = data.corporateId,
        this.user.id = data.id,
        this.user.lastName = data.lastName,
        this.user.email = data.email,
        this.user.mobileNo = data.mobileNo,
        this.loadSupervisors(this.user.departmentId);
        
        this.user.departmentId = data.departmentId,
        this.user.roleId = data.roleId,
        this.ItProcessAccess = data.itProcessAccess == "N" ? false : true;
        this.ManagerAccess = data.managerAccess == "N" ? false : true;
        this.user.password=data.password,
        this.IsActive = data.IsActive == "N" ? false : true;
        this.user.immediateSupervisorId = data.immediateSupervisorId,
        this.user.location = data.location,
        this.user.doj = data.doj;
      //  console.log(this.user);
    });
  }

  deleteUser(elementId) {
    console.log(elementId);
    swal({
      title: 'Are you sure?',
      text: 'Delete User Record',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {

      if (result.value) {
        this.api.apiMethodFetchDataByGET('api/UserMaster/DeleteUser?userId=' + elementId).then(result => {
          if (result.status == true) {
            swal(
              'Deleted!',
              'Your Data has been Deleted.',
              'success'
            ).then((result) => {
              this.loadUserData();
            })
          } else {
            swal(
              'Error!',
              result.description,
              'error'
            )
            this.loadUserData();

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

  buttonImport() {
    this.api.apiMethodFetchDataByGET("api/UserMaster/ExcelExport").then(data => {
     if (data.filecont != undefined) {
       var blobFile = this.b64toBlob(data.filecont, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
       const file = new File([blobFile], 'Sample_User_Import_Format.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
       FileSaver.saveAs(file); //'SampleImport.xlsx'
     }

   });
}

handleFileInput(fileInput: any) { 
 ;
  this.FileImported = <File>fileInput.target.files[0];
  let files: File = <File>fileInput.target.files[0];
  let fileToUpload = <File>files;
 const formData = new FormData();
 formData.append('file', fileToUpload, fileToUpload.name);
  
 this.api.sendFormData('api/UserCreation/ExcelImport',formData ).subscribe(result => {
  if (result.status) {
    swal("Saved Successfully!", "success").then
      ((result) => {
         this.form.reset();
        //this.loadUserData();
      })
    
  } else {
    swal(
      'Error!',
      result.description,
      'error'
    )
    this.form.reset();
  }
});
fileInput.target.value = '';
}

b64toBlob(b64Data, contentType) {

  contentType = contentType || '';
  var sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, { type: contentType });
  return blob;
} 

// User role and permission
OnLoadButtonPermission() {
 
;
var loginUseridEncode =localStorage.getItem('userId'); 
this.RolePermissionModel.userId =parseInt(this.api.decode(loginUseridEncode));
   this.RolePermissionModel.url= "/urs/employeemanagement";

this.api.apiMethodFetchDataByPOST("api/Login/RoleandPermission",this.RolePermissionModel).then(async data => {
      
       if (data.status) {
       
        this.UserAccessModel = data.resultOP[0];
        ;
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
  // let filter = event.target.value.toLowerCase();
  // this.users = this.filteredData.filter(item => {
  // for (let i = 0; i < this.columnsWithSearch.length; i++){
  //     var colValue = item[this.columnsWithSearch[i]] ;
  //     if (!filter || (!!colValue && colValue.toString().toLowerCase().indexOf(filter) !== -1)) {
  //        return true;
  //     }
  //   }
  // });
}

updateFilter(event) {
  ;
  // if (this.tabset.activeId=="opentab")
  // {
  //  ;
  //    const val = event.target.value.toLowerCase();
  //    const temp = this.openrequesttemp.filter(function (d) {
  //        return d.status.toLowerCase().indexOf(val) !== -1 ||
  //        d.requestid.toLowerCase().indexOf(val) !== -1 ||
  //        d.category.toLowerCase().indexOf(val) !== -1 ||
  //        d.assignedTo.toLowerCase().indexOf(val) !== -1 ||
  //        d.lastUpdate.toLowerCase().indexOf(val) !== -1 || !val;
  //    });
  //    this.openrequestList = temp;
  //    this.myTable.offset = 0;
  //  }
  //  else if (this.tabset.activeId=="closedtab")
  //  { ;
  //    const val = event.target.value.toLowerCase();
  //    const temp = this.closerequesttemp.filter(function (d) {
  //        return d.status.toLowerCase().indexOf(val) !== -1 ||
  //        d.requestid.toLowerCase().indexOf(val) !== -1 ||
  //        d.category.toLowerCase().indexOf(val) !== -1 ||
  //        d.assignedTo.toLowerCase().indexOf(val) !== -1 ||
  //        d.lastUpdate.toLowerCase().indexOf(val) !== -1 || !val;
  //    });
  //    this.closedrequestList = temp;
  //    this.myTableclosed.offset = 0;}
  
 }



}
