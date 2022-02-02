import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-viewfiles',
  templateUrl: './viewfiles.component.html',
  styleUrls: ['./viewfiles.component.scss']
})
export class ViewfilesComponent implements OnInit {

  @Input() details;

  filecontent: any;
  pdfAvailable: boolean = false;

  constructor( private sanitizer: DomSanitizer,private modalService: NgbModal,
    private spinnerService: Ng4LoadingSpinnerService) { 
      this.spinnerService.hide();
    }

  ngOnInit() {
;
    this.pdfAvailable = this.details.status;
    this.spinnerService.hide();
    if ( this.pdfAvailable ) {
      let contentType = this.getContentType(this.details.fileName.split('?')[0].split('.').pop());
      let convertedData = this.convertBase64DataToBinary(this.details.filecontentSource);
      var blob: Blob = new Blob([convertedData],{ type: contentType });
      this.filecontent = window.URL.createObjectURL(blob);
      this.filecontent = this.sanitizer.bypassSecurityTrustResourceUrl(this.filecontent);
    }
    
  }

  closeModal(){
    this.modalService.dismissAll();
  }
  

  getContentType(type): string {
    let contentType = ""
    switch (type) {
      case "doc": contentType = "application/msword"; break;
      case "pdf": contentType = "application/pdf"; break;
      case "txt": contentType = "application/txt"; break;
      case "docx": contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"; break;
      case "mp4": contentType = "video/mp4"; break;
      case "zip": contentType = "application/zip"; break;
      default: contentType = "image/png"; break;
    }
    return contentType;
  }

  convertBase64DataToBinary(base64: any) {
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));
    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  }



}
