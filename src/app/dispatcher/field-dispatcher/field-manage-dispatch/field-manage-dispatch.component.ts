import { AlertService } from 'src/app/alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from 'src/app/officer/vehicle/vehicle.service';
import { FieldService } from 'src/app/request/field/field.service';
import { Driver } from 'src/app/types/driver';
import { Fielddispatcher } from 'src/app/types/fielddispatcher';
import { Fieldrequest } from 'src/app/types/fieldrequest';
import { Vehicle } from 'src/app/types/Vehicle';
import { VehicleType } from 'src/app/types/VehicleType';
import { OfftimeDispatcherService } from '../../offtime-dispatcher/offtime-dispatcher.service';
import { IncityRequestService } from 'src/app/request/incity-request/incity-request.service';

@Component({
  selector: 'app-field-manage-dispatch',
  templateUrl: './field-manage-dispatch.component.html',
  styleUrls: ['./field-manage-dispatch.component.css']
})
export class FieldManageDispatchComponent implements OnInit {
  approve: Fieldrequest[];
  requestData: Fieldrequest|undefined;
  id: number;
  doubletrip: number=0;
  totaldoubletrip: number=0;
  fieldapprove: Fielddispatcher = new Fielddispatcher();
  requestapprove: Fieldrequest = new Fieldrequest();
  vtypes: VehicleType[]=[];
  driverstatus: Driver = new Driver();
  vehiclestatus: Vehicle = new Vehicle();
  vekByTypes: Vehicle[]=[];
  requestor: any;
  requestorID: any;
  username: any;
  dateToday: string;
  user: any;
  driverName: Driver[] = [];
  driversName: Driver[] = [];
  drivers: any;
  approvedBy:any;
  plateNo: any;
  doubleTrip:number;
  perdms: number=0;
  accomds: number=0;
  grandTotal:number=0;
  totalAccPer:number=0;
  ondeparture:number=0;
  onreturn:number=0;
  difference: number=0;
  salary: number=0;
  rejecter: any;
  rejectedby:any;
  mydriver:any;
  vehictypes: number;
  driversCarPlate:string="";
  kmOnDeparture: number=0;
  vehiclePlate: number;
  insuranceExpiration: any;
  insExpire: any;
  getExpiration: any;
  getCurrent: any;
  currentDate: any;
  isExpired:any;
  showAlert: any;
  noOfDays:any;
  vehicleKM:any;
  fullname:number;
  drivernotRegistered:string="";
  checkDriver: any;
  isDispatched: number;
  isIncityAvailable: number;
  isOfftimeAvailable: number;
  isAvailable: number=1;
  alertAvailability: string;
  kmOnSingleTrip: number;
  contingency: number;
  plateNumber: any;
  distancePerLitre: number;
  estimatedFuelInLitre: number;
  estimatedFuelInBirr: number;
  kmOnDoubleTrip: number;
  driverNames: string="";
  fuelPrice: number;
  accm:number = 0;
  littresInBirr: number;


  constructor(
    private routes: ActivatedRoute,
    private fieldService: FieldService,
    private router: Router,
    private vehicleService: VehicleService,
    private alert: AlertService,
    private offTimeService: OfftimeDispatcherService,
    private service: IncityRequestService
  ) { }

