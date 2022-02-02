import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApisProvider } from 'src/app/utility/api';
import { SubCategoryList } from 'src/app/utility/uasModels';
import swal from 'sweetalert2';

@Component({
  selector: 'app-managerapprovalcomment',
  templateUrl: './managerapprovalcomment.component.html',
  styleUrls: ['./managerapprovalcomment.component.scss']
})

export class ManagerapprovalcommentComponent implements OnInit {
  @ViewChild('search',null) searchElement: ElementRef;
  radiovalue:any;
  requestid:number;
  SubCategoryList1 : SubCategoryList = new SubCategoryList();
  validationMsg:boolean=false;
  comment='';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private router:Router,private api: ApisProvider,public renderer:Renderer2
  ,public dialogRef: MatDialogRef<ManagerapprovalcommentComponent>,private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.spinnerService.hide()
    console.log(this.SubCategoryList1)
    this.requestid= this.data.id;
    this.radiovalue="Approve"
    //@ViewChild('search',null) searchElement: ElementRef;
    this.renderer.selectRootElement('#documentName').focus()
    setTimeout(()=>{ // this will make the execution after the above boolean has changed
      this.searchElement.nativeElement.focus();
    },600);  
   
  }

 status:any;
  ManagerPublish(){
      this.spinnerService.show()
       if (this.requestid>0 )
       {
        this.SubCategoryList1   = new SubCategoryList();
       if (this.radiovalue=="Approve")
       {
        this.SubCategoryList1.categoryId =1;
        this.status="Approved"
       }
      else if (this.radiovalue=="Reject")
       {
        this.SubCategoryList1.categoryId =2;
        this.status="Rejected"
       }
       else
       {
        this.SubCategoryList1.categoryId =3;
        this.status="Closed"
       }
      this.SubCategoryList1.id=this.requestid;
      this.SubCategoryList1.key=this.comment
      let bb =  this.radiovalue;
      if(this.comment==''){
        console.log(false)
        this.validationMsg=true;
      }else{
        console.log('true')
        this.validationMsg=false;
        
      
        this.api.apiMethodFetchDataByPOST("api/RequestFormUser/ManagerTONetwork",this.SubCategoryList1).then(async result => {
          if (result.status) {
            this.spinnerService.hide()
           swal({
             title: this.status,
             text: "Manager Review Completed",
             type: "success",
             timer: 2000
             }).then
           ((result) => {
             this.closeModal();
             this.router.navigate( ['urs/managerapproval'])
           })
            }
           else{
              swal(
                'Error!',
                result.description,
                'error'
              )
            }
          })
      }
    
      }
      }
   

actionFunction() {
  this.closeModal();
}


closeModal() {
  this.dialogRef.close();
}
}
