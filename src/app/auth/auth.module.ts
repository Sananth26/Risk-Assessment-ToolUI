import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { LockScreenComponent } from './lock-screen/lock-screen.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SigninComponent } from './signin/signin.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    LockScreenComponent, 
    ResetPasswordComponent,SigninComponent,SignupComponent
   ],
  imports: [
    CommonModule,
    AuthRoutingModule,ReactiveFormsModule,
    FormsModule]
})
export class AuthModule { }
