import { Component, OnInit, ViewChild } from '@angular/core';
import { ApisProvider } from 'src/app/utility/api';
import { dropDowns } from 'src/app/utility/TrainingDetailsModel';
import swal from 'sweetalert2';
import { uasWorkFlow, UsersDTO, WorkFlowMasterDetails, WorkFlowMasterDetailsDTO,SubCategoryList, copyLevelDTO,DeleteLevelBase, levelLst, WorkFlowLevelDTO, WorkFlowMaster, LevelDTO } from 'src/app/utility/uasModels';
import { Roles } from 'src/app/utility/model';
import { element } from 'protractor';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { UserAccess, RolePermission } from 'src/app/utility/model';
import { debug } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { WorkflowmodalComponent } from 'src/app/modals/workflowmodal/workflowmodal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})

export class WorkflowComponent implements OnInit {
  toSelectedSubCategory: Array<SubCategoryList> = [];
  selectedCategory: Array<dropDowns> = [];
  selectedSubCategory: Array<SubCategoryList> = [];
  selectedUsers: Array<UsersDTO> = [];
  selectedRoles : [];
  SelectedLevel :[];
  SelectedCategoryName :[];
  workFlowMaster: Array<WorkFlowMaster> = [];

  workFlowMasterDetailsList: Array<WorkFlowMasterDetailsDTO> = [];
  workFlowMasterDetails: Array<WorkFlowMasterDetails> = [];
  item: uasWorkFlow = new uasWorkFlow();
  roleDTOList: Array<dropDowns> = [];
  categoryDTOList: Array<dropDowns> = [];
  subCategoryDTOList: Array<dropDowns> = [];
  levelList =[];
  SubcategoryDTOList =[];
  copyLevelItem: copyLevelDTO = new copyLevelDTO();
  deleteLevelBase : DeleteLevelBase = new  DeleteLevelBase();
  workFlowCLDetails: Array<WorkFlowMasterDetails> = [];
  WFCreateView =[];
  workFlowLevelList: WorkFlowLevelDTO[] = new Array();
  workFlowLevelDTO: WorkFlowLevelDTO = new WorkFlowLevelDTO();
  workFlowLevelDTO1: WorkFlowLevelDTO = new WorkFlowLevelDTO();
  userDTO : UsersDTO = new  UsersDTO();
  usertemp =[];
  filterQuery = '';
  submitted: boolean = false;
  iserrorinSaving: boolean = false;
  isSuccessinSaving: boolean = false;
  lookUpkeyExists: boolean = false;
  categoryKeyExists: boolean = false;
  addItemAlreadyclicked: boolean = false;
  isFieldsFilled: boolean = false;
  isdocumentlist = false;
  public rowsOnPage = 10;
  public sortBy = '';
  public sortOrder = 'desc';
  public isLoading: boolean = false;
  isUpdating: boolean = false;
  isDeleting: boolean = false;
  isCancel: boolean = false;
  public isisLoading = false;
  pleaseFill: string = "Please Fill";
  rows = [];
  editing = {};
  isEditablee={};
  docItemList: any;
   spinnerFlag:boolean = false;
  isSave:boolean = false;
  isLevelUsed: boolean=false;
  onLevelstatus ='';
btnlevelname ="Save";
btnlevelUser ="Save";
  categorydropdownSettings = { 
    singleSelection: false, 
    text:"Select Category",
    selectAllText:'Select All',
    unSelectAllText:'UnSelect All',
    enableSearchFilter: true,
    classes: "myclass inputField",
    labelKey: 'key',
  }; 

  leveldropdownSettings = { 
    singleSelection: true, 
    text:"Select Level",
    selectAllText:'Select All',
    unSelectAllText:'UnSelect All',
    enableSearchFilter: true,
    classes: "myclass inputField",
    labelKey: 'key',
  }; 

  userdropdownSettings = { 
    singleSelection: false,
    text: 'Select User',
    enableCheckAll:false,
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    enableFilterSelectAll :false,
    badgeShowLimit: 3,
    classes: "myclass inputField",
    labelKey: 'userFirstName',
    position:"bottom",
    maxHeight:150
  }; 

  dropdownSettings: any = {
    singleSelection: true,
    idField: 'id',
    textField: 'key',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 6,
    allowSearchFilter: true
  };

  dropdownUsersSettings: any = {
    singleSelection: false,
    idField: 'id',
    textField: 'userFirstName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 6,
    allowSearchFilter: true
  };

  singleSelectdropdownSettings: any = {
    singleSelection: true,
    idField: 'id',
    textField: 'key',
    itemsShowLimit: 6,
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };

