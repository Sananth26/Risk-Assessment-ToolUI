import { Component, OnInit ,Renderer2,ViewChild} from '@angular/core';
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { Router, ActivatedRoute } from '@angular/router';
import { ApisProvider } from 'src/app/utility/api';
import swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {   UsersDTO, SubCategoryList  } from 'src/app/utility/uasModels';
import { PeerreviewWorkflowComponent } from 'src/app/modals/peerreview-workflow/peerreview-workflow.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Settings } from 'http2';
import { DatePipe } from '@angular/common';
import { ViewfilesComponent } from 'src/app/pages/content-pages/viewfiles/viewfiles.component';


//import { DatatableComponent } from '@swimlane/ngx-datatable/src/components/datatable.component';
@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.scss'],
  providers: [DatePipe,ViewfilesComponent]
})
export class UserviewComponent implements OnInit {
  @ViewChild('vendorTab',null) tab:any;
  @ViewChild(DatatableComponent , { static: true }) myTable: DatatableComponent;
  @ViewChild(DatatableComponent , { static: true }) myTableclosed: DatatableComponent;
  @ViewChild(DatatableComponent , { static: true }) myTablereview: DatatableComponent;
  @ViewChild('tabset', { static: true }) tabset: any;

  openrequestList=[];
  closedrequestList=[];
  reviewrequestList=[];
  openrequesttemp=[];
  closerequesttemp=[];
  reviewrequesttemp=[];
  searchText:Settings;
  topeerreviewid:number;
  selectedUsers: Array<UsersDTO> = [];
  UsersList: Array<UsersDTO> = [];
  userDTO : UsersDTO = new  UsersDTO();
  tableOffset :0;
  dropdownUsersSettings: any = {
    singleSelection: true,
    idField: 'id',
    textField: 'userFirstName',
    selectAllText: 'Select ',
    unSelectAllText: 'UnSelect ',
    itemsShowLimit: 6,
    allowSearchFilter: true
  };
SubCategoryList : SubCategoryList = new SubCategoryList();
publishedList:any[];
closeResult: string;
tabName=''


constructor(public datepipe: DatePipe,private router: Router ,private renderer:Renderer2, private api: ApisProvider, private modalService: NgbModal,
  private route: ActivatedRoute,private matDialog:MatDialog,private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {

    this.route.queryParams.subscribe(
      params => {
        this.tabName =  params['tab'];
        if(this.tabName=='open'){
          this.tab.activeId="open"
        }
        if(this.tabName=='closed'){
          this.tab.activeId="closed"
        }
        if(this.tabName=='review'){
          this.tab.activeId="review"
        }
      }
    )
    
    this.loadManagerapproveandpublished("publishandmanagerapprove");
    this.renderer.selectRootElement('#txtSearch').focus()
    this.loadOpenRequest("DraftOpen");
    this.openrequesttemp=[...this.openrequestList];
    this.loadRejectandSuccess("closed");
    this.closerequesttemp=[...this.closedrequestList];
    this.loadReviewRequest("Review");
    this.reviewrequesttemp=[...this.reviewrequestList];
    this.closerequesttemp=[...this.closedrequestList];
    this.loadReviewRequest("Review");
      this.reviewrequesttemp=[...this.reviewrequestList];
      this.myTable.offset = 0; 
      this.myTableclosed.offset=0;
      this.myTablereview.offset=0;
  }

 
  openModal(id) {
    this.spinnerService.show()
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.position= {top: '3%'}
    dialogConfig.id = "modal-component";
    dialogConfig.height = "290px";
    dialogConfig.width = "500px";
    dialogConfig.data={'name':'Sunil'};
    dialogConfig.data={id};
    const modalDialog = this.matDialog.open(PeerreviewWorkflowComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      this.loadOpenRequest("DraftOpen");
      this.loadReviewRequest("Review");
    });
  }

  loadReviewRequest(status:any){
    this.spinnerService.show();
    this.api.apiMethodFetchDataByGET("api/Myrequest/Myrequest?status=" + status).then(result => {
      if (result.status) {
        this.reviewrequestList = result.resultOP;
        this.spinnerService.hide();
      } else {
        swal(
          'Error!',
          result.description,
          'error'
        )
      }
    });
  }

