import { Component, OnInit } from '@angular/core';
import { ApisProvider } from 'src/app/utility/api';
import swal from 'sweetalert2';
import { Dashboard } from 'src/app/utility/uasModels';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/modals/modal/modal.component';
import { SidebarService } from 'src/app/shared/sidebar/sidebar.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {DROPDOWN_DIRECTIVES} from 'ng2-bs-dropdown';
import { dropDowns, RemediationDTOList, RemediationParams, UserModel } from 'src/app/utility/model';
import { element } from 'protractor';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { permissionList } from 'src/app/utility/Usermodel';
declare var introJs:any;

@Component({
  selector: 'app-uas-dashboard',
  templateUrl: './uas-dashboard.component.html',
  styleUrls: ['./uas-dashboard.component.scss']
})

export class UasDashboardComponent implements OnInit {
  userId: number;
  userName: string;
  dashboard: Dashboard = new Dashboard();
  auditTrial: any;
  approvalcount:number;
  opencount:number;
  closedcount:number;
  peerreviewcount:number;
  dropdown: any;
  managercount:number;
  userpublishcount:number;
  responseParty=""
  workflowList=[];


  constructor(private http: HttpClient,private ApiApisProvider: ApisProvider,public sidebarservice: SidebarService,
    public matDialog: MatDialog,private spinnerService: Ng4LoadingSpinnerService,public router:Router) { }

