import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApisProvider } from 'src/app/utility/api';
import { dropDowns } from 'src/app/utility/model';
import { uasWorkFlow, UsersDTO } from 'src/app/utility/uasModels';
import swal from 'sweetalert2';

@Component({
  selector: 'app-workflowmodal',
  templateUrl: './workflowmodal.component.html',
  styleUrls: ['./workflowmodal.component.scss']
})
export class WorkflowmodalComponent implements OnInit {

  categorydropdownSettings = { 
    singleSelection: true, 
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
    text:"Select Users",
    badgeShowLimit: 2,
    selectAllText:'Select All',
    unSelectAllText:'UnSelect All',
    enableSearchFilter: true,
    classes: "myclass inputField",
    labelKey: 'userFirstName',
  };    

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<WorkflowmodalComponent>,private api: ApisProvider) { }
itemList:any;
settings:any;
selectedCategory:any;
selectedLevel:any;
selectedUser:any;
ngOnInit() {
  this.LoadWorkflowdetails(this.data.id);
  this.loadWorkflowDetails()
  
   this.itemList = [
      { "id": 1, "itemName": "India" },
       { "id": 2, "itemName": "Singapore" },
       { "id": 3, "itemName": "Australia" },
       { "id": 4, "itemName": "Canada" },
       { "id": 5, "itemName": "South Korea" },
       { "id": 6, "itemName": "Brazil" }
     ];
     
     this.settings = {
       text: "Select Countries",
       selectAllText: 'Select All',
       unSelectAllText: 'UnSelect All',
       classes: "myclass inputField"
     };
     this.loadRolesAndCategory();
     
  }

  roleDTOList:any;
  userListTemp:any;
  categoryDTOList:any;

  
  
  loadRolesAndCategory() {
    this.api.apiMethodFetchDataByGET("api/WorkFlow/loadRolesAndCategory").then(result => {
      console.log(result)
      if (result.status) {
        this.roleDTOList = <dropDowns[]>result.resultOP.roles;
        this.categoryDTOList = <dropDowns[]>result.resultOP.categoriesItem;
        this.userListTemp = <UsersDTO[]>result.resultOP.users;
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

  actionFunction() {
    this.closeModal();
  }

  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  closeModal() {
    this.dialogRef.close();
  }

  item: uasWorkFlow = new uasWorkFlow();
  onSave(){
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
if (this.selectedUsers.length <= 1) {

  // swal(
  //   'Atleast 2 users need to be selected at each workflow level.!',
  //   'Please select atleast 2 users to continue.',
  //   'info'
  // )
  // return;
}

//this.item.combinationId = this.selectedCategory;
console.log("else")
      this.item.selectedUsers = [];
      this.item.selectedCategory = [];
      this.item.selectedSubCategory = [];
      this.item.selectedUsers = this.selectedUsers;
      this.item.selectedCategory = this.selectedCategory;
      this.item.selectedSubCategory = this.selectedSubCategory;
      console.log(this.item)
      this.api.apiMethodFetchDataByPOST("api/WorkFlow/SaveLevels", this.item).then(result => {
        if (result.status) {
          swal("Saved Successfully!", "success").then
            ((result) => {
              this.closeModal();
              this.LoadWorkflowdetails(this.item.combinationId);
            })
        } else {
          swal(
            'Error!',
            result.description,
            'error'
          )
        }
      });
      this.LoadWorkflowdetails(this.item.combinationId);
    }
    
  }

  workFlowMasterDetailsList:any;
  LoadWorkflowdetails(id:number){
    this.api.apiMethodFetchDataByGET("api/WorkFlow/LoadCompleteWorkFlowDetails?combinationid=" + id).then(result => {
      if (result.status) {
        console.log(result)
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

  deleteLevelBase:any;
  Deletelevel(levellist:any){
    console.log(levellist)
    if (levellist.level>0 && this.item.combinationId>0){
     this.deleteLevelBase.level=levellist.level;
     this.deleteLevelBase.combinationId = this.item.combinationId;
    this.api.apiMethodFetchDataByPOST("api/WorkFlow/DeleteLevelBasedonlevel", this.deleteLevelBase).then(result => {
      if (result.status) {
               swal("Deleted Successfully!", "success").then
                 ((result) => {
               //   this.onLoadCreateView();
                 })
      
             } 
       else{
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

  loadWorkflowDetails(){
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
  }

  usertemp:any;
  userDTO:any;
  Leveledit(levellist:any){ 
    console.log(levellist)
    this.openContent('',this.data.id)
    this.selectedUser=[];
    this.item.deleteLevel = levellist.level;
    this.item.selectedRoles = this.roleDTOList.filter(x=>x.id== levellist.level);
    console.log( this.item.selectedRoles)
   if ( levellist.usersIds!=null|| levellist.usersIds!=undefined){
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
  this.selectedUser = <UsersDTO[]>this.usertemp;
}
}

selectedSubCategory:any;
isEditable:boolean=false;
  cancel() {
    this.item = new uasWorkFlow();
    this.selectedSubCategory = [];
    this.selectedUser = [];
    this.isEditable = false;
  }
  selectedUsers:any;
  WFCreateView =[];
  openContent(contentPopUp, id: number) {
    this.item = new uasWorkFlow();
    this.selectedUsers = [];
    if (id > 0) {
           this.item.id= id;
           this.item.combinationId= id;
           this.item.deleteLevel =0;
           this.LoadWorkflowdetails(id);

if (this.WFCreateView !=null || this.WFCreateView!=undefined){
        this.selectedCategory = this.WFCreateView.filter(x => x.id == id);
}
if (this.userListTemp!=null|| this.userListTemp!= undefined){
        this.item.userList =this.userListTemp;
}
}  
}
  


}
