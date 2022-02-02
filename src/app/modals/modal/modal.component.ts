import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApisProvider } from 'src/app/utility/api';
import { dropDowns } from 'src/app/utility/model';
import { addNewcategory } from 'src/app/utility/uasModels';
import swal from 'sweetalert2';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  categoryForm:FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public fb:FormBuilder,private api: ApisProvider,public dialogRef: MatDialogRef<ModalComponent>) { }

  ngOnInit() {
    this.categoryForm = this.fb.group({
      key: ['', Validators.compose([
        Validators.required
      ])],
      description: ['', Validators.compose([
        Validators.required
      ])]
    });
    console.log("demomodal",this.data)
  }

  categoryList: Array<dropDowns> = [];
  addNewcategory: addNewcategory = new addNewcategory();
  validationMsg:boolean=false;
  saveCategory(valid) {
    console.log(valid)
    if(valid){
      this.validationMsg=false
    this.addNewcategory.mainCategoryId = 0;
    this.addNewcategory.type = 'category';
    this.addNewcategory.description=this.categoryForm.get('key').value
    this.addNewcategory.name=this.categoryForm.get('description').value
    console.log(this.addNewcategory)
    this.api.apiMethodSaveDataByPOST('api/LookUPMaster/CreateLookUpMaster', this.addNewcategory).then(async data => {
      if (data.status) {
        swal({
          title: "Success!",
          text: "New category created",
          type: "success",
          timer: 2000
          }).then
          ((result) => {
            this.categoryList = [];
            this.categoryList = <dropDowns[]>data.resultOP;
            this.addNewcategory = new addNewcategory();
            this.closeModal();
          })
      } else {
        swal(
          'Error!',
          data.description,
          'error'
        )
      }
    });
    }else{
      this.validationMsg=true;
    }
    
  }


  // When the user clicks the action button a.k.a. the logout button in the\
  // modal, show an alert and followed by the closing of the modal
  actionFunction() {
    this.closeModal();
  }

  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  closeModal() {
    console.log(this.categoryForm.getRawValue())
    this.dialogRef.close();
  }

  closeCategory(){
    this.categoryForm.reset();
  }

}

