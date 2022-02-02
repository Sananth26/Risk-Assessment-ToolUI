import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApisProvider } from 'src/app/utility/api';
import { rankrequestListDTO, UsersDTO } from 'src/app/utility/uasModels';
import { angular2userdropdown } from 'src/app/utility/Usermodel';
import swal from 'sweetalert2';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { ApproveDTO, dropDowns } from 'src/app/utility/model';
import { ActivatedRoute, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-risksummaryandmitigation',
  templateUrl: './risksummaryandmitigation.component.html',
  styleUrls: ['./risksummaryandmitigation.component.scss']
})
export class RisksummaryandmitigationComponent implements OnInit {
  form: FormGroup;
  RiskSummaryMitigation = [];
  returnColor : any;
  optionsModel: number[];
    myOptions: IMultiSelectOption[];
    userdropdownSettings = { 
      singleSelection: false,
      text: '',
      limitSelection:2,
      enableCheckAll:false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      enableFilterSelectAll :false,
      badgeShowLimit: 3,
      classes: "myclass inputField",
      labelKey: 'name',
      position:"bottom",
      autoPosition:false,
      maxHeight:150
    }; 

  constructor(private api: ApisProvider,private spinnerService: Ng4LoadingSpinnerService,
    private router: Router,
     private route: ActivatedRoute) { }
  dataForValues = [
    { key: '1', value: '1' },
    { key: '2', value: '2' },
    { key: '3', value: '3' },
    { key: '4', value: '4' },
    { key: '5', value: '5' },
    { key: '6', value: '6' },
    { key: '7', value: '7' },
    { key: '8', value: '8' },
    { key: '9', value: '9' },
    { key: '10', value: '10' },
    { key: '11', value: '11' },
    { key: '12', value: '12' }
    ];

  
    users: any = [];
    selectedItem: any = [];
    dropdownSettings: any = {};
    closeDropdownSelection=false;
    disabled=false;

    
 
  mySettings: IMultiSelectSettings = {
    enableSearch: true,
    selectionLimit: 3,
};

myTexts: IMultiSelectTexts = {
  checkAll: 'Select all',
  uncheckAll: 'Unselect all',
  checked: 'item selected',
  checkedPlural: 'items selected',
  searchPlaceholder: 'Find',
  defaultTitle: 'Select Responsible Party',
  allSelected: 'All selected',
};

  
  UsersList=[];
  userList=[];
  ArrayObject=[];
  LoadUsers(){
    this.api.apiMethodFetchDataByGET("api/WorkFlow/loadRolesAndCategory").then(result => {
      if (result.status) {
        console.log(result)
        this.UsersList = <angular2userdropdown[]>result.resultOP.users;
        console.log(this.UsersList.length)
        for(let x = 0; x < this.UsersList.length ; x++ ){
          console.log(this.UsersList[x].userFirstName)
          let temp={id:this.UsersList[x].userFirstName,name:this.UsersList[x].userFirstName};
          this.ArrayObject[x]=temp;
          this.userList=this.ArrayObject
          console.log(this.ArrayObject)
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
    });
  }

  selectedItems:any;
  onChange() {
    console.log(this.optionsModel);
}


onSaveLoad(){
  console.log("Risk Summary% Mitigation Load")
  this.onEditLoad()
}

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        this.editRequestId =  params['requestId'];
        if(this.editRequestId!=undefined){
          //this.onEditLoad(this.editRequestId)
          console.log("if")
        }else{
          console.log("else")
          this.loadData();
        }
      }
    )

    this.myOptions = [
      { id: "Option 1", name: 'Option 1' },
      { id: "Option 2", name: 'Option 2' },
  ];

