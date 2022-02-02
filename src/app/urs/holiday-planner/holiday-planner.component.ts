import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { ApisProvider } from 'src/app/utility/api';
import { CalendarEvent, CalendarEventTimesChangedEvent, CalendarView, DAYS_OF_WEEK, CalendarMonthViewDay } from 'angular-calendar';
import { startOfDay, endOfDay, isSameDay, isSameMonth, addDays, subDays, endOfMonth, setDate, } from 'date-fns';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
//import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import swal from 'sweetalert2';
import { CalendarEventDTO, CalendarEvent1DTO } from 'src/app/utility/uasModels';
import { UserAccess, RolePermission } from 'src/app/utility/model';

 
@Component({
  selector: 'app-holiday-planner',
  templateUrl: './holiday-planner.component.html',
  styleUrls: ['./holiday-planner.component.scss'],
 // changeDetection: ChangeDetectionStrategy.OnPush,

})

 
export class HolidayPlannerComponent implements OnInit {

  view: string = 'month';
  activeDayIsOpen: boolean = true;
  viewDate: Date = new Date();
  modalData: {
    action: string;
    event: CalendarEvent;
  };
  // events: any[] = new Array();
  holidayEvents: any[] = new Array();
  refresh: Subject<any> = new Subject();
  dateforleave: string = "2020/05/04";
  dateforleave1: string = "2020/05/05";
  weekDaysList = []
//events2: CalendarEvent1DTO[] = [];
events2: Array<CalendarEvent1DTO> = [];
//events3: CalendarEvent1DTO[] = [];
events3: Array <CalendarEvent1DTO> = [];
events: Array<CalendarEvent> =
 // events: CalendarEvent[] =
    [
    //   {
    //   start: startOfDay(this.dateforleave),
    //   end : startOfDay (this.dateforleave1),
    //   title: 'holiday 1',
    // },
    // {
    //   start: startOfDay(this.dateforleave),
    //   end : startOfDay(this.dateforleave),
    //   title: 'holiday 2',
    // },
    ]

    //event1: CalendarEvent[] = [];//for each in ngoninit with the list
    event1: Array<CalendarEvent> = []
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  UserAccessModel: UserAccess = new UserAccess();
  RolePermissionModel: RolePermission = new  RolePermission();
  
  constructor(private modal: NgbModal, private api: ApisProvider) { }
  
  ngOnInit() {
    this.onholidays();
    this.onweekdays();
    this.OnLoadButtonPermission();
  
  
  }

  saveWeekdays(selectedFlag) {

      this.api.apiMethod("api/WorkingDays/Weekdays", this.weekDaysList).then(result => {
        // this.spinner.show();
         if (result) {
         this.onweekdays();
           swal({
             title: 'Saved!',
             text: 'Weekdays Added Successfully',
             type: 'success',
             confirmButtonColor: '#3085d6',
             confirmButtonText: 'OK',
             confirmButtonClass: 'btn btn-success m-r-10',
             buttonsStyling: false,
             allowOutsideClick: false,
           });
         } else {
           swal({
             title: '',
             text: 'Something went Wrong ...Try Again',
             type: 'error',
           })
         }
       },
         err => {
        //  this.spinner.hide();
         }
       );
  }

  dayClicked({ date }: { date: Date, events: CalendarEvent[] }): void {
    console.log(date)

     
  }

  excludeDays: number[] = [0, 6];
  weekStartsOn = DAYS_OF_WEEK.SUNDAY;

  styleFunctions(day) {
    if (day.isToday) return { 'background-color': '#EDF7D8' };
    if (day.isWeekend) {
      return { 'background-color': '#FDF2F2' }
      // '#F8E4E4',
    }
    else {
      return { 'background-color': 'white' }
    }
  }

