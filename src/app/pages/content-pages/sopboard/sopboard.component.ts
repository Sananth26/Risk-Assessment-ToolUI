import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ApisProvider } from 'src/app/utility/api';
import swal from 'sweetalert2';
import { error } from 'protractor';

@Component({
  selector: 'app-sopboard',
  templateUrl: './sopboard.component.html',
  styleUrls: ['./sopboard.component.scss']
})
export class SopboardComponent implements OnInit {

  departmentNameDTOList: Array<any> = [];
  departmentName: string;
  cardDetails: Array<any> = []; 
  corsDropdownList :  Array<any> = [];
  statusHeading : string;
  CardsData: any[];
  tableData : any[];
  DocNumber : any[]; 
  tableDataCopy : any[];
  tableDataActual : any[];
  corsdropdownSettings:any={
    singleSelection: true,
    idField: 'id',
    textField: 'key',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 6,
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };
  selectedCORS: Array<any> = [];


  constructor(  private router: Router, private route: ActivatedRoute, private _formBuilder: FormBuilder, private ApiApisProvider: ApisProvider, private api: ApisProvider) { }

  ngOnInit() {
   this.onDeptLoad();
   this.corsDropdownList = this.departmentNameDTOList;

  }

  onDepartmentNameChange(data: any)
  {
    this.clearBoard();
    this.api.apiMethodFetchDataByGET("api/SOPForm/LoadTheDetails?departmentId="+ data).then(data => {
      ;
      if (data.status) {
        console.log(data);
        
      let dataParsed = data["resultOP"];
        this.CardsData = dataParsed.cardDetails;
        this.tableDataActual = dataParsed.documentDetailsForTable;
        this.tableData = dataParsed.documentDetailsForTable;
        this.tableDataCopy = dataParsed.documentDetailsForTable;
        this.DocNumber = dataParsed.listOfDocumentNums;
        this.statusHeading = "Total Documents";
        ;
     }else {
       swal(
         'Error!',
         data.description,
         'error'
       )
     }
   });
  }

  onDeptLoad(){
    let name = "Department";
    this.api.apiMethodFetchDataByGET("api/LookUp/getLookupItems?LookUpName="+ name).then(data => {
       if (data.status) {
       let dataParsed = data["resultOP"];
       this.departmentNameDTOList = dataParsed;
      }else {
        swal(
          'Error!',
          data.description,
          'error'
        )
      }
    });
  }

  viewtheSop(data: any){
    this.router.navigate(['/pages/sopform'], { queryParams: { docNumber: data } , queryParamsHandling: "merge"});
  }

  filtertable(statusId :any,statusName :any)  { 
   ;
   this.tableData =[];

   this.statusHeading = statusName;
   if(statusId ==0){
     this.tableData = this.tableDataActual;
   }
   else{
    var list = this.tableDataCopy.filter(x => x.statusId == statusId);
    if (list.length >= 1) {
     this.tableData = list;
    }
     
  }   
  }

  filtertableDDL(documentNumber : any){
    this.tableData =[];
    var list = this.tableDataCopy.filter(x => x.documentNumber == documentNumber);
    if (list.length >= 1) {
    this.tableData = list;
    }
  }
  clearBoard(){
    this.tableData =[];
    this.CardsData = [];
    this.tableDataActual = [];
    //this.tableDataCopy = dataParsed.documentDetailsForTable;
    this.DocNumber = [];
    this.statusHeading = "";
  }
    
     
}

