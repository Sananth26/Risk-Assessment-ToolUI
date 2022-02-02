import { Time } from '@angular/common';
import { dateDTO } from './model';

export class trainingData {
     Id : number; 
    SopId : number;
    ParticipantName : string;
    TrainingFormData : any; 
    Attachment : any; 
    deptid :any;
    facultyId: any;
  }
  export class trainingDataView {
    Id : number; 
   SopIdView : number;    
   deptidView :any;
   
 }
export class TrainingFormDataDTO{
    Title : string;
    Trainingdate : Date;
    Time : Time;
    //Faculty : any;
    Location : string;
    Remarks : string; 
}

  export class SOPFormData {
    formData: any;
    id: any = 0;
  }
  
  export class SOPFormDetails{
    id: number;
    orgId : number;    
    documentNumber : string;
    version : string;
    title : string;
    expiryDate : Date;
    effectiveDate: Date;
    sopDynamicFormData: any;
    departmentId: string;
    statusId : string;
    type: string;
    attachments: string;
   } 

   export class SopDynamicFormData{
     SopDynamicFieldsData: any;
     TableAvailable: boolean;
     TableContent: any;
     CORSelected: any;
   }

   export class SOPFormJson{
    EffectiveDate : Date;
    ExpiryDate : Date;
    Title : string;
    DepartmentName : string;
    LastModifiedDate : Date;

   }
   
   
export class columDynamicUpload {
  
  successPDFnames:string;
  FileContent : any;
}

   export class dropDowns{
     id: number;
     key: string;
   }

   export class AttachmentTable{
     FileName: string;
     FilePath: string;
     Date: any;
     AttachementType: string;
   }

   export class TestApplication{
     departmentId: number;
     sopId: number;
     documentNumber: string;
     participantName: string;
     questionsform: any;
     answerForm:any;
     testStartTime: any;
     testEndTime: any;
   }


   export class QAFields{
     question: any;
     inputField: any;
   }
   
