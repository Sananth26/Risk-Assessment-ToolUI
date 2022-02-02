import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm, Validators, FormControl, FormBuilder, FormGroupDirective } from '@angular/forms';
import { ApisProvider } from 'src/app/utility/api';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { categoryListDTO, rankrequestListDTO } from 'src/app/utility/uasModels';
import swal from 'sweetalert2';
import { ApproveDTO, dropDowns } from 'src/app/utility/model';
import { ViewsummaryuserComponent } from '../viewsummaryuser/viewsummaryuser.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-userriskdetailranking',
  templateUrl: './userriskdetailranking.component.html',
  styleUrls: ['./userriskdetailranking.component.scss']
})
export class UserriskdetailrankingComponent implements OnInit {

  @ViewChild('myTable', { static: true }) myTable: any;
  
  
   questionsLst: any = [];
  categoryLst = [];
  selectedObject: any = [];
  selectedLevel;
  listSelectedValue: any = [];
   formBuilder: any;
   public stepOneForm: FormGroup;

   private isEditing = false;
    constructor(private router: Router,
     private route: ActivatedRoute
    , private _formBuilder: FormBuilder,private spinnerService: Ng4LoadingSpinnerService,
    private ApiApisProvider: ApisProvider, private api: ApisProvider,
    private modalService: NgbModal) { } 


  data = [
    { key: 'Yes', value: 'Yes' },
    { key: 'No', value: 'No' },
  ];


   
  jwt:any;
  primaryRequestId:any;
  
  editRequestId:any;
  

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        this.editRequestId =  params['requestId'];
        console.log(this.editRequestId)
        if(this.editRequestId!=undefined){
          this.onEditLoad(this.editRequestId)
          console.log("if")
        }else{
          console.log("else")
          //this.loadData();
        }
      }
    )


 
  this.primaryRequestId=localStorage.getItem("primaryRequestId")
  console.log(this.primaryRequestId)
  this.route.queryParams.subscribe(
    params => {
      this.jwt =  params['jwt'];
    }
  )
}

save1(){
  console.log("Ranking Save")
}

peerstatus:string;
onEditLoad(id){
 
}

 
categoryLst1:any;
RequestDTO:rankrequestListDTO=new rankrequestListDTO();
resquestSno:any
noData=false;
  loadData(){
    var scrollElm = document.scrollingElement;
    scrollElm.scrollTop = 0;
    this.noData=false
    if(this.editRequestId==undefined){
      if(!this.nextSummary){
        this.api.apiMethodFetchDataByGET('api/RequestFormUser/EditRequestLoadonId?reqid=' + this.editRequestId).then(data => {
          this.peerstatus='no';
        });
  
      this.primaryRequestId=localStorage.getItem("primaryRequestId");
      console.log(this.primaryRequestId)
      this.RequestDTO.id=  this.primaryRequestId;
       this.RequestDTO.key="2";
       this.RequestDTO.categoryId=0;
        this.api.apiMethodFetchDataByPOST("api/RequestMethods/getRequestITInfo",this.RequestDTO).then(async result => {
          if (result.status) {
            this.categoryLst = result.resultOP;
            if(this.categoryLst.length==0){
              this.noData=true
            }else{
              this.noData=false;
            }
            console.log("Result",result)
            for(let i=0;i<this.categoryLst.length;i++){
              for(let j=0;j<this.categoryLst[i].questions.length;j++){
                console.log(i,j,this.categoryLst[i].questions[j].yesNo="Yes")
              }
            }
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
      }else{
        this.onEditLoad(localStorage.getItem("primaryRequestId"))
      }
    }else{
      console.log("else____________________")
      console.log("This.onEdit")
      let id=this.editRequestId
      this.api.apiMethodFetchDataByGET('api/RequestFormUser/EditRequestLoadonId?reqid=' + id).then(data => {
        this.peerstatus=data.resultOP.status=="Peer Review"?'yes':'no'
       });
    
     setTimeout(()=>{
      this.api.apiMethodFetchDataByGET('api/RequestFormUser/EditRequestLoadonId?reqid=' + id).then(data => {
        this.categoryLst = JSON.parse(data.resultOP.riskandRankDetails)
        console.log(JSON.parse(data.resultOP.riskandRankDetails))
        console.log("Length",this.categoryLst.length)
        if(this.categoryLst.length==0){
          this.noData=true
        }else{
          this.noData=false;
        }
        })
     },2000)
    }
    }

  
isShown:boolean=false;
toggleShow() {
this.isShown = ! this.isShown;
}

toggleExpandRow(row) {
   this.myTable.rowDetail.toggleExpandRow(row);  
}


 clear(){
    console.log("clear");
    this.loadData();
  }
  riskstrvalue: dropDowns = new dropDowns();


 // this.newRequestFormData.ispeerreview=data.resultOP.status=="Peer Review"?'yes':'no'
 model:ApproveDTO=new ApproveDTO();
 nextFlag:boolean=false;
 nextSummary:boolean=false
 riskValidation=true;

  saveAndGo(){
    this.riskValidation=true;
    console.log(this.riskValidation)
    for(let i=0;i<this.categoryLst.length;i++){
      for(let j=0;j<this.categoryLst[i].questions.length;j++){
        if(this.categoryLst[i].questions[j].yesNo==""){
        this.riskValidation=false
        }
      }
      console.log("Risk Summary Tab 3",this.riskValidation)
    }
  
    if(this.riskValidation){
      this.riskValidation=true
      if(this.editRequestId==undefined){
        console.log("Risk Save")
      this.spinnerService.show();
      this.riskstrvalue.id=0;
      this.riskstrvalue.key="";
  
      this.primaryRequestId=localStorage.getItem("primaryRequestId");
      this.riskstrvalue.id=Number(this.primaryRequestId);
      this.riskstrvalue.key=(JSON.stringify(this.categoryLst));
      this.model.requestId=Number(this.primaryRequestId);
      this.model.QuestionJSON=(JSON.stringify(this.categoryLst));
      this.model.status=this.peerstatus
  
      console.log("++++++++",this.model,"++++++++++++++++")
       this.api.apiMethodFetchDataByPOST("api/RequestFormUser/InsertRequestRiskandRank", this.model).then(result => {
        if (result.status) {
          this.spinnerService.hide();
          this.nextSummary=true
          swal({
            title: "Updated!",
            text: "Request Id :"+localStorage.getItem("requestSno") +" updated",
            type: "success",
            timer: 2000
            }).then
            ((result) => {
   
            })
        } else {
          swal(
            'Error!',
            result.description,
            'error'
          )
        }
      });
      }else{
        console.log("Risk Save")
      this.spinnerService.show();
      this.riskstrvalue.id=0;
      this.riskstrvalue.key="";
  
      this.riskstrvalue.id=this.editRequestId
      this.riskstrvalue.key=(JSON.stringify(this.categoryLst));
      this.model.requestId=Number(this.primaryRequestId);
      this.model.QuestionJSON=(JSON.stringify(this.categoryLst));
      this.model.status=this.peerstatus
  
      console.log("++++++++",this.model,"++++++++++++++++")
       this.api.apiMethodFetchDataByPOST("api/RequestFormUser/InsertRequestRiskandRank", this.model).then(result => {
        if (result.status) {
          this.spinnerService.hide();
          this.nextSummary=true
          swal({
            title: "Updated!",
            text: "Updated Risk Detail & Ranking",
            type: "success",
            timer: 2000
            }).then
            ((result) => {
   
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
    }
    
  }

  
  handleChange(index) {
    this.selectedObject = this.categoryLst[index];
  }
  
}
