import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Garage } from 'src/app/types/garage';
import { Maintenancecompletion } from 'src/app/types/maintenancecompletion';
import { RequestMaintenance } from 'src/app/types/request-maintenance';
import { Report } from 'src/app/types/RequestReport';
import { Vehicle } from 'src/app/types/Vehicle';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestMaintenanceService {
  apiServerUrl: String = environment.apiBaseUrl;
  constructor(
    private http:HttpClient
  ) { }
  public getMyVehicles(director:string):Observable<Vehicle[]>{
    return this.http.get<Vehicle[]>(`${this.apiServerUrl}/vehicle/custodianVehicles/${director}`);
  }
  public sendMaintenanceRequest(mainReq:RequestMaintenance):Observable<RequestMaintenance>{
    return this.http.post<RequestMaintenance>(`${this.apiServerUrl}/MaintenanceRequest/sendCustodianRequest`,mainReq);
  }
  public getAllOfMyRequest(director:string):Observable<RequestMaintenance[]>{
    return this.http.get<RequestMaintenance[]>(`${this.apiServerUrl}/MaintenanceRequest/getCustodianRequest/${director}`);
  }
    //Update my maintenance request
    public updateCustodianRequest(request:RequestMaintenance):Observable<RequestMaintenance>{
      return this.http.put<RequestMaintenance>(`${this.apiServerUrl}/MaintenanceRequest/updateCustodianRequest`, request);
   }

   //get maintenance details by request id
  public isMaintained(id:number):Observable<Maintenancecompletion>{
      return this.http.get<Maintenancecompletion>(`${this.apiServerUrl}/MaintenanceRequest/getMaintenanceDetails/${id}`)
   }

   //get report of all vehicle maintenance requests
   public getReportOfMaintenanceRequests(request:Report):Observable<RequestMaintenance[]>{
    return this.http.post<RequestMaintenance[]>(`${this.apiServerUrl}/MaintenanceRequest/requestReport`, request);
  }

  public getGarageDetails(id:number):Observable<Garage>{
    return this.http.get<Garage>(`${this.apiServerUrl}/MaintenanceRequest/vehiclegarage/${id}`);
  }
}
