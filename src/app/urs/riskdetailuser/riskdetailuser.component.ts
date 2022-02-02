import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm, Validators, FormControl, FormBuilder, FormGroupDirective } from '@angular/forms';
import { ApisProvider } from 'src/app/utility/api';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-riskdetailuser',
  templateUrl: './riskdetailuser.component.html',
  styleUrls: ['./riskdetailuser.component.scss']
})
export class RiskdetailuserComponent implements OnInit {
  
 
  @ViewChild('myTable', { static: true }) myTable: any;
   questionsLst: any = [];
  categoryLst = [];
  selectedObject: any = [];
  selectedLevel;
  listSelectedValue: any = [];
   formBuilder: any;
   public stepOneForm: FormGroup;

   private isEditing = false;
    constructor(private router: Router,
     private route: ActivatedRoute
    , private _formBuilder: FormBuilder,
    private ApiApisProvider: ApisProvider, private api: ApisProvider,
    private modalService: NgbModal) { } 


  data = [
    { key: 'Yes', value: 'yes' },
    { key: 'No', value: 'no' },
  ];
  dataForValues = [
    { key: '1', value: '1' },
    { key: '2', value: '2' },    
    { key: '3', value: '3' },
    { key: '4', value: '4' },
  ];
  ngOnInit() {
    
    
    this.loadData();
  }
   loadData(){
    this.categoryLst = [
      {
        id: "1", RiskCategory: "1)User Access and Authentication related Risks", CalcualtnLikelihood: "0", CalcualtnSeverity: "0", CalcualtnRanking: "", questions: [
          { id: "1.1", Risk: "Unauthorized user access", QuestionToAsk: "Is this application SSO Enabled?", Explanation: "Easier to manage access when someone leaves the company", yesNo: "", Comments: "", decisionLikelihood: "", decisionSeverity: "", decisionRanking: "" },
          { id: "1.2", Risk: "Unauthorized user access", QuestionToAsk: "Can external users access this application? Are they authenticated?", Explanation: "Customer facing sites require extra diligence for Privacy etc. ", yesNo: "", Comments: "", decisionLikelihood: "", decisionSeverity: "", decisionRanking: "" },
          { id: "1.3", Risk: "Unauthorized user access", QuestionToAsk: "Do you provide Automated Access to this system using Service/Application accounts?", Explanation: "Reduces the risk of access being available longer than needed", yesNo: "", Comments: "", decisionLikelihood: "", decisionSeverity: "", decisionRanking: "" },
          { id: "1.4", Risk: "Non-Repudiation", QuestionToAsk: "Is Authentication over SSL", Explanation: "Want to ensure that Auth happens over SSL", yesNo: "", Comments: "", decisionLikelihood: "", decisionSeverity: "", decisionRanking: "" },
          { id: "1.5", Risk: "Non-Repudiation", QuestionToAsk: "Is this request simply to allows internet access to your application/system?", Explanation: "", yesNo: "", Comments: "", decisionLikelihood: "", decisionSeverity: "", decisionRanking: "" },
          { id: "1.6", Risk: "Non-Repudiation", QuestionToAsk: "Is this site 2FA Enabled?", Explanation: "Weak authentication defeats many of the controls because it allows user information to be compromised", yesNo: "", Comments: "", decisionLikelihood: "", decisionSeverity: "", decisionRanking: "" },

        ],
      },
      {
        id: "2", RiskCategory: "2)Impacts to Privileged Access Security", CalcualtnLikelihood: "0", CalcualtnSeverity: "0", CalcualtnRanking: "", questions: [
          { id: "2.1", Risk: "Unauthorized Administrative Access", QuestionToAsk: "Admin accounts are Vaulted?", Explanation: "They should be vaulted to reduce chances of compromise", yesNo: "", Comments: "", decisionLikelihood: "", decisionSeverity: "", decisionRanking: "" },
          { id: "2.2", Risk: "Privilege Escalation", QuestionToAsk: "Admin accounts used for application authentication over these protocols?", Explanation: "Accounts accessing the system through these firewalls should NOT be Admin accounts - they should be application accounts that are not used for other purposes", yesNo: "", Comments: "", decisionLikelihood: "", decisionSeverity: "", decisionRanking: "" },
          { id: "2.3", Risk: "Shared Account Exploits", QuestionToAsk: "Are shared and group accounts used? If so, are they vaulted?", Explanation: "Shared accounts defy attempts to tie activity down to users, which means that any anomalous activity is difficult to detect, trace and remediate. Shared accounts are also easy to compromise since the crednetials tend to be shared across multiple staff members or even teams.", yesNo: "", Comments: "", decisionLikelihood: "", decisionSeverity: "", decisionRanking: "" },
        ],
      },
      {
        id: "3", RiskCategory: "3)Supplier Related Risks",CalcualtnLikelihood: "0", CalcualtnSeverity: "0", CalcualtnRanking: "", questions: [
          { id: "3.1", Risk: "Vulnerabilities in the application", QuestionToAsk: "Is your application patched to the latest levels", Explanation: "This is from OWASP Top 10.", yesNo: "", Comments: "", decisionLikelihood: "", decisionSeverity: "", decisionRanking: "" },
          { id: "3.2", Risk: "Vulnerabilities in the application", QuestionToAsk: "Have you conducted a Pen test for your application", Explanation: "This is from OWASP Top 10.", yesNo: "", Comments: "", decisionLikelihood: "", decisionSeverity: "", decisionRanking: "" },
          { id: "3.3", Risk: "Cross-Site Scripting", QuestionToAsk: "Have you tested against XSS vulnerabilities", Explanation: "This is from OWASP Top 10.", yesNo: "", Comments: "", decisionLikelihood: "", decisionSeverity: "", decisionRanking: "" },
          { id: "3.4", Risk: "Input Validation", QuestionToAsk: "Does your application perform input validation and have you tested your functions and interfaces against input validation attacks?", Explanation: "This is from OWASP Top 10.", yesNo: "", Comments: "", decisionLikelihood: "", decisionSeverity: "", decisionRanking: "" },

        ],
      },
      {
        id: "4", RiskCategory: "4)Data  Security (DLP, Encryption,Privacy)", CalcualtnLikelihood: "0", CalcualtnSeverity: "0", CalcualtnRanking: "", questions: [
          { id: "4.1", Risk: "Data Classification", QuestionToAsk: "What type of data can be potentially exposed through this application? ", Explanation: "Data Classification levels are part of the Information Asset Management Policy.", yesNo: "", Comments: "", decisionLikelihood: "", decisionSeverity: "", decisionRanking: "" },
          { id: "4.2", Risk: "Data Classification", QuestionToAsk: "Does the Application contain or have access to any PII data - and is it encrypting that data when not in use?", Explanation: "Data Classification levels are part of the Information Asset Management Policy.", yesNo: "", Comments: "", decisionLikelihood: "", decisionSeverity: "", decisionRanking: "" },
          { id: "4.3", Risk: "Sensitive Data Exposure", QuestionToAsk: "Is this a Business Critical Application containing Financial Data?", Explanation: "Data Classification levels are part of the Information Asset Management Policy.", yesNo: "", Comments: "", decisionLikelihood: "", decisionSeverity: "", decisionRanking: "" },
          { id: "4.4", Risk: "Data Privacy", QuestionToAsk: "Is this a non-Financial Mission Critical Application?", Explanation: "Data Classification levels are part of the Information Asset Management Policy.", yesNo: "", Comments: "", decisionLikelihood: "", decisionSeverity: "", decisionRanking: "" },
          { id: "4.5", Risk: "Data Encryption", QuestionToAsk: "Is there any Business Secret Data in this application", Explanation: "Data Classification levels are part of the Information Asset Management Policy.", yesNo: "", Comments: "", decisionLikelihood: "", decisionSeverity: "", decisionRanking: "" },

        ],
      },
      {
        id: "5", RiskCategory: "5)Business Continuity Risks",CalcualtnLikelihood: "0", CalcualtnSeverity: "0", CalcualtnRanking: "", questions: [
          { id: "5.1", Risk: "Change Managemrnt", QuestionToAsk: "Can you revert your application to previous state if required?", Explanation: "", yesNo: "", Comments: "", decisionLikelihood: "", decisionSeverity: "", decisionRanking: "" },
          { id: "5.2", Risk: "Single Point of Failure", QuestionToAsk: "Is the application set up for redundancy.", Explanation: "A DR Plan is not required unless this is a Critical Application", yesNo: "", Comments: "", decisionLikelihood: "", decisionSeverity: "", decisionRanking: "" },
          { id: "5.3", Risk: "BIA", QuestionToAsk: "Does the application oir integration have a BIA on file that outlines the impact of a failure?", Explanation: "A BIA is not required unless this is a Critical Application", yesNo: "", Comments: "", decisionLikelihood: "", decisionSeverity: "", decisionRanking: "" },
        ],
      },
      {
        id: "6", RiskCategory: "6)Network Security Risks", CalcualtnLikelihood: "0", CalcualtnSeverity: "0", CalcualtnRanking: "", questions: [
          { id: "6.1", Risk: "Encrypted Channel", QuestionToAsk: "Do you use TLS v1.0 or newer", Explanation: "Data should not be traversing over an unencrypted channel", yesNo: "", Comments: "", decisionLikelihood: "", decisionSeverity: "", decisionRanking: "" },
          { id: "6.2", Risk: "Shadow IT and unregulated traffic", QuestionToAsk: "Does the application or integration use a Well Known Port? Can the data  be packet-inspected?", Explanation: "We'd like the ability to inspect the traffic to see if it might be sending malicious commands etc. or unsanctioned use of Cloud environments.", yesNo: "", Comments: "", decisionLikelihood: "", decisionSeverity: "", decisionRanking: "" },
        ],
      },
      {
        id: "7", RiskCategory: "7)Endpoint Security (Virus/Malware/APT related), Mobile Apps etc",CalcualtnLikelihood: "0", CalcualtnSeverity: "0", CalcualtnRanking: "", questions: [
          { id: "7.1", Risk: "AntiVirus and MalWare", QuestionToAsk: "Does your system have AntiMalware enabled?", Explanation: "Ensures that infected systems connecting to exchange information (whether mobile devices or remote servers) are not likely to infect us in some way", yesNo: "", Comments: "", decisionLikelihood: "", decisionSeverity: "", decisionRanking: "" },
        ],
      },
      {
        id: "8", RiskCategory: "8)Deployed Application and Server security (APT, Hardening etc.) risks", CalcualtnLikelihood: "0", CalcualtnSeverity: "0", CalcualtnRanking: "", questions: [
          { id: "8.1", Risk: "Insecure Servers", QuestionToAsk: "Is the application environment hardened?", Explanation: "(Hardening typically means that unnecessary services are disabled, ports blocked by default etc.)", yesNo: "", Comments: "", decisionLikelihood: "", decisionSeverity: "", decisionRanking: "" },
          { id: "8.2", Risk: "Insecure Servers", QuestionToAsk: "Does the environment have isolation from other systems containing confidential data?", Explanation: " Not required unless the system is either unpacched or contains high value data", yesNo: "", Comments: "", decisionLikelihood: "", decisionSeverity: "", decisionRanking: "" },

        ],
      },
      {
        id: "9", RiskCategory: "9)SDLC Security Risks", CalcualtnLikelihood: "0", CalcualtnSeverity: "0", CalcualtnRanking: "", questions: [
          { id: "9.1", Risk: "Using Components With Known Vulnerabilities", QuestionToAsk: "Have we verified that the components used to build the system did not contain known vulnerabilities?", Explanation: "Only required if the system is developed at Syngenta", yesNo: "", Comments: "", decisionLikelihood: "", decisionSeverity: "", decisionRanking: "" },
          { id: "9.2", Risk: "Secure Coding", QuestionToAsk: "Steps taken to perform Static Code Analysis or other approaches to ensure secure coding practices are used", Explanation: "This is more aimed at simple scripts and internally developed software to ensure that we don't deploy insuecure code and scripts that could be used to undermine the systems", yesNo: "", Comments: "", decisionLikelihood: "", decisionSeverity: "", decisionRanking: "" },

        ],
      },
      {
        id: "10", RiskCategory: "10)Other", CalcualtnLikelihood: "0", CalcualtnSeverity: "0", CalcualtnRanking: "", questions: [
          { id: "10.1", Risk: "Security Misconfiguration", QuestionToAsk: "Ensure that the application security configuration is well documented and doesn't expose the application to external attacks.", Explanation: "Security configurations (file permissions, admin permissions etc.) should not be left at their defaults but rather have validated settings set to known secure configurations. Any defaults shou;d have been vetted and documented reason for why fail-secure approach was not used.", yesNo: "", Comments: "", decisionLikelihood: "", decisionSeverity: "", decisionRanking: "" },
        ],
      },



    ];

    }
   
