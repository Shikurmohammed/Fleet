import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OffTimeRequest } from 'src/app/types/offTimeRequest';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OfftimeRequestService {
  private baseurl = environment.apiBaseUrl;
  constructor(private httpClient: HttpClient) {}
  offTimeRequest(offtimeRequest: OffTimeRequest): Observable<Object> {
    console.log(offtimeRequest);
    return this.httpClient.post(
      `${this.baseurl}/offtime/offtimerequest`,
      offtimeRequest
    );
  }

  update(id: string, offtimeRequest: OffTimeRequest) {
    return this.httpClient.put(
      `${this.baseurl}/offtime/updaterequest/${id}`,
      offtimeRequest
    );
  }

  public getRequests(username: string): Observable<OffTimeRequest[]> {
    return this.httpClient.get<OffTimeRequest[]>(
      `${this.baseurl}/offtime/all/${username}`
    );
  }

  getById(id: string): Observable<OffTimeRequest> {
    return this.httpClient.get<OffTimeRequest>(
      this.baseurl + `/offtime/getRequest/${id}`
    );
  }

  cancelOffTimeRequest(reqId: number) {
    return this.httpClient.delete<OffTimeRequest[]>(
      `${this.baseurl}/offtime/requestcancel` + '/' + reqId
    );
  }
}
