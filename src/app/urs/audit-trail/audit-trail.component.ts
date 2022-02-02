import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { auditFormData } from 'src/app/utility/model';
import swal from 'sweetalert2';
import { util } from 'src/app/utility/util';
import { ApisProvider } from 'src/app/utility/api';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-audit-trail',
  templateUrl: './audit-trail.component.html',
  styleUrls: ['./audit-trail.component.scss'],
  })

export class AuditTrailComponent implements OnInit {
  auditForm: FormGroup;
  @ViewChild('myTable', {static: true}) table: any;
  public spinnerFlag: boolean = false;
  public isDisable: boolean = false;
  public startdate1: NgbDateStruct;
  public Enddate1: NgbDateStruct;
  public dataXls: any;
  public today: NgbDateStruct;
  auditRecord: auditFormData = new auditFormData();
  spinner: boolean = false;
  data: any;
  //  data = [
  // //  {systemRemarks:['ok','not that good'],browser:'chrome',userRemarks:['user remarks for the action','not ok'],loginUserName:'user1', event:'edit',projectName :'project 1',displayOrder:'1',uniqueDocCode:'document code',ipAddress:'0.0.0.0.19',createdTime:'12:34'},
  // //   {systemRemarks:['ok','not that good'],browser:'chrome',userRemarks:['user remarks for the action','not ok'],loginUserName:'user1', event:'add',projectName :'project 1',displayOrder:'1',uniqueDocCode:'document code 2',ipAddress:'0.0.0.0.19',createdTime:'12:34'},
  //  ]

  constructor(public api: ApisProvider, public appComponent: AppComponent, private _formBuilder: FormBuilder, private util: util) { }

  ngOnInit() {
    this.auditForm = new FormGroup({
     
      'startdate1': new FormControl(Date),
      'Enddate1': new FormControl(Date),
    
    }, { updateOn: 'blur' });
    let now = new Date();
    let maxMonth: number = now.getMonth() + 1;
    let maxYear: number = now.getFullYear();
    let maxDate: number = now.getDate();
    // let test = new NgbDateISOParserFormatter;
    // this.spinnerFlag = true;
    // this.startdate1 = test.parse(now.toISOString());
    // this.Enddate1 = test.parse(now.toISOString());
    // this.today = test.parse(now.toISOString());

  }
  
  loadAuditDateRange(){

    this.api.apiMethod("api/Audit/GetAuditData", this.auditRecord).then(result => {
      this.spinner = false;
      ;
      if (result.resultOP.length > 0) {
        this.data = result.resultOP;
        ;
        console.log(this.data);
        //  [ // {systemRemarks:['ok','not that good'],browser:'chrome',userRemarks:['user remarks for the action','not ok'],loginUserName:'user1', event:'edit',projectName :'project 1',displayOrder:'1',uniqueDocCode:'document code',ipAddress:'0.0.0.0.19',createdTime:'12:34'},
        // {systemRemarks:['ok','not that good'],browser:'chrome',userRemarks:['user remarks for the action','not ok'],loginUserName:'user1', event:'add',projectName :'project 1',displayOrder:'1',uniqueDocCode:'document code 2',ipAddress:'0.0.0.0.19',createdTime:'12:34'},
        //]
      } else {
        swal(
          'No Data!',
          'No Data',
          'error'
        ).then(() => {
        });
      }
    },
      err => {
        swal(
          'Not Updated!',
          'No Data.',
          'error'
        ).then(() => {
        });
      }
    );
 
    
  }

  onChangePage(event){
     
  }

  toggleExpandRow(row) {
    
    ;

    this.table.rowDetail.toggleExpandRow(row);

  }
}
