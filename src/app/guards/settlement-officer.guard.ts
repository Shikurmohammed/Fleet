import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettlementOfficerGuard implements CanActivate {
  canActivate(){
    if (sessionStorage.getItem('role') != 'SettlementOfficers') {
      return false;
    } else {
      return true;
    }
  }
  
}
