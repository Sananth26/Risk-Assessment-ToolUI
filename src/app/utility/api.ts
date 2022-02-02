import { Injectable } from '@angular/core';
import { HttpClient   } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { RequestOptions } from 'http';

@Injectable()
export class ApisProvider {

    public logedInUserName: string = "";
    public load: any; 
    public menuItem = [];
    request = (options) => {
        var tok = JSON.parse(localStorage.getItem("token")); 
        const headers = new Headers({ 'Content-Type': 'application/json' })
        if (tok != undefined && tok != null) {
            headers.append ('Authorization', 'Bearer ' + tok);
        } 
        const defaults = { headers: headers };
        options = Object.assign({}, defaults, options);
 
        return fetch(options.url, options)
            .then(response =>
                response.json().then(json => {
                    if (!response.ok) {
                        return Promise.reject(json);
                    }
                    return json;
                })
            );
    };

    constructor(private http: HttpClient ) { }
   //Development

    apiUrl = 'http://46.165.203.53:9090/';
     
    apiMethod(path: any, data?: any) {
     
        if (data != "undefined") {
            let response = this.request({ url: this.apiUrl + path + "?accessToken=" + localStorage.getItem("token"), method: 'POST', body: JSON.stringify(data) });
            return response;
        }
    }


    apiMethodForDelete(path: any, data?: any) {
        if (data != "undefined") {
            let response = this.request({ url: this.apiUrl + path + "accessToken=" + localStorage.getItem("token"), method: 'POST', body: JSON.stringify(data) });
            return response;
        }
    }

    authenticated() {
        if (localStorage.getItem("token"))
            return false;
        return true;
    }

    downloadFile(path: any, fileName: any): any {
        let jwtToken = localStorage.getItem("token");
        //let options = {headers: headers,observe:'response', responseType: 'arrayBuffer' };
        return this.http.post(this.apiUrl + path + "?accessToken=" + jwtToken, fileName)
            .pipe(map((response: Response) => response.arrayBuffer()));
    }

    // bulkUpload(path, formData, headers) {
    //     if (this.authenticated()) {
    //         let jwtToken = localStorage.getItem("token");
    //         let options = { headers: headers };
    //         return this.http.post(this.apiUrl + path +  formData, options).pipe(
    //             map((res) => res),
    //             catchError(error => Observable.throw(null))
    //           );
    //     }
    // }

    bulkUploadTest(path, formData, headers, template, compositeID) {
        if (this.authenticated()) {
            let jwtToken = localStorage.getItem("token");
            let options = { headers: headers };
            return this.http.post(this.apiUrl + path + "?accessToken=" + jwtToken + "&template=" + template + "&compositeID=" + compositeID, formData, options).pipe(map((resp) => resp),
                catchError(res =>  Observable.throw(res))
                );
        }
    }

    
    fetchStatus(string) {
        if (string == "1") {
            return "Import";
        } else if (string == "2") {
            return "Processing";
        } else if (string == "3") {
            return "Cancelled";
        } else if (string == "7") {
            return "QC";
        } else if (string == "8") {
            return "QC From HHT";
        } else (string == "4")
        return "Completed";
    }

    returnStatus(string) {
        if (string == "Import") {
            return 1;
        } else if (string == "Processing") {
            return 2;
        } else if (string == "Cancelled") {
            return 3;
        } else if (string == "QC") {
            return 7;
        } else if (string == "QC From HHT") {
            return 8;
        } else (string == "Completed")
        return 4;
    }

    fetchGRNStatus(string) {
        if (string == "1") {
            return "Ready for Put-Away";
        } else if (string == "2") {
            return "Put-Away Processing";
        } else if (string == "3") {
            return "Put-Away Cancelled";
        } else if (string == "7") {
            return "Waiting For QC";
        } else if (string == "8") {
            return "QC Completed From HHT";
        } else (string == "4")
        return "Put-Away Completed";
    }

    returnGRNStatus(string) {
        if (string == "Ready for Put-Away") {
            return 1;
        } else if (string == "Put-Away Processing") {
            return 2;
        } else if (string == "Put-Away Cancelled") {
            return 3;
        } else if (string == "Waiting For QC") {
            return 7;
        } else if (string == "QC Completed From HHT") {
            return 8;
        } else (string == "Put-Away Completed")
        return 4;
    }

    encode(data: any) {
        return btoa(data);
    }

    decode(data: any) {
        return atob(data);
    }
 
apiMethodFetchDataByGET(path: any)
{
    let response = this.request({ url: this.apiUrl + path , method: 'GET'});
    return response;
}

apiMethodFetchDataByPOST(path: any, data?: any)
{
    let response = this.request({ url: this.apiUrl + path , method: 'POST', body: JSON.stringify(data)  });
    return response;
}
apiMethodFetchDataByPOST1(path: any, data?: any)
{
    let response = this.request({ url: path , method: 'POST', body: JSON.stringify(data)  });
    return response;
}

apiMethodSaveDataByPOST(path: any, data?: any)
{
    let response = this.request({ url: this.apiUrl + path , method: 'POST', body: JSON.stringify(data) });
    return response;
}

  QAUpload( data?: any)
  {
    var response =  this.http.post(this.apiUrl + 'api/QuestionAnswer/CraeteQuestionAnswer', data);
    return response;
  }

bulkUpload(path:any, formData : any, headers) {
    let options = { headers: headers };
    let response = this.request({ url: this.apiUrl + path , method: 'POST', body: formData, options});
    return response;
}
 

sendFormData(path:any, formData : any): Observable<any>{
    var dataToken = JSON.parse(localStorage.getItem("token"));
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + dataToken);
    let options = { headers: headers };
    let response = this.http.post(this.apiUrl + path, formData);
    return response;
}

getRequestOptionArgs() {
   
  ;
    var data = JSON.parse(localStorage.getItem("token"));
    let headers = new Headers();
  
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + data.token);
   // var requestOptions = new requestOptions({headers : headers});
 
    return headers;
  }
  
// this method is for chking null value
isEmpty(value: any) {
    if (value == undefined || value == "undefined" || value == null || value == "" || value == "null" || value.length == 0 || value == "0")
        return true;
    return false;
}

//   const httpOptions = {
//     headers: new HttpHeaders({
//       'Content-Type':  'application/json'
//       })
//     };

}

  
  


