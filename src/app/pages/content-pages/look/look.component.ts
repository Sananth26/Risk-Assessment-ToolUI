import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal, ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApisProvider } from 'src/app/utility/api';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category, parentLocation, LookUpCategoryItem } from 'src/app/utility/model';
import swal from 'sweetalert2';
import { dropDowns } from 'src/app/utility/TrainingDetailsModel';
import { debug } from 'util';
@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './popuplook.component.html',
})

export class NgbdModalContent2 { 
  @Input() name;
  form: FormGroup;
  description: any;
  Category = new Category();
  message: string = "";

  constructor(public activeModal: NgbActiveModal,private api: ApisProvider, private _formBuilder: FormBuilder) {

   }


   ngOnInit(): void {
    this.form = this._formBuilder.group({
      name: ['',],
      description: ['']
    })
    //this.saveCategory();
  }
  saveCategory(){
    ;
    if (this.form.get('name').value != '' && this.form.get('description').value != '') {

    this.Category.name = this.form.get('name').value;
    this.Category.description = this.form.get('description').value;
    this.api.sendFormData('api/LookUp/CreateLookUpMaster', this.Category).subscribe(async result => {
      ;
      if (result.status) {
        swal("Saved Successfully!", "success").then
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

  checkName() {
    ;
    let LookUpName =this.form.get('name').value;
     this.api.apiMethodFetchDataByGET('api/LookUp/getLookupByNameExist?LookUpName=' + LookUpName).then(data => {
      ;
      if (data.status){
        this.message = "Category Name exists!"
      }
      else
        this.message = ""
    }

    )
  }

}
@Component({
  selector: 'app-look',
  templateUrl: './look.component.html',
  styleUrls: ['./look.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LookComponent implements OnInit {

  closeResult: string;
  rows = [];
  rows2 = [];
  itemList: any;
  categoryValue: any;
  pleaseFill: string = "";
  categoryId: any;
  fields :any;
  editing :any;
  loadCategoriesList: parentLocation[] = new Array();
  lookUpCatName : any;
  lookUpCatId : any;
  lookUpItemList: LookUpCategoryItem[] = new Array();
  isEditable = {};   

  selectedCORS: Array<any> = [];

  constructor(private modalService: NgbModal, private api: ApisProvider,) { }

  // Open default modal
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  // This function is used in open
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  // Open Modal as content
  openContent() {
    const modalRef = this.modalService.open(NgbdModalContent2,{ backdropClass: 'light-blue-backdrop', size: 'lg' });
    modalRef.componentInstance.name = 'World';
  }

  ngOnInit() {
    //this.rows = this.data;
     this.onLoadCategory();
     //this.loadCategoriesList("")
  }
  // Save row
  save(row, rowIndex) {
    ;
    this.isEditable[rowIndex] = !this.isEditable[rowIndex]
     row.categoryId = this.lookUpCatId;
    row.Category = this.lookUpCatName;
    this.api.apiMethodSaveDataByPOST('api/LookUp/CreateLookUpItem', row).then(async result => {
      if (result.status) {
        swal("Saved Successfully!", "success").then
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

  

  // Delete row
  delete(row, rowIndex) {
    this.isEditable[rowIndex] = !this.isEditable[rowIndex];
    ;
   let id = row.id;
    this.api.apiMethodFetchDataByGET('api/LookUp/LookUpDeleteData?id=' + id ).then(async result => {
      
       
       if (result.status) {
        swal("Deleted Successfully!", "success").then
          ((result) => {
          this.loadItemBasedOnCategory(this.lookUpCatName);
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
  
  //for styles
  styleFunctions(isEditable) {
    
    console.log(isEditable)
    let inputEnabled = {
      'border': 'solid 0.9px',
      'background-color': 'White'
    }

    let inputDisabled = {
      'outline': 'none',
      'outline-style': 'none',
      'box-shadow': 'none',
      'border-color': 'transparent',
      'border': 'solid 2px transparent',
      'background-color': 'transparent'
    }
    let returnStyle;

    if (isEditable == true) {
      returnStyle = inputEnabled

    }
    else {
      returnStyle = inputDisabled
    }

    return returnStyle;
  }

 onLoadCategory(){
    
    this.api.apiMethodFetchDataByGET("api/LookUp/getLockUpMaster").then(data => {
      ;
      console.log(data);
      this.rows2 =  <dropDowns[]> data.resultOP;     
  });
  }

loadItemBasedOnCategory(event:any){

  ;
  this.rows =[];
   if(event.target == undefined){
    this.lookUpCatName = event;
   }
   else{
    this.lookUpCatName = event.target.value;
    this.lookUpCatId = event.target.selectedIndex;
   }
 
  this.api.apiMethodFetchDataByGET("api/LookUp/getLookupItems?LookUpName="+ this.lookUpCatName).then(data => {
    ;
     this.rows = data.resultOP;
    console.log(this.rows);
  });
}

addItemClick() {
  ;
  // this.addItemAlreadyclicked = true;
  let lookUpItemListDuplicate = new Array();
  let addItem = new LookUpCategoryItem();
 // let addItem =[];
  addItem.id = 0;
  addItem.key = '';
  addItem.displayOrder = '';
  addItem.value = '';
  addItem.categoryId = this.lookUpCatId;
  addItem.Category = "";
  
  // for (var i = 1; i <= this.lookUpItemList.length; i++) {
  //   lookUpItemListDuplicate[i] = this.lookUpItemList[i - 1];
  // }
 // lookUpItemListDuplicate[0] = Object.assign({}, addItem);
   
   //this.rows = lookUpItemListDuplicate[0];
let jsonobj = {id:0,key:'',displayOrder:1, value:'' };
   //this.rows.push(jsonobj);
  
   console.log(this.rows);
   let tempRows = this.rows;
        tempRows.push(jsonobj);
        
        this.rows =[];
        setTimeout(() => {
            this.rows = tempRows;
      });
        // setTimeout(function () {
        //   this.rows = tempRows;
        // }.bind(this), 500);

}

updateValue(event, cell, cellValue, index) {
  ;
  let keyCount: number = 0;
  this.itemList[index][cell] = event.target.value;
  if (cell === "key") {
    //this.lookUpkeyExists = this.checkIfLookUpKeysExist(row.key);
  }

}

editRow(rowIndex) {

  ;
  for (let index = 0; index < this.fields.length; index++) {
    let data = this.fields;
    if (rowIndex == index) {
      this.editing[index] = true;
    }
    else
      this.editing[index] = false;
  }

}
}
