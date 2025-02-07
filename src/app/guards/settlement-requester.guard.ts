import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettlementRequesterGuard implements CanActivate {
  canActivate() {
    if (sessionStorage.getItem('role') != 'SettlementOfficers' && sessionStorage.getItem('role') != 'Requester' ) {
      return false;
    } else {
      return true;
    }
  }
  
}