  headerName: string = "Edit Level";
  completeData: any = [];
  dispalayFields: any = [];
  isEditable: boolean = false;
  userListTemp:any=[];
  UserAccessModel: UserAccess = new UserAccess();
  RolePermissionModel: RolePermission = new  RolePermission();
  filteredData = [];
  columnsWithSearch : string[] = [];
  levelForm:FormGroup;
  levelModel:LevelDTO= new LevelDTO();
  dataList=[{key:"Y    ",value:"Yes"},{key:"N",value:"No"}];

  saveLevel(){
   /*if(!this.isUpdate){
     this.levelModel.id=0;
     console.log(this.levelModel)
     this.api.apiMethodFetchDataByPOST("api/WorkFlow/SaveLevelsMaster", this.levelModel).then(result => {
       console.log(result);
       this.isUpdate=false
       if (result.status) {
        swal({
          title: "Saved Successfully!",
          type: "success",
          timer: 2000
          }).then
           ((result) => {
             this.cancelCLData();
             this.onloadLevel();
           })
       } else {
         swal(
           'Error!',
           result.description,
           'error'
         )
         this.onloadLevel();
       }
     });
   }else{*/
    console.log(this.levelModel)
    this.levelModel.id=this.levelrow.id;
    this.api.apiMethodFetchDataByPOST("api/WorkFlow/SaveLevelsMaster", this.levelModel).then(result => {
      console.log(result);
      this.isUpdate=false
      if (result.status) {
        swal({
          title: "Updated Successfully",
          type: "success",
          timer: 2000
          }).then
          ((result) => {
            this.cancelCLData();
            this.onloadLevel();
            this.btnlevelname="Save";
            this.levelModel.workFlowLevelName="";
          })
      } else {
        swal(
          'Error!',
          result.description,
          'error'
        )
        this.onloadLevel();
      }
    });
   /*}
    */
  }

  isUpdate:boolean=false;
  levelrow:any;
  editLevel(row){
    console.log(row)
    this.isUpdate=true;
    this.btnlevelname="Update";
    //this.levelModel.activeFlag=row.activeFlag=="Y    "?"Y    ":"N";
    this.levelModel.activeFlag="Y    ";
        this.levelModel.workFlowLevelName=row.workFlowLevelName
    this.isUpdate=true;
    this.levelrow=row;
  }


  constructor(private router:Router,config: NgbModalConfig,public matDialog: MatDialog,private modalService: NgbModal, private api: ApisProvider,private fb: FormBuilder)
   {  //config: NgbModalConfig 
    config.backdrop = 'static';
    config.keyboard = false;
}
  sectedItems:any;
  ngOnInit() {
    this.levelModel.activeFlag="Y    ";
    this.levelForm = this.fb.group({
      workFlowLevelName: ['', Validators.compose([
        Validators.required
      ])],
      active: ['', Validators.compose([
        Validators.required
      ])]
    })
    this.onloadLevel();
    this.loadRolesAndCategory();
    this.loadWFCompleteDetails();
    this.OnLoadButtonPermission();
    //  this.onCategorySelectCreate();
    this.onLoadCreateView();

    this.levelForm.get("active").setValue(this.selectedItems);
  }

