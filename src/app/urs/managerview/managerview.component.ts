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
import { permissionList } from 'src/app/utility/Usermodel';


//import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
@Component({
  selector: 'app-managerview',
  templateUrl: './managerview.component.html',
  styleUrls: ['./managerview.component.scss'],
  providers: [DatePipe]
})
export class ManagerviewComponent implements OnInit {
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
SubCategoryList:permissionList=new permissionList(); 

constructor( public datepipe: DatePipe,private modalService: NgbModal,  private api: ApisProvider,private spinnerService: Ng4LoadingSpinnerService,
    private fb: FormBuilder,private router: Router,private matDialog:MatDialog,private renderer:Renderer2) { }
 


  ngOnInit() {
  this.renderer.selectRootElement('#txtSearch').focus() 
  this.loadOpenRequest("manager");
  this.openrequesttemp=[...this.openrequestList];
  this.myTable.offset = 0; 
  }
  
  onrolepermissionandlevelpermission() {
    this.SubCategoryList.id=21;//requestid
    this.SubCategoryList.categoryId=3;//userid
    this.SubCategoryList.key ="network";//module
    this.SubCategoryList.id=21;//requestid
    this.SubCategoryList.categoryId=2;//userid
    this.SubCategoryList.key ="security";//module
    this.api.apiMethodFetchDataByPOST("api/RequestFormUser/ManagerPermission", this.SubCategoryList).then(result => {
     if (result.status) {
          alert(JSON.stringify(result.resultOP));
      } else {
        swal(
          'Error!',
          result.description,
          'error'
        )
      }
    });
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
    const modalDialog = this.matDialog.open(ApproveComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      this.loadOpenRequest("manager");
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

   

  Publish(){
   if (this.topeerreviewid>0 )
   {
    this.SubCategoryList1   = new SubCategoryList();
   if (this.radiovalue=="Approve")
   {
    this.SubCategoryList1.categoryId =1;
   }else
   {
    this.SubCategoryList1.categoryId =0;
   }
  this.SubCategoryList1.id=this.topeerreviewid;
   
  let bb =  this.radiovalue;
   this.api.apiMethodFetchDataByPOST("api/RequestFormUser/PublishTOIT",this.SubCategoryList1).then(async result => {
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
   this.router.navigate( ['urs/networkrequest'], { queryParams: { requestId:id,view:"network"}});
 }
}