    this.users=["Sananth","Thiru","Bhavin","Shruthi"]
   this.LoadUsers()
            this.selectedItem = [''];
            this.dropdownSettings = {
                singleSelection: false, 
                allowSearchFilter: true,
                itemsShowLimit: 6,    
                limitSelection: 2,          
                 closeDropDownOnSelection: this.closeDropdownSelection               
             };
  }
 /*
  loadData(){
    this.RiskSummaryMitigation  = [
    { RiskCategory: '1) User Access and Authentication related Risks', RiskDescription :'Demo Chnages are done and verified1',Score:'',Ranking:'',color:'',RiskMitigationStrategy:'',ResponsibleParty:'' },
    { RiskCategory: '2) Impacts to Privileged Access Security', RiskDescription :'Demo Chnages are done and verified2',Score:'',Ranking:'',color:'',RiskMitigationStrategy:'',ResponsibleParty:'' },
    { RiskCategory: '3) Supplier Related Risks', RiskDescription :'Demo Chnages are done and verified3',Score:'',Ranking:'',color:'',RiskMitigationStrategy:'',ResponsibleParty:'' },
    { RiskCategory: '4) Data  Security (DLP, Encryption,Privacy)', RiskDescription :'Demo Chnages are done and verified4',Score:'',Ranking:'',color:'',RiskMitigationStrategy:'',ResponsibleParty:'' },
    { RiskCategory: '5) Business Continuity Risks', RiskDescription :'Demo Chnages are done and verified5',Score:'',Ranking:'',color:'',RiskMitigationStrategy:'',ResponsibleParty:'' },
    { RiskCategory: '6) Network Security Risks', RiskDescription :'Demo Chnages are done and verified6',Score:'',Ranking:'',color:'',RiskMitigationStrategy:'',ResponsibleParty:'' },
    { RiskCategory: '7) Endpoint Security (Virus/Malware/APT related), Mobile Apps etc', RiskDescription :'Demo Chnages are done and verified7',Score:'',Ranking:'',color:'',RiskMitigationStrategy:'',ResponsibleParty:'' },
    { RiskCategory: '8) Deployed Application and Server security (APT, Hardening etc.) risks9', RiskDescription :'Demo Chnages are done and verified8',Score:'',Ranking:'',color:'',RiskMitigationStrategy:'',ResponsibleParty:'' },
    { RiskCategory: '9) SDLC Security Risks', RiskDescription :'Demo Chnages are done and verified10',Score:'',Ranking:'',color:'',RiskMitigationStrategy:'',ResponsibleParty:'' },
    { RiskCategory: '10) Other', RiskDescription :'Demo Chnages are done and verified11',Score:'',Ranking:'',color:'',RiskMitigationStrategy:'',ResponsibleParty:'' }
    ];
  }
 */
  
   
  onItemSelect(item: any) {
    
    console.log('onItemSelect', item);
}

toggleCloseDropdownSelection() {
    this.closeDropdownSelection = !this.closeDropdownSelection;
    this.dropdownSettings = Object.assign({}, 
      this.dropdownSettings,{closeDropDownOnSelection: this.closeDropdownSelection});
}


  ConvertToInt(val) {
    return parseInt(val);
  }

  count=0;
  counter(){
    this.count=this.count+1
    return this.count
  }

  FromLookUp= [
    { lowerbound : '1', upperbound : '2' , Rank :'L', color : '#d2e06f' },
    { lowerbound : '3', upperbound : '6' , Rank :'M', color : '#fdd969' },
    { lowerbound : '7', upperbound : '10' , Rank :'H', color : '#ffbe60' },
    { lowerbound : '11', upperbound : '12' , Rank :'E', color : '#ec997b' },

  ]

  getColorEvent(i,rank){
    let data=rank
    if(data>0&&data<=2){
      this.categoryLst1[i].color='#d2e06f'
      return '#d2e06f'
    }
    else if(data>2&&data<=6){
      this.categoryLst1[i].color='#fdd969'
      return '#fdd969'
    }
    else if(data>6&&data<=10){
      this.categoryLst1[i].color='#ffbe60'
      return '#ffbe60'
    }
     else{
      this.categoryLst1[i].color='#ec997b'
      return '#ec997b';
     }
  }


  calculateRank(i,rank){
    let data=rank
    if(data<=2){
      this.categoryLst1[i].ranking='L'
      return 'L'
    }
    else if(data>2&&data<=6){
      this.categoryLst1[i].ranking='M'
      return 'M'
    }
    else if(data>6&&data<=10){
      this.categoryLst1[i].ranking='H'
      return 'H'
    }
     else{
      this.categoryLst1[i].ranking='E'
      return 'E';
     }
  }

  changeScore(event){
    ;
 console.log(event);
 event.Ranking = '';
  event.color  = '';
  var selectedScore = this.ConvertToInt(event.score);
 this.FromLookUp.forEach(element => {
   ;
   var  lowerbound = this.ConvertToInt(element.lowerbound);
   var upperbound = this.ConvertToInt(element.upperbound);

  if(selectedScore >= lowerbound && selectedScore <= upperbound ){ 
    ;
    event.Ranking = element.Rank;
    event.color  = element.color;
   
   }   
 });

// if(event.Score <4 ){
//   event.Ranking = "L";
//   event.color  = '#FFFF00';

// }
// else if(event.Score > 5 ){
//   event.Ranking = "H";
//   event.color   = '#FF0000';

// }
// else {
//   event.Ranking = "M";
//   event.color  = '#00FF00';
//  }

   }

