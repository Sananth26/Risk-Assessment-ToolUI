
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable()
export class NGXToastrService {
    constructor(public toastr: ToastrService) { }

    // Warning Type
    typeWarning() {
        this.toastr.warning('Please Select Sidebar Active Color','', { "progressBar": true });
    }

     // Info Type
     typeinfo() {
        this.toastr.info('Please Use Default Sidebar Color','', { "progressBar": true });
    }


}