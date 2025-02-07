import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DispatcherService {
  apiServerUrl: String = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  public getNoOfIncity(): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/Dispatcher/noOfIncity`);
  }
  public getNoOfField(): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/Dispatcher/noOfField`);
  }
  public getNoOfOffTime(): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/Dispatcher/noOfOfftime`);
  }
  //This is the method that will retrieve number vehicles which are in the pool
  public getNoPooledVehicles():Observable<number>{
    return this.http.get<number>(`${this.apiServerUrl}/Dispatcher/noOfPooled`);
  }
  //This is the method that will retrieve number of vehicles under maintenance
  public getNoMaintenanceVehicles():Observable<number>{
    return this.http.get<number>(`${this.apiServerUrl}/Dispatcher/noOfMaintenance`);
  }
  //This is the method that will retrieve number dispatched vehicles
  public getNoDispatchedVehicles():Observable<number>{
    return this.http.get<number>(`${this.apiServerUrl}/Dispatcher/noOfDispatched`);
  }
  //   This is the method that will retrieve number vehicles that are dispatched
    public getNoDisposedVehicles():Observable<number>{
      return this.http.get<number>(`${this.apiServerUrl}/Dispatcher/noOfDisposed`);
    }
}
