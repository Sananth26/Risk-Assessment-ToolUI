import { FormBuilder } from '@angular/forms';

export class dynamicform {

  id: number;
  templatename: any;
  json: any;
  moduleId: any

}

export class grnInfpDTO {
  formData: any;
  id: any = 0;
  compositeId: any;
  grnStatus: any;
  barCode: any;
}

export class mrsInfoDTO {
  formData: any;
  id: any = 0;
  compositeId: any;
  mrsStatus: any;
}
export class LookUpCategory {
  id: number;
  name: string;
  description: string;
  lastUpdatedTime?: any;
  createdTime?: any;
  createdBy: number;
}


export class LookUpItem {
  id: number;
  categoryId: number;
  key: string;
  value: string;
  displayOrder: string;
  activeFlag: string;
  createdTime: string;
  lastUpdatedTime: string;
  createdBy: number;
}
export class dynamicFormBuilders {
  type: string = "";
  label: string = "";
  name: any;
  style: string = "";
  subtype: string = "";
  className: string = "";
  Data: string = "";
  placeholder: string = "";
  required: boolean = false;
  values: dynamicSelectType[];

}

export class dynamicSelectType {
  value: string = "-1";
  label: string = "";
  selected: boolean = false;
}

export class dynamicModel {
  moduleName: string;
  primaryName: String;
  TemplateRef: String;
  jsonData: String;
}
export class PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
export class Organization {
  formData: any;
  id: any = 0;
}

export class WareHouse {
  formData: any;
  warehouseCode: any;
  id: any = 0;
}

export class WIPStage {
  compositeId: any;
  id: any = 0;
  catagory: any;
  stages: any;
  displayOrder: any;
  deleteflag: any;
}

export class Vendor {
  vendorData: any;
  id: any = 0;
  companyId: any;
  compositeId: any;
}
export class Machine {
  machineFormData: any;
  id: any = 0;
  barcode: any;
  compositeId: any;
}
export class Barcode {
  barcodeData: any;
  id: any = 0;
  companyId: any;
  moduleId: any;
}
export class Location {
  id: any = 0;
  locationFormData: any;
  companyId: any;
  barCode: any = "";
  status: any;
  compositeId: any;
}
export class Product {
  id: any = 0;
  itemData: any;
  itemCode: any;
  companyId: any;
  barCode: any = "";
  status: any;
  compositeId: any;
  file: any = "";
}
export class shift {
  shiftData: any;
  id: any = 0;
  companyId: any;
  compositeId: any;
}

export class datef {
  date: any;
  flag: boolean = true;
}

export class dateDTO {
  wipDate1: any;
  wipDate2: any;
  dispatchDate1: any;
  dispatchDate2: any;
  grnDate1: any;
  grnDate2: any;
  mrsdate1: any;
  mrsdate2: any;
  flag: boolean = true;
}

export class users {
  code: string;
  value: string;

  constructor(code: string, value: string) {
    this.code = code;
    this.value = value;
  }

}

export class warehouse {
  code: string;
  value: string;
  checked: boolean = false;
  // list : any;
  constructor(code: string, value: string, checked: boolean) {
    this.code = code;
    this.value = value;
    this.checked = checked;
    // this.list = list;
  }

}


// export class Category{
//   name:string;
//   description:string;
// }

export class User {
  id: any = 0;
  userName: string;
  password: string;
  firstName: string;
  lastName: string = "";
  email: string;
  mobileNo: string;
  roleId: any = "";
  employeeCode: string;
  eamilAlertFlag: string = 'N';
  companyId: any;
}

export class parentLocation {
  code: string;
  value: string;
  name: any;

  constructor(code: string, value: string) {
    this.code = code;
    this.value = value;
  }

}
export class Locations {
  code: string;
  value: string;

  constructor(code: string, value: string) {
    this.code = code;
    this.value = value;
  }
}

export class Category {
  id: any = 0;
  name: string;
  description: string;
  
}

export class LookUpCategoryItem {
  id: number;
  key: string;
  value: string;
  displayOrder: string;
  Category: string;
  categoryId: any;
}
export class MaterialCode {
  code: string;
  value: string;

  constructor(code: string, value: string) {
    this.code = code;
    this.value = value;
  }

}
// export class LookUpItem {
//   id: number;
//   categoryId: number;
//   key: string;
//   value: string;
//   unit: any;
//   displayOrder: string;
//   activeFlag: string;
//   createdTime: string;
//   lastUpdatedTime: string;
//   createdBy: number;
//   parameter: any;
//   parameterValue: any;
// }

export class WIPParentDTO {
  id: number = 0;
  compositeId: number;
  orderId: number;
  product: any;
  stage: any;
  remaining: any;
  child: WIPChildDTO[] = new Array<WIPChildDTO>();
  createdTime: any;
  updatedTime: any;
  location: any;
}
export class WIPChildDTO {
  id: number = 0;
  parentId: number;
  batchId: any;
  moduleId: number;
  machine: any;
  approval: any;
  accepted: number;
  rejected: number;
  remarks: any;
  fileUpload: any;
  status: any;
}

export class Customer {
  id: number = 0;
  compositeId: number;
  invoice: any;
  customerName: any;
  customerData: any;
  status: any = 'N';
  deleteFlag: any = 'N';
}
export class Dispatch {

  id: number = 0;
  compositeId: number;
  invoice: any;
  customerName: any;
  customerAddress: any;
  dispatchDetails: any;
  deliveryBy: any;
  quantity: any;
  product: any;
}

