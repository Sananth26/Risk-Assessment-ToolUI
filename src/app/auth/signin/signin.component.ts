import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { ApisProvider } from 'src/app/utility/api';
import * as alertFunctions from '../../shared/data/sweet-alerts';
import { UserModel } from 'src/app/utility/model';
import { RouteInfo1 } from '../../shared/sidebar/sidebar.metadata';
import { ROUTES } from '../../shared/sidebar/sidebar-routes.config';
import { SidebarComponent } from 'src/app/shared/sidebar/sidebar.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { time } from 'console';
 

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  providers : [SidebarComponent]
})
export class SigninComponent implements OnInit {

  
  signin: FormGroup;
  menulist: RouteInfo1 ;
  loginValidation:boolean=false;
     
  constructor(private router: Router,
    private route: ActivatedRoute,
    private ApiApisProvider: ApisProvider,
    private _formBuilder: FormBuilder, private apiProvider: ApisProvider, private sidebarComponent: SidebarComponent,
    private spinnerService: Ng4LoadingSpinnerService
  ) { }
 
  onSubmit() {
  }

  onResetpassword() {
    this.router.navigate(['reset-password'], { relativeTo: this.route.parent });
  }

  onSignup() {
    this.router.navigateByUrl('auth/signup');
  }

  ngOnInit() {
    this.signin = this._formBuilder.group({
      userEmail: ['', [Validators.required, Validators.email]], 
      password: ['', Validators.required]
    });

  }


  userlogin(signin) {
    this.spinnerService.show();
    var sideBar = localStorage.getItem('redirectTo');
    if(sideBar==null){
      localStorage.setItem("redirectTo",'/urs/uasdashboard')
    }
   
     this.ApiApisProvider.apiMethodFetchDataByPOST('api/Login/LoginValidations', signin.value).then(result => {
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
        if(sideBar!=''){
          this.router.navigateByUrl(localStorage.getItem("redirectTo"))
        }else{
          this.router.navigateByUrl('/urs/uasdashboard');

        }

      }    else {
        this.loginValidation=true
        this.signin.reset();
       }
     })
  }





}
