import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FuelDetail } from 'src/app/types/FuelDetail';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UpdatePriceService {
  private baseurl = environment.apiBaseUrl;
  constructor(private httpClient: HttpClient) {}

  public getFuelDetail(): Observable<FuelDetail[]> {
    return this.httpClient.get<FuelDetail[]>(
      `${this.baseurl}/offtime/dispatch/fueldetail`
    );
  }
  updatePrice(value: any) {
    return this.httpClient.put(
      `${this.baseurl}/offtime/dispatch/updatePrice`,
      value
    );
  }
}
