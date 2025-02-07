import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserType } from '../types/UserType';
import { LoginHistory } from './types/LoginHistory';
import { UserDetails } from './types/userdetail';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}
  isAuthenticated!: boolean;
  isUserAlreadyLogged!: boolean;
  role: any = this.getRole();
  jwtToken = sessionStorage.getItem('jwt');
  public getRole() {
    return sessionStorage.getItem('role');
  }
  //By this I will get JWT if it is successfully authenticated
  public generate(auth: UserDetails): Observable<any> {
    return this.http.post<UserDetails>(
      `${this.apiServerUrl}/User/authenticate`,
      auth
    );
  }
  //To check if the user already logged in
  public isLoggedIn(username: String): Observable<LoginHistory> {
    return this.http.get<LoginHistory>(
      `${this.apiServerUrl}/User/isLogged/${username}`
    );
  }
  public userLoggedOut(username:string):Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/User/loggedout/${username}`);
  }
}
