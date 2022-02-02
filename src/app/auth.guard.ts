import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService,private myRoute: Router){ }
 
  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
    try {
      if(this.auth.getToken()){
        
       return true;
     }else{
       this.myRoute.navigate(["/urs/error404"]);
       return false;
     }
    }
     catch (err) {
       this.myRoute.navigate(["/auth/signin"]);
     }


  }
  
}
