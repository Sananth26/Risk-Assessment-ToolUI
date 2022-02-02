 
export class NewRequestDTO{
    requestDetailsId : number;
    Id : number;
    userId : number;
    name : string;
    emailId : string;
    location : string;
    department : string;
    RequestDate : string;
    accessCategory : string;
    accessCategoryId : number;
    subCategory : string;
    subCategoryId : number;
    accessType : string;
    accessTypeId : number;
    userName : string;
    userIdDDL : number;
    Remarks : string ;
    level : number;
    manager : string;
    existingRecord : boolean;
    deleteFlag :boolean;
    page: string;
}

export class newRequestAPI{
    id : number;
    UserId : number;    
    RequestDate : string;
    Remarks : string ;
    Attachment :any;
    BulkRequest : any;
}

export class flowRequest{
     BulkRequest : any;
}
export class flowRequestBulk{
    BulkRequest : any;
    Decision : string;        
    DecisionId : number;    
    Remarks : string;
}

export class newRequestDetailsAPI{
    UserId : number;        
    AccessCategoryId : number;    
    SubCategoryId : number;
    AccessTypeId : number;
    UserIdDDL : number;
    existingRecord : boolean;
}

export class popUpData{
    Decision : string;        
    DecisionId : number;    
    Remarks : string;
    bulkImport : any;
    requestId : any;
    attachment : any;
}

 
export class LoadRequestData{
    RequestMasterId : any;        
    RequestDetailsId : any;    
    RequestId : any;
    Level : any;
    WorkFlowStage : string;
    CompleteDeptProcess : boolean;
    status : string;
 
}

export class ApproveReject{
    RequestDetailsId: number;
    RequestMasterId : number;
    WorkFlowStage : string;
    Level : number;
    LoginUserID : number; //userID -( superviser ID) need to fetch in backend
    Remark : string;
    DecisionId : number;
    Decision : string;
    TableData : any;
    CompleteDeptProcess : boolean;
}

export class deleteRequestAPI{
    requestDetailsId : number;
    UserId : number;    
    Remarks : string ;
    
}

export class requestInfoDTO{
    userId : number;
    status : string;
}

export class myRequestDTO{
    key : string;        
    value : string; 
}