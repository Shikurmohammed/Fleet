import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DispatcherService } from './dispatcher.service';

@Component({
  selector: 'app-dispatcher-home',
  templateUrl: './dispatcher-home.component.html',
  styleUrls: ['./dispatcher-home.component.css'],
})
export class DispatcherHomeComponent implements OnInit {
  numOfIncity: number;
  numOfOfftime: number;
  numOfField: number;
  numOfPooled:number;
  numOfDispatched: number;
  numOfDisposed: number;
  numOfMaintenance: number;
  constructor(private dispatcherService: DispatcherService) {}

  ngOnInit(): void {
    this.getNoOfIncity();
    this.getNoOfOffTime();
    this.getNoOfField();
    this.getNoOfPooledVehicle();
    this.getNoOfDispatchedVehicle();
    this.getNoOfDisposedVehicle();
    this.getNoOfVehicleUnderMaintenance();
    if(sessionStorage.getItem('home')!=null){
      window.location.reload();
      sessionStorage.removeItem("home");
    }
  }
  getNoOfField() {
    this.dispatcherService.getNoOfField().subscribe(
      (res: number) => {
        this.numOfField = res;
      },
      (error: HttpErrorResponse) => {}
    );
  }
  getNoOfOffTime() {
    this.dispatcherService.getNoOfOffTime().subscribe(
      (res: number) => {
        this.numOfOfftime = res;
      },
      (error: HttpErrorResponse) => {}
    );
  }
  getNoOfIncity() {
    this.dispatcherService.getNoOfIncity().subscribe(
      (res: number) => {
        this.numOfIncity = res;
      },
      (error: HttpErrorResponse) => {}
    );
  }
  getNoOfPooledVehicle(){
    this.dispatcherService.getNoPooledVehicles().subscribe(
      (res:number)=>{
        this.numOfPooled = res;
      },
      (error:HttpErrorResponse)=>{

      }
    );
  }
  getNoOfDispatchedVehicle(){
    this.dispatcherService.getNoDispatchedVehicles().subscribe(
      (res:number)=>{
        this.numOfDispatched = res;
      },
      (error:HttpErrorResponse)=>{}
    );
  }
  getNoOfDisposedVehicle(){
    this.dispatcherService.getNoDisposedVehicles().subscribe(
      (res:number)=>{
        this.numOfDisposed = res;
      },
      (error:HttpErrorResponse)=>{}
    );
  }
  getNoOfVehicleUnderMaintenance(){
    this.dispatcherService.getNoMaintenanceVehicles().subscribe(
      (res:number)=>{
        this.numOfMaintenance = res;
      },
      (error:HttpErrorResponse)=>{}
    );
  }
}
