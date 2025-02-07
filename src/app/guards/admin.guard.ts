import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService:AuthService,
    private route:Router 
    ){};
    isAdmin:boolean=false;
  canActivate() {
    if(sessionStorage.getItem("role")!="Admin"){
      return false;
   }else{
      
      return true;
   }
  }
  
}
