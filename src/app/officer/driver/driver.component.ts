import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { AlertService } from 'src/app/alert.service';
import { FieldService } from 'src/app/request/field/field.service';
import { OfftimeRequestService } from 'src/app/request/offtime-request/offtime-request.service';
import { DirectorateType } from 'src/app/types/Directorate';
import { Driver } from 'src/app/types/driver';
import { Vehicle } from 'src/app/types/Vehicle';
import { VehicleService } from '../vehicle/vehicle.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {
  directorates: DirectorateType[] = [];
  vehicle: Vehicle[]=[];
  dateToday: string;
  director: any;
  username: any;
  id: any;
  phoneFound: string="";
  driverFound: string="";
  exist: boolean;
  driverExist: boolean=false;
  driver: Driver = new Driver();
  activeVehicle: Vehicle = new Vehicle();
  actionBtn: string;
  validateDriver: FormGroup;
  submitted = false;
  veID: any;
  vehicleplate:string;
  constructor(
    private routes: ActivatedRoute,
    private fieldService: FieldService,
    private vehicleService: VehicleService,
    private router: Router,
    private builder: FormBuilder,
    private alert:AlertService
  ) { }

  ngOnInit(): void {
    this.actionBtn="Register";
    this.id = this.routes.snapshot.params['id'];
    this.dateToday = new Date().toISOString().substring(0,10);
    this.director = sessionStorage.getItem("directorate");
    this.username = sessionStorage.getItem("username");
    this.fieldService.getDriverByID(this.id).subscribe(data=>{
    this.driver = data;
    console.log(this.driver);

    },
    error=>console.log(error));
    if(this.id !=null){
      this.actionBtn = "Update";
    }

    this.fieldService.getActiveVehicle().subscribe({
      next:(plate)=>{
          this.vehicle = plate;
      },
      error:()=>{
        this.alert.errorAlert("couldn't fetch data");
      }
    })
  }
  getVehicleID(plt: string){
      this.vehicleplate = plt;
      this.fieldService.getVehicleByPlateNo(this.vehicleplate).subscribe(
        (res)=>{
          this.veID = res.id;
        },
        (error: HttpErrorResponse)=>{
          this.alert.errorAlert("couldn't fetch vehicle id");
        }

      );
  }

  checkDriverName(fullname: string){
   this.driverExist = false;
   this.fieldService.getDriverByFullname(fullname).subscribe({
    next:(fname)=>{
    if(fname == null){
      this.driverExist = false;
      this.driverFound = "";
    }
    else{
       this.driverExist = true;
       this.driverFound= "Driver " + fullname + " Already Registered";
    }
    },
    error:()=>{
      console.log("failed to check driver name");
    }
   });
  }
  checkPhone(phon: string){
    this.exist=false;
    //this.telephone = phon;
    this.fieldService.driverAlreadyExists(phon).subscribe(
      (data)=>{
        if(data==null){
           this.exist = false;
           this.phoneFound="";
        }
        else{
          this.exist = true;
          this.phoneFound = "phone already exist";
        }
      },
      (error)=>{

      }
      )

  }


  driverRegister(addForm: NgForm){

        //console.log(addForm.controls.fullName.value);
        this.fieldService.registerDriver(this.driver).subscribe({
          next:()=>{
            this.alert.sucessAlert("Driver Successfully Registered");
            this.router.navigate(['manageDriver']);
          },
          error:()=>{
            this.alert.errorAlert("Server Error");
          }
        });
  }


}
