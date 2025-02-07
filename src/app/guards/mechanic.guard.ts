import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MechanicGuard implements CanActivate {
  canActivate(){
    if (sessionStorage.getItem('role') != 'GS Mechanic') {
      return false;
    } else {
      return true;
    }
  }
  
}
