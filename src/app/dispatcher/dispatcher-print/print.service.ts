import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fieldrequest } from 'src/app/types/fieldrequest';
import { InCityRequest } from 'src/app/types/in-city-request';
import { OffTimeRequest } from 'src/app/types/offTimeRequest';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  private baseurl=environment.apiBaseUrl;
  constructor(
    private http: HttpClient 
  ) { }
  viewApprovedIncityRequest(): Observable<InCityRequest[]>
  {
   return this.http.get<InCityRequest[]>(`${this.baseurl}/dispatcherPrint/incityrequest`);
  }
  getApprovedRequests():Observable<OffTimeRequest[]>{
    return this.http.get<OffTimeRequest[]>(`${this.baseurl}/dispatcherPrint/offtimerequest`);
  }
  getApprovedFieldRequest():Observable<Fieldrequest[]>{
    return this.http.get<Fieldrequest[]>(`${this.baseurl}/dispatcherPrint/fieldrequest`);
  }
}
