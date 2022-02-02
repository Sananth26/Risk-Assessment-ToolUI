import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { UserviewComponent } from 'src/app/urs/userview/userview.component';
import { ApisProvider } from 'src/app/utility/api';
import { SubCategoryList, UsersDTO } from 'src/app/utility/uasModels';
import { PeerReviewList } from 'src/app/utility/Usermodel';
import swal from 'sweetalert2';


@Component({
  selector: 'app-peerreview-workflow',
  templateUrl: './peerreview-workflow.component.html',
  styleUrls: ['./peerreview-workflow.component.scss']
})
export class PeerreviewWorkflowComponent implements OnInit {
  component:UserviewComponent;
  topeerreviewid:number;
  selectedUsers: Array<UsersDTO> = [];
  UsersList: Array<UsersDTO> = [];
  SubCategoryList : SubCategoryList = new SubCategoryList();


  userdropdownSettings = { 
    singleSelection: true,
    text: 'Select User',
    enableCheckAll:false,
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    enableFilterSelectAll :false,
    badgeShowLimit: 4,
    classes: "myclass inputField",
    labelKey: 'userFirstName',
    autoPosition: false,
    position:'bottom',
    maxHeight:150
  }; 

   

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private api: ApisProvider,
  public dialogRef: MatDialogRef<PeerreviewWorkflowComponent>,private spinnerService: Ng4LoadingSpinnerService,private renderer: Renderer2) { }

  ngOnInit() {
    this.spinnerService.hide()
    console.log(this.data.id)
    this.LoadUsers();
  }

  peerreviewList:any;
  SavePeerreview1(){
    this.spinnerService.show();
   this. peerreviewList = new  PeerReviewList();
  this.topeerreviewid=this.data.id
  console.log(this.selectedUsers,this.topeerreviewid);
  if (this.selectedUsers[0].id>0 && this.topeerreviewid>0){
   this.peerreviewList.userlist= this.selectedUsers;
   //this.peerreviewList.key="Requester comments";
   this.peerreviewList.id = this.topeerreviewid;
  //    let peerviid=  this.selectedUsers[0].id;
  //  this.SubCategoryList   = new SubCategoryList();
  //  this.SubCategoryList.id=this.topeerreviewid;
  //  this.SubCategoryList.categoryId=peerviid;
   this.SubCategoryList.key = "";
   this.api.apiMethodFetchDataByPOST("api/RequestFormUser/ToChangePeerReview",this.peerreviewList).then(async result => {
     if (result.status) {
      this.closeModal();
      this.spinnerService.hide()
      swal({
        title: "Peer Review!",
        text: "Submitted for Peer Review",
        type: "success",
        timer: 2000
        }).then
     ((result) => {
   
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
    })
   }
   else
   {
     swal(
       'Error!',
      'Something Went Wrong',
       'error'
     )
   }
   }
  
  

  
SavePeerreview(){
  this.spinnerService.show();
this.topeerreviewid=this.data.id
console.log(this.selectedUsers,this.topeerreviewid)
if (this.selectedUsers[0].id>0 && this.topeerreviewid>0 ){
 let peerviid=  this.selectedUsers[0].id;
 this.SubCategoryList   = new SubCategoryList();
 this.SubCategoryList.id=this.topeerreviewid;
 this.SubCategoryList.categoryId=peerviid;
 this.SubCategoryList.key = "";
 this.api.apiMethodFetchDataByPOST("api/RequestFormUser/ToChangePeerReview",this.SubCategoryList).then(async result => {
   console.log(result)
  if (result.status) {
    this.spinnerService.hide()
    this.closeModal();
    swal({
      title: "Peer Review!",
      text: "Submitted for Peer Review",
      type: "success",
      timer: 2000
      }).then
   ((result) => {
 
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
  })
 }
 else
 {
   swal(
     'Error!',
    'Something Went Wrong',
     'error'
   )
 }
 }

 LoadUsers(){
   this.api.apiMethodFetchDataByGET("api/WorkFlow/loadRolesAndCategory").then(result => {
     if (result.status) {
       console.log(result)
       this.UsersList = <UsersDTO[]>result.resultOP.users;
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
   
  actionFunction() {
    this.closeModal();
  }


  closeModal() {
    this.dialogRef.close();
  }

}
