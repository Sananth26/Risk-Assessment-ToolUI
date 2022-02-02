import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewfilesComponent } from 'src/app/pages/content-pages/viewfiles/viewfiles.component';
import { ApisProvider } from 'src/app/utility/api';

@Component({
  selector: 'app-itviewrequest',
  templateUrl: './itviewrequest.component.html',
  styleUrls: ['./itviewrequest.component.scss'],
  providers: [DatePipe, ViewfilesComponent]


})
export class ItviewrequestComponent implements OnInit {
  categoryLst: any;
  SecurityPolicy: any;
  Category: any;
  SubCategory: any;
  BusinessJustification: any;
  ManagedServices: any;
  FirewallRegion: any;
  NormalExpedited: any;
  spinnerService: any;
  editRequestId: any;
  peerReviewComment = "File Attachment in Architecture Diagram need to be reuploaded";
  loadAuditData: { browser: string; userid: number; eventname: string; ipaddress: string; module: string; createddate: string; accesstype: { accesscategoryid: number; accesscategory: string; subcategoryid: number; subcategory: string; accesstypeid: number; accesstype: string; userid: number; username: string; requestdetailid: number; categorydescription: string[]; }[]; categorydescription: any; systemremarks: string; requestId: string; username: string; filelist: any[]; }[];


  constructor(private api:ApisProvider,private route:ActivatedRoute) { }

  ngOnInit() {
      this.route.queryParams.subscribe(
      params => {
        this.editRequestId =  params['requestId'];
        if(this.editRequestId!=undefined){
          console.log("if")
          this.onEditLoad(this.editRequestId)
          this.loadAuditHistory();
        }else{
          console.log("else")
        }
      })
  }

  onEditLoad(id){
  this.api.apiMethodFetchDataByGET('api/RequestFormUser/EditRequestLoadonId?reqid=' + id).then(data => {
    console.log(data)
    this.categoryLst = JSON.parse(data.resultOP.riskandRankDetails)
    this.SecurityPolicy=JSON.parse(data.resultOP.securityPolicy);
    this.Category= data.resultOP.categoryName
    this.SubCategory= data.resultOP.subcategoryName
    this.BusinessJustification = data.resultOP.businessJustification
    this.ManagedServices    = data.resultOP.managedServices
    this.FirewallRegion    = data.resultOP.firewallRegionName
    this.NormalExpedited    = data.resultOP.normalExpecticationName
    console.log(JSON.parse(data.resultOP.riskandRankDetails))
    this.spinnerService.hide();
    })
}

loadAuditHistory(){
  

}
}
