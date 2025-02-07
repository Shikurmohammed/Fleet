import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChangePasswordType } from '../types/change';

@Injectable({
  providedIn: 'root'
})
export class ChangepasswordService {

  constructor(private http:HttpClient) { }
  public apiUrl = environment.apiBaseUrl;
  public changePassword(change:ChangePasswordType):Observable<any>{
     return this.http.put<ChangePasswordType>(`${this.apiUrl}/User/changePassword`,change);
  }
}
