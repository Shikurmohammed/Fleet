import { MaintCompletionComponent } from './../../gs-authorizer/maint-completion/maint-completion.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Driver } from 'src/app/types/driver';
import { Fielddispatcher } from 'src/app/types/fielddispatcher';
import { Fieldrequest } from 'src/app/types/fieldrequest';
import { Garage } from 'src/app/types/garage';
import { RequestMaintenance } from 'src/app/types/request-maintenance';
import { Vehicle } from 'src/app/types/Vehicle';
import { environment } from 'src/environments/environment';
import { Maintenancecompletion } from 'src/app/types/maintenancecompletion';
import { Costreport } from 'src/app/types/maintenancecostreport/costreport';
import { DispatchedReport } from 'src/app/types/dispatched-report';
import { Incitydispatch } from 'src/app/types/incitydispatch';
import { OffTimeDispatch } from 'src/app/types/offTimeDispatch';
import { VehicleType } from 'src/app/types/VehicleType';
import { FuelDetail } from 'src/app/types/FuelDetail';

@Injectable({
  providedIn: 'root'
})
export class FieldService {
private apiUrl = environment.apiBaseUrl;
  constructor(
    private httpClient: HttpClient
  ) { }


  sendRequest(request: Fieldrequest): Observable<Fieldrequest>{
    return this.httpClient.post<Fieldrequest>(`${this.apiUrl}/fieldrequest/requests`,request);
  }

  getRequest(): Observable<Fieldrequest[]>{
    return this.httpClient.get<Fieldrequest[]>(`${this.apiUrl}/fieldrequest/requests`);
  }
  getMyRequest(username:string):Observable<Fieldrequest[]>{
    return this.httpClient.get<Fieldrequest[]>(`${this.apiUrl}/fieldrequest/myrequest/${username}`);
  }
  getRequestDispatcher(): Observable<Fieldrequest[]>{
    return this.httpClient.get<Fieldrequest[]>(`${this.apiUrl}/fieldrequest/dispatchrequests`);
  }
  getApproval(): Observable<Fielddispatcher[]>{
    return this.httpClient.get<Fielddispatcher[]>(`${this.apiUrl}/fieldapproval/approve`);
  }

  deleteRequest(id:number):Observable<void>{
    return this.httpClient.delete<void>(`${this.apiUrl}/fieldrequest/requests`+'/'+id);
  }
  getRequestByID(id: number): Observable<Fieldrequest>{
      return this.httpClient.get<Fieldrequest>(`${this.apiUrl}/fieldrequest/requests/${id}`);
  }
  approveRequest(id: number, field: Fieldrequest): Observable<Object>{
    return this.httpClient.put(`${this.apiUrl}/fieldrequest/requests/${id}`,field);
  }
  rejectRequest(id: number,field: Fieldrequest): Observable<Object>{
    return this.httpClient.put(`${this.apiUrl}/fieldrequest/reject/${id}`,field);
  }
  // ***********************************************Driver Related Service****************
  registerDriver(driver: Driver): Observable<Object>{
    return this.httpClient.post(`${this.apiUrl}/fieldapproval/drivers`,driver);
  }

  getDriver(): Observable<Driver[]>{
    return this.httpClient.get<Driver[]>(`${this.apiUrl}/fieldapproval/drivers`);
  }
  getActiveVehicle(): Observable<Vehicle[]>{
    return this.httpClient.get<Vehicle[]>(`${this.apiUrl}/fieldapproval/isActive`);
  }
  deleteDriver(id:number){
    return this.httpClient.delete(`${this.apiUrl}/fieldapproval/drivers`+'/'+id);
  }
  getDriverByID(id: number): Observable<Driver>{
      return this.httpClient.get<Driver>(`${this.apiUrl}/fieldapproval/drivers/${id}`);
  }
  getDriverByFullname(name: string): Observable<Driver>{
    return this.httpClient.get<Driver>(`${this.apiUrl}/fieldapproval/plate/${name}`);
}
  getDriverByDriverName(plateNo: string): Observable<Driver>{
    return this.httpClient.get<Driver>(`${this.apiUrl}/fieldapproval/driversPlate/${plateNo}`);
}
  getVehicleByPlateNo(plateNo: string): Observable<Vehicle>{
    return this.httpClient.get<Vehicle>(`${this.apiUrl}/fieldapproval/vehicle/${plateNo}`);
  }
  getVehicleByStatus(): Observable<Vehicle[]>{
    return this.httpClient.get<Vehicle[]>(`${this.apiUrl}/fieldapproval/vehicle`);
  }
  getDriverByStatus(): Observable<Driver[]>{
    return this.httpClient.get<Driver[]>(`${this.apiUrl}/fieldapproval/driverstatus`);
  }
  updateDriver(id: number, driver: Driver): Observable<Object>{
    return this.httpClient.put(`${this.apiUrl}/fieldapproval/drivers/${id}`,driver);
  }
  updateDriverInfo(driver: Driver): Observable<Driver> {
    return this.httpClient.put<Driver>(`${this.apiUrl}/fieldapproval/drivers`,driver);
  }