  data = [
    { key: 'Y', value: 'yes' },
    { key: 'N', value: 'no' },
  ];
  
selectedItems=[{ key: 'Y', value: 'yes' }]
  onlevelSave(){
 if(!this.update){
  this.workFlowLevelDTO1.activeFlag=this.levelForm.get("active").value;
  this.workFlowLevelDTO1.workFlowLevelName=this.levelForm.get("levelName").value;
  this.workFlowLevelDTO1.id=0;
  console.log(this.workFlowLevelDTO1)
  this.api.apiMethodFetchDataByPOST("api/WorkFlow/SaveLevelsMaster", this.workFlowLevelDTO1).then(result => {
    console.log("result",result)
    if (result.status) {
      swal("Saved Successfully!", "").then((result) => {
          this.cancelCLData();
          this.onloadLevel();
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
 else{
  this.workFlowLevelDTO1.activeFlag=this.levelForm.get("active").value;
  this.workFlowLevelDTO1.workFlowLevelName=this.levelForm.get("levelName").value;
  this.workFlowLevelDTO1.id=this.row1.id;
  console.log(this.workFlowLevelDTO1)
  this.api.apiMethodFetchDataByPOST("api/WorkFlow/SaveLevelsMaster", this.workFlowLevelDTO1).then(result => {
    console.log("result",result)
    if (result.status) {
      swal("Updated Successfully!", "").then((result) => {
          this.cancelCLData();
          this.onloadLevel();
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
  } 


update:boolean=false;
row1:any;
selectedValue:any
  onLevelEdit(row){
    this.isEditable=true
    console.log(row);
    this.btnlevelname='Update'
    this.levelForm.get("levelName").setValue(row.workFlowLevelName);
    this.levelForm.get("active").setValue(row.activeFlag==="Y"?"Yes":"No");
    this.update=true;
    this.row1=row;  
  }

  onloadLevel(){
      this.api.apiMethodFetchDataByGET("api/WorkFlow/LoadWorkFlow").then(result => {
        console.log(result)
        if (result.status) {
           this.workFlowLevelList = result.resultOP;
        } else {
          swal(
            'Error!',
            result.description,
            'error'
          )
        }
      });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = 'Closed with: ${result}';
    }, (reason) => {
      this.closeResult = 'Dismissed ${this.getDismissReason(reason)}';
    });
  }

  onEditWorkflow(row)
  {
    console.log(row)
    this.openModal(row.id)
  }

  openModal(id?) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.position= {top: '3%'}
    dialogConfig.id = "modal-component";
    dialogConfig.height = "500px";
    dialogConfig.width = "1000px";
    dialogConfig.data={id};
    const modalDialog = this.matDialog.open(WorkflowmodalComponent, dialogConfig);
  }


  updateFilter(val: any) {
    const value = val.toString().toLowerCase().trim();
    const count = this.completeData.length;
    const keys = Object.keys(this.dispalayFields[0]);
    this.completeData = this.dispalayFields.filter(item => {
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
      this.completeData = this.dispalayFields;
  }

  loadWFCompleteDetails() {
    // this.completeData = [];
    // this.dispalayFields = [];
    //     this.dispalayFields =this.completeData ;
    //     this.filteredData = this.completeData ;
    //     this.columnsWithSearch = Object.keys(this.completeData[0]);
      }  
  
     
  loadRolesAndCategory() {
    this.api.apiMethodFetchDataByGET("api/WorkFlow/loadRolesAndCategory").then(result => {
      if (result.status) {
        this.roleDTOList = <dropDowns[]>result.resultOP.roles;
        this.categoryDTOList = <dropDowns[]>result.resultOP.categoriesItem;
       
        //this. this.item.userList = <UsersDTO[]>result.resultOP.users;
        this.userListTemp = <UsersDTO[]>result.resultOP.users;
        console.log("Demo++",this.roleDTOList, this.userListTemp)
       }
       else {
        swal(
          'Error!',
          result.description,
          'error'
        )
      }
    });
              
  }



  onRoleSelect(item: any) {
    ;
    this.item.userList = [... this.item.userList];
    // this.api.apiMethodFetchDataByPOST("api/WorkFlow/LoadUsers", this.item.selectedRoles).then(result => {
    //   if (result.status) {
    //     this.item.userList = result.resultOP;
    //   } else {
    //     swal(
    //       'Error!',
    //       result.description,
    //       'error'
    //     )
    //   }
    // });
  }

  onRoleDeSelect(item: any) {
    this.item.selectedUsers = [];
   // this.item.userList = this.item.userList.filter(element => element.userRoleId != item.id);
    //this.selectedUsers = this.selectedUsers.filter(element => element.userRoleId != item.id);
  //  this.item.selectedUsers = this.selectedUsers;
  }

  onRoleSelectAll(item: any) {
 

    // this.api.apiMethodFetchDataByPOST("api/WorkFlow/LoadUsers", item).then(result => {
    //   if (result.status) {
    //     this.item.userList = <UsersDTO[]>result.resultOP;
    //   } else {
    //     swal(
    //       'Error!',
    //       result.description,
    //       'error'
    //     )
    //   }
    // });
  }

  onRoleDeSelectAll(item: any) {
    //this.item.userList = [];
    this.item.selectedUsers = [];
    this.selectedUsers = [];
  }
 

  onCategorySelectCreate(item: any) {
    this.selectedSubCategory = [];
    this.workFlowMasterDetails = [];
    ;
  
    this.api.apiMethodFetchDataByPOST("api/WorkFlow/LoadSubCategory", this.selectedCategory).then(result => {
      if (result.status) {
        this.subCategoryDTOList = result.resultOP;
        } else {
        swal(
          'Error!',
          result.description,
          'error'
        )
      }
    });
    if (this.selectedCategory.length>0)
  {
    let id = this.selectedCategory[0].id;
    this.LoadWorkflowdetails(id);
  }}
   
  onCategorySelect(item: any) {
    this.toSelectedSubCategory = [];
    this.api.apiMethodFetchDataByPOST("api/WorkFlow/LoadSubCategory", this.copyLevelItem.toSelectedCategory).then(result => {
      if (result.status) {
        this.copyLevelItem.toSubCategoryList = result.resultOP;
      } else {
        swal(
          'Error!',
          result.description,
          'error'
        )
      }
    });
  }

  onCategoryDeSelect(item: any) {
    this.copyLevelItem.toSelectedSubCategory = [];
    this.copyLevelItem.toSubCategoryList = this.copyLevelItem.toSubCategoryList.filter(element => element.categoryId != item.id);
    this.toSelectedSubCategory = this.toSelectedSubCategory.filter(element => element.categoryId != item.id);
    this.copyLevelItem.toSelectedSubCategory = this.toSelectedSubCategory;
  }

  onCategorySelectAll(item: any) {
    this.api.apiMethodFetchDataByPOST("api/WorkFlow/LoadSubCategory", item).then(result => {
      if (result.status) {
        this.copyLevelItem.toSubCategoryList = result.resultOP;
      } else {
        swal(
          'Error!',
          result.description,
          'error'
        )
      }
    });
  }
  onSubCategorySelect(item: any) {

  }
  onCategoryDeSelectAll(item: any) {
    this.copyLevelItem.toSubCategoryList = [];
    this.copyLevelItem.toSelectedSubCategory = [];
    this.toSelectedSubCategory = [];
  }

  onDropDownSelect(item: any, type: string) {
    ;
    if (type == "SubCategory") {
      let data = this.copyLevelItem.toSubCategoryList.filter(x => x.id == item.id);
      if (this.toSelectedSubCategory == null || this.toSelectedSubCategory == undefined) {
        this.toSelectedSubCategory = [];
      }
      this.toSelectedSubCategory.push(data[0])
    } else {
      let dataUser = this.item.userList.filter(x => x.id == item.id);
     //let dataUser = this.item.userList;
      if (this.selectedUsers == null || this.selectedUsers == undefined) {
        this.selectedUsers = [];
      }
     
      this.selectedUsers.push(dataUser[0]);
    }
  }


  
  /*
    addNewUsers:any=new Array();
  onNewUsersSearch(evt: any) {
    this.addNewUsers=[];
    if(evt.target.value.length > 2){
      this.configService.HTTPPostAPI(evt.target.value,"common/loadProjectUsersByDeptAndSearch/"+this.projectId+"/"+this.selectedDocumentConstant+"/"+0).subscribe((resp) => {
        resp.result.forEach(element => {
          if(this.addNewUsers.filter(f =>f.id == +element.key).length == 0)
            this.addNewUsers.push({ id: element.key, itemName: element.value,displayOrder:0 });
        });
      }, err => {
      });
    }
  }

          <angular2-multiselect [data]="this.addNewUsers" [(ngModel)]="selectredNewUsers"
            [settings]="newUserDropdownSettings">
            <c-search>
              <ng-template>
                <input type="text" [(ngModel)]="newUserInput" (keyup)="onNewUsersSearch($event)"
                  placeholder="Search Users" />
              </ng-template>
            </c-search>
            <c-item>
              <ng-template let-item="item">
                <label>{{item.itemName}}</label>
              </ng-template>
            </c-item>
          </angular2-multiselect>
  */
  

  onDropDownDeSelect(item: any, type: string) {
    if (type == "SubCategory") {
      this.toSelectedSubCategory = this.toSelectedSubCategory.filter(x => x.id != item.id);
    } else {
      this.selectedUsers = this.selectedUsers.filter(x => x.id != item.id);
    }
  }

  onDropDownSelectAll(item: any, type: string) {
    if (type == "SubCategory") {
      this.toSelectedSubCategory = this.copyLevelItem.toSubCategoryList;
    } else {
      this.selectedUsers = this.item.userList;
    }
  }

  onDropDownDeSelectAll(item: any, type: string) {
    if (type == "SubCategory") {
      this.copyLevelItem.toSelectedSubCategory = [];
      this.toSelectedSubCategory = [];
    } else {
      this.item.selectedUsers = [];
      this.selectedUsers = [];
    }
  }

  sortWorkflow() {
    if (this.workFlowMasterDetails.length <= 0) {
      return;
    }
    var activeList = this.workFlowMasterDetails.filter(element => element.level > 0);
    var inactiveList = this.workFlowMasterDetails.filter(element => element.level == 0);

    activeList = activeList.sort((a, b) => a.level - b.level);

    activeList.forEach((element, i) => {
      element.level = (i + 1);
    });

    this.workFlowMasterDetails = [];
    this.workFlowMasterDetails = activeList;

    inactiveList.forEach(element => {
      this.workFlowMasterDetails.push(element);
    });
  }

  // onDeleteChange(id: number) {
  //   this.api.apiMethodFetchDataByGET("api/WorkFlow/DeleteLevel?id=" + id).then(result => {
  //     if (result.status) {
  //       swal("Deleted Successfully!", "success").then
  //         ((result) => {
  //           this.onCLCategorySelect("");
  //         })

  //     } else {
  //       swal(
  //         'Error!',
  //         result.description,
  //         'error'
  //       )
  //     }
  //   });
  // }

  onDeleteChange(id:number){
    console.log(id,"id")
    this.api.apiMethodFetchDataByGET("api/WorkFlow/DeleteLevel?id=" + id).then(result => {
      if (result.status) {
               swal("Deleted Successfully!", "success").then
                 ((result) => {
                  this.onLoadCreateView();
                 })
      
             } 
       else 
      {
        swal(
          'Error!',
          result.description,
          'error'
        )
      }
    });
   
  
  }

  
   
   
  save() {
    
    if (this.item.selectedRoles == undefined || this.item.selectedRoles.length==0) {
      // swal(
      //   'Please enter the level Names to save.!',
      //   'The Level name cannot be empty, Please enter Level name to continue.',
      //   'info'
      // )
      // return;
      console.log("if")
    }
    else 
    {
// if (this.selectedUsers.length <= 1) {

//   // swal(
//   //   'Atleast 2 users need to be selected at each workflow level.!',
//   //   'Please select atleast 2 users to continue.',
//   //   'info'
//   // )
//   // return;
// }

this.selectedUsers =  this.item.selectedUsers;

//this.item.combinationId = this.selectedCategory;
console.log("else")
      this.item.selectedUsers = [];
      this.item.selectedCategory = [];
      this.item.selectedSubCategory = [];
      this.item.selectedUsers = this.selectedUsers;
      this.item.selectedCategory = this.selectedCategory;
      this.item.selectedSubCategory = this.selectedSubCategory;
      console.log(this.item)
    if(!this.isEditable){
      this.api.apiMethodFetchDataByPOST("api/WorkFlow/SaveLevels", this.item).then(result => {
        this.onLoadCreateView();
        if(this.item.combinationId>0)
         {   this.LoadWorkflowdetails(this.item.combinationId) }
         else{
         
              this.LoadWorkflowdetails(this.selectedCategory[0].id) 
         }
         this.onLoadCreateView();
        if (result.status) {
          this.isEditable=false;
          swal({
            title: "Saved Successfully!",
            type: "success",
            timer: 2000
            }).then
            ((result) => {
              this.onLoadCreateView();
              if(this.item.combinationId>0)
              {   this.LoadWorkflowdetails(this.item.combinationId) }
              else{
              
                   this.LoadWorkflowdetails(  this.selectedCategory[0].id) 
              }
              this.btnlevelUser ="Save";
              this.item.selectedRoles=[];
              this.item.selectedUsers=[];
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
      this.api.apiMethodFetchDataByPOST("api/WorkFlow/SaveLevels", this.item).then(result => {
        this.onLoadCreateView();
        if(this.item.combinationId>0)
         {   this.LoadWorkflowdetails(this.item.combinationId) }
         else{
         
              this.LoadWorkflowdetails(  this.selectedCategory[0].id) 
         }
         this.onLoadCreateView();
        if (result.status) {
          this.isEditable=false;
          swal({
            title: "Updated Successfully!",
            type: "success",
            timer: 2000
            }).then
            ((result) => {
              this.onLoadCreateView();
              if(this.item.combinationId>0)
              {   this.LoadWorkflowdetails(this.item.combinationId) }
              else{
              
                   this.LoadWorkflowdetails(  this.selectedCategory[0].id) 
              }
              this.btnlevelUser ="Save";
              this.item.selectedRoles=[];
              this.item.selectedUsers=[];
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
    if(this.item.combinationId>0)
         {   this.LoadWorkflowdetails(this.item.combinationId) }
         else{
         this.LoadWorkflowdetails(this.selectedCategory[0].id) 
         }
        this.item.selectedRoles=[];
      this.item.selectedUsers=[];
    }
  }
  
  Deletelevel(levellist:any){
    if (levellist.level>0 && this.item.combinationId>0){
     this.deleteLevelBase.level=levellist.level;
     this.deleteLevelBase.combinationId = this.item.combinationId;
    this.api.apiMethodFetchDataByPOST("api/WorkFlow/DeleteLevelBasedonlevel", this.deleteLevelBase).then(result => {
      if (result.status) {
        swal({
          title: "Deleted!",
          type: "success",
          timer: 2000
          }).then
                 ((result) => {
               this.onLoadCreateView();
               this.LoadWorkflowdetails(this.item.combinationId);    

                 })
      
             } 
       else 
      {
        swal(
          'Error!',
          result.description,
          'error'
        )
      }
    });
  }
  else
  {
    swal(
      'Error!',
     'Something Wrong',
      'error'
    )
  }
  }

  Leveledit(levellist:any){
    this.isEditable=true;
    this.btnlevelUser='Update'
    this.selectedUsers=[];
    this.item.deleteLevel = levellist.level;
    this.item.selectedRoles = this.roleDTOList.filter(x=>x.id== levellist.level);
    console.log("Edit+++++++",this.item.selectedRoles)
 
   if ( levellist.usersIds!=null|| levellist.usersIds!=undefined)
  {
    this. usertemp=[];
   levellist.usersIds.forEach(element => {
   this.userDTO = new UsersDTO;
    var filuser = this.item.userList .filter (x=>x.id==element.id);
   this.userDTO.id = filuser[0].id;
   this.userDTO.userFirstName = filuser[0].userFirstName;
   this.userDTO.userRoleId = filuser[0].userRoleId;
   this. usertemp.push(this.userDTO);
    
  });
  this.item.selectedUsers = <UsersDTO[]>this.usertemp;
  this.selectedUsers = <UsersDTO[]>this.usertemp;
}

  }
  cancel() {
    this.item = new uasWorkFlow();
    this.selectedSubCategory = [];
    this.selectedUsers = [];
    this.isEditable = false;
    this.loadWFCompleteDetails();
    this.levelModel.workFlowLevelName='';
    this.isUpdate=false
    this.router.navigate( ['urs/uasdashboard'])
    
  }

  openScrollableContent(longContent) {
    this.modalService.open(longContent ,{ size:'xl',scrollable: true });
  }


  closeResult: string;
  openContent(contentPopUp, id: number) {
    this.item = new uasWorkFlow();
    this.selectedUsers = [];
    if (id > 0) {
           ;
           this.btnlevelUser="Update";
           this.item.id= id;
           this.item.combinationId= id;
           this.item.deleteLevel =0;
           this.LoadWorkflowdetails(id);
if (this.WFCreateView !=null || this.WFCreateView!=undefined)
{
        this.selectedCategory = this.WFCreateView.filter(x => x.id == id);
}
if (this.userListTemp!=null|| this.userListTemp!= undefined)
{
        this.item.userList =this.userListTemp;
}
     //  this. selectedCategory= 
        const modalRef = this.modalService.open(contentPopUp, { backdropClass: '', size: 'xl' ,scrollable: true }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
         this.headerName = "Edit Level";

    } else {
      this.headerName = "New Level";
      this.addLevel();

      this.btnlevelUser="Save";
      const modalRef = this.modalService.open(contentPopUp, { backdropClass: '', size: 'xl',scrollable: true  }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }

  LoadWorkflowdetails(id:number)
  {
    this.api.apiMethodFetchDataByGET("api/WorkFlow/LoadCompleteWorkFlowDetails?combinationid=" + id).then(result => {
      if (result.status) {
        this.workFlowMasterDetailsList =  result.resultOP;
      }
       else 
      {
        swal(
          'Error!',
          result.description,
          'error'
        )
      }
    });

  }

  addLevel() {
    // var activeList = this.workFlowMasterDetails.filter(element => element.level > 0);
    // let level = 0;
    // let combinationId = 0;

    // if (activeList.length >= 1) {
    //   activeList = activeList.sort((a, b) => a.level - b.level);
    //   level = activeList[activeList.length - 1].level;
    //   combinationId = activeList[activeList.length - 1].combinationId;
    // }
    this.workFlowMasterDetailsList= new  Array<WorkFlowMasterDetailsDTO> ();
    this.selectedCategory=[];
    this.item = new uasWorkFlow();
    this.item.id = 0;
    this.item.combinationId = 0;
    this.item.deleteLevel=0;
   
    this.item.isActive = true;
    this.item.delete = false;
    this.item.userList = this.userListTemp;
   
  }

  saveLevelDetails() {
    var activeList = this.workFlowMasterDetails.filter(element => element.level > 0);
    activeList = activeList.sort((a, b) => a.level - b.level);

    let highestlevel = activeList[activeList.length - 1].level;

    for (let index = 1; index <= highestlevel; index++) {
      var data = activeList.filter(x => x.level == index);
      if (data.length <= 0) {
        swal(
          'Level ' + index + ' is missing.',
          'Please change accordingly to continue.',
          'warning'
        )
        return;
      }

      if (data.length > 1) {
        swal(
          'Level ' + index + ' is repeating',
          'Please change accordingly to continue.',
          'warning'
        )
        return;
      }
    }

    this.api.apiMethodFetchDataByPOST("api/WorkFlow/SaveLevelsNumber", activeList).then(result => {
      if (result.status) {
        swal("Saved Successfully!", "success").then
          ((result) => {
            this.onCLCategorySelect('');
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



  onCLCategorySelect(item: any) {
    this.selectedSubCategory = [];
    this.workFlowMasterDetails = [];
    debugger;
    this.LoadWorkflowdetails(this.selectedCategory[0].id);
    this.item.id= this.selectedCategory[0].id;
    this.item.combinationId= this.selectedCategory[0].id;
    this.item.deleteLevel =0;
    this.api.apiMethodFetchDataByPOST("api/WorkFlow/LoadSubCategory", this.selectedCategory).then(result => {
      if (result.status) {
        this.subCategoryDTOList = result.resultOP;
        } else {
        swal(
          'Error!',
          result.description,
          'error'
        )
      }
    });
  }

  onCLSubCategorySelect(item: any) {
    this.workFlowCLDetails = [];
    if (this.copyLevelItem.fromSelectedSubCategory.length <= 0) {
      return;
    }
    let obj = new uasWorkFlow();
    obj.selectedCategory = this.copyLevelItem.fromSelectedCategory;
    obj.selectedSubCategory = this.copyLevelItem.fromSelectedSubCategory;
    this.api.apiMethodFetchDataByPOST("api/WorkFlow/LoadWorkFlowDetails", obj).then(result => {
      if (result.status) {
        this.workFlowCLDetails = <WorkFlowMasterDetails[]>result.resultOP;
        if (this.workFlowCLDetails == undefined || this.workFlowCLDetails.length <= 0) {
          swal(
            'No Levels created for this Category and Sub-Category..!',
            'Please create a Level in Create tab, or choose different category..',
            'info'
          )
          return;
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


  saveCLData() {
    var selectedLevels = this.workFlowCLDetails.filter(x => x.selectedCheck == true);
    if (selectedLevels.length <= 0) {
      swal(
        'Select atleast one level from the table to copy the Level..!',
        '',
        'info'
      )
      return;
    }

    if (this.toSelectedSubCategory.length <= 0) {
      swal(
        'Select atleast one Category and Sub-Category to copy the Level to..!',
        'Please select a category to which this selected levels need to be copied..',
        'info'
      )
      return;
    }

    this.copyLevelItem.toSelectedSubCategory = this.toSelectedSubCategory;
    this.copyLevelItem.selectedLevels = this.workFlowCLDetails;

    this.api.apiMethodFetchDataByPOST("api/WorkFlow/LoadWorkFlowCLDetails", this.copyLevelItem).then(result => {
      if (result.status) {
        swal("Saved Successfully!", "success").then
          ((result) => {
            this.cancelCLData();
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

  cancelCLData() {
    this.copyLevelItem = new copyLevelDTO();
    this.workFlowCLDetails = [];
  }

  // User role and permission
OnLoadButtonPermission() {
 

   var loginUseridEncode =localStorage.getItem('userId'); 
   this.RolePermissionModel.userId =parseInt(this.api.decode(loginUseridEncode));
   this.RolePermissionModel.url= "/urs/workflow";

this.api.apiMethodFetchDataByPOST("api/Login/RoleandPermission",this.RolePermissionModel).then(async data => {
       
       if (data.status) {
      
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
  this.completeData = this.filteredData.filter(item => {
  for (let i = 0; i < this.columnsWithSearch.length; i++){
      var colValue = item[this.columnsWithSearch[i]] ;
      if (!filter || (!!colValue && colValue.toString().toLowerCase().indexOf(filter) !== -1)) {
         return true;
      }
    }
  });
}


addItemClick() {
  ;
  this.addItemAlreadyclicked = true;
  let lookUpItemListDuplicate = new Array();
  let curLookUp = new WorkFlowLevelDTO();
  curLookUp.workFlowLevelName = "";
  curLookUp.activeFlag = "Y";
  curLookUp.id = 0;
  for (var i = 1; i <= this.workFlowLevelList.length; i++) {
    lookUpItemListDuplicate[i] = this.workFlowLevelList[i - 1];
  }
  lookUpItemListDuplicate[0] = Object.assign({}, curLookUp);
  this.workFlowLevelList = lookUpItemListDuplicate;
  this.editing[0] = true;
  this.isCancel=true;
}

editRow(rowIndex,row) {

  this.isCancel=true;
   for (let index = 0; index < this.workFlowLevelList.length; index++) {
    if (rowIndex == index){
       this.editing[index] = true;
       this.workFlowLevelDTO.workFlowLevelName = row.workFlowLevelName;
       this.workFlowLevelDTO.activeFlag = row.activeFlag;
       this.workFlowLevelDTO.id = row.id; 
    }
    else
      this.editing[index] = false;
  }
  }


addLevelClick() {
  
  ;
  this.addItemAlreadyclicked = true;
  let lookUpItemListDuplicate = new Array();
  let curLookUp = new WorkFlowLevelDTO();
  curLookUp.workFlowLevelName = "";
  curLookUp.activeFlag = "Y";
  curLookUp.id = 0;
  for (var i = 1; i <= this.workFlowLevelList.length; i++) {
    lookUpItemListDuplicate[i] = this.workFlowLevelList[i - 1];
  }
  lookUpItemListDuplicate[0] = Object.assign({}, curLookUp);
  this.workFlowLevelList = lookUpItemListDuplicate;
  this.editing[0] = true;
  this.isCancel=true;
}
 

updateRow(row:any,index, event) {
  /*
  {
    "workFlowLevelName": "Level10",
    "activeFlag": "Y",
    "id": 0
} 
*/
  if(event.type == 'click') {
    
    console.log(event.row);
}
     this.spinnerFlag = true
     let tt = event;
  if(this.workFlowLevelDTO.workFlowLevelName!=""){
    ;
  this.editing[index] = false;
  this.isFieldsFilled = false;
  // this.workFlowLevelDTO.workFlowLevelName = row.workFlowLevelName;
  // this.workFlowLevelDTO.activeFlag = row.activeFlag;
  // this.workFlowLevelDTO.id = row.id; 
  if (this.workFlowLevelDTO.id ==undefined)
  {
    this.workFlowLevelDTO.id =0;
  }
  console.log(this.workFlowLevelDTO)
  this.api.apiMethodFetchDataByPOST("api/WorkFlow/SaveLevelsMaster", this.workFlowLevelDTO).then(result => {
    if (result.status) {
      swal("Saved Successfully!", "success").then
        ((result) => {
          this.cancelCLData();
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
}

updateValue(value)
{
;
this.workFlowLevelDTO.workFlowLevelName = value;
 
//this.workFlowLevelDTO.id = row.id; 

}

onLevelstatusChange(value)
{
;
 
this.workFlowLevelDTO.activeFlag = value;
//this.workFlowLevelDTO.id = row.id; 

}

onSelect(event,row) {
  //event.type is undefined, use below:
;
  console.log(event.selected);
}

 onLoadCreateView(){

  this.api.apiMethodFetchDataByGET("api/WorkFlow/LoadWorkFlowDetails").then(result => {
    if (result.status) {
      this.WFCreateView =  result.resultOP;
    }
     else 
    {
      swal(
        'Error!',
        result.description,
        'error'
      )
    }
  });

  //  this.WFCreateView =[
  //   {
  //     "id": 1,
  //     "CategoryName": "Firewall Request",
  //     "SubCategoryName": "Firewall Sub Request",
  //      "levelName" : "Prepared By"
  // },
  // {
  //     "id": 2,
  //     "CategoryName": "SoftWare",
  //     "SubCategoryName": "SoftWare Sub Request",
  //     "levelName" : "Prepared By"
  // },
  // {
  //     "id": 3,
  //     "CategoryName": "HardWare",
  //     "SubCategoryName": "HardWare Sub Request",
  //      "levelName" : "Prepared By"
  // }
  //  ]
 }
  
 onCategorySelectCreateWF(item:any){
  this.SelectedCategoryName = item.key;

 }
 AddNewRow(event:any){
   ;
   console.log(event);
   this.selectedUsers;
   this.SelectedCategoryName;
   this.SelectedLevel;
   
  let data = new WorkFlowMaster();
  data.category='';
  data.levelName='';
 
 }
}


















