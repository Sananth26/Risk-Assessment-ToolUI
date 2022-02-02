import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf-npm-packages';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit {
  name = ' Participant name 1 ';
  sop = 'sop 1';
  company = 'Adventsys';
  sopTitle = 'opening pdf file';
  date = '20-April-2020'

  pass_the_path = '../../../../assets/borders/border7.jpg'

  data = [
    { key: '---Select Department---', value: '0' },
    { key: 'HR Department', value: 'Hr dept' },
    { key: 'Accounts', value: 'accounts' },
    { key: 'Management', value: 'Management' },
  ];

  data2 = [
    { key: '---Select Sop---', value: '0' },
    { key: 'Sop 1', value: 'sop 1' },
    { key: 'Sop 2', value: 'sop 2' },
    { key: 'Sop 3', value: 'sop 3' },
  ];
  data3 = [
  //  { key: '---Participants---', value: '0' },
    { key: 'Participant 1', value: 'Participant1' },
    { key: 'Participant 2', value: 'Participant2' },
    { key: 'Participant 3', value: 'Participant3' },
  ];
  base64String: string;



  btnDisable: boolean = false;
  constructor(private http: HttpClient) { }

  ngOnInit() {


  }
  edit(event) {
    if (event) {
      this.btnDisable = true;
    }
  }
  public async downloadAsPDF() {
    this.http.get(this.pass_the_path, { responseType: 'blob' })
      .subscribe(res => {
        const reader = new FileReader();
        reader.readAsDataURL(res);
        reader.onload = this.base64Image.bind(this);
      });
  }


  base64Image(event) {
    const doc = new jsPDF("landscape");//../../../../assets/border3.jpg
    doc.addImage(event.target.result, "JPEG", 0, 0, 295, 210);
    this.name = ' Participants name ';
    this.sop = 'sop 1';
    this.company = 'Adventsys Tech pvt';
    this.sopTitle = 'opening pdf file';
    this.date = '20-April-2020'
    doc.setDrawColor(0);
    doc.setDrawColor(0);
    doc.setFontSize(45);
    doc.setFontStyle("bold");
    doc.setTextColor(30, 128, 39);
    doc.text("Certificate of Training", 70, 50);
    doc.setFontSize(30);
    doc.setFontStyle("bold");
    doc.setTextColor(0, 0, 0);
    doc.text("This Certifies that ", 100, 70, null, null);
    doc.setFontSize(30);
    doc.setFontStyle("bolditalic");
    doc.setTextColor(43, 193, 32);
    doc.text(this.name, 85, 85, null, null);
    doc.setFontSize(30);
    doc.setFontStyle("bold");
    doc.setTextColor(0, 0, 0);
    doc.text("Has completed training course for ", 55, 100, null, null);
    doc.setFontSize(34);
    doc.setFontStyle("bolditalic");
    doc.setTextColor(43, 193, 32);
    doc.text(this.sopTitle + " - " + this.sop, 80, 115, null, null);
    doc.setFontSize(30);
    doc.setFontStyle("bold");
    doc.setTextColor(0, 0, 0);
    doc.text(" And is Awarded this Certificate By ", 55, 130, null, null);
    doc.setFontSize(34);
    doc.setFontStyle("bolditalic");
    doc.setTextColor(43, 193, 32);
    doc.text(this.company, 85, 145, null, null);
    doc.setFontSize(30);
    doc.setFontStyle("bold");
    doc.setTextColor(0, 0, 0);
    doc.text("  on  " + this.date, 95, 160, null, null);
    doc.text("_______________ ", 100, 180, null, null);
    doc.save('Certificate.pdf');

  }

}