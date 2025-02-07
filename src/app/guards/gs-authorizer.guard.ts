import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GsAuthorizerGuard implements CanActivate {
  canActivate(){
    if (sessionStorage.getItem('role') != 'GS Approver') {
      return false;
    } else {
      return true;
    }
  }
  
}
