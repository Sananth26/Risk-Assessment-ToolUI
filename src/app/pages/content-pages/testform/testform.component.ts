import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApisProvider } from 'src/app/utility/api';
import { dropDowns, TestApplication, QAFields } from 'src/app/utility/TrainingDetailsModel';
import swal from 'sweetalert2';
import { ThemeService } from 'ng2-charts';

@Component({
  selector: 'app-testform',
  templateUrl: './testform.component.html',
  styleUrls: ['./testform.component.scss']
})
export class TestformComponent implements OnInit {

  testApplication: FormGroup;
  departmentList: Array<dropDowns> = [];
  documentNumberList: Array<dropDowns> = [];
  testFormData: TestApplication = new TestApplication();
  selectedDocNum: any = [];
  docNumdropdownSettings:any={
    singleSelection: true,
    idField: 'id',
    textField: 'documentNumber',
    itemsShowLimit: 6,
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };
  docNumRequired: boolean = false;
  questionFieldsList: Array<QAFields> = [];
  startTestFag:boolean = false;
  
  constructor(private api: ApisProvider,) { } 

  ngOnInit() {
    this.testApplication = new FormGroup({
      'DocumentNumber': new FormControl(null),
      'DepartmentName': new FormControl(null, [Validators.required]),
      'ParticipantName': new FormControl(null, [Validators.required]),
    }, { updateOn: 'blur' });
 
   this.testApplication.reset();
   this.loadDepartment();

  }

loadDepartment(){
    this.api.apiMethodFetchDataByGET("api/SOPForm/LoadDropDowns").then(result => {
      if (result.status) {
          this.departmentList =  <dropDowns[]> result.resultOP.departmentDetails;
      } else {
        swal(
          'Error!',
          result.description,
          'error'
        )
      }
    });
}

onDepartmentNameChange(data: any)
{
    this.api.apiMethodFetchDataByGET('api/trainigrecords/DocumnetLoad?id=' + data.target.value).then(data => {
       this.documentNumberList =  <dropDowns[]> data.resultOP;
    });
}

startTest()
{
  ;
  if (this.selectedDocNum.length<=0) {
    return;
  }
  if (this.testApplication.status == "VALID") {
    this.testFormData.documentNumber =  this.selectedDocNum[0].documentNumber;
    this.testFormData.sopId =  this.selectedDocNum[0].id;
    console.log(this.testFormData);
    
    this.api.apiMethodFetchDataByPOST('api/QAApplication/fetchQuestions', this.testFormData).then(result => {
      
      if (result.status) {
        this.startTestFag = true;
        console.log(result);
        let questions = <QAFields[]> result.resultOP;
        questions.forEach(element => {
          let object = JSON.parse(element.inputField)
          let quest: QAFields = {inputField:  object[0], question: JSON.parse(element.question)}
          this.questionFieldsList.push(quest);
        });

        this.testFormData.questionsform = this.questionFieldsList;

        this.questionFieldsList.forEach(element => {
           let obj = element.inputField; 
       
          if (obj.type == "checkbox-group" || obj.type == "select" || obj.type == "radio-group" ) {
            if (obj.values != undefined || obj.values.length >= 1) {
            
              for (let index = 0; index < obj.values.length; index++) {
                obj.values[index].selected = false;
              }
             
            }
          } else if (obj.type == "number" || obj.type == "text") {
            if (obj.value != undefined || obj.value.length >= 1) {
              obj.value = "";
            }
          }  
        });
         
        console.log(this.questionFieldsList);
 
      } else {
        swal(
          'Error!',
          result.description,
          'error'
        )
        
      }
    });
  }

}



}