    isShown: boolean = false ; // hidden by default


toggleShow() {

this.isShown = ! this.isShown;


}
toggleExpandRow(row) {
   
   this.myTable.rowDetail.toggleExpandRow(row);
  
}
  save(){
    ;

     
      
    console.log(this.categoryLst);
    console.log("save the changes");
  }
  cancel(){
    this.loadData();

  }

  
  handleChange(index) {
    ; 
    this.selectedObject = this.categoryLst[index];
  }
  
  
  ConvertToInt(val) {
    return parseInt(val);
  }


  ChangeLikelihood(index) {
    ;
    this.listSelectedValue = [];
     index.questions.forEach(element => {
      this.listSelectedValue.push(this.ConvertToInt(element.decisionLikelihood));
      ;
      if (element.decisionLikelihood == "0"  ){
        ;
         element.decisionSeverity = 0         
        }
        else{
          element.decisionSeverity = ""         

        }
    });
    console.log(index);

    var sum = 0;
    for (var i = 0; i < this.listSelectedValue.length; i++) {
       if (isNaN(this.listSelectedValue[i])) {
        ;
        this.listSelectedValue[i] = 0;
      }
      else {
        ;
       
          sum += parseInt(this.listSelectedValue[i], 10); //don't forget to add the base 
      }
    }
    var avg = (sum / this.listSelectedValue.length);
    var mathRoundVal = Math.round(avg);
     index.CalcualtnLikelihood = mathRoundVal;
   }
  ChangeSeverity(index) {
    ;
    this.listSelectedValue = [];
    index.questions.forEach(element => {
      this.listSelectedValue.push(this.ConvertToInt(element.decisionSeverity));
    });
    var sum = 0;
    for (var i = 0; i < this.listSelectedValue.length; i++) {
      console.log(this.listSelectedValue[i])
      if (isNaN(this.listSelectedValue[i])) {
        this.listSelectedValue[i] = 0;
      }
      else {
        sum += parseInt(this.listSelectedValue[i], 10);
      }
    }
    var avg = (sum / this.listSelectedValue.length);
    var mathRoundVal = Math.round(avg);
    index.CalcualtnSeverity = mathRoundVal;
    console.log(this.listSelectedValue);
  }

}

