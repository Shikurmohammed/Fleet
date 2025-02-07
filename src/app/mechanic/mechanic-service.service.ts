import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Maintenancecompletion } from '../types/maintenancecompletion';
import { MaintenanceType } from '../types/maintenanceTypes';
import { RequestMaintenance } from '../types/request-maintenance';
import { Report } from '../types/RequestReport';
import { SubmissionReport } from '../types/SubmissionReport';

@Injectable({
  providedIn: 'root'
})
export class MechanicServiceService {

  apiServerUrl: String = environment.apiBaseUrl;

  constructor(
    private http:HttpClient
  ) { }
  public getAllCustodianRequests():Observable<RequestMaintenance[]>{
    return this.http.get<RequestMaintenance[]>(`${this.apiServerUrl}/mechanic/getCustodianRequest`);
  }
  public getMaintenanceType(maintType:string):Observable<MaintenanceType>{
    return this.http.get<MaintenanceType>(`${this.apiServerUrl}/mechanic/getMaintenanceType/${maintType}`);
  }
  public verifyCustodianRequests(request:RequestMaintenance):Observable<RequestMaintenance>{
    return this.http.put<RequestMaintenance>(`${this.apiServerUrl}/mechanic/verifyRequest`,request);
  }
  public getMechanicRequests():Observable<RequestMaintenance[]>{
    return this.http.get<RequestMaintenance[]>(`${this.apiServerUrl}/mechanic/getMechanicRequests`);
  }
  public getAllCompletedRequests():Observable<Maintenancecompletion[]>{
    return this.http.get<Maintenancecompletion[]>(`${this.apiServerUrl}/mechanic/getCompletedRequests`);
  }
  public getRequestDetails(request:number):Observable<RequestMaintenance>{
    return this.http.get<RequestMaintenance>(`${this.apiServerUrl}/mechanic/getRequestDetails/${request}`);
  }
  public modifyMaintenanceSubmission(request:Maintenancecompletion):Observable<Maintenancecompletion>{
    return this.http.put<Maintenancecompletion>(`${this.apiServerUrl}/mechanic/modifyMaintenanceCompletion`, request);
  }
  public getReportOfUnverifiedCustodianRequests(request:Report):Observable<RequestMaintenance[]>{
     return this.http.post<RequestMaintenance[]>(`${this.apiServerUrl}/mechanic/unverifiedRequestReport`, request);
  }
  public getReportOfMechanicRequests(request:Report):Observable<RequestMaintenance[]>{
    return this.http.post<RequestMaintenance[]>(`${this.apiServerUrl}/mechanic/mechanicRequestReport`, request);
 }
 
 public getReportOfSubmittedRequests(request:Report):Observable<SubmissionReport[]>{
  return this.http.post<SubmissionReport[]>(`${this.apiServerUrl}/mechanic/submittedRequestReport`, request);
}

public getNoOfUnverifiedrequest():Observable<number>{
  return this.http.get<number>(`${this.apiServerUrl}/mechanic/unverifiedNo`);
}
public getNoOfVerifiedrequest():Observable<number>{
  return this.http.get<number>(`${this.apiServerUrl}/mechanic/verifiedNo`);
}
public getNoAuthorizedRequest():Observable<number>{
  return this.http.get<number>(`${this.apiServerUrl}/mechanic/authorizedNo`);
}

public getNoCompletionTechnical():Observable<number>{
  return this.http.get<number>(`${this.apiServerUrl}/mechanic/completionTechnicalNo`);
}

public getNoSubmittedMechanic():Observable<number>{
  return this.http.get<number>(`${this.apiServerUrl}/mechanic/mechanicSubmittedNo`);
}
  
}
