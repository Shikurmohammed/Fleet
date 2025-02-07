import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizerRequesterGuard implements CanActivate {
  canActivate() {
    if ((sessionStorage.getItem('role') != 'Request Authorizer' && sessionStorage.getItem('role') != 'Requester')) {
      return false;
    } else {
      return true;
    }
  }
  
}
