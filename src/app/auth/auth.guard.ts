import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService, private route:Router){}
  Authenticated: boolean=this.canActivate();
  canActivate() {
      if(sessionStorage.getItem("jwt")==null){
        console.log("CanActivate.........");
        // this.route.navigate(['login']);
         return false;
      }else{
        return this.authService.isAuthenticated;
      }
    
  }
  
}
