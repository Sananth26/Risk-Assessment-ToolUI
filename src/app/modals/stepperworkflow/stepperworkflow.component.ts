import { Component,ChangeDetectorRef, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApisProvider } from 'src/app/utility/api';
import {  dropDowns } from 'src/app/utility/model';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-stepperworkflow',
  templateUrl: './stepperworkflow.component.html',
  styleUrls: ['./stepperworkflow.component.scss'],
  providers: [DatePipe]
})
export class StepperworkflowComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private cdr: ChangeDetectorRef,public datepipe: DatePipe,private api: ApisProvider,
  public dialogRef: MatDialogRef<StepperworkflowComponent>,private spinnerService: Ng4LoadingSpinnerService) { }
  requestId:any
  ngOnInit() {
   this.LoadStepper(this.data.id) 
   this.cdr.detectChanges();
  }

  count=0;
  status(item){
    if(item.status!=null && item.status!=''){
      return '#3b5998'
    }
    else{
      this.count++;
      if(this.count==1){
        return '#d3d3d3'
      }
      if(this.count>1){
        return '#d3d3d3'
      }
    }
  }

  workflowList=[];
  dropdown: any;
  LoadStepper(id){
   this.dropdown   = new dropDowns();
   this.dropdown.key ="";
   this.dropdown.id =id;
   this.api.apiMethodFetchDataByPOST("api/RequestFormUser/Stepper",this.dropdown).then(async result => {
  console.log(result)
   if (result.status) {
    this.spinnerService.hide()
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

  closeModal() {
    this.dialogRef.close();
  }

}
