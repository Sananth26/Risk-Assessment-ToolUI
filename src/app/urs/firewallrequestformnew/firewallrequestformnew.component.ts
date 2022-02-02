import { Component, OnInit, ViewChild } from '@angular/core';
  import { FormGroup, NgForm, Validators, FormControl, FormBuilder, FormGroupDirective } from '@angular/forms';
import { ApisProvider } from 'src/app/utility/api';
import { ActivatedRoute, Router } from '@angular/router';
 import swal from 'sweetalert2';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { categoryListDTO, rankrequestListDTO } from 'src/app/utility/uasModels';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApproveDTO, dropDowns } from 'src/app/utility/model';
import { RisksummaryandmitigationComponent } from '../risksummaryandmitigation/risksummaryandmitigation.component';
@Component({
  selector: 'app-firewallrequestformnew',
  templateUrl: './firewallrequestformnew.component.html',
  styleUrls: ['./firewallrequestformnew.component.scss']
})
export class FirewallrequestformnewComponent implements OnInit {

  @ViewChild('myTable', { static: true }) myTable: any;

  
   questionsLst: any = [];
   categoryLst = [];
   selectedObject: any = [];
   selectedLevel;
   listSelectedValue: any = [];
   formBuilder: any;
   
  data = [
    { key: 'Yes', value: 'yes' },
    { key: 'No', value: 'no' },
  ];

  dataForValueSeverity = [
    { key: 'Acceptable', value: '1' },
    { key: 'Tolerable', value: '2' },    
    { key: 'Undesirable', value: '3' },
    { key: 'Intolerable', value: '4' },
  ];
  
  dataForValuelikelihood = [
    { key: 'Improbable', value: '1' },
    { key: 'Possible', value: '2' },    
    { key: 'Probable', value: '3' },
   ];

   dataForValuelikelihood1 = [
    { key: '', value: '0' },
    { key: 'Improbable', value: '1' },
    { key: 'Possible', value: '2' },    
    { key: 'Probable', value: '3' },
   ];

   dataForValueSeverity1 = [
    { key: '', value: '0' },
    { key: 'Acceptable', value: '1' },
    { key: 'Tolerable', value: '2' },    
    { key: 'Undesirable', value: '3' },
    { key: 'Intolerable', value: '4' },
  ];
  editRequestId:any;
  lookupArray:any[][] = [[0,0,0,0,0],[0,1,4,6,8],[0,2,5,8,11],[0,3,7,9,12]]  
  categoryLst1:any;
  primaryRequestId:any;
  RequestDTO:rankrequestListDTO=new rankrequestListDTO();
   public stepOneForm: FormGroup;

   private isEditing = false;
    constructor(private router: Router,
     private route: ActivatedRoute
    , private _formBuilder: FormBuilder,
    private ApiApisProvider: ApisProvider, private api: ApisProvider,
    private modalService: NgbModal,private spinnerService: Ng4LoadingSpinnerService) { } 


   calculateLikihood(likelihood){
     let data=this.dataForValuelikelihood1[likelihood].key
     return likelihood +'('+data+')'
   }

   calculateSeverity(likelihood){
    let data=this.dataForValueSeverity1[likelihood].key
    return likelihood +'('+data+')'
  }



   calculateRank(i,likelihood,severity){
     let data=this.lookupArray[likelihood][severity]
      if(data>0&&data<=2){
      this.categoryLst[i].calcualtnRanking=data
      return data +'(Low)'
    }
    else if(data>2&&data<=6){
      this.categoryLst[i].calcualtnRanking=data
      return data +'(Medium)'
    }
    else if(data>6&&data<=10){
      this.categoryLst[i].calcualtnRanking=data
      return data +'(High)'
    }
     else if(data>10&&data<=12){
      this.categoryLst[i].calcualtnRanking=data
      return data +'(Extreme)';
     }
     else{
       return '()'
     }
   }




  ngOnInit() {    
    this.route.queryParams.subscribe(
      params => {
        this.editRequestId =  params['requestId'];
        if(this.editRequestId!=undefined){
          this.onEditLoad(this.editRequestId)
        }else{
          this.loadData();
        }
      }
    )
  }
     