  ngOnInit(): void {

    this.getDrivers();
     this.getAllVehicleType();
    this.fieldapprove.approvedBy !=sessionStorage.getItem("username");
    this.id = this.routes.snapshot.params['id'];
    this.approvedBy= sessionStorage.getItem("username");
    this.username = sessionStorage.getItem("username");
    this.requestapprove.rejectedBy = sessionStorage.getItem("username");
    this.rejecter = this.requestapprove.rejectedBy;
    this.dateToday = new Date().toISOString().substring(0, 10);
    this.fieldService.getRequestByID(this.id).subscribe(data => {
      this.requestapprove = data;
      this.requestor = data.requestedBy;
      this.requestorID = data.id;
      this.noOfDays = data.noOfDaysRequested;
      this.kmOnSingleTrip = data.destKM;
      this.contingency = data.contingency;
      this.kmOnDoubleTrip = (this.kmOnSingleTrip *2)+ this.contingency;


    },
      error => console.log(error));
    this.getRequest();

    this.fieldService.getVehicleByStatus().subscribe({
      next: (driver) => {

        this.mydriver = driver;
      },
      error: () => {
        alert("unable to fetch driver data.");
      }
    });
    this.fieldService.getVehicleByStatus().subscribe({
      next:(res)=>{
      this.plateNo = res;
      },
      error:()=>{

      }
    })


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

  getVehiclePlate(){
    if(this.vehictypes !=null){
      this.fieldService.getVehicleByTypes(this.vehictypes).subscribe({
        next: (vtypes)=>{
          this.vekByTypes = vtypes;
        },
        error: ()=>{
        console.log("Unable to fetch vehicle Plate");
        }
    });
    }
    else{
      this.plateNumber = null;
    this.vekByTypes = null;
    this.fuelPrice = null;
    this.estimatedFuelInLitre = null;
    this.kmOnDeparture = null;
    this.distancePerLitre = null;
    this.driverNames = null;
    }
  }
  getDrivers(){
    this.fieldService.getDriver().subscribe({
       next: (driv)=>{
            this.driversName = driv;
           // console.log(driv);
       },
       error:()=>{
        console.log("Unable to fetch drivers");
      }
    });
  }
  getAllVehicleType(){
    this.fieldService.getAllVehicleType().subscribe({
      next: (vektypes)=>{
             this.vtypes = vektypes;
      },
      error:()=>{
        console.log("Unable to fetch vehicle types");
      }
    });
  }
  getDriverName(){
   if(this.plateNumber !=null && (this.vehictypes !=null || this.vehictypes != undefined)){
        this.fieldService.getDriverByDriverName(this.plateNumber).subscribe({
          next:(names)=>{
              this.driverNames = names.fullName;
          },
          error:()=>{
            console.log("unable to get driver name");
          }
      });
      this.fieldService.getVehicleByPlateNo(this.plateNumber).subscribe(
        (res)=>{
        // console.log(res.fuelType);
          this.kmOnDeparture= res.lastMilege;
          this.distancePerLitre = res.disPerLit;
          // this.estimatedFuelInLitre = (this.kmOnDoubleTrip/this.distancePerLitre);
          this.estimatedFuelInLitre = Math.round(((this.kmOnDoubleTrip/this.distancePerLitre) + Number.EPSILON) * 100) / 100

          this.insuranceExpiration = res.insExpDate;
          this.currentDate = new Date().toISOString().substring(0,10);
          this.getExpiration = new Date(this.insuranceExpiration).getTime();
          this.getCurrent = new Date(this.currentDate).getTime();
          this.isExpired = (this.getExpiration-this.getCurrent)/(1000*3600*24);

          this.fieldService.getFuelTypeById(res.fuelType).subscribe({
            next:(fuel)=>{
              this.fuelPrice = this.estimatedFuelInLitre * fuel.price;
              this.littresInBirr = fuel.price;
              //console.log(fuel.price);
            },
            error:()=>{
              console.log("unable to fetch fuel type");
            }
          });
        },
        (error: HttpErrorResponse)=>{
          console.log("error");
        }
      );
   }
   else{
    //this.vekByTypes = null;
    this.fuelPrice = null;
    this.estimatedFuelInLitre = null;
    this.kmOnDeparture = null;
    this.distancePerLitre = null;
    this.driverNames = null;
  }


    // this.fieldService.getDriverByDriverName(this.plateNumber).subscribe(
    //   (res)=>{
    //     if(res==null){
    //       this.drivernotRegistered = "This Vehicle Has No Driver. Pls Register Driver";
    //     }
    //     else{
    //       this.driversCarPlate= res.fullName;
    //        if(this.driversCarPlate ==null || this.driversCarPlate== undefined){
    //          this.drivernotRegistered = "This Vehicle Has No Driver. Pls Add Driver";
    //        }
    //     }

    //   },
    //   (error: HttpErrorResponse)=>{
    //     console.log("error");
    //   }
    // );

    // this.fieldService.getVehicleByPlateNo(this.plateNumber).subscribe(
    //   (res)=>{
    //     this.kmOnDeparture= res.lastMilege;
    //     this.distancePerLitre = res.disPerLit;

    //     this.insuranceExpiration = res.insExpDate;
    //     this.currentDate = new Date().toISOString().substring(0,10);
    //     this.getExpiration = new Date(this.insuranceExpiration).getTime();
    //     this.getCurrent = new Date(this.currentDate).getTime();
    //     this.isExpired = (this.getExpiration-this.getCurrent)/(1000*3600*24);
    //   },
    //   (error: HttpErrorResponse)=>{
    //     console.log("error");
    //   }
    // );
  }
  getDepartureKM(depart: number){
    this.ondeparture = depart;
  }
  getReturnKM(returns: number){
    this.onreturn = returns;
    this.difference = ((1*this.onreturn)-(this.ondeparture));
  }
  getSalary(sal: number){
    this.salary = sal;
    //console.log(this.accomds);
    //console.log(this.perdms);
    if(this.perdms !=0 && this.accomds !=0){
      this.totalAccPer = ((1*this.perdms)+(1*this.accomds));
      this.grandTotal = ((1*this.salary)+(1*this.perdms)+(1*this.accomds));
    }
  }
  getPerdiem(perdm: number){
  this.perdms= perdm;
 // console.log(this.accomds);
    this.totalAccPer = (1*this.perdms)*(this.noOfDays);
    //this.fieldapprove.totalPerdiemAndAccomodation = this.totalAccPer;
     this.grandTotal = ((1*this.fuelPrice)+(1*this.totalAccPer));
  
  }
  getAccomodation(accomd: number){
    this.accomds = accomd;
    this.totalAccPer = ((1*this.perdms)+(1*this.accomds));
    this.grandTotal = ((1*this.salary)+(1*this.perdms)+(1*this.accomds));
  }
  getTotalDoubleTrip(double: number){
    this.doubletrip = double;
    this.totaldoubletrip =((1*this.doubletrip)*2);
  }
  backView() {
    this.router.navigate(['fieldDispatcher']);
  }
  addReject(rejectForm: Fieldrequest) {
    //console.log(rejectForm);
    this.fieldService.addRejecter(this.id, rejectForm).subscribe({
       next:(res)=>{
           this.alert.sucessAlert("Request Successfully Rejected");
           this.router.navigate(['fieldDispatcher']);
       },
       error:()=>{
        this.alert.errorAlert("Unable To Reject Request");
       }

    });
  }
  addApproval(approval: Fielddispatcher) {
   // console.log(approval);
    this.fieldService.dispatcherApproval(approval).subscribe({
      next: (dat) => {
        this.alert.sucessAlert("Request Successfully Dispatched");
        this.router.navigate(['fieldDispatcher']);
      },
      error: () => {
        this.alert.errorAlert("Server Error");
      }
    });

  }
  getRequest() {
    this.fieldService.getRequest().subscribe(data => {
      this.approve = data;
    },
      error => console.log(error));
  }

}
