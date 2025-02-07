import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MaintenanceType } from 'src/app/types/maintenanceTypes';
import { RequestMaintenance } from 'src/app/types/request-maintenance';
import { Vehicle } from 'src/app/types/Vehicle';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfficerService {
  apiServerUrl: String = environment.apiBaseUrl;
  constructor(private http:HttpClient) { }
  public getNoOfServiceMillageDue():Observable<number>{
    return this.http.get<number>(`${this.apiServerUrl}/vehicle/serviceMillageDueNo`);
  }
  public getNoOfTyreMillageDue():Observable<number>{
    return this.http.get<number>(`${this.apiServerUrl}/vehicle/tyreMillageDueNo`);
  }
  public getNoOfInsuranceDue():Observable<number>{
    return this.http.get<number>(`${this.apiServerUrl}/vehicle/insuranceDueNo`);
  }
  public getNoOfOfftimeReq():Observable<number>{
    return this.http.get<number>(`${this.apiServerUrl}/vehicle/offtimeReq`);
  }
  public getNoFieldReq():Observable<number>{
    return this.http.get<number>(`${this.apiServerUrl}/vehicle/fieldReq`);
  }
  public getServiceMillageDue():Observable<Vehicle[]>{
    return this.http.get<Vehicle[]>(`${this.apiServerUrl}/vehicle/serviceMillageDue`);
  }
  public getTyresMillageDue():Observable<Vehicle[]>{
    return this.http.get<Vehicle[]>(`${this.apiServerUrl}/vehicle/tyreMillageDue`);
  }
  public getInsuranceDue():Observable<Vehicle[]>{
    return this.http.get<Vehicle[]>(`${this.apiServerUrl}/vehicle/insuranceDue`);
  }
  //get maintenance types for General services
  public getMaintenanceTypes():Observable<MaintenanceType[]>{
    return this.http.get<MaintenanceType[]>(`${this.apiServerUrl}/vehicle/serviceMaintenanceType`);
  }
 //Send maintenance request 
  public sendMaintenanceRequest(mainReq:RequestMaintenance):Observable<RequestMaintenance>{
    return this.http.post<RequestMaintenance>(`${this.apiServerUrl}/MaintenanceRequest/sendRequest`,mainReq);
  }
 //Get all of my service maintenance request 
  public getAllOfMyRequest():Observable<RequestMaintenance[]>{
    return this.http.get<RequestMaintenance[]>(`${this.apiServerUrl}/MaintenanceRequest/getAllRequest`);
  }
  //Update my maintenance request
  public updateServiceRequest(request:RequestMaintenance):Observable<RequestMaintenance>{
     return this.http.put<RequestMaintenance>(`${this.apiServerUrl}/MaintenanceRequest/updateServiceRequest`, request);
  }

    //get maintenance types for General services
    public getTyresMaintenanceTypes():Observable<MaintenanceType[]>{
      return this.http.get<MaintenanceType[]>(`${this.apiServerUrl}/vehicle/tyresMaintenanceType`);
    }
   //What kind of maintenance type
   public whatType(mainType:string):Observable<MaintenanceType>{
    return this.http.get<MaintenanceType>(`${this.apiServerUrl}/MaintenanceRequest/whatType/${mainType}`);
   }
}
