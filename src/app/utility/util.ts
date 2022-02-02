import { Injectable } from '@angular/core';

@Injectable()
export class util{

    isEmpty(value:any){
        if(value == null || value == undefined || value=="")
          return true;
        return false;
    }
    
    hastoken(){
     return this.isEmpty(localStorage.getItem("accesskey"));
    }

}