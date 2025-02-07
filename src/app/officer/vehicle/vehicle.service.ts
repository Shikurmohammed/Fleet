import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FuelDetail } from 'src/app/types/FuelDetail';
import { Vehicle } from 'src/app/types/Vehicle';
import { VehicleType } from 'src/app/types/VehicleType';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private baseurl = environment.apiBaseUrl;
  constructor(private httpClient: HttpClient) {}

  addVehicle(vehicle: Vehicle): Observable<Object> {
    console.log(vehicle);
    return this.httpClient.post(`${this.baseurl}/vehicle/add`, vehicle);
  }

  public getVehicles(): Observable<Vehicle[]> {
    let vehicle = this.httpClient.get<Vehicle[]>(`${this.baseurl}/vehicle/all`);
    console.log('testing return data' + vehicle);
    return vehicle;
  }

  public getVehiclesOnPool(vtype: any): Observable<Vehicle[]> {
    return this.httpClient.get<Vehicle[]>(
      `${this.baseurl}/vehicle/all/onpool/${vtype}`
    );
  }

  public updateVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.httpClient.put<Vehicle>(
      `${this.baseurl}/vehicle/update`,
      vehicle
    );
  }

  disposeVehicle(id: any) {
    return this.httpClient.put(`${this.baseurl}/vehicle/dispose/${id}`, null);
  }

  vehicleAlreadyExists(plateNo: any) {
    return this.httpClient.get<boolean>(
      `${this.baseurl}/vehicle/exists/${plateNo}`
    );
  }
      //This method is api call that fetch all vehicle types 
      public getVehicleTypes():Observable<VehicleType[]>{
        return this.httpClient.get<VehicleType[]>(`${this.baseurl}/vehicle/vehicleTypes`);
     }
   public  getFuelType():Observable<FuelDetail[]>{
    return this.httpClient.get<FuelDetail[]>(`${this.baseurl}/vehicle/fuelTypes`);
   }
}