 onEditLoad(id){
    this.api.apiMethodFetchDataByGET('api/RequestFormUser/EditRequestLoadonId?reqid=' + id).then(data => {
      this.categoryLst = JSON.parse(data.resultOP.riskandRankDetails)
      })
  }


  loadData(){
    this.spinnerService.show();
 
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinnerService.hide();
    }, 2000);
    this.primaryRequestId=localStorage.getItem("primaryRequestId");
    this.RequestDTO.id=  this.primaryRequestId;
     this.RequestDTO.key="2";
     this.RequestDTO.categoryId=0;
      this.api.apiMethodFetchDataByPOST("api/RequestMethods/getRequestITInfo",this.RequestDTO).then(async result => {
        if (result.status) {
          this.categoryLst = result.resultOP;
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


  riskstrvalue: dropDowns = new dropDowns();
  model:ApproveDTO=new ApproveDTO();
nextFlag:boolean=false;
riskValidation=true;
  saveAndGo(){
    this.riskValidation=true;
    for(let i=0;i<this.categoryLst.length;i++){
        for(let j=0;j<this.categoryLst[i].questions.length;j++){
          if(this.categoryLst[i].questions[j].decisionLikelihood =='' || this.categoryLst[i].questions[j].decisionSeverity==''){
            this.riskValidation=false
          }
      }
    }
    if(this.riskValidation){
      this.riskValidation=true;
      this.spinnerService.show();
      this.primaryRequestId=this.editRequestId
      this.riskstrvalue.id=Number(this.primaryRequestId);
      this.riskstrvalue.key=(JSON.stringify(this.categoryLst));
      this.model.requestId=Number(this.editRequestId)
      this.model.QuestionJSON=(JSON.stringify(this.categoryLst));
      this.model.status='securityrank'
      this.api.apiMethodFetchDataByPOST("api/RequestFormUser/InsertRequestRiskandRank", this.model).then(result => {
       if (result.status) {
          this.nextFlag=true;
          swal({
            title: "Updated!",
            text: "Risk Detail & Ranking",
            type: "success",
            timer: 2000
            }).then
            ((result) => {
            })
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

  }


   
    isShown: boolean = false ; // hidden by default


toggleShow() {

this.isShown = ! this.isShown;


}
toggleExpandRow(row) {
   ;   
   this.myTable.rowDetail.toggleExpandRow(row);  
}


  cancel(){
    this.loadData();

  }

  
  handleChange(index) {
    ; 
    this.selectedObject = this.categoryLst[index];
  }
  
  
  ConvertToInt(val) {
    return parseInt(val);
  }


  ChangeLikelihood(index) {  
    
    
    this.listSelectedValue = [];
    index.questions.forEach(element => {
     this.listSelectedValue.push(this.ConvertToInt(element.decisionLikelihood));      
   });

   var sum = 0;
   for (var i = 0; i < this.listSelectedValue.length; i++) {
      if (isNaN(this.listSelectedValue[i])) {
       this.listSelectedValue[i] = 0;
     }
     else {       
         sum += parseInt(this.listSelectedValue[i]); 
     }
   }

   var avg = (sum / this.listSelectedValue.length);
   var mathRoundVal = Math.round(avg);
   index.calcualtnLikelihood = mathRoundVal;


  }

   

  ChangeSeverity(index) {
    this.listSelectedValue = [];
    index.questions.forEach(element => {
     this.listSelectedValue.push(this.ConvertToInt(element.decisionSeverity));      
   });

   var sum = 0;
   for (var i = 0; i < this.listSelectedValue.length; i++) {
      if (isNaN(this.listSelectedValue[i])) {
       this.listSelectedValue[i] = 0;
     }
     else {       
         sum += parseInt(this.listSelectedValue[i]); 
     }
   }

   var avg = (sum / this.listSelectedValue.length);
   var mathRoundVal = Math.round(avg);
   index.calcualtnSeverity = mathRoundVal;

  }
}

