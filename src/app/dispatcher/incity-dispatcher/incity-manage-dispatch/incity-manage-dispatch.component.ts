import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { VehicleService } from 'src/app/officer/vehicle/vehicle.service';
import { FieldService } from 'src/app/request/field/field.service';
import { IncityRequestService } from 'src/app/request/incity-request/incity-request.service';
import { InCityRequest } from 'src/app/types/in-city-request';
import { Incitydispatch } from 'src/app/types/incitydispatch';
import { Vehicle } from 'src/app/types/Vehicle';
import { Driver } from '../../../types/driver';
import { OfftimeDispatcherService } from '../../offtime-dispatcher/offtime-dispatcher.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-incity-manage-dispatch',
  templateUrl: './incity-manage-dispatch.component.html',
  styleUrls: ['./incity-manage-dispatch.component.css']
})
export class IncityManageDispatchComponent implements OnInit {
  incitydispatch: Incitydispatch[];
  approve: InCityRequest[];
  requestapprove: InCityRequest = new InCityRequest();
  fieldapprove: Incitydispatch = new Incitydispatch();
  vehicle: Vehicle = new Vehicle();
  driver: Driver=new Driver();
  id: any;
  requestor: any;
  userName: any;
  depkm: number = 0;
  deparkm: string;
  currentDay: Date;
  depDate:any;
  retDate:any;
  depTime:any;
  retTime:any;
  vehicletype:any;
  isAvailable: number=1;
  alertAvailability: string;
  checkDriver: string;

  constructor(
    private service: IncityRequestService,
    private routes: ActivatedRoute,
    private fieldService: FieldService,
    private vehicleservice: VehicleService,
    private offTimeService: OfftimeDispatcherService,
    private router: Router,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.getDispatch();
    this.getVehicleType();
    this.getDriverName();
    this.id = this.routes.snapshot.params['id'];
    this.userName = sessionStorage.getItem("username");
    this.currentDay = new Date();
    this.viewIncityRequest();
    this.service.getRequestByID(this.id).subscribe(data => {
      this.requestapprove = data;
      this.requestor = data.requestBy;
      this.depDate=data.dateFrom;
      this.retDate=data.dateTo;
      this.depTime=data.requestTimeFrom;
      this.retTime=data.requestTimeTo;
    },
      error => console.log(error));


    this.service.getDeparturekm(this.deparkm).subscribe({
      next: (res) => {
        this.depkm = res.lastMilege;
      },
      error: () => {
        console.log("error");
      }
    })

  }

  getVehiclePlateNo(type:string){
    this.service.getVehiclePlateNo(type).subscribe({
      next: (data) => {
        this.vehicle = data;
      },
      error: () => {
        this.alert.errorAlert("Sorry, Your Vehicle Plate Number Request Could Not be Fetched");
      }
    });
  }

  public checkDriverAvailability() {
    this.offTimeService.checkDriverAvailability(this.checkDriver).subscribe(
      (response: number) => {
        this.isAvailable = response;
        
        this.alertAvailability =
          'is currently Assigned to another Request';
          if(response===0){
            this.alert.warningAlert("Driver " + this.checkDriver + " "+this.alertAvailability);
          }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  getDriverName() {
    this.service.getdrivername().subscribe({
      next: (res) => {
        this.driver=res;
      },
      error: () => {
        console.log("error");
      }
    })
  }

  setDriverNameOff(event){
    this.service.setDriveOff(event).subscribe({
      next:()=>{
        console.log(event);
      },
      error:()=>{
        this.alert.errorAlert("You can't set off driver name");
      }
      
    });
  }
  

  getDepartureKm(departure: string): void {
    this.deparkm = departure;
    this.service.getDeparturekm(this.deparkm).subscribe({
      next: (res) => {
        this.depkm = res.lastMilege;
      },
      error: () => {
        console.log("error");
      }
    })
  }


  viewIncityRequest() {
    this.service.viewIncityRequest().subscribe({
      next: (resp) => {
        this.approve = resp;
      },
      error: () => {
        alert("Sorry, your request could not be fetched");
      }
    });
  }

  backView() {
    this.router.navigate(['incityDispatcher']);
  }


  getVehicleType()
  {
    this.service.getVehicleType().subscribe({
      next:(data)=>{
        this.vehicletype=data;
      },
      error:()=>
      {
        this.alert.errorAlert("Sorry you cant't fetch vehicle type");
      }
    })
  }

  saveApproval(addForm: Incitydispatch) {
        this.service.inCityDispatchSave(addForm).subscribe(
               (res:Incitydispatch) => {
                  this.alert.sucessAlert("Requested incity form successfully approved!");
                
                   this.router.navigate(['incityDispatcher']);
              },
              (error:Incitydispatch) => {
                this.alert.errorAlert("Sorry, your request could not be approved!");
              }
            );
  }
  reject(reject: InCityRequest) {
    this.service.rejectRequest(this.id, reject).subscribe({
      next: (req) => {
        this.alert.sucessAlert("Your request has been rejected");
        this.router.navigate(['incityDispatcher']);
        this.getDispatch();
      },
      error: () => {
        this.alert.errorAlert("Your request hasn't been rejected");
        this.router.navigate(['incityDispatcher']);
        this.getDispatch();
      }
    });
  }


  getDispatch() {
    this.service.viewIncityDispatch().subscribe(dat => {
      this.incitydispatch = dat;
    },
      error => console.log(error));
  };
}
