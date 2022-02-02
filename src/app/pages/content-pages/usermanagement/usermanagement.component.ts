import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroupDirective, FormGroup, FormBuilder } from '@angular/forms';
import { users, User } from 'src/app/utility/model';
import swal from 'sweetalert2';
import Helpers from 'src/app/formbuilder/helpers';
import { ApisProvider } from 'src/app/utility/api';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.scss']
})
export class UsermanagementComponent implements OnInit {
  tabChange = 'Add User'
  data: any;
  displayedColumns: string[];
  dataSource: any;
  selectedIndex = 0;
  form: FormGroup;
  helper: Helpers;
  formData: any;
  Users: any;
  display: boolean = false;
  roles: users[] = new Array();
  fields: FormBuilder[] = new Array<FormBuilder>();
  userDto: User = new User();
  isReadonly = false;
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild('tabGroup') tabGroup: any;
  // @ViewChild('formDirective') formDirective: any;
  @ViewChild('t', {static: true}) tabset: NgbTabset;
  constructor(private formBuilder: FormBuilder, private api: ApisProvider) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: ['0'],
      companyId: [''],
      employeeCode: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['',],
      userName: ['',],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', Validators.required],
      roleId: ['', Validators.required],
    });
    this.loadAllUser();
    this.api.apiMethod("api/user/loadRoles", "").then(result => {
      for (let key in result) {
        let value = result[key];
        let temproles = new users(key, value);
        this.roles.push(temproles);
      }
    });
  }

  Submit(formDirective: FormGroupDirective, tabActiveId) {
    if (this.form.status == "VALID")
      this.userDto = this.form.value;
    this.api.apiMethod('api/user/saveUser', this.userDto).then(result => {
      if (result.success == true) {
        swal(
          'Saved!',
          'User created.',
          'success'
        ).then((result) => {
          this.tabset.select(tabActiveId);
          this.loadAllUser();
          this.form.reset();
        })
      } else {
        swal(
          'Cancelled',
          result.result + "  " + 'user not Created',
          'error'
        ).then((result) => {
          this.tabset.select(tabActiveId);
          this.form.reset();
          this.loadAllUser();
        })
      }

    });
  }
  loadAllUser() {
    this.displayedColumns = [];
    this.data = null;
    this.fields = [];
    this.api.apiMethod("api/user/loadAllUsers", "").then(data => {
      if (data.success == true) {
        this.Users = data["userDto"]
        this.Users.forEach(element => {
          this.formData = {
            // "employeeId": element.id,
            "email": element.email,
            "employeeCode": element.employeeCode,
            "firstName": element.firstName,
            "mobileNo": element.mobileNo,
            "id": element.id,
            "userName": element.userName,
            "roleId": element.roleId
          }
          this.fields.push(this.formData);
        });
        //['employeeId', 'employeeName', 'email', 'mobileNo', 'Action'];
        // this.dataSource = new MatTableDataSource<any>(data["userDto"]);
        // this.dataSource.paginator = this.paginator;
        // this.tabGroup.selectedIndex = 1;
        // this.ngAfterContentInit()
      }
    });
  }
  editUser(element,tabActiveId) {
    this.api.apiMethod("api/user/loadUserOnId", element).then(data => {
      this.isReadonlyForEdit()
      data.lastName = data.lastName ? data.lastName : "",
        data.roleId = data.roleId,
        data.firstName = data.firstName ? data.firstName : "",
        data.email = data.email,
        data.mobileNo = data.mobileNo ? data.mobileNo : "",
        data.userName = data.userName ? data.userName : "",
        this.form.setValue(data);
        this.userDto.id = data.id;
        this.tabset.select(tabActiveId);

    });

  }
  isReadonlyForEdit() {
    this.isReadonly = !this.isReadonly
  }
  isReadonlyForEdit1(boolean) {
    this.isReadonly = boolean
  }
  deleteUser(data,tabActiveId) {
    swal({
      title: 'Are you sure?',
      text: 'Delete  User',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.api.apiMethod("api/user/deleteUser", data).then(result => {
          if (result.value == true) {
            swal(
              'Deleted!',
              'User deleted.',
              'success'
            ).then((result) => {
              this.tabset.select(tabActiveId);
              this.loadAllUser();
            })
          } else if (result.dismiss === swal.DismissReason.cancel) {
            swal(
              'Cancelled',
              'User not Deleted :)',
              'error'
            )
          }
        });
      }
    });
  }
  adduser() {
    this.form.reset();
    //this.User = new User();
    // this.tabGroup.selectedIndex = 0;
  }

  cancel() {
    //this.formDirective.resetForm();
    this.form.reset();
    this.isReadonlyForEdit1(false);
    // this.ngAfterViewInit();
    // this.ngAfterContentInit();
    // this.tabGroup.selectedIndex = 1;
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();

    }
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toString().toLowerCase();

    this.dataSource.filterPredicate = (data, filter: String) => {
      const dataStr = data.employeeName + data.email + data.mobileNo;
      return dataStr.indexOf(filter) != -1;
    }
    this.formData = this.dataSource.filteredData;
  }

}


