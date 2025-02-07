import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthReqReport } from 'src/app/types/AuthReqReport';
import { Fieldrequest } from 'src/app/types/fieldrequest';
import { InCityRequest } from 'src/app/types/in-city-request';
import { OffTimeRequest } from 'src/app/types/offTimeRequest';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  public getOfftimeReport(report: AuthReqReport): Observable<OffTimeRequest[]> {
    return this.http.post<OffTimeRequest[]>(
      `${this.baseUrl}/requestAuthorize/getOfftimeReport`,
      report
    );
  }

  public getIncityReport(report: AuthReqReport): Observable<InCityRequest[]> {
    return this.http.post<InCityRequest[]>(
      `${this.baseUrl}/requestAuthorize/getIncityReport`,
      report
    );
  }

  public getFieldReport(report: AuthReqReport): Observable<Fieldrequest[]> {
    return this.http.post<Fieldrequest[]>(
      `${this.baseUrl}/requestAuthorize/getFieldReport`,
      report
    );
  }
}
