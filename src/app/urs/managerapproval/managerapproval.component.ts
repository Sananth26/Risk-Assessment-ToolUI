import { Component, OnInit ,Renderer2,ViewChild} from '@angular/core';
import { DatatableComponent } from "@swimlane/ngx-datatable";
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {  FormBuilder,  FormGroup,  Validators,} from '@angular/forms';
import { ApisProvider } from 'src/app/utility/api';
import swal from 'sweetalert2';
import { dropDowns } from 'src/app/utility/model';
import {   UsersDTO, SubCategoryList  } from 'src/app/utility/uasModels';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApproveComponent } from 'src/app/modals/approve/approve.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DatePipe } from '@angular/common';
import { ManagerapprovalcommentComponent } from 'src/app/modals/managerapprovalcomment/managerapprovalcomment.component';
 
@Component({
  selector: 'app-managerapproval',
  templateUrl: './managerapproval.component.html',
  styleUrls: ['./managerapproval.component.scss'],
  providers: [DatePipe]
})
export class ManagerapprovalComponent implements OnInit {
  @ViewChild(DatatableComponent , { static: true }) myTable: DatatableComponent;
  @ViewChild('tabset', { static: true }) tabset: any;

  openrequestList=[];
  openrequesttemp=[];
  ismodalopen:boolean=false;
  topeerreviewid:number;
  SubCategoryList1 : SubCategoryList = new SubCategoryList();
  radiovalue:any;
  closeResult: string;
  searchText: string;

  constructor( public datepipe: DatePipe,private modalService: NgbModal,  private api: ApisProvider,private spinnerService: Ng4LoadingSpinnerService,
    private fb: FormBuilder,private router: Router,private matDialog:MatDialog,private renderer:Renderer2) { }

  ngOnInit() {
    this.renderer.selectRootElement('#txtSearch').focus() 
    this.loadOpenRequest("userpublish");
    this.openrequesttemp=[...this.openrequestList];
    this.myTable.offset = 0; 
  }

  openApprove(id) {
    this.spinnerService.show()
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.position= {top: '3%'}
    dialogConfig.id = "modal-component";
    dialogConfig.height = "290px";
    dialogConfig.width = "500px";
    dialogConfig.data={id};
    const modalDialog = this.matDialog.open(ManagerapprovalcommentComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      this.loadOpenRequest("userpublish");
    });
  }

  updateFilter(event) {
       const val = event.target.value.toLowerCase();
       const temp = this.openrequesttemp.filter(function (d) {
           return d.status.toLowerCase().indexOf(val) !== -1 ||
           d.requestSno.toLowerCase().indexOf(val) !== -1 ||
           d.categoryname.toLowerCase().indexOf(val) !== -1 ||
           d.assignedto.toLowerCase().indexOf(val) !== -1 ||
           d.status.toLowerCase().indexOf(val) !== -1 || !val;
       });
       this.openrequestList = temp;
       this.myTable.offset = 0;
   }


   loadOpenRequest(status:any){
     this.spinnerService.show();
     this.api.apiMethodFetchDataByGET("api/Myrequest/Publishrequest?status=" + status).then(result => {
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

   openVerticallyCentered() {
    this.ismodalopen=true;
    const buttonModal = document.getElementById("openModalButton");
    buttonModal.click();

  }

  open(content,id) {  
  this.topeerreviewid=0;
  this.topeerreviewid=id;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = 'Closed with: ${result}';
    }, (reason) => {
      this.closeResult = 'Dismissed ${this.getDismissReason(reason)}';
    });
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  

  ManagerPublish(){
   if (this.topeerreviewid>0 )
   {
    this.SubCategoryList1   = new SubCategoryList();
   if (this.radiovalue=="Approve")
   {
    this.SubCategoryList1.categoryId =1;
   }
   else if (this.radiovalue=="Reject")
   {
        this.SubCategoryList1.categoryId =2;
   }
   else
   {
    this.SubCategoryList1.categoryId =0;
   }
  this.SubCategoryList1.id=this.topeerreviewid;
   
  let bb =  this.radiovalue;
   this.api.apiMethodFetchDataByPOST("api/RequestFormUser/ManagerTONetwork",this.SubCategoryList1).then(async result => {
   
   if (result.status) {
    swal("Saved Successfully!",
    result.description,
    "success").then
    ((result) => {
      this.loadOpenRequest("manager");
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

navigate(id) {
  this.spinnerService.show()
  setTimeout(() => {
    this.spinnerService.hide();
  }, 2000);
    console.log(id)
   this.router.navigate( ['urs/viewrequest'], { queryParams: { requestId:id,view:"manager"}});
 }

}
