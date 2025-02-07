import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OffTimeRequest } from 'src/app/types/offTimeRequest';
import { InCityRequest } from 'src/app/types/in-city-request';
import {Fieldrequest} from 'src/app/types/fieldrequest';
import { environment } from 'src/environments/environment';
import { UserType } from 'src/app/types/UserType';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeRequestService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(
    private http:HttpClient
  ) { }
  //This method will get all off time requests under the director
  public  getOffTimeRequests(directorate:string):Observable<OffTimeRequest[]>{
   return this.http.get<OffTimeRequest[]>(`${this.apiServerUrl}/requestAuthorize/getOfftimeRequests/${directorate}`);
  }
  //This will authorize offtime request
  public  authorizeOffTimeRequests(offtime:OffTimeRequest):Observable<OffTimeRequest>{
    return this.http.put<OffTimeRequest>(`${this.apiServerUrl}/requestAuthorize/authorize`,offtime);
   }
     //This will reject offtime the request
  public  rejectOffTimeRequests(offtime:OffTimeRequest):Observable<OffTimeRequest>{
    return this.http.put<OffTimeRequest>(`${this.apiServerUrl}/requestAuthorize/reject`,offtime);
   }

     //This method will get all incity requests under the director
  public  getInCityRequests(directorate:string):Observable<InCityRequest[]>{
    return this.http.get<InCityRequest[]>(`${this.apiServerUrl}/requestAuthorize/getInCityRequests/${directorate}`);
   }
     //This will authorize incity request
  public  authorizeInCityRequests(incity:InCityRequest):Observable<InCityRequest>{
    return this.http.put<InCityRequest>(`${this.apiServerUrl}/requestAuthorize/authorizeInCity`,incity);
   }
        //This will reject InCity  request
  public rejectInCityRequests(incity:InCityRequest):Observable<InCityRequest>{
    return this.http.put<InCityRequest>(`${this.apiServerUrl}/requestAuthorize/rejectInCity`,incity);
   }
        //This method will get all field requests under the director
  public  getFieldRequests(directorate:string):Observable<Fieldrequest[]>{
    return this.http.get<Fieldrequest[]>(`${this.apiServerUrl}/requestAuthorize/getFieldRequests/${directorate}`);
   }
        //This will authorize field request
  public  authorizeFieldRequests(field:Fieldrequest):Observable<Fieldrequest>{
    return this.http.put<Fieldrequest>(`${this.apiServerUrl}/requestAuthorize/authorizeField`,field);
   }
           //This will reject field  request
  public rejectFieldRequests(field:Fieldrequest):Observable<Fieldrequest>{
    return this.http.put<Fieldrequest>(`${this.apiServerUrl}/requestAuthorize/rejectField`,field);
   }

   public getUsers(directorate:string):Observable<UserType[]>{
    return this.http.get<UserType[]>(`${this.apiServerUrl}/requestAuthorize/alluser/${directorate}`);
 }
   public DelegateUser(user:UserType):Observable<UserType>{
    return this.http.put<UserType>(`${this.apiServerUrl}/requestAuthorize/delegateUser`,user);
   }

   public DeactivateDelegation(user:UserType):Observable<UserType>{
    return this.http.put<UserType>(`${this.apiServerUrl}/requestAuthorize/deactivateDelegation`,user);
   }

  public getMechanicUsers():Observable<UserType[]>{
    return this.http.get<UserType[]>(`${this.apiServerUrl}/requestAuthorize/mechanicUsers`);
 }
 public getDispatcherUsers():Observable<UserType[]>{
  return this.http.get<UserType[]>(`${this.apiServerUrl}/requestAuthorize/dispatcherUsers`);
}

   
}
