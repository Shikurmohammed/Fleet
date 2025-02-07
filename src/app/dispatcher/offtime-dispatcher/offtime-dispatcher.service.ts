import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { DriverDetail } from 'src/app/types/driverDetail';
import { OffTimeDispatch } from 'src/app/types/offTimeDispatch';
import { OfftimePrintDetail } from 'src/app/types/offTimePrintDetail';
import { OffTimeRequest } from 'src/app/types/offTimeRequest';
import { VehicleDetail } from 'src/app/types/vehicleDetailDto';
import { VehicleType } from 'src/app/types/VehicleType';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OfftimeDispatcherService {
  private baseurl = environment.apiBaseUrl;
  request: OffTimeRequest;
  constructor(private httpClient: HttpClient) {}

  public getAuthorizedRequests(): Observable<OffTimeRequest[]> {
    return this.httpClient.get<OffTimeRequest[]>(
      `${this.baseurl}/offtime/dispatch/authorized`
    );
  }

  public getDispatchedRequests(): Observable<OffTimeRequest[]> {
    return this.httpClient.get<OffTimeRequest[]>(
      `${this.baseurl}/offtime/dispatch/dispatched`
    );
  }

  passRequest(request: OffTimeRequest) {
    this.request = request;
  }

  getRequest(): OffTimeRequest {
    return this.request;
  }

  getRequestsById(id: any): Observable<OffTimeRequest> {
    return this.httpClient.get<OffTimeRequest>(
      `${this.baseurl}/offtime/dispatch/getRequestById/${id}`
    );
  }

  approveRequest(offTimeDispatch: OffTimeDispatch): Observable<Object> {
    return this.httpClient.post(
      `${this.baseurl}/offtime/dispatch/approve`,
      offTimeDispatch
    );
  }

  getVehicleDetail(plateNo: any): Observable<VehicleDetail> {
    return this.httpClient.get<VehicleDetail>(
      `${this.baseurl}/offtime/dispatch/get/drivername/${plateNo}`
    );
  }

  rejectRequest(formData: FormData): Observable<Object> {
    return this.httpClient.post(
      `${this.baseurl}/offtime/dispatch/reject`,
      formData
    );
  }

  getById(id: any): Observable<OffTimeDispatch> {
    return this.httpClient.get<OffTimeDispatch>(
      this.baseurl + `/offtime/dispatch/getDispatched/${id}`
    );
  }

  updateDispatched(reqId: any, value: any) {
    return this.httpClient.put(
      `${this.baseurl}/offtime/dispatch/updateDispatched/${reqId}`,
      value
    );
  }

  //for print
  getApproved(reqid: number): Observable<OfftimePrintDetail> {
    return this.httpClient.get<OfftimePrintDetail>(
      `${this.baseurl}/offtime/dispatch/approved/printout/${reqid}`
    );
  }

  public getDrivers(): Observable<DriverDetail[]> {
    return this.httpClient.get<DriverDetail[]>(
      `${this.baseurl}/offtime/dispatch/getDrivers`
    );
  }

  checkDriverAvailability(driverName: string): Observable<number> {
    return this.httpClient.get<number>(
      `${this.baseurl}/offtime/dispatch/driveravailable/${driverName}`
    );
  }
}
