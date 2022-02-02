import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { dropDowns } from 'src/app/utility/TrainingDetailsModel';
import { ApisProvider } from 'src/app/utility/api';
import swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { addNewcategory, categoryItem } from 'src/app/utility/uasModels';
import { UserAccess, RolePermission } from 'src/app/utility/model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PeerreviewWorkflowComponent } from 'src/app/modals/peerreview-workflow/peerreview-workflow.component';
import { ModalComponent } from 'src/app/modals/modal/modal.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as XLSX from 'xlsx';
type AOA = any[][];
 

@Component({
  selector: 'app-lookupurs',
  templateUrl: './lookupurs.component.html',
  styleUrls: ['./lookupurs.component.scss']
})
export class LookupursComponent implements OnInit {
  @ViewChild('vendorTab',null) tab:any;
  currentJustify = 'center';
  categoryList: Array<dropDowns> = [];
  selectedCategory: dropDowns = new dropDowns();
  categoryItems: Array<categoryItem> = [];
  subCategoryList: Array<dropDowns> = [];
  selectedSubCategory: dropDowns = new dropDowns();
  subCategoryItems: any = [];
  titlePopUP: string = "";
  formAddCategory: FormGroup;
  addNewcategory: addNewcategory = new addNewcategory();
  isEditable = {};
  isSubEditable = {};
  UserAccessModel: UserAccess = new UserAccess();
  RolePermissionModel: RolePermission = new  RolePermission();
  isShown = true;
  isShownQuestion = false;
  FileImported : File = null;
  constructor(private modalService: NgbModal,private spinnerService: Ng4LoadingSpinnerService,private matDialog:MatDialog,public Config: NgbModalConfig ,private api: ApisProvider) {
    //config: NgbModalConfig 
    //config.backdrop = 'static';
    //config.keyboard = false;
   }

