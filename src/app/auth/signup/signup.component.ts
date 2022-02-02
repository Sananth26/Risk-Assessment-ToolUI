import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, Validators, FormBuilder, FormGroup, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { takeUntil } from 'rxjs/operators';
import { ApisProvider } from 'src/app/utility/api';
import { Subject } from 'rxjs';
import * as alertFunctions from '../../shared/data/sweet-alerts';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

   ngOnInit() {
    
  }
  
}