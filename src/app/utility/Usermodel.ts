import { UsersDTO } from "./uasModels";

export class UserRequest {
    Requestid : number;
    CategoryId : number;
    SubcategoryId : number;
    BusinessJustification : string;
    ManagedServices : string;
    FirewallRegion : number;
    NormalExpedited : number;
    BusinessOwnersId : number;
    ItownersId : number;
    NameOfProject : string;
    Description : string;
    BusinessImpact : string;
    SecurityPolicy : string;
    Status : string;
    UserId : number;
    ArchitectureDiagram : any;
    category:any;
    subCategory:any;
    firewall:any
    nomrmalorexpedited:any
    businessOwner:any;
    itOwner:any;
    ispeerreview:string;
}

export class angular2dropdown{
    id:any;
    key:any;
}

export class angular2userdropdown{
    id:any;
    firstName:any;
}

export class riskquestions{
    yesNo:string
}

export class levelModal{
    workFlowLevelName:any;
    active:any;
}

export class PeerReviewList
{
    userlist :Array<UsersDTO> =[];
  id: number;
  key: string;
  categoryId: number;
}

export class permissionList
{
  id: number;
  key: string;
  categoryId: number;
}

export class requestForum{
    comments:any; 
    requestId:any;
    itemId:number=0;
    userLikeFlag:boolean;
    userLikesCount:any;
    childFlag:boolean;
    editFlag:boolean;
    editIndividualFlag:boolean;
    replyFlag:boolean;
    userName:string;
    userBadge:string;
    enterDates:any;
    id :number
    groupingFlag :boolean;
    showBadge:boolean;
    enterdate:Date;
    datediff :string;
    replyId:any;
}

export class Password
  {
        userId :number; 
        oldPassword  :string;
        newPassword  :string;

  }

  export  class RemediationCheckedandlike
  {
         CommentId :number;
          Status :boolean;
   }