  driverAlreadyExists(phone: string): Observable<Driver> {
    return this.httpClient.get<Driver>(`${this.apiUrl}/fieldapproval/drivertell/${phone}`);
   }

  updateDriverStatus(fullName: string, driver: Driver): Observable<Object>{
    return this.httpClient.put(`${this.apiUrl}/fieldapproval/updatedriverstatus/${fullName}`,driver);
  }
  updateVehicleStatus(plateNo: string, vehicle: Vehicle): Observable<Vehicle>{
    return this.httpClient.put<Vehicle>(`${this.apiUrl}/fieldapproval/updatevehiclestatus/${plateNo}`,vehicle);
  }
  updateActiveVehicle(plateNo: string, vehicle: Vehicle): Observable<Object>{
    return this.httpClient.put(`${this.apiUrl}/fieldapproval/updateActiveVehicle/${plateNo}`,vehicle);
  }
  updateDriverVehicleId(plateNo: string, driver: Driver): Observable<Object>{
    return this.httpClient.put(`${this.apiUrl}/fieldapproval/updatedrivers/${plateNo}`,driver);
  }

  updateRequest(id: number, request: Fieldrequest): Observable<Object>{
    return this.httpClient.put(`${this.apiUrl}/fieldrequest/updaterequest/${id}`,request);
  }
  updateRequestInfo(request: Fieldrequest): Observable<Fieldrequest> {
    return this.httpClient.put<Fieldrequest>(`${this.apiUrl}/fieldrequest/updaterequest`,request);
  }
  updateRequestApprovedBy(id: number, request: Fieldrequest): Observable<Object>{
    return this.httpClient.put(`${this.apiUrl}/fieldrequest/updateby/${id}`,request);
  }


