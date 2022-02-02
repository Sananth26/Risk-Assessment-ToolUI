import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApisProvider } from 'src/app/utility/api';
import { ApproveDTO } from 'src/app/utility/model';
import { SubCategoryList } from 'src/app/utility/uasModels';
import swal from 'sweetalert2';

@Component({
  selector: 'app-itapprove',
  templateUrl: './itapprove.component.html',
  styleUrls: ['./itapprove.component.scss']
})
export class ItapproveComponent implements OnInit {
  @ViewChild('search',null) searchElement: ElementRef;
  radiovalue:any;
  topeerreviewid:number;
  SubCategoryList1 : SubCategoryList = new SubCategoryList();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private api: ApisProvider,
  public renderer:Renderer2,public dialogRef: MatDialogRef<ItapproveComponent>,private spinnerService: Ng4LoadingSpinnerService) { }
  requestId:any
  label='Complete'
  ngOnInit() {
    this.requestId=this.data.id
    console.log(this.data.id)
    console.log(this.data.catList)
    this.renderer.selectRootElement('#documentName').focus()
    this.radiovalue="Approve"
    this.renderer.selectRootElement('#documentName').focus()
    setTimeout(()=>{ // this will make the execution after the above boolean has changed
      this.searchElement.nativeElement.focus();
    },600);  
  }


approveDTO:any;
validationMsg:boolean=false;
comment='';
publish1(){
  this.spinnerService.show();
  console.log(this.SubCategoryList1)
  if (this.requestId>0 ){
    if(this.comment==''){
      console.log(false)
      this.validationMsg=true;
    }else{
      console.log('true')
      this.validationMsg=false;
      this.approveDTO   = new ApproveDTO();
      this.approveDTO.requestId=this.data.id
      this.approveDTO.status=this.radiovalue
      this.approveDTO.comment=this.comment
      this.approveDTO.QuestionJSON=(JSON.stringify(this.data.catList));
      console.log(this.approveDTO)
     this.api.apiMethodFetchDataByPOST("api/RequestFormUser/ITApprove",this.approveDTO).then(async result => {
      console.log(result)
     if (result.status) {
       this.spinnerService.hide()
      swal({
        title: "Completed!",
        text: "Security Approval Completed",
        type: "success",
        timer: 2000
        }).then
      ((result) => {
        this.closeModal();
        //this.loadReviewRequest("Review");
        //this.loadOpenRequest("DraftOpen");
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

  Publish(){
    this.topeerreviewid=this.data.id
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
    this.api.apiMethodFetchDataByPOST("api/RequestFormUser/PublishTOIT",this.SubCategoryList1).then(result => {
     console.log(result)
    if (result.status) {
     this.closeModal();
     swal("Approved Successfully!",
      "IT Review Completed",
      "success").then
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


   actionFunction() {
    this.closeModal();
  }


  closeModal() {
    this.dialogRef.close();
  }

}
