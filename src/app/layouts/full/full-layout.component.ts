import { Component , OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApisProvider } from 'src/app/utility/api';
import { UserModel } from 'src/app/utility/model';
import swal from 'sweetalert2';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HelpguideComponent } from 'src/app/modals/helpguide/helpguide.component';
declare var introJs:any;


@Component({
    selector: 'app-full-layout',
    templateUrl: './full-layout.component.html',
    styleUrls: ['./full-layout.component.scss']
})

export class FullLayoutComponent implements OnInit {
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
    enable=false;
    timed :boolean = false;
    idleState = 'Not started.';
    timedOut = false;
    lastPing?: Date = null;
    countdown:any;
    menuItems=[];
    activeApprove:boolean=false
    managerApprove:boolean=false
    networkApprove:boolean=false;
    itApprove:boolean=false;
    constructor(private router: Router,private matDialog:MatDialog,private api: ApisProvider,private spinnerService: Ng4LoadingSpinnerService,private idle: Idle) {  // sets an idle timeout of 5 seconds, for testing purposes.
      idle.setIdle(900);
      idle.setTimeout(60);
      idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
      idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
      idle.onTimeout.subscribe(() => {
        this.idleState = 'Timed out!';
        this.timedOut = true;
      });
      idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
      idle.onTimeoutWarning.subscribe((countdown) => {
        this.sessionconfirmation()
      this.idleState = 'You will timevxc out in ' + countdown + ' seconds!';
      this.sessionconfirmation();
      if(countdown == 1){
        this.timed = true;
      }
      });

     this.reset();
      }

        
       reset() {
        this.idle.watch();
        this.idleState = 'Started.';
        this.timedOut = false;
      }

      sessionconfirmation() {
        if (localStorage.getItem('token')!=undefined&& localStorage.getItem('token')!=""&&localStorage.getItem('token')!=null)
        {
       
          if (!swal.isVisible())
          {
        swal({
          title: 'The session will be terminated',
          text: 'Do you want to stay logged in?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.value) {
            this.reset();
          } else if (result.dismiss === swal.DismissReason.cancel) {
            this.logout();
          }
        })
      }
    }
      }


      openModal() {
        this.spinnerService.show()
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.position= {top: '3%'}
        dialogConfig.id = "modal-component";
        dialogConfig.height = "550px";
        dialogConfig.width = "2000px";
        dialogConfig.data={'name':'Sunil'};
        const modalDialog = this.matDialog.open(HelpguideComponent, dialogConfig);
        modalDialog.afterClosed().subscribe(result => {
      
        });
      }

      startTour(){
        var intro:any = introJs();
        intro.setOptions({
         steps: [
          {
           element: '#card1',
           intro: 'Count of open request',
           position: 'left'
          },
          {
            element: '#card2',
            intro: 'Count of review request',
            position: 'left'
           },
           {
            element: '#card3',
            intro: 'Count of Approval request',
            position: 'left'
           },
           {
            element: '#card4',
            intro: 'Count of closed request',
            position: 'left'
           },
           
                   
         ],
         showBullets: true,
         showButtons: true,
         exitOnOverlayClick: false,
         keyboardNavigation: true,
         });
        intro.start();
       }

       startUserViewTour(){
        var intro:any = introJs();
        intro.setOptions({
         steps: [
          {
           element: '#userView1',
           intro: 'Create new request',
           position: 'left'
          },
           {
            element: '#userView3',
            intro: 'Count of Approval request',
            position: 'left'
           },
           {
            element: '#userView4',
            intro: 'Count of closed request',
            position: 'left'
           },
           {
            element: '#userView5',
            intro: 'Count of Approval request',
            position: 'left'
           },
           {
            element: '#userView5',
            intro: 'Count of closed request',
            position: 'left'
           }                
         ],
         showBullets: true,
         showButtons: true,
         exitOnOverlayClick: false,
         keyboardNavigation: true,
         });
        intro.start();
       }
func(){
  console.log(this.router.url)
  if(this.router.url=="/urs/userview"){
    this.startUserViewTour();
  }else{
    this.startTour();
  }
}

    ngOnInit() {
      this.scroll()
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });

        this.spinnerService.show();
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinnerService.hide();
        }, 1000);

        this.loadMenuItems();
        var loginUseridEncode = localStorage.getItem('userName');
        this.loginUsername =this.api.decode(loginUseridEncode);
        var loginUseridEncode = localStorage.getItem('userEmail');
        this.loginUseremail =this.api.decode(loginUseridEncode);
        this.statusID = 0;
        this.requestDate=Date.now();
        let currentUrl=window.location.href;

    }


    onActivate(event) {
      window.scroll(0,0);
      document.body.scrollTop = 0;
      document.querySelector('body').scrollTo(0,0)
      var scrollElm = document.scrollingElement;
      scrollElm.scrollTop = 0;
      
  }

  scroll(){
    window.scroll(0,0);
    document.body.scrollTop = 0;
    document.querySelector('body').scrollTo(0,0)
    var scrollElm = document.scrollingElement;
    scrollElm.scrollTop = 0;
   }


    loadMenuItems(){
      let UserModelDTO: UserModel = new UserModel();
      var loginUseridEncode =localStorage.getItem('userId'); 
      UserModelDTO.userId =parseInt(this.api.decode(loginUseridEncode));
      this.menuItems = [];
      this.api.apiMethodFetchDataByPOST("api/Login/LoadMenu", UserModelDTO).then(data => {
        if (data.status) {
          this.enable=true
          this.menuItems = data.resultOP;
          this.enable=true;
          for(let i=0;i<this.menuItems.length;i++){
            if(this.menuItems[i].title=="Manager Approval"){
              this.managerApprove=true;
            }
            if(this.menuItems[i].title=="Network Approval"){
              this.networkApprove=true;
            }
            if(this.menuItems[i].title=="Security Approval"){
              this.itApprove=true;
            }
          }
        } else {
         
        }
      })
    }


    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userName");
        localStorage.removeItem("userId");
       // localStorage.setItem("redirectTo","");
        this.router.navigateByUrl('auth/signin')
      }


      onHover(event): void {
        event.toggle();
      }

}