   openModal(id) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.position= {top: '3%'}
    dialogConfig.id = "modal-component";
    dialogConfig.height = "290px";
    dialogConfig.width = "500px";
    dialogConfig.data={'name':'Sunil'};
    dialogConfig.data={id};
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      this.loadCateogories();
    });
  }

  ngOnInit() {

    this.formAddCategory = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
    });
    this.OnLoadButtonPermission();
    this.loadCateogories();
    this.onSubCateogoriesChange();
  }


  loadCateogories() {
    this.categoryList = [];
    this.api.apiMethodFetchDataByGET("api/LookUPMaster/getLookUpMaster").then(result => {
      if (result.status) {
        this.categoryList = <dropDowns[]>result.resultOP;


      } else {
        swal(
          'Error!',
          result.description,
          'error'
        )
      }
    });
  }

  enableSubCategory:boolean=false;
  onCateogoriesChange(data: any) {
    this.subCategoryItems = [];
    this.subCategoryList = [];
    this.selectedSubCategory = new dropDowns();
    this.tab.activeId="Draft"
    console.log("This selected category Id",this.selectedCategory.id)
    if(this.selectedCategory.id==11){
      this.api.apiMethodFetchDataByGET('api/LookUPMaster/getLookupItems?categoryId=' +1).then(result => {
        console.log("Result,result",result)
        if (result.status) {
         this.categoryItems = result.resultOP;
         this.subCategoryList = <dropDowns[]>result.resultOP;
         this.isShownQuestion=false;
        if(this.selectedCategory.id==11){
          this.enableSubCategory=true;
          this.isShown=false;
        }
       
  
        } else {
          swal(
            'Error!',
            result.description,
            'error'
          )
        }
      });
    }else{
      this.enableSubCategory=false
      this.api.apiMethodFetchDataByGET('api/LookUPMaster/getLookupItems?categoryId=' + this.selectedCategory.id).then(result => {
        console.log("Result,result",result)
        if (result.status) {
         this.categoryItems = result.resultOP;
         this.isShown=true;
         this.isShownQuestion=false;
  
       
          if (this.selectedCategory.id == 1) {
            this.subCategoryList = <dropDowns[]>result.resultOP;
          }
          else if (this.selectedCategory.id == 7){
            this.isShown=false
            this.isShownQuestion=true;
          }
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

  onSubCateogoriesChange(data?) {
    this.api.apiMethodFetchDataByGET('api/LookUPMaster/getLookupSubItems?subCategoryId=' + this.selectedSubCategory.id).then(result => {
      if (result.status) {
        this.subCategoryItems = result.resultOP;
      } else {
        swal(
          'Error!',
          result.description,
          'error'
        )
      }
    });
  }


  data: AOA = [];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  formData:any;
  fileName: string = 'SheetJS.xlsx';
  enableUpload=false;
  handleFileInput(fileInput: any) { 
    this.spinnerService.show()
    this.FileImported = <File>fileInput.target.files[0];
    let files: File = <File>fileInput.target.files[0];
    let fileToUpload = <File>files;
    this.formData = new FormData();
    this.formData.append('file', fileToUpload, fileToUpload.name);

    const target: DataTransfer = <DataTransfer>(fileInput.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      this.enableUpload=true

    };
    this.spinnerService.hide()
    reader.readAsBinaryString(target.files[0]);
    console.log(this.formData)
   }


   upload(){
     this.enableUpload=false
     this.spinnerService.show()
     console.log(this.formData)
     this.api.sendFormData('api/UserCreation/ExcelImport',this.formData ).subscribe(result => {
      if (result.status) {
        this.spinnerService.hide()
    if (result.description=="CategoryMissing"){
      let xx=  result.resultOP +"   "+ result.description;
      swal(
        'Error!',
       xx,
        'error'
      )
    }
    else{
        swal("Uploaded Successfully!", "success").then
          ((result) => {
    
           //  this.form.reset();
            //this.loadUserData();
          })}
          }
          else
           {
        swal(
          'Error!',
          result.description,
          'error'
        )
      //  this.form.reset();
      }
    });
   }
   

  styleFunctions(isEditable) {

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

  closeResult: string;
  openContent(content, type: string) {
    this.addNewcategory = new addNewcategory();
    this.addNewcategory.type = type;

    if (type == "category") {
      this.titlePopUP = "Add new Category.";
      this.addNewcategory.mainCategoryId = 0;
    } else {
      this.addNewcategory.mainCategoryId = this.selectedCategory.id;
      this.titlePopUP = "Add Sub-Category for " + this.selectedCategory.key;
    }

    const modalRef = this.modalService.open(content, { backdropClass: '', size: 'lg' }).result.then((result) => {
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


  checkCategoryName() {
  
      let exist = this.categoryList.filter(x => x.key == this.addNewcategory.name);
      if (exist.length >= 1) {
        this.addNewcategory.name = "";
        swal(
          'This Name already taken..!',
          'Looks like Category already created in this name, Give a different Name.',
          'info'
        )
        return;
      }
 
  }


  saveCategory() {
    this.api.apiMethodSaveDataByPOST('api/LookUPMaster/CreateLookUpMaster', this.addNewcategory).then(async data => {
      if (data.status) {
        swal("Saved Successfully!", "success").then
          ((result) => {
            this.modalService.dismissAll();
            this.categoryList = [];
            this.categoryList = <dropDowns[]>data.resultOP;
            this.addNewcategory = new addNewcategory();
          })
      } else {
        swal(
          'Error!',
          data.description,
          'error'
        )
      }
    });
  }

  addEnable:boolean=true;
  addCategoryItemClick(type: string) {
    console.log("Add category",type)
    if(this.addEnable){
      this.addEnable=false
      let categoryItem: categoryItem = {
        id: 0, categoryId: 0, displayOrder: 0, key: '', value: '', type: '',active:''
      };
  
      if (type == "category") {
        let tempRows = this.categoryItems;
        tempRows.unshift(categoryItem);
        this.categoryItems = [];
        setTimeout(() => {
          this.categoryItems = tempRows;
        });
      }else{
        let tempRows = this.subCategoryItems;
        tempRows.unshift(categoryItem);
        this.subCategoryItems = [];
        setTimeout(() => {
          this.subCategoryItems = tempRows;
        });
      }
    }
  }

  categoryKey:string;
  categoryValue:string;
  subcategoryKey:string;
  subcategoryValue:string;
  save1(){
    console.log(this.categoryValue,this.categoryKey)
    let category = new categoryItem();
    category.active="Yes"
    category.type="category"
    category.categoryId=this.selectedCategory.id
    category.key=this.categoryKey
    category.value=this.categoryValue
    category.displayOrder=0;
    category.id=0;
    let type="category"
    console.log("Category++++++",category)

  this.api.apiMethodSaveDataByPOST('api/LookUPMaster/CreateLookUpItem', category).then(async data => {
      if (data.status) {
        swal({
          title: "Category Saved Successfully!",
          type: "success",
          timer: 2000
          }).then
          ((result) => {
            if (type == "category") {
              this.categoryItems = data.resultOP;

              if (this.selectedCategory.id == 1) {
                this.subCategoryList = <dropDowns[]>data.resultOP;
                this.categoryKey=''
                this.categoryValue=''
              }
             } else {
              this.subCategoryItems = data.resultOP;
              this.categoryKey=''
              this.categoryValue=''
            }
          })
      } else {
        swal(
          'Error!',
          data.description,
          'error'
        )
      }
    });  
  }

  save2(){
    console.log(this.categoryValue,this.categoryKey)
    let category = new categoryItem();
    category.active="Yes"
    category.type="subCategory"
    category.categoryId=this.selectedSubCategory.id
    category.key=this.subcategoryKey
    category.value=this.subcategoryValue
    category.displayOrder=0;
    category.id=0;
    let type="subCategory"

    console.log("SubCategory++++++",category)
  this.api.apiMethodSaveDataByPOST('api/LookUPMaster/CreateLookUpItem', category).then(async data => {
      if (data.status) {
        swal({
          title: "Sub Category Saved Successfully!",
          type: "success",
          timer: 2000
          }).then
          ((result) => {
            if (type == "category") {
              this.categoryItems = data.resultOP;
              if (this.selectedCategory.id == 1) {
                this.subCategoryList = <dropDowns[]>data.resultOP;
                this.categoryKey=''
                this.categoryValue=''
              }
            } else {
              this.subCategoryItems = data.resultOP;
              this.categoryKey=''
              this.categoryValue=''
            }
          })
      } else {
        swal(
          'Error!',
          data.description,
          'error'
        )
      }
    });  
  }

  update1(){
    let category = new categoryItem();
    category.active="Yes"
    category.type="category"
    category.categoryId=this.selectedCategory.id
    category.id=this.rowdetails.id
    category.key=this.categoryKey
    category.value=this.categoryValue
    category.displayOrder=this.rowdetails.displayOrder;
    let type="category"
    console.log("Category Update++++++",category)
    this.api.apiMethodSaveDataByPOST('api/LookUPMaster/CreateLookUpItem', category).then(data => {
      if (data.status) {
        swal({
          title: "Category Updated Successfully!",
          type: "success",
          timer: 2000
          }).then
          ((result) => {
            if (type == "category") {
              console.log("category",this.categoryItems)
              this.categoryItems = data.resultOP;
              if (this.selectedCategory.id == 1) {
                this.subCategoryList = <dropDowns[]>data.resultOP;
                this.categoryKey=''
                this.categoryValue=''
              }
            } else {
              this.subCategoryItems = data.resultOP;
              this.categoryKey=''
              this.categoryValue=''
            }
          })
      } else {
        swal(
          'Error!',
          data.description,
          'error'
        )
      }
    });  
  }

  update2(){
    let category = new categoryItem();
    category.active="Yes"
    category.type="subCategory"
    category.categoryId=this.selectedSubCategory.id
    category.id=this.rowdetails.id
    category.key=this.subcategoryKey
    category.value=this.subcategoryValue
    category.displayOrder=this.rowdetails.displayOrder;
    let type="subCategory"

    console.log("Category Update++++++",category)
  this.api.apiMethodSaveDataByPOST('api/LookUPMaster/CreateLookUpItem', category).then(data => {
      if (data.status) {
        swal({
          title: "Sub Category Updated Successfully!",
          type: "success",
          timer: 2000
          }).then
          ((result) => {
            if (type == "category") {
              console.log("category",this.categoryItems)
              this.categoryItems = data.resultOP;
              if (this.selectedCategory.id == 1) {
                this.subCategoryList = <dropDowns[]>data.resultOP;
                this.categoryKey=''
                this.categoryValue=''
              }
            } else {
              this.subCategoryItems = data.resultOP;
              this.categoryKey=''
              this.categoryValue=''
            }})
      } else {
        swal(
          'Error!',
          data.description,
          'error'
        )}
    });  
  }

  cancel(){
    this.categoryKey='';
    this.categoryValue='';
    this.subcategoryKey='';
    this.subcategoryValue='';
    this.isUpdate=false;
  }

  rowdetails:any;
  isUpdate:boolean=false;
  editCategory(row){
    console.log(row)
    this.rowdetails=row
    this.isUpdate=true;
    this.categoryKey=row.key
    this.categoryValue=row.value
  }

  editsubCategory(row){
    console.log(row)
    this.rowdetails=row
    this.isUpdate=true;
    this.subcategoryKey=row.key
    this.subcategoryValue=row.value
  }

  saveCategoryItem(row, rowIndex, type: string) {
    this.addEnable=true;
    let category = new categoryItem();
    category = <categoryItem>row;
    category.active="Yes"
    if (type == "category") {
      this.isEditable[rowIndex] = !this.isEditable[rowIndex]
      category.categoryId = this.selectedCategory.id;
      category.type = type;
    } else {
      this.isSubEditable[rowIndex] = !this.isSubEditable[rowIndex]
      category.categoryId = this.selectedSubCategory.id;
      category.type = type;
    }

    console.log("Category++++++",category)
    this.api.apiMethodSaveDataByPOST('api/LookUPMaster/CreateLookUpItem', category).then(async data => {
      if (data.status) {
        swal("Saved Successfully!", "success").then
          ((result) => {
            if (type == "category") {
              this.categoryItems = data.resultOP;

              if (this.selectedCategory.id == 1) {
                this.subCategoryList = <dropDowns[]>data.resultOP;
              }
            } else {
              this.subCategoryItems = data.resultOP;
            }
          })
      } else {
        swal(
          'Error!',
          data.description,
          'error'
        )
      }
    });
  }

  // Delete row
  deleteCategoryItem(row,type: string) {
    let id = row.id;
    this.api.apiMethodFetchDataByGET('api/LookUPMaster/LookUpDeleteData?id=' + id + '&type=' + type).then(async data => {
      if (data.status) {
        swal("Deleted Successfully!", "success").then
          ((result) => {
            if (type == "category") {
              this.categoryItems = data.resultOP;
              if (this.selectedCategory.id == 1) {
                this.subCategoryList = <dropDowns[]>data.resultOP;
              }
            } else {
             
              this.subCategoryItems = data.resultOP;
            }
          })
      } else {
        swal(
          'Error!',
          data.description,
          'error'
        )
      }
    });
  }

  // User role and permission
OnLoadButtonPermission() {


var loginUseridEncode =localStorage.getItem('userId'); 
this.RolePermissionModel.userId =parseInt(this.api.decode(loginUseridEncode));
   this.RolePermissionModel.url= "/urs/lookupurs";

this.api.apiMethodFetchDataByPOST("api/Login/RoleandPermission",this.RolePermissionModel).then(async data => {
      
       if (data.status) {
        
        this.UserAccessModel = data.resultOP[0];
        if (this.UserAccessModel.menuAccess == 0 || this.UserAccessModel.menuAccess == 0 )
         {
        //  this.router.navigate(['/error-404']);
          return;
         }
        else
         {
          console.log(this.UserAccessModel);
         }


       } else {
         
       }
     })

}

}
