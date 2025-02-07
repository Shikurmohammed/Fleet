import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdvancePayment } from '../types/AdvancePayment';
import { AdvanceType } from '../types/AdvanceType';

@Injectable({
  providedIn: 'root',
})
export class AdvanceService {
  baseurl: String = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {}

  public getSettlementType(): Observable<AdvanceType[]> {
    return this.httpClient.get<AdvanceType[]>(
      `${this.baseurl}/advPayment/getTypeOfSettlement`
    );
  }

  createAdv(advancePayment: AdvancePayment): Observable<Object> {
    return this.httpClient.post(
      `${this.baseurl}/advPayment/createAdvance`,
      advancePayment
    );
  }

  update(id: string, advancePayment: AdvancePayment) {
    return this.httpClient.put(
      `${this.baseurl}/advPayment/updateAdvance/${id}`,
      advancePayment
    );
  }

  getById(id: string): Observable<AdvancePayment> {
    return this.httpClient.get<AdvancePayment>(
      this.baseurl + `/advPayment/getAdvPayment/${id}`
    );
  }

  public getAdvancePayments(userName: string): Observable<AdvancePayment[]> {
    return this.httpClient.get<AdvancePayment[]>(
      `${this.baseurl}/advPayment/all/${userName}`
    );
  }

  cancelAdvanceRequest(reqId: number) {
    return this.httpClient.delete<AdvancePayment[]>(
      `${this.baseurl}/advPayment/cancelAdv` + '/' + reqId
    );
  }

  getAdvDetail(id: any): Observable<AdvancePayment> {
    return this.httpClient.get<AdvancePayment>(
      this.baseurl + `/advPayment/getAdvDetail/${id}`
    );
  }

  //authorizer
  public getAdvPayments(username: any): Observable<AdvancePayment[]> {
    return this.httpClient.get<AdvancePayment[]>(
      `${this.baseurl}/advPayment/getAdvRequests/${username}`
    );
  }

  public authorizeAdvPayment(adv: AdvancePayment): Observable<AdvancePayment> {
    return this.httpClient.put<AdvancePayment>(
      `${this.baseurl}/advPayment/authorize`,
      adv
    );
  }

  public rejectAdvPayment(adv: AdvancePayment): Observable<AdvancePayment> {
    return this.httpClient.put<AdvancePayment>(
      `${this.baseurl}/advPayment/reject`,
      adv
    );
  }
}
