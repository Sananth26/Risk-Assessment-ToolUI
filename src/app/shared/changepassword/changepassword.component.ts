import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApisProvider } from 'src/app/utility/api';
import { Password } from 'src/app/utility/Usermodel';
import swal from 'sweetalert2';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {

  oldpassword: string='';
  newpassword: string='';
  validationMsg=false

  constructor( public router:Router,private api: ApisProvider,private spinnerService: Ng4LoadingSpinnerService,) { }

  ngOnInit() {
  }

  onSubmit() {

    
  }


  password : Password = new Password();
  ChangePassword(){
    this.spinnerService.show()
    if(this.oldpassword!=''&& this.newpassword!=''){
      this.validationMsg=false;
      this.password.userId=Number(this.api.decode(localStorage.getItem("userId")));//userid
    this.password.oldPassword=this.oldpassword;
    this.password.newPassword= this.newpassword;
    this.api.apiMethodFetchDataByPOST("api/Login/ChangePassword", this.password).then(result => {
      if (result.status) {
      this.spinnerService.hide()
        swal({
          title: "Password Updated Successfully",
          type: "success",
          timer: 2000
          })
      } else {
        swal({
          title: "Passwords Mismatch",
          type: "error",
          timer: 2000
          })
        swal(
          'Error!',
          "Old",
          'error'
        )
      }
    });

    }else{
      this.spinnerService.hide()
      this.validationMsg=true;
    }
    
      }


    onCancel(){
    this.oldpassword='';
    this.newpassword='';
    this.validationMsg=false;
    this.router.navigate( ['urs/uasdashboard']);

    }
}
