import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { ApisProvider } from 'src/app/utility/api';
import * as alertFunctions from '../../shared/data/sweet-alerts';
import { UserModel } from 'src/app/utility/model';
import { RouteInfo1 } from '../../shared/sidebar/sidebar.metadata';
import { ROUTES } from '../../shared/sidebar/sidebar-routes.config';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { time } from 'console';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //@ViewChild('f', { static: true }) signin: NgForm;
  
  signin: FormGroup;
 // ROUTES = [];
    menulist: RouteInfo1 ;
    loginValidation:boolean=false;
     
  constructor(private router: Router,
    private route: ActivatedRoute,
    private ApiApisProvider: ApisProvider,
    private _formBuilder: FormBuilder, private apiProvider: ApisProvider,
    private spinnerService: Ng4LoadingSpinnerService
  ) { }
  //    {
  //    if (this.apiProvider.authenticated()) {
  //      console.log("ok")
  //     this.router.navigateByUrl('dashboard/v2');
  // } else {
  //     this.router.navigateByUrl('auth/signin')
  //     console.log("notok")
  // }}

  //  On submit click, reset field value
  onSubmit() {
    //this.signin.reset();
  }

  // On ResetPassword link click
  onResetpassword() {
    this.router.navigate(['reset-password'], { relativeTo: this.route.parent });
  }

  // On Signup link click
  onSignup() {
    this.router.navigateByUrl('auth/signup');
  }

  ngOnInit() {
    this.signin = this._formBuilder.group({
      userEmail: ['', [Validators.required, Validators.email]], 
      password: ['', Validators.required]
    });
    console.log("Demo",localStorage.getItem("redirectTo"))
    console.log("Demo",localStorage.getItem("redirectTo")!="")

  }


  userlogin(signin) {
    this.spinnerService.show();
    console.log(localStorage.getItem("redirectTo"))
    // localStorage.setItem("token",JSON.stringify(""))
    // localStorage.setItem("userEmail", this.ApiApisProvider.encode("deva"))
    // localStorage.setItem("userName", this.ApiApisProvider.encode("deva"))
    // localStorage.setItem("userId", this.ApiApisProvider.encode(10))
    //this.router.navigateByUrl('/urs/uasdashboard');
    //this.router.navigateByUrl('/urs/itfirewallrequestform');
    
     this.ApiApisProvider.apiMethodFetchDataByPOST('api/Login/LoginValidations', signin.value).then(result => {
      console.log("result",result) 
      this.loginValidation=false
      if (result.status) {
        sessionStorage.setItem("userEmail", result.resultOP.userEmail)
        sessionStorage.setItem("userName", result.resultOP.userName)
        sessionStorage.setItem("mobileNo", result.resultOP.mobileNo)
        sessionStorage.setItem("corporateId", result.resultOP.corporateId)
        sessionStorage.setItem("department", result.resultOP.department)
        
        let userDetails = result.resultOP;
        localStorage.setItem("token",JSON.stringify(userDetails.token))
        localStorage.setItem("userEmail", this.ApiApisProvider.encode(userDetails.userEmail))
        localStorage.setItem("userName", this.ApiApisProvider.encode(userDetails.userName))
        localStorage.setItem("userId", this.ApiApisProvider.encode(userDetails.userId))
   setTimeout(()=>{
    if(localStorage.getItem("redirectTo")!=""){
      this.router.navigateByUrl(localStorage.getItem("redirectTo"))
    }else{
    this.router.navigateByUrl('/urs/uasdashboard');
    }
    this.spinnerService.hide()
   },2000)
      }    else {
        this.loginValidation=true
        this.signin.reset();
       }
     }).catch(data => {

     });
  }





}