export class Barcodeview {
  id: any = 0;
  barCode: any;
}

export class GraphObject {
  name: string;
  value: string;

  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }

}

export class device {
  id: any = 0;
  companyId: any;
  compositeId: any;
  deviceName: any;
  deviceType: any;
  deviceOS: any;
  deviceMacId: any;
  deviceFormData: any;
  pnrFile: any;
  statusFlag: any;
  deleteFlag: any;
}
export class SearchFilterDTO {
  selectReport: any;
  aframe: any = "";
  barcode: any = "";
  location: any = "";
  product: any = "";
  warehouse: any = "";
  ids = new Array();
}

export class Roles {
  code: string;
  value: string;
  constructor(code: string, value: string) {
    this.code = code;
    this.value = value;
  }

}



export class PermissionDTO {
  id: any;
  roleId: any;
  browser: any;
  moduleDtos: PermissionForModuleDTO[] = new Array();
}
export class PermissionForModuleDTO {
  activeFlag: boolean = true;
  moduleId: any;
  moduleName: any;
  type: any;
  buttonPermissionDatas: ButtonPermisionDTO
  buttonPermissionData: String
  url: any
  dynamicPresence: any
}

export class ButtonPermisionDTO {
  add: boolean = false;
  edit: boolean = false;
  view: boolean = false;
  print: boolean = false;
  delete: boolean = false;
  export: boolean = false;
}

export class enableDto {
  add: boolean = true;
  edit: boolean = true;
  view: boolean = true;
  print: boolean = true;
  delete: boolean = true;
  export: boolean = true;
}

export class commonDate {
  from: any;
  to: any;
  id: any;
}

export class DynamicFieldsMaster {
  id: any = 0;
  companyId: any;
  templateURL: any;
  wipStageId: any;
  templateDynamicData: any;
}
export class DynamicTemplateMaster {
  id: any = 0;
  templateURL: any;
  templateDynamicData: any;
}

export class Module {
  code: string;
  value: string;
  activeFlag: boolean;
  moduleId: number;

  constructor(code: string, value: string, moduleId: number) {
      this.code = code;
      this.value = value;
      this.moduleId = moduleId;
  }
}

export class headerTemplate{
  id:any;
  compositeId:any;
  headerMasterId:any;
  templateName:any;
  templateHeaderJson:any;
}

export class TrainigRecord {
  formData: any;
  id: any = 0;
}

export class SOPFormData {
  formData: any;
  id: any = 0;
}


export class ListofColumnNames {
  id: any = 0;
  columnName: string;
 }
 
export class columDynamicPdfUpload {
  
  successPDFnames:string;
  FileContent : any;
}

export class UserModel
{
   userId: number;
   userEmail: string;
   password: string;
   token: string;
   username: string;
}

export class tokenDetails {
  userId: string;
  userName: string;
  orgId: string;
  orgName: string;
  dbName: string;
  token: string;
  aboutDetails: any;
  dynamicLinks: any;
}

export class dropDowns{
  id: number;
  key: string;
}

export class auditFormData {
  fromdate: Date;
  todate: Date;
}

export class UserAccess {
  
  url: string;
  roleId: number;
  add: number;
  view: number;
  delete: number;
  edit: number;
  export: number;
  print: number;
  menuAccess: number;
  menuId: number;
}


export class RolePermission {
  userId: number;
  orgId: number;
  url: string;

}


export class UserPrincipalDTO {
  id: any;
  name: any = "";
  username: any;
  email: any;
  roleId: any;
  roleName: any;
  orgId: any;
  projectId: any;
  versionId: any;
  projectName: any;
  versionName: any;
  adminFlag
  disableModel: any;
  defaultProjectId: any;
  currentProjectLocationId: any;
  defaultProjectLocationId: any;
  newUser:any;
}
export class DocumentForumDTO {
  id :number
  editIndividualFlag: boolean;
  childFlag:boolean;
  groupingFlag :boolean;
  comments: string;
  showBadge:boolean;
  userName:string;
  userBadge:string;
  enterdate:Date;
  datediff :string;
  userLikesCount:number=0;
  userLikeFlag:boolean=false;
  editFlag:boolean;
  replyId:any;
  itemId;any;
  requestId:any;
  replyFlag:any;
  list: DocumentForumDTO[];
}


export class dropDownDto {
  key: string;
  value: string;
  mappingId: string;
mappingFlag: boolean
}


export class userFirewallRequest{
  category:any;
  subCategory:any;
  bussinessJustification:any;
  mangedService:any;
  firewallRegion:any;
  normalOrExpedited:any;
  bussinessOwner:any;
  itOwners:any;
  description:any;
  projectName:any;
  bussinessImpact:any;
  sourceAccount:any;
  destinationAccount:any;
  sourceAddress:any;
  destinationAddress:any;
  application:any;
  port:any;
  protocal:any;
}

export class ApproveDTO{
  requestId:any;
  status:any;
  QuestionJSON:any;
}



export class RemediationDTO
{
       id:number ;
       comments  :string;
       replyId :number; 
       documentType :string
       itemId :number;
       requestId :number;
       userName :string;
       userBadge :string;
       date :any;
       userLikeFlag:boolean;
       userLikesCount :number;
       childFlag :boolean;
       editFlag:boolean;
       editIndividualFlag :boolean;
       replyFlag :boolean;
      // list: any;
}
export class RemediationDTOList
{
        RequestId :number;
        list  : any;
}
export class RemediationParams
{
        RequestId :number;
        PageNumber  : number;
        Comment :string;
}
