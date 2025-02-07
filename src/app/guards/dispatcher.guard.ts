import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DispatcherGuard implements CanActivate {
  canActivate(){
    if (sessionStorage.getItem('role') != 'Dispatcher') {
      return false;
    } else {
      return true;
    }
  }
  
}
