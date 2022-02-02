import { Component , OnInit } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';
import { Router } from '@angular/router';
import { ApisProvider } from 'src/app/utility/api';
import { UserModel } from 'src/app/utility/model';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit{
  loginUsername : any;
  loginUseremail : any;
  requestId:string;
  status:string;
  requestDate:any;
  corpid:string;
  requestersName:string;
  requestersPhone:string;
  requestersEmail:string;
  requestersDept:string;
  statusID : any;
    constructor(public sidebarservice: SidebarService,private router: Router,private api: ApisProvider, ) { }

    /* When the user clicks on the button,
toggle between hiding and showing the dropdown content */

   myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");

    window.onclick = function(event) {
      if (!false) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    }
  }
  
  // Close the dropdown menu if the user clicks outside of it
 

        
    toggleSidebar() {
        this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
   
    }
    
    getSideBarState() {
        return this.sidebarservice.getSidebarState();
    }

    hideSidebar() {
        this.sidebarservice.setSidebarState(true);
    }

    
    ngOnInit() {
this.loadMenuItems();
        var loginUseridEncode = localStorage.getItem('userName');
        this.loginUsername =this.api.decode(loginUseridEncode);
        var loginUseridEncode = localStorage.getItem('userEmail');
        this.loginUseremail =this.api.decode(loginUseridEncode);
       this.statusID = 0;
      this.requestId="FR-202110-000212";
       this.status="Draft";
         this.requestDate=Date.now();
    this.corpid="145";
    this.requestersName="Aswin";
    this.requestersPhone="9449165346";
    this.requestersEmail="Aswin@gmail.com";
    this.requestersDept="Sales";
    let currentUrl=window.location.href;
    ;
   
    }
    menuItems=[];
    activeApprove:boolean=false
    itApprove:boolean=false;
    loadMenuItems(){
      let UserModelDTO: UserModel = new UserModel();
      var loginUseridEncode =localStorage.getItem('userId'); 
      UserModelDTO.userId =parseInt(this.api.decode(loginUseridEncode));
      this.menuItems = [];
      this.api.apiMethodFetchDataByPOST("api/Login/LoadMenu", UserModelDTO).then(data => {
        if (data.status) {
          this.menuItems = data.resultOP;
          console.log("Menu Items---------",data)
          for(let i=0;i<this.menuItems.length;i++){
            if(this.menuItems[i].title=="Approve Request"){
              this.activeApprove=true;
            }
            if(this.menuItems[i].title=="IT Review"){
              this.itApprove=true;
            }
          }
          console.log("Main MEnu",this.menuItems)
        } else {
         
        }
      })
    }


    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userName");
        localStorage.removeItem("userId");
        this.router.navigateByUrl('auth/signin')
      }
}