save(){
console.log("Summary & Mitigation")
  }


  isNotEmpty:boolean=true
  onEditLoad(){
    let id=this.editRequestId
    this.api.apiMethodFetchDataByGET('api/RequestFormUser/EditRequestLoadonId?reqid=' + id).then(data => {
      console.log("Edit Data",JSON.parse(data.resultOP.riskandRankDetails))
      this.categoryLst1 = JSON.parse(data.resultOP.riskandRankDetails)
      console.log("+-+-+-+-+-+-+-",JSON.parse(data.resultOP.riskandRankDetails))
      for(let i=0;i<this.categoryLst1.length;i++){
        console.log("Rank",this.categoryLst1[i].calcualtnRanking)
        if(this.categoryLst1[i].calcualtnRanking>=7){
          console.log("Not empty")
          this.isNotEmpty=false;
          
        }
      }
      })
  }

  showHighRisk(rank){
    if(rank>=7)
      return true;
    else
      return false;
  }

  riskstrvalue: dropDowns = new dropDowns();
  editRequestId:any;
  model:ApproveDTO=new ApproveDTO();
nextFlag=false;
riskSummaryValidation=true;


  saveAndGo(){
    this.riskSummaryValidation=true;
    console.log(this.categoryLst1)
    console.log(this.riskSummaryValidation)
    for(let i=0;i<this.categoryLst1.length;i++){
      if(this.categoryLst1[i].calcualtnRanking>=7){
          if(this.categoryLst1[i].responsibleParty==""  || this.categoryLst1[i].riskMitigationComments=="" 
          || this.categoryLst1[i].responsibleParty.length<2){
            this.riskSummaryValidation=false

          }
    }
  }
  if(this.riskSummaryValidation){
    this.riskSummaryValidation=true
    console.log("Risk Summary Tab 3",this.categoryLst1)
    this.spinnerService.show();
    this.primaryRequestId=this.editRequestId
    this.riskstrvalue.id=Number(this.primaryRequestId);
    this.riskstrvalue.key=(JSON.stringify(this.categoryLst1));
    this.model.requestId=Number(this.editRequestId)
    this.model.QuestionJSON=(JSON.stringify(this.categoryLst1));
    this.model.status='securitymitigation'
    console.log("++++++++",this.model,"++++++++++++++++")
    this.api.apiMethodFetchDataByPOST("api/RequestFormUser/InsertRequestRiskandRank", this.model).then(result => {
      if (result.status) {
        this.spinnerService.hide();
        this.nextFlag=true
        swal({
          title: "Updated!",
          text: "Risk Summary & Mitigation",
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

categoryLst1:any;
primaryRequestId:any;
RequestDTO:rankrequestListDTO=new rankrequestListDTO();
  loadData(){
    this.primaryRequestId=localStorage.getItem("primaryRequestId");
    this.RequestDTO.id=  this.primaryRequestId;
     this.RequestDTO.key="2";
     this.RequestDTO.categoryId=0;
      this.api.apiMethodFetchDataByPOST("api/RequestMethods/getRequestITInfo",this.RequestDTO).then(async result => {
        if (result.status) {
          console.log("Status",result)
          this.categoryLst1 = result.resultOP;
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
