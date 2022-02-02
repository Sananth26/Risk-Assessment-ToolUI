import { Component, OnInit, ViewChild } from '@angular/core';
import { PermissionDTO, Roles, ButtonPermisionDTO, enableDto, LookUpItem, dropDowns, UserAccess, RolePermission } from 'src/app/utility/model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApisProvider } from 'src/app/utility/api';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from 'src/app/app.component';
import { util } from 'src/app/utility/util';
import swal from 'sweetalert2';
import {roles1 } from 'src/app/utility/uasModels';
import { Router } from '@angular/router';

@Component({
  selector: 'app-permissionsettings',
  templateUrl: './permissionsettings.component.html',
  styleUrls: ['./permissionsettings.component.scss']
})
export class PermissionsettingsComponent implements OnInit {

  form: FormGroup;
  formData: any;
  gridbind :any;
  spinner: boolean = false;
  data: boolean = false;
  //roles: Roles[] = new Array();
  roles: Array<dropDowns> = [];
  permissionData: PermissionDTO = new PermissionDTO();
  modules: LookUpItem[] = new Array();
  categoryModule: any;
  buttonPermisionDTO: ButtonPermisionDTO = new ButtonPermisionDTO();
  public filterData;
  public enableDto: enableDto;
  URLChildList: any;
  urlList: any;
  displayedColumns: string[];
  //dataSource: any;
  fields: any;
  addItemAlreadyclicked: boolean = false;
  editing = {};
  pleaseFill: string = "Please Fill";
  itemList: any;
  add: boolean = false;
  edit: boolean = false;
  view: boolean = false;
  print: boolean = false;
  delete: boolean = false;
  export: boolean = false;
  categoryItems: Array<roles1> = [];
  //roles dropdown
  rows = [
    // { key: '----Choose your Role----', value: '0' },
   
  ];

  isEditable = {};
  UserAccessModel: UserAccess = new UserAccess();
  RolePermissionModel: RolePermission = new  RolePermission();
  rolepermi: boolean = false;
  roleForm:FormGroup;
   

  @ViewChild('t', {static: true}) tabset: NgbTabset;
  constructor(public api: ApisProvider, public router:Router,
    public appComponent: AppComponent, private fb: FormBuilder, private util: util) {
    this.categoryModule = [{ code: "Master" }, { code: "Store" }];
  }
cards:any;
  ngOnInit() {
  this.cards=["one","two"]
    this.form = this.fb.group({
      roleId: ['',],
    //  name: ['',]
    })

    this.roleForm = this.fb.group({
      roleName: ['', Validators.compose([
        Validators.required
      ])]
    })
    
   this.loadRoles();
   this.OnLoadButtonPermission();
  }

row=[];
  addTable() {
    const obj = {
      roleName: '',
    }
    this.row.push(obj)
  }
  
  deleteRow(x){
    var delBtn = confirm(" Do you want to delete ?");
    if ( delBtn == true ) {
      this.row.splice(x, 1 );
    }   
  } 

  

  onRoleSelectLoadModule(data:any) {
    ;
    this.permissionData =  new PermissionDTO();
    this.permissionData.roleId = data;
  
    if (this.permissionData.roleId != "" && this.permissionData.roleId != undefined ) {
      this.spinner = true;
      this.api.apiMethodFetchDataByGET("api/RolePermission/LoaduserRole?roleId="+ this.permissionData.roleId).then(result => {
        this.spinner = false;
        if (result.status) {
          console.log(result);
            this.permissionData = result.resultOP;
            console.log(this.permissionData);
        }
      }, error => {this.spinner = false; });
    } else {
      this.permissionData.moduleDtos = [];
    }
  }
 
