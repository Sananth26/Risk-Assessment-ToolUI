import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tokenDetails } from './utility/model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private myRoute: Router) { }

  sendToken(token: tokenDetails) {
    localStorage.setItem("token", JSON.stringify(token))
  }

  getToken() {
    if (localStorage.getItem("token") != null || localStorage.getItem("token") != undefined) {
      return true;
    }
    this.myRoute.navigate(["/urs/error404"]);
    return false;
  }

  logout() {
    localStorage.removeItem("token");
    this.myRoute.navigate(["/auth/signin"]);
  }

}
