import { Injectable } from '@angular/core';
import { AdvancePayment } from '../types/AdvancePayment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettleAdvancePaymentService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(
    private http:HttpClient
  ) { }

  public getAdvancePaymentRequests():Observable<AdvancePayment[]>{
    return this.http.get<AdvancePayment[]>(`${this.apiServerUrl}/SettlementOfficer/getPaymentRequests`);
  }
  public grantAdvanceRequest(advance:AdvancePayment){
    return this.http.put<AdvancePayment>(`${this.apiServerUrl}/SettlementOfficer/grantAdvance`,advance);
  }
  public rejectAdvancePayment(advance:AdvancePayment){
    return this.http.put<AdvancePayment>(`${this.apiServerUrl}/SettlementOfficer/rejectAdvance`,advance);
  }
  public getSettlementDetail(id:number):Observable<AdvancePayment>{
    return this.http.get<AdvancePayment>(`${this.apiServerUrl}/SettlementOfficer/printSettlement/${id}`);
  }
  public getNoOfRequests():Observable<number>{
    return this.http.get<number>(`${this.apiServerUrl}/SettlementOfficer/numberOfRequests`);
  }
}
