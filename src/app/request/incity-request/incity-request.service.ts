import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Driver } from 'src/app/types/driver';
import { Garage } from 'src/app/types/garage';
import { InCityRequest } from 'src/app/types/in-city-request';
import { Incitydispatch } from 'src/app/types/incitydispatch';
import { Vehicle } from 'src/app/types/Vehicle';
import { VehicleType } from 'src/app/types/VehicleType';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class IncityRequestService {
private baseurl=environment.apiBaseUrl;

  constructor( private httpClient: HttpClient ) { }


   inCityRequestMethod(incityRequest:InCityRequest):Observable<Object>
   {
    return this.httpClient.post(`${this.baseurl}/incity/incityrequest`,incityRequest);
   }

   viewIncityRequest(): Observable<InCityRequest[]>
   {
    return this.httpClient.get<InCityRequest[]>(`${this.baseurl}/incity/incityrequestview`);
   }

   viewIncityRequestByUserName(name:string): Observable<InCityRequest[]>
   {
    return this.httpClient.get<InCityRequest[]>(`${this.baseurl}/incity/incityrequestviewbyusername/${name}`);
   }


   cancelIncityRequest(id:number)
   {
    return this.httpClient.delete<InCityRequest[]>(`${this.baseurl}/incity/incityrequestcancel`+'/'+id);
   }

   
   getRequestByID(id: number): Observable<InCityRequest>{
    return this.httpClient.get<InCityRequest>(`${this.baseurl}/incity/incityrequestbyid/${id}`);
}


   updateinCityRequest(id:number, incityRequest:InCityRequest):Observable<Object> {
    return this.httpClient.put(`${this.baseurl}/incity/incityrequestupdate/${id}`,incityRequest);
  }

  rejectRequest(id: number,field: InCityRequest): Observable<Object>{
    return this.httpClient.put(`${this.baseurl}/incity/reject/${id}`,field);
  }

  approveRequest(id: number, field: Incitydispatch): Observable<Object>{
    return this.httpClient.put(`${this.baseurl}/incity/approvestatus/${id}`,field);
  }

  getIncityRequestApprovedData():Observable<InCityRequest[]>
   {
    return this.httpClient.get<InCityRequest[]>(`${this.baseurl}/incity/incityapproved`);
   }




  // *********************Incity Dispatcher Service *********************

  getDistpatchByID(id: number): Observable<InCityRequest>{
    return this.httpClient.get<InCityRequest>(`${this.baseurl}/incitydispatch/incitydispatchbyid/${id}`);
}

  inCityDispatchSave(incityDispatch:Incitydispatch):Observable<Incitydispatch>
   {
    return this.httpClient.post<Incitydispatch>(`${this.baseurl}/incitydispatch/save/`,incityDispatch);
   }


   viewIncityDispatch(): Observable<Incitydispatch[]>
   {
    return this.httpClient.get<Incitydispatch[]>(`${this.baseurl}/incitydispatch/incitydispatchview`);
   }


   reasonOfRejection(id:number,res:Incitydispatch): Observable<Object>
  {
    return this.httpClient.put(`${this.baseurl}/incitydispatch/reject/${id}`,res);
  }

  getVehiclePlateNo(type:String): Observable<Vehicle>
   {
    return this.httpClient.get<Vehicle>(`${this.baseurl}/incitydispatch/vehicle/${type}`);
   }

   getdrivername(): Observable<Driver>
   {
     return this.httpClient.get<Driver>(`${this.baseurl}/incitydispatch/drivername`);
   }

   getDeparturekm(vehiclePlateNo:string):Observable<Vehicle>
   {
    return this.httpClient.get<Vehicle>(`${this.baseurl}/incitydispatch/departurekm/${vehiclePlateNo}`);
   }

   getDispachedPlateNo(id: number): Observable<Incitydispatch>{
    return this.httpClient.get<Incitydispatch>(`${this.baseurl}/incitydispatch/plateNo/${id}`);
    }
   
   getdriverphoneNumber(plateNo:String): Observable<Driver>
   {
     return this.httpClient.get<Driver>(`${this.baseurl}/incitydispatch/driverphonenumber/${plateNo}`);
   }

   modifyDispatchedReturnKm(id:number, incityDispatch:Incitydispatch):Observable<Incitydispatch>
   {
    return this.httpClient.put<Incitydispatch>(`${this.baseurl}/incitydispatch/modifyrkm/${id}`,incityDispatch);
   }

   getVehicleType():Observable<VehicleType[]>
{
  return this.httpClient.get<VehicleType[]>(`${this.baseurl}/incitydispatch/vehicletype`);
}

  setDriveOff(name:string):Observable<Driver[]>
{
  return this.httpClient.put<Driver[]>(`${this.baseurl}/incitydispatch/setoffdriver/${name}`,null);
}



  //  *******************************Garage Related Service*******************************

  registerGarage(garage:Garage):Observable<object>
  {
    return this.httpClient.post(`${this.baseurl}/garage/registergarage`,garage);
  }


  phoneExists(phone:string):Observable<Garage>
  {
    return this.httpClient.get<Garage>(`${this.baseurl}/garage/gragephone/${phone}`);
  }
  

   getGarage(): Observable<Garage[]>
   {
    return this.httpClient.get<Garage[]>(`${this.baseurl}/garage/getgarage`);
   }


  editgarage(id:number, garage:Garage):Observable<Object> {
    return this.httpClient.put(`${this.baseurl}/garage/editgarage/${id}`,garage);
  }


  getGarageByID(id: number): Observable<Garage>{
  return this.httpClient.get<Garage>(`${this.baseurl}/garage/getgaragebyid/${id}`);
}


  disposeGarage(id:number)
{
 return this.httpClient.delete<Garage[]>(`${this.baseurl}/garage/disposegarage`+'/'+id);
}

}