  loadDashboard(){
    this.spinnerService.show()
    this.ApiApisProvider.apiMethodFetchDataByGET("api/Myrequest/DashBoard").then(result => {
      if (result.status) {
        this.opencount=result.resultOP.opencount
        this.closedcount=result.resultOP.closedcount
        this.peerreviewcount=result.resultOP.peerreviewcount
        this.approvalcount=result.resultOP.approvalcount
        this.managercount=result.resultOP.managercount
        this.userpublishcount=result.resultOP.userpublishcount
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

  newUserInput:any;
  settings = {
    text: "Select Countries",
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    classes: "myclass custom-class",
    primaryKey: "alpha3Code",
    labelKey: "name",
    noDataLabel: "Search Countries...",
    enableSearchFilter: true,
    searchBy: ['name', 'capital']
};

startTour(){
  var intro:any = introJs();
  intro.setOptions({
   steps: [
    {
     element: '#card1',
     intro: 'Count of open request',
     position: 'left'
    },
    {
      element: '#card2',
      intro: 'Count of review request',
      position: 'left'
     },
     {
      element: '#card3',
      intro: 'Count of Approval request',
      position: 'left'
     },
     {
      element: '#card4',
      intro: 'Count of closed request',
      position: 'left'
     },
     {
      element: '#Step0',
      intro: 'Count of review request',
      position: 'left'
     },
     {
      element: '#Step1',
      intro: 'Count of Approval request',
      position: 'left'
     },
     {
      element: '#Step2',
      intro: 'Count of closed request',
      position: 'left'
     },
     {
      element: '#Step3',
      intro: 'Count of review request',
      position: 'left'
     },
     {
      element: '#Step4',
      intro: 'Count of Approval request',
      position: 'left'
     },
     {
      element: '#Step5',
      intro: 'Count of closed request',
      position: 'left'
     },
     {
      element: '#Step6',
      intro: 'Count of review request',
      position: 'left'
     },
     {
      element: '#Step6',
      intro: 'Count of Approval request',
      position: 'left'
     },
     {
      element: '#Step7',
      intro: 'Completed',
      position: 'left'
     },
  
   ],
   showBullets: true,
   showButtons: true,
   exitOnOverlayClick: false,
   keyboardNavigation: true,
   });
  intro.start();
 }

 scroll(){
  window.scroll(0,0);
  document.body.scrollTop = 0;
  document.querySelector('body').scrollTo(0,0)
  var scrollElm = document.scrollingElement;
  scrollElm.scrollTop = 0;
 }

  ngOnInit() {
   this.scroll();
   this.responseParty=""
   this.loadMenuItems()
   this.loadDashboard();
   this.levels()
   this.spinnerService.show();
   setTimeout(() => {
     /** spinner ends after 5 seconds */
     this.spinnerService.hide();
   }, 2000);
   this.sidebarservice.setSidebarState(true);
    var loginUseridEncode = localStorage.getItem('userId');
    var loginUserNameEncode = localStorage.getItem('userName');
    this.userId = parseInt(this.ApiApisProvider.decode(loginUseridEncode));
    this.userName = this.ApiApisProvider.decode(loginUserNameEncode);
    this.fetchCounts();
  }

 

  openModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.position= {top: '3%'}
    dialogConfig.id = "modal-component";
    dialogConfig.height = "290px";
    dialogConfig.width = "600px";
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }


  fetchCounts(){
    $('.openmodale').click(function (e) {
      e.preventDefault();
      $('.modale').addClass('opened');
  });
  $('.closemodale').click(function (e) {
      e.preventDefault();
      $('.modale').removeClass('opened');
  });

if (this.userId == undefined || this.userId == null || this.userId == 0) {
  return;
}

this.ApiApisProvider.apiMethodFetchDataByGET("api/RequestMethods/getDashBoardData?userId=" + this.userId).then(result => {
  if (result.status) {
    this.dashboard = result.resultOP;
  } else {
    swal(
      'Error!',
      result.description,
      'error'
    )
  }
});

  }


  SubCategoryList:permissionList=new permissionList(); 

loadAuditHistory(id){
  this.ApiApisProvider.apiMethodFetchDataByGET("api/Audit/GetRequestData?requestid=" + id).then(result => {
    if (result.status) {
      this.auditTrial = result.resultOP;
    } else {
      swal(
        'Error!',
        result.description,
        'error'
      )
    }
  })
}

levels(){
  this.SubCategoryList.id=9;//requestid
        this.SubCategoryList.categoryId=16
        this.SubCategoryList.key ="security";//module
        this.ApiApisProvider.apiMethodFetchDataByPOST("api/RequestFormUser/ManagerPermission", this.SubCategoryList).then(result => {
         if (result.status) {
         }
        })
}

  menuItems:any;
  toUnlock(id:number){
    this.ApiApisProvider.apiMethodFetchDataByGET("api/RequestFormUser/RequestUnlock?id=" + id).then(result => {
      if (result.status) {
        swal("Saved Successfully!",
        result.description,
        "success").then
        ((result) => {
          this.spinnerService.show()
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

openRequest(){
  this.router.navigate( ['urs/userview'], 
  { queryParams: { tab:'open'}})
}

closedRequest(){
  this.router.navigate( ['urs/userview'], 
  { queryParams: { tab:'closed'}})
}

reviewRequest(){
  this.router.navigate( ['urs/userview'], 
  { queryParams: { tab:'review'}})
}

approveRequest(){
  if(this.userpublishcount>0)
  this.router.navigate( ['urs/managerapproval'])
  else if(this.managercount>0)
  this.router.navigate( ['urs/networkview'])
  else
  this.router.navigate( ['urs/itreview'])
}


  loadMenuItems(){
    this.spinnerService.show()
    let dashboardList=[{
      "path": "/urs/uasdashboard",
      "title": "Dashboard",
      "icon": "fa fa-home",
      "class": "",
      "badge": null,
      "badgeClass": "",
      "isExternalLink": false,
      "displayorder": 0,
      "submenu": []
  }];
    let UserModelDTO: UserModel = new UserModel();
    var loginUseridEncode =localStorage.getItem('userId'); 
    UserModelDTO.userId =parseInt(this.ApiApisProvider.decode(loginUseridEncode));
    this.menuItems = [];
    this.ApiApisProvider.apiMethodFetchDataByPOST("api/Login/LoadMenu", UserModelDTO).then(data => {
      if (data.status) {
        this.menuItems = data.resultOP;
        const uniqueResultOne = this.menuItems.filter(function(obj) {
          return !dashboardList.some(function(obj2) {
              return obj.displayorder == obj2.displayorder;
          });
      });
      this.menuItems=uniqueResultOne
      this.spinnerService.hide();
      } else {
       
      }
    })
  }




  LoadStepper(id){
  this.dropdown   = new dropDowns();
   this.dropdown.key ="";
   this.dropdown.id =id;
   this.ApiApisProvider.apiMethodFetchDataByPOST("api/RequestFormUser/Stepper",this.dropdown).then(async result => {
   if (result.status) {
      this.workflowList=result.resultOP
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

}
