import { Component, OnInit, Input } from '@angular/core';
import { ROUTES } from './sidebar-routes.config';
import {  } from '../../auth/signin/signin.component';
import { ApisProvider } from 'src/app/utility/api';
import { UserModel } from 'src/app/utility/model';
import { RouteInfo1 } from '../../shared/sidebar/sidebar.metadata';
 
declare var $: any;

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
      

    public menuItems: any[];
    menulist: RouteInfo1 ;
    @Input() imgPath:string = "assets/images/avatars/";
  sidebarComponent: any;
  ROUTES: any;
 
    constructor( private apiProvider: ApisProvider,) {
    }

    ngOnInit() {
        $.getScript('./assets/js/app-sidebar.js');
       ;
       this.loadSideMenu();
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        console.log(this.menuItems)
    
    }

    loadSideMenu() {
      this.menuItems=  [
        { path: '/urs/uasdashboard', title: 'Dashboard', icon: 'fa fa-home', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        { path: '/urs/userview', title: 'My Request', icon: 'fa fa-hand-paper-o', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        { path: '/urs/networkview', title: 'Approve Request', icon: 'fa fa-thumbs-o-up', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        { path: '/urs/itreview', title: 'IT Review', icon: 'fa fa-check-square-o', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      
        { path: '/urs/employeemanagement', title: 'User Management', icon: 'fa fa-user-circle-o', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        { path: '/urs/permissionsettings', title: 'Roles & Permission', icon: 'fa fa-cog', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        { path: '/urs/workflow', title: 'Workflow', icon: 'fa fa-exchange', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        { path: '/urs/lookupurs', title: 'Lookup', icon: 'fa fa-table', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      ]
         let UserModelDTO: UserModel = new UserModel();
         var loginUseridEncode =localStorage.getItem('userId'); 
         UserModelDTO.userId =parseInt(this.apiProvider.decode(loginUseridEncode));
         this.menuItems = [];
         this.apiProvider.apiMethodFetchDataByPOST("api/Login/LoadMenu", UserModelDTO).then(async data => {
           ;
           if (data.status) {
             ;
           
             this.menuItems = data.resultOP;
             console.log(this.menuItems); 
             this.sidebarComponent.menuItems = data.resultOP;
       
             this.ROUTES =data.resultOP;
             console.log(this.ROUTES);
           } else {
            
           }
         })
      }
   

}

