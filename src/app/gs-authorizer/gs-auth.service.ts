import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthCompReport } from '../types/AuthCompReport';
import { AuthMaintReport } from '../types/AuthMaintReport';
import { Maintenancecompletion } from '../types/maintenancecompletion';
import { RequestMaintenance } from '../types/request-maintenance';

@Injectable({
  providedIn: 'root',
})
export class GsAuthService {
  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  public getVerifiedRequests(): Observable<RequestMaintenance[]> {
    return this.http.get<RequestMaintenance[]>(
      `${this.baseUrl}/maintAuthorize/getVerifiedRequests`
    );
  }

  public authorizeVerifiedRequests(
    offtime: RequestMaintenance
  ): Observable<RequestMaintenance> {
    return this.http.put<RequestMaintenance>(
      `${this.baseUrl}/maintAuthorize/authorize`,
      offtime
    );
  }

  public rejectVerifiedRequests(
    offtime: RequestMaintenance
  ): Observable<RequestMaintenance> {
    return this.http.put<RequestMaintenance>(
      `${this.baseUrl}/maintAuthorize/reject`,
      offtime
    );
  }

  public getVehiclesSubmitted(): Observable<Maintenancecompletion[]> {
    return this.http.get<Maintenancecompletion[]>(
      `${this.baseUrl}/maintAuthorize/getVehiclesSubmitted`
    );
  }

  public authorizeSubmittedVehicles(
    vehicle: Maintenancecompletion
  ): Observable<Maintenancecompletion> {
    return this.http.put<Maintenancecompletion>(
      `${this.baseUrl}/maintAuthorize/authorizeSubmittedVehicles`,
      vehicle
    );
  }

  public getRequests(
    report: AuthMaintReport
  ): Observable<RequestMaintenance[]> {
    return this.http.post<RequestMaintenance[]>(
      `${this.baseUrl}/maintAuthorize/getRequestsReport`,
      report
    );
  }

  public getCompleted(
    report: AuthCompReport
  ): Observable<Maintenancecompletion[]> {
    return this.http.post<Maintenancecompletion[]>(
      `${this.baseUrl}/maintAuthorize/getCompletedReport`,
      report
    );
  }
}