  saveAndGoTo() {
    ;
    var browver = this.getBrowserVersion();
   

  this.permissionData[0].browser =  browver;
     

    this.api.apiMethod("api/RolePermission/CreateorUpdatePermission", this.permissionData).then(result => {
      this.spinner = false;
      if (result.status) {
        swal({
          title: "Updated Successfully!",
          type: "success",
          timer: 2000
          }).then(() => {
          this.permissionData =  new PermissionDTO();
        });
      } else {
        swal(
          'Not Updated!',
          'Permissions has  not been Updated',
          'error'
        ).then(() => {
        });
      }
     },
      err => {
        swal(
          'Not Updated!',
          'Permissions has not been Updated.',
          'error'
        ).then(() => {
        });
      }
      
    );
   
  
     
  }
  cancel() {   
    this.onRoleSelectLoadModule("0");
    this.form.reset();
    this.loadRoles();
    this.router.navigate( ['urs/uasdashboard']);
  }

  clearView(){
    this.categoryItems =[];
    this.roles =[];
    this.onRoleSelectLoadModule("0");
    this.loadRoles();
  }

  loadRoles() {
  
    this.api.apiMethodFetchDataByGET("api/RolePermission/LoadRole").then(result => {
      
      if (result.status){
        this.roles =  <dropDowns[]> result.resultOP;
        this.categoryItems = result.resultOP;
      
      console.log(this.roles);
    }
     // this.loadRolesForTable();
    });

     
  }

  saveRoles(index) {
     
  }

  addCategoryItemClick() {
    //setTimeout(() => {
       this.loadRoles();
   // // },3000);
 
    let categoryItem: roles1 = {
      id: 0,  name: '',browser:'',ipaddress:''
    };
     ;
    //if (type == "category") {
      let tempRows = this.categoryItems;
      tempRows.unshift(categoryItem);
      this.categoryItems = [];
      setTimeout(() => {
        this.categoryItems = tempRows;
      },500);
            
  }

  loadRolesForTable() {
   
  }

  editRow(rowIndex) {
    for (let index = 0; index < this.fields.length; index++) {
      let data = this.fields;
      if (rowIndex == index) {
        this.editing[index] = true;
      }
      else
        this.editing[index] = false;
    }

  }

  updateValue(event, cell, cellValue, index) {
    let keyCount: number = 0;
    this.roles[index][cell] = event.target.value;
    if (cell === "key") {
    }

  }


  styleFunctions(isEditable) {

    let inputEnabled = {
      'border': 'solid 0.9px',
      'background-color': 'White'
    }

    let inputDisabled = {
      'outline': 'none',
      'outline-style': 'none',
      'box-shadow': 'none',
      'border-color': 'transparent',
      'border': 'solid 2px transparent',
      'background-color': 'transparent'
    }
    let returnStyle;

    if (isEditable == true) {
      returnStyle = inputEnabled
    }
    else {
      returnStyle = inputDisabled
    }
    return returnStyle;
  }


  saveRole(){
    console.log(this.update)
    if(!this.update){
      var browver = this.getBrowserVersion();
      let category = new roles1();
      let name=this.roleForm.get("roleName").value;
      console.log(this.roleForm.get("roleName").value)
      category.name = name;
      category.browser = browver;
      console.log(category)
      this.api.apiMethodSaveDataByPOST('api/RolePermission/CreateorUpdateRole', category).then(data => {
        if (data.status) {
          swal({
            title: "Saved Successfully!",
            type: "success",
            timer: 2000
            }).then
            ((result) => {
              this.categoryItems = data.resultOP;
            })
        } else {
          swal(
            'Error!',
            data.description,
            'error'
          )
        }
      });
    }
    else{
      var browver = this.getBrowserVersion();
      let category = new roles1();
      category = <roles1> this.row1;
      category.name = this.roleForm.get("roleName").value;;
      category.browser = browver;
      console.log("Roles Save",category)
      this.api.apiMethodSaveDataByPOST('api/RolePermission/CreateorUpdateRole', category).then(data => {
        console.log(data)
        if (data.status) {
          this.update=false;
          swal({
            title: "Updated Successfully!",
            type: "success",
            timer: 2000
            }).then
            ((result) => {
              this.categoryItems = data.resultOP;
            })
        } else {
          swal(
            'Error!',
            data.description,
            'error'
          )
        }
      });
    }
  
  }

update:boolean=false;
row1:any;
  editRole(row){
    console.log(row)
    this.roleForm.get("roleName").setValue(row.key);
    this.update=true;
    this.row1=row;  

  }

