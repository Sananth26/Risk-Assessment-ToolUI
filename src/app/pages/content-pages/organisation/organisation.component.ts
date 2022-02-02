import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm, Validators, FormControl, FormBuilder, FormGroupDirective } from '@angular/forms';
import { placeholderChars, alphabetic, digit } from './constants';
import { ApisProvider } from 'src/app/utility/api';
import { ActivatedRoute, Router } from '@angular/router';
import * as alertFunctions from '../../../shared/data/sweet-alerts';
// import { DatePipe } from '@angular/common';
import { Organization } from 'src/app/utility/model';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
// const data: any = require('../../../shared/data/');
@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.scss']
})
export class OrganisationComponent implements OnInit {
  form: FormGroup;
  rows = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  displayedColumns: string[];
  dataSource: any;
  data: any;
  products: any;
  myDates: string;
  formData: any;
  fields: FormBuilder[] = new Array<FormBuilder>();
  Organization: Organization = new Organization();
  @ViewChild('t', {static: true}) tabset: NgbTabset;
  constructor(private router: Router,
    private route: ActivatedRoute
    , private _formBuilder: FormBuilder,
    private ApiApisProvider: ApisProvider, private api: ApisProvider, ) {
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      company: ['', Validators.required],
      license: [0, Validators.required],
      state: [''],
      city: [''],
      address: ['', Validators.required],
      expiryDate: [Date],
      country: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.maxLength(7)]],
    });
    this.loadCompany();
  }


  typeSuccess() {
    alertFunctions.typeSuccess();
  }
  loadCompany() {
    this.displayedColumns = [];
    this.api.apiMethod("api/company/loadAll", "").then(data => {
      this.fields = [];
      this.products = data["companyInfoDTOList"];
      this.products.forEach(element => {
        let parseData = JSON.parse(element.formData);
        this.formData = {
          "id": element.id,
          "company": parseData.company,
          "license": parseData.license,
          "expiryDate": this.myDates,
          "Action": ""
        }
        this.fields.push(this.formData);
      })

    });
  }

  saveAndGo(tabActiveId) {
    if (this.form.status == "VALID") {
      // this.saveOrgForm.patchValue({ dynamicData: JSON.stringify(this.dynamicformComponent.fields) });
      this.Organization.formData = JSON.stringify(this.form.getRawValue());
      this.api.apiMethod('api/company/saveOrUpdate', this.Organization).then(async result => {
        
        if (result.success == true) {
          swal("Saved Successfully!", "success").then
            ((result) => {
              this.tabset.select(tabActiveId);
              this.form.reset();
              this.loadCompany();
            })
        } else {
          alertFunctions.typeSaveFailure()
          this.tabset.select(tabActiveId);
          this.form.reset();
        }
      });
    }

  }
  editCompany(element) {
    this.api.apiMethod("api/company/loadByCompanyId", { "id": element.id, "formData": "" }).then(data => {
      let parseData = JSON.parse(data["companyInfoDTO"].formData)
      //  let dataToLoad = parseData.dynamicData ? parseData.dynamicData : this.dynamicFieldsMaster.templateDynamicData
      // this.dynamicformComponent.loadform(dataToLoad);
      parseData["dynamicData"] = '';
      this.form.setValue(parseData);
      this.Organization.id = data["companyInfoDTO"].id;
      // this.tabGroup.selectedIndex = 0;
    });
  }
  cancel() {
    alertFunctions.typeCancel();
    this.form.reset();
    this.loadCompany();
  }
  deleteCompany(element) {

    swal({
      title: 'Are you sure?',
      text: 'Delete  Company',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      
      if (result.value) {
        
        this.api.apiMethodForDelete('api/company/delete?id=' + element+ '&', "").then(async result => {
          
          console.log(element.id)
          
          if (result.success == true) {
            swal(
              'Deleted!',
              'Your Data has been Deleted.',
              'success'
            ).then((result) => {
              this.loadCompany();
            })
          } else {
            swal(
              'Deleted!',
              'Your Data has not been Deleted.',
              'success'
            )
          }
        });
      } else if (result.dismiss === swal.DismissReason.cancel) {
        swal(
          'Cancelled',
          'Company not Deleted :)',
          'error'
        )
      }
    })
  }
}
