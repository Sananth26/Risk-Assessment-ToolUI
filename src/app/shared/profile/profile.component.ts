import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApisProvider } from 'src/app/utility/api';
import { user, UsersDTO } from 'src/app/utility/uasModels';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
location:any;
corporateId:any;
firstName:any;
email:any;
mobileNo:any;
department:any;
manageraccess:any;
itaccess:any;
active:any;
  managerName: any;
  constructor(private api:ApisProvider,private spinnerservice:Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.spinnerservice.show()
    setTimeout(()=>{
    this.spinnerservice.hide()
    },1000)
    this.editUser()
  }
  organization:user=new user();
  editUser() {
    var loginUseridEncode =localStorage.getItem('userId'); 
    console.log(loginUseridEncode)
    const elementId=this.api.decode(loginUseridEncode)
    console.log(this.api.decode(loginUseridEncode))
    this.api.apiMethodFetchDataByGET('api/UserMaster/LoadUsersForEdit?userId=' +elementId).then(result => {
      console.log("EDit+++++",result.resultOP)
      this.corporateId=result.resultOP[0].corporateId
      this.firstName=result.resultOP[0].firstName
      this.email=result.resultOP[0].email
      this.mobileNo=result.resultOP[0].mobileNo
      this.department=result.resultOP[0].departmentName
      this.manageraccess=result.resultOP[0].managerAccess
      this.itaccess=result.resultOP[0].itProcessAccess
      this.location=result.resultOP[0].location
      this.active=result.resultOP[0].isActive
      this.managerName=result.resultOP[0].immediateSupervisorName

    });
    
}

}
