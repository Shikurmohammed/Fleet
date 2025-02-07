import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserType } from '../types/UserType';
import { LoginHistory } from './types/LoginHistory';
import { UserDetails } from './types/userdetail';

@Injectable({
  providedIn: 'root',
})
export class LoginStatusService {
  
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private isNewUserSubject = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  isNewUser$ = this.isNewUserSubject.asObservable();

  setLoginStatus(isLoggedIn: boolean, isNewUser: boolean) {
    this.isLoggedInSubject.next(isLoggedIn);
    this.isNewUserSubject.next(isNewUser);
  }
}
