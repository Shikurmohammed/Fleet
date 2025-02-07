import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  apiServerUrl: String = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  public getNoOfIncity(username:string): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/Request/noOfIncity/${username}`);
  }
  public getNoOfField(username:string): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/Request/noOfField/${username}`);
  }
  public getNoOfOffTime(username:string): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/Request/noOfOfftime/${username}`);
  }
  public isDelegated(username:string): Observable<string> {
    return this.http.get<string>(`${this.apiServerUrl}/Request/isdelegated/${username}`);
  }
}