  saveEvent(event: any) {
    console.log(event)
    ;
    let HolidayplannerDTO: CalendarEventDTO = new CalendarEventDTO();
    HolidayplannerDTO.id = event.id;
    HolidayplannerDTO.start = event.start;
    HolidayplannerDTO.end = event.end;
    HolidayplannerDTO.title = event.title;
    var loginUseridEncode =localStorage.getItem('userId');  
    HolidayplannerDTO.userid =this.api.decode(loginUseridEncode);
    
 
   //save the event 
    this.api.apiMethod("api/Workingdays/Holidayplanner", HolidayplannerDTO).then(result => {
     // this.spinner.show();
      if (result) {
        this.onholidays();
        swal({
          title: 'Saved!',
          text: 'Event Added Successfully',
          type: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
          confirmButtonClass: 'btn btn-success m-r-10',
          buttonsStyling: false,
          allowOutsideClick: false,
        });
      } else {
        swal({
          title: '',
          text: 'Something went Wrong ...Try Again',
          type: 'error',
        })
      }
    },
      err => {
   
      }
    );
  }

  
  onweekdays() {
   
    this.api.apiMethodFetchDataByGET("api/WorkingDays/Weekdays").then(result => {
      if (result.status) {
        ;
      
            this.weekDaysList =  result.resultOP.templateNames;
      
      } else {
        swal(
          'Error!',
          result.description,
          'error'
        )
      }
    });
  }

  onholidays() {
    this.api.apiMethodFetchDataByGET("api/WorkingDays/holidays").then(result => {
      if (result.status) {
        ;
      console.log(this.events);
      let holid =  result.resultOP.templateNames;
     
      this.event1=[];
      this.events2 =[];
            holid.forEach(element => {
              ;
              let aa = element.id;
              let quest: CalendarEvent = {id:  element.id, start: startOfDay(element.start),end: startOfDay(element.end),title:element.title}
              let quest1: CalendarEvent1DTO = {id:  element.id, start: (element.start),end: (element.end),title:element.title}
              this.event1.push(quest);
              this.events2.push(quest1);
            });
             
            setTimeout(function()
            {
              this.events3 = [];
              this.events = []
              this.events= this.event1;
              this.events3= this.events2;
            }.bind(this), 500);
            console.log( this.events);
            console.log(this.events3);
      } else {
        swal(
          'Error!',
          result.description,
          'error'
        )
      }
    });
  
  }



  deleteEvent(eventToDelete: any,rowinde:any) {
  
    if (eventToDelete> 0)
    {
      ;
      let HolidayplannerDTO: CalendarEventDTO = new CalendarEventDTO();
      HolidayplannerDTO.id = eventToDelete;
      HolidayplannerDTO.start = '';
      HolidayplannerDTO.end = '';
      HolidayplannerDTO.title ='';
      var loginUseridEncode =localStorage.getItem('userId');  
      HolidayplannerDTO.userid =this.api.decode(loginUseridEncode);
    
    this.api.apiMethod("api/DeleteHoliday/DeleteData" , HolidayplannerDTO ).then(async result => {
      if (result.status == true) {
       swal(
          'Deleted!',
          'Your Data has been Deleted.',
          'success'
        ).then((result) => {
          this.onholidays();
         })
      } else {
        swal(
          'Deleted!',
          'Your Data has not been Deleted.',
          'success'
        )
      }
    });
  }
  else
  {
;
this.events3.splice(rowinde,1);

  }
  }

  addEvent(): void {
 

    ;
    let categoryItem: CalendarEvent1DTO = {id: 0, start: '',end: '',title:'New Title'}
    this.events3 = [
      ...this.events3,
      {
        id: 0,
        title: 'New event',
        start: '',
        end:'',
       
      }
    ];

    // let tempRows = this.events3;
    // tempRows.unshift(categoryItem);
    // this.events3 = [];
    // setTimeout(() => {
    //   this.events3 = tempRows;
    // });
  
  }

  // User role and permission
OnLoadButtonPermission() {
  ;

      var loginUseridEncode =localStorage.getItem('userId'); 
      this.RolePermissionModel.userId =parseInt(this.api.decode(loginUseridEncode));
      this.RolePermissionModel.url= "/urs/holidayplanner";

      this.api.apiMethodFetchDataByPOST("api/Login/RoleandPermission",this.RolePermissionModel).then(async data => {
       ;
       if (data.status) {
         ;
      this.UserAccessModel = data.resultOP[0];
        if (this.UserAccessModel.menuAccess == 0 || this.UserAccessModel.menuAccess == 0 )
         {
      
          return;
         }
        else
         {
          console.log(this.UserAccessModel);
         }

       } else {
         
       }
     })

}
  

}