  saveCategoryItem(row, rowIndex) {
    /*{
    "id": 0,
    "name": "Demo10",
    "browser": "Chrome 96",
    "ipaddress": "",
    "key": "Demo10"
} */
  
    var browver = this.getBrowserVersion();
    let category = new roles1();
    category = <roles1> row;
    category.name = row.key;
    category.browser = browver;
    this.isEditable[rowIndex] = !this.isEditable[rowIndex]
    console.log("Roles Save",category)
    this.api.apiMethodSaveDataByPOST('api/RolePermission/CreateorUpdateRole', category).then(async data => {
      if (data.status) {
        swal({
          title: "Saved Successfully!",
          type: "success",
          timer: 2000
          }).then
          ((result) => {
            this.categoryItems = data.resultOP;
          })
      } else {
        swal(
          'Error!',
          data.description,
          'error'
        )
      }
    });
  }

   // Delete row
   deleteCategoryItem(row, rowIndex) {
     ;
    let id = row.id;
    if (id == 0) {
      // if (type == "category") {
      //   this.isEditable[rowIndex] = !this.isEditable[rowIndex];
      //   this.categoryItems = this.categoryItems.filter(x => x.id != 0);
      // } else {
      //   this.isSubEditable[rowIndex] = !this.isSubEditable[rowIndex];
      //   this.subCategoryItems = this.subCategoryItems.filter(x => x.id != 0);
      // }
      return;
    }

    this.api.apiMethodFetchDataByGET('api/RolePermission/Roledelete?id=' + id).then( data => {     
      if (data.status) {
        swal("Deleted Successfully!", "success").then
          ((result) => {
            this.categoryItems = data.resultOP;
          })
      } else {
        swal(
          'Error!',
          data.description,
          'error'
        )
      }
    });
  }

  deleteRole(row)
  { console.log(row)
    this.api.apiMethodFetchDataByGET('api/RolePermission/Roledelete?id=' + row.id).then(data => {  
      console.log(data)   
      if (data.status) {
        swal({
          title: "Deleted Successfully!",
          type: "success",
          timer: 2000
          }).then
          ((result) => {
            this.categoryItems = data.resultOP;
          })
      } else {
        swal(
          'Error!',
          data.description,
          'error'
        )
      }
    });

  }

  onModelChanged(item) {
    item.activeFlag = "Y" ? true : false;
    console.log(item.id, item.alertonoff);
}

// User role and permission
OnLoadButtonPermission() {
    

  var loginUseridEncode =localStorage.getItem('userId'); 
  this.RolePermissionModel.userId =parseInt(this.api.decode(loginUseridEncode));
      this.RolePermissionModel.url= "/urs/permissionsettings";

   this.api.apiMethodFetchDataByPOST("api/Login/RoleandPermission",this.RolePermissionModel).then(async data => {
          
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
  

  myBrowser() { 
    if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) {
        return 'Opera';
    }else if(navigator.userAgent.indexOf("Chrome") != -1 ){
        return 'Chrome';
    }else if(navigator.userAgent.indexOf("Safari") != -1){
        return 'Safari';
    }else if(navigator.userAgent.indexOf("Firefox") != -1 ) {
         return 'Firefox';
    }else if((navigator.userAgent.indexOf("MSIE") != -1 )){
      return 'IE'; 
    } else {
       return 'unknown';
    }
}

getBrowserVersion(){
  var userAgent= navigator.userAgent, tem, 
  matchTest= userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if(/trident/i.test(matchTest[1])){
      tem=  /\brv[ :]+(\d+)/g.exec(userAgent) || [];
      return 'IE '+(tem[1] || '');
  }
  if(matchTest[1]=== 'Chrome'){
      tem= userAgent.match(/\b(OPR|Edge)\/(\d+)/);
      if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
  }
  matchTest= matchTest[2]? [matchTest[1], matchTest[2]]: [navigator.appName, navigator.appVersion, '-?'];
  if((tem= userAgent.match(/version\/(\d+)/i))!= null) matchTest.splice(1, 1, tem[1]);
  return matchTest.join(' ');
}

}