  // *******************************DISPATCHER RELATED SERVICE***************************
  dispatcherApproval(dispatch: Fielddispatcher): Observable<Fielddispatcher>{
    return this.httpClient.post<Fielddispatcher>(`${this.apiUrl}/fieldapproval/approve`,dispatch);
  }
  approveStatus(id: number, request: Fieldrequest): Observable<Object>{
    return this.httpClient.put(`${this.apiUrl}/fieldrequest/approvestatus/${id}`,request);
  }
  rejectStatus(id: number, request: Fieldrequest): Observable<Fieldrequest>{
    return this.httpClient.put<Fieldrequest>(`${this.apiUrl}/fieldrequest/rejectstatus/${id}`,request);
  }
  addRejecter(id: number, request: Fieldrequest): Observable<Fieldrequest>{
    return this.httpClient.put<Fieldrequest>(`${this.apiUrl}/fieldrequest/addrejecter/${id}`,request);
  }
  getDispatcherByRequesterID(reqid: number): Observable<Fielddispatcher>{
    return this.httpClient.get<Fielddispatcher>(`${this.apiUrl}/fieldapproval/getapproved/${reqid}`);
}
getAllApprovedRequest(): Observable<Fielddispatcher[]>{
  return this.httpClient.get<Fielddispatcher[]>(`${this.apiUrl}/fieldapproval/approvedrequest`);
}
modifyApprovedRequest(reqId: number, request: Fielddispatcher): Observable<Fielddispatcher>{
  return this.httpClient.put<Fielddispatcher>(`${this.apiUrl}/fieldapproval/updateapprovedrequest/${reqId}`,request);
}
getApprovedRequest(): Observable<Fieldrequest[]>{
  return this.httpClient.get<Fieldrequest[]>(`${this.apiUrl}/fieldrequest/approvedstatus`);
}
getDispatchedVehicle(): Observable<Vehicle[]>{
  return this.httpClient.get<Vehicle[]>(`${this.apiUrl}/fieldrequest/dispatchedvehicle`);
}
disableDriver(driver: Driver): Observable<Driver>{
  return this.httpClient.put<Driver>(`${this.apiUrl}/fieldapproval/disabledrivers`,driver);
}
enableDriver(driver: Driver): Observable<Driver>{
  return this.httpClient.put<Driver>(`${this.apiUrl}/fieldapproval/enabledrivers`,driver);
}
getMaintenanceRequest(): Observable<RequestMaintenance[]>{
  return this.httpClient.get<RequestMaintenance[]>(`${this.apiUrl}/technical/service`);
}
assignGarageToVehicle(reqId: number, request: RequestMaintenance): Observable<RequestMaintenance>{
  return this.httpClient.put<RequestMaintenance>(`${this.apiUrl}/technical/assigngarage/${reqId}`,request);
}
getGarage(): Observable<Garage[]>{
  return this.httpClient.get<Garage[]>(`${this.apiUrl}/technical/garage`);
}
getMaintenanceCompletedVehicle(): Observable<RequestMaintenance[]>{
  return this.httpClient.get<RequestMaintenance[]>(`${this.apiUrl}/technical/complete`);
}
completeMaintenance(compl: Maintenancecompletion): Observable<Object>{
  return this.httpClient.post(`${this.apiUrl}/maintenance/complete`,compl);
}
getMaintenanceComplete(): Observable<Maintenancecompletion[]>{
  return this.httpClient.get<Maintenancecompletion[]>(`${this.apiUrl}/maintenance/getAll`);
}
updateMaintenanceCompletion(comp: Maintenancecompletion): Observable<Maintenancecompletion> {
  return this.httpClient.put<Maintenancecompletion>(`${this.apiUrl}/maintenance/updatecompletion`,comp);
}
maintenanceCostCount(){
  return this.httpClient.get(`${this.apiUrl}/maintenance/costCount`);
}
getMaintenanceCompleteByMonthRange(report: Costreport): Observable<Maintenancecompletion[]>{
  return this.httpClient.post<Maintenancecompletion[]>(`${this.apiUrl}/maintenance/costreportbymonthrange`,report);
}


getMaintenanceCompleteByPlateNo(report: Costreport):Observable<Maintenancecompletion[]>{
  return this.httpClient.post<Maintenancecompletion[]>(`${this.apiUrl}/maintenance/costreportbyplateno`,report);
}

// getMaintenanceCompleteByPlateNo(req:string): Observable<Maintenancecompletion[]>{
//   return this.httpClient.get<Maintenancecompletion[]>(`${this.apiUrl}/maintenance/costreportbyplateno/${req}`);
// }


totalPlateNoCost(report: Costreport){
  return this.httpClient.post(`${this.apiUrl}/maintenance/totalplatecost`,report);
}




getMaintenanceCompleteByYearRange(report: Costreport): Observable<Maintenancecompletion[]>{
  return this.httpClient.post<Maintenancecompletion[]>(`${this.apiUrl}/maintenance/costreportbyyearrange`,report);
}

totalMonthlyCost(report: Costreport){
  return this.httpClient.post(`${this.apiUrl}/maintenance/totalmonthlycost`,report);
}

totalYearlyCost(report: Costreport){
  return this.httpClient.post(`${this.apiUrl}/maintenance/totalyearlycost`,report);
}
getDispatcherFieldReport(report: DispatchedReport): Observable<Fielddispatcher[]>{
  return this.httpClient.post<Fielddispatcher[]>(`${this.apiUrl}/dispatcherReport/field`,report);
}
getDispatcherIncityReport(report: DispatchedReport): Observable<Incitydispatch[]>{
  return this.httpClient.post<Incitydispatch[]>(`${this.apiUrl}/dispatcherReport/incity`,report);
}
getDispatcherOfftimeReport(report: DispatchedReport): Observable<OffTimeDispatch[]>{
  return this.httpClient.post<OffTimeDispatch[]>(`${this.apiUrl}/dispatcherReport/offtime`,report);
}
getAllFieldDispatch(): Observable<Fielddispatcher[]>{
  return this.httpClient.get<Fielddispatcher[]>(`${this.apiUrl}/dispatcherReport/getAllField`);
}
getAllIncityDispatch(): Observable<Incitydispatch[]>{
  return this.httpClient.get<Incitydispatch[]>(`${this.apiUrl}/dispatcherReport/getAllIncity`);
}
getAllOfftimeDispatch(): Observable<OffTimeDispatch[]>{
  return this.httpClient.get<OffTimeDispatch[]>(`${this.apiUrl}/dispatcherReport/getAllOfftime`);
}
getAllVehicleType(): Observable<VehicleType[]>{
  return this.httpClient.get<VehicleType[]>(`${this.apiUrl}/fieldapproval/vehicletypes`);
}
getVehicleByTypes(vtypes: number): Observable<Vehicle[]>{
  return this.httpClient.get<Vehicle[]>(`${this.apiUrl}/fieldapproval/vehiclebytype/${vtypes}`);
}
getVehicleTypeByID(id: number): Observable<VehicleType>{
  return this.httpClient.get<VehicleType>(`${this.apiUrl}/fieldapproval/vtypebyid/${id}`);
}
getDispatchedByDriverName(driverName: string): Observable<Fielddispatcher>{
  return this.httpClient.get<Fielddispatcher>(`${this.apiUrl}/fieldapproval/checkdriver/${driverName}`);
}
getIncityDispatchedByDriverName(driverName: string): Observable<Incitydispatch>{
  return this.httpClient.get<Incitydispatch>(`${this.apiUrl}/fieldapproval/checkdriverincity/${driverName}`);
}
getOfftimeDispatchedByDriverName(driverName: string): Observable<OffTimeDispatch>{
  return this.httpClient.get<OffTimeDispatch>(`${this.apiUrl}/fieldapproval/checkdriverofftime/${driverName}`);
}

checkDriverAvailability(driverName: string): Observable<number> {
  return this.httpClient.get<number>(`${this.apiUrl}/offtime/dispatch/driveravailable/${driverName}`);
}
getFuelTypeById(id: number): Observable<FuelDetail>{
  return this.httpClient.get<FuelDetail>(`${this.apiUrl}/fieldapproval/fueltype/${id}`);
}

}

