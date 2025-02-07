import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestMaintenance } from '../types/request-maintenance';

@Injectable({
  providedIn: 'root'
})
export class TechnicalServiceService {
  apiServerUrl: String = environment.apiBaseUrl;
  constructor(
    private http:HttpClient
  ) { }
 
  public  getNoOfAuthorizedrequest():Observable<number>{
    return this.http.get<number>(`${this.apiServerUrl}/technical/numOfAauthorizedRequests`);
  }
  public  getNoOfUnderMaintenance():Observable<number>{
    return this.http.get<number>(`${this.apiServerUrl}/technical/numOfUnderMaintenance`);
  }
  public  getNoOfGarage():Observable<number>{
    return this.http.get<number>(`${this.apiServerUrl}/technical/numOfGarage`);
  }
  public getMaintenanceRequest(id:number):Observable<RequestMaintenance>{
    return this.http.get<RequestMaintenance>(`${this.apiServerUrl}/technical/getMaintReq/${id}`);
  }
}
