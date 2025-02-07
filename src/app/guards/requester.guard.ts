import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequesterGuard implements CanActivate {
  isRequestor: boolean = false;
  canActivate(){
    if (sessionStorage.getItem('role') != 'Requester') {
      return false;
    } else {
      return true;
    }
  }
}
