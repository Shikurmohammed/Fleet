import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfficerCustodianGuard implements CanActivate {
  canActivate(){
    if ((sessionStorage.getItem('role') != 'Requester') && (sessionStorage.getItem('role') != 'Senior Transport Officer' )) {
      return false;
    } else {
      return true;
    }
  }
  
}
