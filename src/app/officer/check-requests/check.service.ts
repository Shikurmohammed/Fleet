import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fieldrequest } from 'src/app/types/fieldrequest';
import { OffTimeRequest } from 'src/app/types/offTimeRequest';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(
    private http:HttpClient
  ) { }
  //This method will get all off time requests under the director
  public  getOffTimeRequests():Observable<OffTimeRequest[]>{
   return this.http.get<OffTimeRequest[]>(`${this.apiServerUrl}/checkAuthorizedReq/getOfftimeRequests`);
  }
  //This will authorize offtime request
  public  authorizeOffTimeRequests(offtime:OffTimeRequest):Observable<OffTimeRequest>{
    return this.http.put<OffTimeRequest>(`${this.apiServerUrl}/checkAuthorizedReq/authorize`,offtime);
   }
     //This will reject offtime the request
  public  rejectOffTimeRequests(offtime:OffTimeRequest):Observable<OffTimeRequest>{
    return this.http.put<OffTimeRequest>(`${this.apiServerUrl}/checkAuthorizedReq/reject`,offtime);
   }
        //This method will get all field requests under the director
  public  getFieldRequests():Observable<Fieldrequest[]>{
    return this.http.get<Fieldrequest[]>(`${this.apiServerUrl}/checkAuthorizedReq/getFieldRequests`);
   }
        //This will authorize field request
  public  authorizeFieldRequests(field:Fieldrequest):Observable<Fieldrequest>{
    return this.http.put<Fieldrequest>(`${this.apiServerUrl}/checkAuthorizedReq/authorizeField`,field);
   }
           //This will reject field  request
  public rejectFieldRequests(field:Fieldrequest):Observable<Fieldrequest>{
    return this.http.put<Fieldrequest>(`${this.apiServerUrl}/checkAuthorizedReq/rejectField`,field);
   }
}
