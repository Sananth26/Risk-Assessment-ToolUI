import { dropDowns } from './TrainingDetailsModel';

export class addNewcategory{
    mainCategoryId: number;
    name: string;
    description: string;
    type: string;
}

export class categoryItem{
    id: number
    key: string;
    value: string;
    displayOrder: number;
    categoryId: number;
    active:any;
    type: string;
}

export class accessReview{
    fromDate : string;
    toDate :string;
}

export class categoryListDTO{
  status : string;
  userId :any;
}

export class rankrequestListDTO{
  id:any;
  key:any;
  categoryId:any;
}


export class WorkFlowMasterDetails{
    id: number;
    level: number;
    levelName: string;
    isActive: boolean;
    combinationId: number;
    selectedCheck: boolean;
    isActiveCopy : string;
 }
 export class WorkFlowMaster{
  id: number;
  levelName: string;
  user: string;
  category: string; 
}

 export class WorkFlowLevelDTO{
  workFlowLevelName : string;
  activeFlag : string;
  id: number;
 }
export class uasWorkFlow {
    id: number;
    combinationId: number;
    level: number;
    levelName: string;
    selectedRoles: Array<dropDowns> = [];
    selectedCategory: Array<dropDowns> = [];
    selectedSubCategory: Array<SubCategoryList> = [];
    subCategoryList: Array<SubCategoryList> = [];
    userList: Array<UsersDTO> = [];
    selectedUsers: Array<UsersDTO> = [];
    slaActive:boolean;
    slaDays: number;
    isActive: boolean;
    delete: boolean;
    deleteLevel : number;
}

export class copyLevelDTO{
  fromSelectedCategory: Array<dropDowns> = [];
  fromSelectedSubCategory: Array<SubCategoryList> = [];
  fromSubCategoryList: Array<SubCategoryList> = [];
  toSelectedCategory: Array<dropDowns> = [];
  toSelectedSubCategory: Array<SubCategoryList> = [];
  toSubCategoryList: Array<SubCategoryList> = [];
  selectedLevels: Array<any> = [];
}

export class UsersDTO
{
  id: number;
  userFirstName: string;
  userRoleId: number;

    // selectedRoles: any;
    // userList: any;
    // selectedUsers: any;
}

export class user {

  id: any = 0;
  firstName: string;
  lastName: string = "";
  email: string;
  mobileNo: string;
  roleId: any = "";
  departmentId :any ="";
  immediateSupervisorName :any="";
  immediateSupervisorId :any;
  location : string;
  doj : string;
  userRoleId: number;
  ItProcessAccess : any;
  IsActive:string;
  corporateId :string;
  password:string;
  ManagerAccess:any;
}


export class SubCategoryList
{
  id: number;
  key: string;
  categoryId: number;
}

export class CalendarEventDTO {
   id : any = 0;
    start : any;
    end : any;
    title : any;
    userid :any;
}

export class Department {
  id : any = 0;
  departmentName : any;
  noOfLevel : any;
  isActive: any;
  slaFlag : any;
  slaJson :any;
   //slaJson :Array<slaData> =[];

}

export class CalendarEvent1DTO<MetaType = any> {
  id?: string | number;
  start: string;
  end?: string;
  title: string;
}
 
export class slaData {
  levelNo : any;
  slaDays :any;
}

export class ApprovalDetails{
  id: number;
  level: number;
  remark: string;
  status: string;
  approverId: number;
  approverName: string;
  workFlowStage: string;
  approverDatetime: string;
  slaData: SLADataStepper;
}

export class SLADataStepper { 
  users:  Array<dropDowns> = [];
  levelNo: number; 
  slaFlag: boolean; 
  slaDays: number; 
  slaTargetDate: any;
  approvalDate: any;
  remainingSLADays: number;
  overDueFlag: boolean;
  overDueDays: number;
 }

 export class ITWFList{
  requestDetailId: number;
  requestDetailSNId: string;
  approvalDetails: Array<ApprovalDetails> = [];
  processing: boolean;
  slaData: SLADataStepper
 }

 export class Stepper {
  requestMasterId: number;
  departmentWFList: Array<ApprovalDetails> = [];
  //itwfFlag: boolean;
  //itwfList: Array<ITWFList> = [];
}  


export class Dashboard{
  userId: number;
  toApproveCount: number;
  myRequestCount: number;
}

export class Securitypolicygrid
{
    id:number=0;
    Sourcevpcaccount : any;
    Sourceipaddress: string;
    Destinationvpcaccount: any ;
    Destination: string;
    Application: string;
    Portservice: string;
    Protocol: string;
      
}

export class projectdetails{
  id:number=0;
  Condition : string;
  ResponsibleParty :string;
  Actions :string;
  Completed : string;
}
export class levelLst{
   id: number;
  level: number;
  levelName: string;
  isActive: boolean;
  combinationId: number;
  selectedCheck: boolean;
  isActiveCopy : string;
}

export class RemediationClass
{
    id:number=0;
    RiskBeingMitigated : string;
    RiskRemediationRecommendation: string;
    RMActivity: string ;
    PlantoRemediate: string;
    PlannedCompletion: string;
    DefinitionofDone: string;
       
}

 export class roles1{
    id: number;
    name : any;
    browser: any;
    ipaddress: any;
  }
  
  export class roles2{
    id: number;
    key : any;
    browser: any;
    ipaddress: any;
  }

  export class WorkFlowMasterDetailsDTO{
    id: number;
    level: number;
    levelName: string;
    users:any;
    order :number;
    usersIds:  Array<dropDowns> = [];
  }

  export class DeleteLevelBase
  {
        combinationId: number;
        level :number;
  }

  export class LevelDTO{
    workFlowLevelName:string;
    activeFlag:string='';
    id:any;
  }
  