  toUnlock(id:number){
    this.api.apiMethodFetchDataByGET("api/RequestFormUser/RequestUnlock?id=" + id).then(result => {
      if (result.status) {
        swal("Released Successfully!",
        result.description,
        "success").then
        ((result) => {
          this.spinnerService.show()
          this.loadOpenRequest("DraftOpen");
          //this.loadManagerapproveandpublished("publishandmanagerapprove");
          //this.loadOpenRequest("DraftOpen");
          this.spinnerService.hide();
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

loadManagerapproveandpublished(status:any){
  this.spinnerService.show()
    this.api.apiMethodFetchDataByGET("api/Myrequest/Myrequest?status=" + status).then(result => {
      if (result.status) {
        this.publishedList = result.resultOP;
        this.spinnerService.hide()
      } else {
        swal(
          'Error!',
          result.description,
          'error'
        )
      }
    });
  }


  deleteFirewallRequest(id){
    this.spinnerService.show()
    this.api.apiMethodFetchDataByGET('api/RequestFormUser/Withdraw?id=' + id).then(result => {
      if (result.status == true) {
        this.spinnerService.hide
        this.loadOpenRequest("DraftOpen");
        this.loadRejectandSuccess("closed");
        swal({
          title: "Deleted!",
          text: "Request Withdrawn Successfully",
          type: "success",
          timer: 2000
          }).then((result) => {
        })
      } else {
        swal(
          'Error occured while deleting request!',
          'Your Request has not been Deleted.',
          'warning'
        )
      }
    });    
  }

  deleteRequest(id){
    swal({
      title: 'Delete!',
      text: 'Do you want to delete this request?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.deleteFirewallRequest(id)
      } else if (result.dismiss === swal.DismissReason.cancel) {
      }
    })
  }

  
  loadRejectandSuccess(status:any){
    this.spinnerService.show();
    this.api.apiMethodFetchDataByGET("api/Myrequest/Myrequest?status=" + status).then(result => {
      if (result.status) {
        this.closedrequestList = result.resultOP;
        this.spinnerService.hide();
      } else {
        swal(
          'Error!',
          result.description,
          'error'
        )
      }
    });
  }

  loadOpenRequest(status:any){
    this.spinnerService.show();
    this.api.apiMethodFetchDataByGET("api/Myrequest/Myrequest?status=" + status).then(result => {
      if (result.status) {
        this.openrequestList = result.resultOP;
        this.spinnerService.hide() 
      } else {
        swal(
          'Error!',
          result.description,
          'error'
        )
      }
    });
  }

  updateFilter(event) {
 if (this.tabset.activeId=="opentab"){
    const val = event.target.value.toLowerCase();
    const temp = this.openrequesttemp.filter(function (d) {
      return d.status.toLowerCase().indexOf(val) !== -1 ||
      d.requestSno.toLowerCase().indexOf(val) !== -1 ||
      d.categoryname.toLowerCase().indexOf(val) !== -1 ||
      d.assignedto.toLowerCase().indexOf(val) !== -1 ||
      d.lastupdate.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.openrequestList = temp;
    this.myTable.offset = 0;
  }
  else if (this.tabset.activeId=="closedtab")
  { 
    const val = event.target.value.toLowerCase();
    const temp = this.closerequesttemp.filter(function (d) {
        return d.status.toLowerCase().indexOf(val) !== -1 ||
        d.requestid.toLowerCase().indexOf(val) !== -1 ||
        d.category.toLowerCase().indexOf(val) !== -1 ||
        d.assignedTo.toLowerCase().indexOf(val) !== -1 ||
        d.lastUpdate.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.closedrequestList = temp;
    this.myTableclosed.offset = 0;}
  else if (this.tabset.activeId=="reviewtab")
  {
    const val = event.target.value.toLowerCase();
    const temp = this.reviewrequesttemp.filter(function (d) {
        return d.status.toLowerCase().indexOf(val) !== -1 ||
        d.requestSno.toLowerCase().indexOf(val) !== -1 ||
        d.categoryname.toLowerCase().indexOf(val) !== -1 ||
        d.assignedto.toLowerCase().indexOf(val) !== -1 ||
        d.lastupdate.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.reviewrequestList = temp;
    this.myTablereview.offset = 0;
  }
}

 onNewRequest(){
 
 }

 openContent(contentPopUp, id: number) {
  this.topeerreviewid=0;
  this.topeerreviewid=id;
  const modalRef = this.modalService.open(contentPopUp, { backdropClass: 'light-blue-backdrop', size: 'md' }).result.then((result) => {
  this.closeResult = `Closed with: ${result}`;
}, (reason) => {
});
this.LoadUsers();
this.topeerreviewid=id;
}

SavePeerreview(){
this.spinnerService.show()
 if (this.selectedUsers[0].id>0 && this.topeerreviewid>0 )
 {
let peerviid=  this.selectedUsers[0].id;
this.SubCategoryList   = new SubCategoryList();
this.SubCategoryList.id=this.topeerreviewid;
this.SubCategoryList.categoryId=peerviid;
this.SubCategoryList.key = "";
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

save(){
  console.log("user review update")
}

onDropDownSelect(){

}

publish(id:number){
  this.spinnerService.show()
  this.api.apiMethodFetchDataByGET("api/RequestFormUser/DraftToPublish?id=" + id).then(result => {
    if (result.status) {
      this.spinnerService.hide();
      swal({
        title: "Published!",
        text: "Published Successfully",
        type: "success",
        timer: 2000
        }).then
      ((result) => {
        this.loadManagerapproveandpublished("publishandmanagerapprove");
        this.loadOpenRequest("DraftOpen");
        
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

 toEdit(row){
  this.spinnerService.show();
  setTimeout(() => {
    /** spinner ends after 5 seconds */
    this.spinnerService.hide();
  }, 2000);
    this.router.navigate( ['urs/userstepper'], { queryParams: { requestId:row.requestid,view:'user'}})
 }

 userStepper(){
  this.spinnerService.show();
  setTimeout(() => {
    /** spinner ends after 5 seconds */
    this.spinnerService.hide();
  }, 2000);
    this.router.navigate( ['urs/userstepper'], { queryParams: { view:'user'}})
 }

 navigate(id) {
  this.spinnerService.show();
  setTimeout(() => {
    /** spinner ends after 5 seconds */
    this.spinnerService.hide();
  }, 2000);
  this.router.navigate( ['urs/viewrequest'], { queryParams: { requestId:id,view:"user"}});
}


navigateIT(id) {
  this.spinnerService.show();
  setTimeout(() => {
    /** spinner ends after 5 seconds */
    this.spinnerService.hide();
  }, 2000);
 this.router.navigate( ['urs/viewsummary'], { queryParams: { requestId:id,view:"userview"}});
}

}
 


