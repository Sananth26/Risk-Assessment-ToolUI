import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApisProvider } from 'src/app/utility/api';
import { SubCategoryList } from 'src/app/utility/uasModels';
import swal from 'sweetalert2';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.scss']
})
export class ApproveComponent implements OnInit {
  @ViewChild('search',null) searchElement: ElementRef;
  radiovalue:any;
  topeerreviewid:number;
  SubCategoryList1 : SubCategoryList = new SubCategoryList();
  validationMsg:boolean=false;
  comment='';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public router:Router,private api: ApisProvider,public renderer:Renderer2
  ,public dialogRef: MatDialogRef<ApproveComponent>,private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.spinnerService.hide()
    console.log(this.SubCategoryList1)
    this.radiovalue="Approve"
    //@ViewChild('search',null) searchElement: ElementRef;
    this.renderer.selectRootElement('#documentName').focus()
    setTimeout(()=>{ // this will make the execution after the above boolean has changed
      this.searchElement.nativeElement.focus();
    },600);  
  
    

  }


  Publish1(){
this.spinnerService.show()
    this.topeerreviewid=this.data.id;
    if (this.topeerreviewid>0 )
    {
     this.SubCategoryList1   = new SubCategoryList();
    if (this.radiovalue=="Approve")
    {
     this.SubCategoryList1.categoryId =1;
     this.SubCategoryList1.key="Manager Approve comments here";
    }
    else if(this.radiovalue =="Reject")
    {
     this.SubCategoryList1.categoryId =2;
     this.SubCategoryList1.key="Manager Reject comments here";
    }
    else if(this.radiovalue =="Revert")
    {
     this.SubCategoryList1.categoryId =3;
     this.SubCategoryList1.key="Manager Revert comments here";
    }
   this.SubCategoryList1.id=this.topeerreviewid;
    
    this.api.apiMethodFetchDataByPOST("api/RequestFormUser/PublishTOIT",this.SubCategoryList1).then(result => {
    console.log(result)
    if (result.status) {
    this.spinnerService.hide();
     
     swal({
      title: "Saved!",
      text: "IT Review Completed",
      type: "success",
      timer: 2000
      }).then
     ((result) => {
      this.closeModal();
      this.router.navigate( ['urs/networkview'])

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




status='';
  Publish(){
    this.spinnerService.show();
    this.topeerreviewid=this.data.id
    if (this.topeerreviewid>0 )
    {
     this.SubCategoryList1   = new SubCategoryList();
     if (this.radiovalue=="Approve")
     {
      this.SubCategoryList1.categoryId =1;
      this.status="Approved"
      this.SubCategoryList1.key="Manager Approve comments here";
     }
     else if(this.radiovalue =="Reject")
     {
      this.SubCategoryList1.categoryId =2;
      this.status="Rejected"
      this.SubCategoryList1.key="Manager Reject comments here";
     }
     else if(this.radiovalue =="Revert")
     {
      this.SubCategoryList1.categoryId =3;
      this.status="Closed"
      this.SubCategoryList1.key="Manager Revert comments here";
     }
   this.SubCategoryList1.id=this.topeerreviewid;
    
   let bb =  this.radiovalue;
   this.SubCategoryList1.key=this.comment
   console.log(this.SubCategoryList1)
   console.log(this.comment)

   if(this.comment==''){
     console.log(false)
     this.validationMsg=true;
   }
   else{
     this.validationMsg=false;
     console.log(true);
     this.api.apiMethodFetchDataByPOST("api/RequestFormUser/PublishTOIT",this.SubCategoryList1).then(result => {
      console.log(result)
     if (result.status) {
      this.spinnerService.hide();
      this.closeModal();
      swal({
        title: this.status+"!",
        text: "Network Review Completed",
        type: "success",
        timer: 2000
        }).then
      ((result) => {
        this.closeModal();
        this.router.navigate( ['urs/networkview'])
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
   }


   actionFunction() {
    this.closeModal();
  }


  closeModal() {
    this.dialogRef.close();
  }

}
