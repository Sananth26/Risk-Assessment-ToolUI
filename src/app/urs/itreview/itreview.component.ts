import { Component, OnInit,Renderer2,ViewChild } from '@angular/core';
import { DatatableComponent } from "@swimlane/ngx-datatable";
import {NgbModal, ModalDismissReasons, NgbActiveModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {  FormBuilder,  FormGroup,  Validators,} from '@angular/forms';
import { ApisProvider } from 'src/app/utility/api';
import swal from 'sweetalert2';
import { ApproveDTO, dropDowns } from 'src/app/utility/model';
import {   UsersDTO, SubCategoryList  } from 'src/app/utility/uasModels';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ItapproveComponent } from 'src/app/modals/itapprove/itapprove.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ItrejectComponent } from 'src/app/modals/itreject/itreject.component';


@Component({
  selector: 'app-itreview',
  templateUrl: './itreview.component.html',
  styleUrls: ['./itreview.component.scss'],
  providers: [DatePipe]
})
export class ItreviewComponent implements OnInit {
 
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
  searchText:string;
  tableOffset :0;
  approveDTO:any;
  validationMsg:boolean=false;
  comment='';
  radiovalue:any;
  topeerreviewid:number;
  SubCategoryList1 : SubCategoryList = new SubCategoryList();
  categoryLst=[];
  closeResult='';

  constructor(config: NgbModalConfig ,public datepipe: DatePipe,private modalService: NgbModal, private api: ApisProvider,private renderer:Renderer2
   ,private matDialog:MatDialog,private spinnerService: Ng4LoadingSpinnerService,private router: Router ,) {
    config.backdrop = 'static';
    config.keyboard = false;
    }
  

  ngOnInit() {
    this.renderer.selectRootElement('#txtSearch').focus()
    this.loadOpenRequest("ITApprove");
    this.loadITClosed("ITClosed");
      this.openrequesttemp=[...this.openrequestList];
      this.closerequesttemp=[...this.closedrequestList];
      this.openrequesttemp=[...this.openrequestList];
             

        this.closerequesttemp=[...this.closedrequestList];
        this.myTable.offset = 0; 
        this.myTableclosed.offset=0;
       
  }

  loadITClosed(status:any){
    this.spinnerService.show();
    this.api.apiMethodFetchDataByGET("api/Myrequest/Myrequest?status=" + status).then(result => {
      if (result.status) {
        setTimeout(()=>{ 
         this.closedrequestList = result.resultOP;
           },2000);
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



publish1(requestId){
  this.api.apiMethodFetchDataByGET('api/RequestFormUser/EditRequestLoadonId?reqid=' + requestId).then(data => {
    this.categoryLst = JSON.parse(data.resultOP.riskandRankDetails)
    })
  if (requestId>0 ){
    if(this.comment==''){
      this.validationMsg=true;
    }else{
      this.validationMsg=false;
      this.approveDTO   = new ApproveDTO();
      this.approveDTO.requestId=requestId
      this.approveDTO.status=this.radiovalue
      this.approveDTO.comment=this.comment
      this.approveDTO.QuestionJSON=(JSON.stringify(this.categoryLst));
     this.api.apiMethodFetchDataByPOST("api/RequestFormUser/ITApprove",this.approveDTO).then(async result => {
     if (result.status) {
      swal("Rejected Successfully!",
      "IT Review Completed",
      "success").then
      ((result) => {
        this.modalService.dismissAll();
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


openReject(editRequestId) {
  let id=editRequestId;
  let catList=this.categoryLst
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.position= {top: '3%'}
  dialogConfig.id = "modal-component";
  dialogConfig.height = "290px";
  dialogConfig.width = "500px";
  dialogConfig.data={id,catList};
  const modalDialog = this.matDialog.open(ItrejectComponent, dialogConfig);
  modalDialog.afterClosed().subscribe(result => {
    this.loadOpenRequest("ITApprove");
    this.loadITClosed("ITClosed");
    this.router.navigate( ['urs/itreview']);    
  });
}

 open(content,id) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',backdropClass: ''}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  updateFilter(event) {
    if (this.tabset.activeId=="opentab")
    {
     
       const val = event.target.value.toLowerCase();
       const temp = this.openrequesttemp.filter(function (d) {
           return d.status.toLowerCase().indexOf(val) !== -1 ||
           d.requestid.toLowerCase().indexOf(val) !== -1 ||
           d.category.toLowerCase().indexOf(val) !== -1 ||
           d.assignedTo.toLowerCase().indexOf(val) !== -1 ||
           d.lastUpdate.toLowerCase().indexOf(val) !== -1 || !val;
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
    
   }

  

  loadOpenRequest(status:any){
    this.spinnerService.show();
    this.api.apiMethodFetchDataByGET("api/Myrequest/Myrequest?status=" + status).then(result => {
      if (result.status) {
         this.openrequestList = result.resultOP;
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

  toEdit(row){
    this.spinnerService.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinnerService.hide();
    }, 2000);
   this.router.navigate( ['urs/stepper'], { queryParams: { requestId:row.requestid}})
  }

  navigateIT(id) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
    }, 2000);
   this.router.navigate( ['urs/viewsummary'], { queryParams: { requestId:id,view:"IT"}});
  }
}
