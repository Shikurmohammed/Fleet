import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { MaintenanceType } from 'src/app/types/maintenanceTypes';
import { RequestMaintenance } from 'src/app/types/request-maintenance';
import { Vehicle } from 'src/app/types/Vehicle';
import { OfficerService } from '../officer.service';

@Component({
  selector: 'app-service-millage-due',
  templateUrl: './service-millage-due.component.html',
  styleUrls: ['./service-millage-due.component.css']
})
export class ServiceMillageDueComponent implements OnInit {
  vehicles: Vehicle[]=[];
  requestMaintenance: Vehicle;
  details: Vehicle;
  requistionForm:RequestMaintenance = new RequestMaintenance();
  director: any;
  username: any;
  serviceMaintenanceType: MaintenanceType[];

  constructor(
    private officerService:OfficerService,
    private router:Router,
    private alert:AlertService
  ) { }
  ngOnInit(): void {
    if(sessionStorage.getItem("role")=="Senior Transport Officer"){
      this.getServiceMillageDueOnDataTable();
      this.director = sessionStorage.getItem("directorate");
      this.username = sessionStorage.getItem("username");
      this.getServiceMaintenanceType();
    }else{
       this.router.navigate(['/home']);
    }
  }

          //To display vehicles whose service millages are due on data tables
          public getServiceMillageDueOnDataTable():void{
            this.officerService.getServiceMillageDue().subscribe((ret:Vehicle[] )=>{
              this.vehicles = ret; 
              setTimeout(()=>{                      
                $('#ServiceDataTable').DataTable( {
                  pagingType: 'full_numbers',
                  pageLength: 5,
                  autoWidth:false,
                  retrieve: true,
                  processing: true,
                  lengthMenu : [5, 10, 25],
                  order:[[1,"desc"]]
              } );
              }, 1);      
          });
      } 
      //To get service maintenance types 
      getServiceMaintenanceType(){
          this.officerService.getMaintenanceTypes().subscribe(
            (res:MaintenanceType[])=>{
               this.serviceMaintenanceType = res;
            },
            (error:HttpErrorResponse)=>{}
          );
      }
      RequestServiceMaintenance(request:NgForm){
        this.officerService.sendMaintenanceRequest(this.requistionForm).subscribe(
          (res:RequestMaintenance)=>{
            this.alert.sucessAlert("Maintenance Request Successfully Sent");
            this.getServiceMillageDueOnDataTable();
          },
          (error:HttpErrorResponse)=>{
            this.alert.errorAlert("Server Error");
          }
        );
      }

         //This will control vehicle service  modals
   public onOpenModal(vehicle: Vehicle, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'request') {
      this.requestMaintenance = vehicle;
      this.requistionForm.requestedBy = this.username;
      this.requistionForm.reqDirectorate = this.director;
      //To Get Already Existing Vehicle Details
      this.requistionForm.plateNo = this.requestMaintenance.plateNo;
      this.requistionForm.previousServiceMilage = this.requestMaintenance.lmGenService;
      this.requistionForm.currentMilage = this.requestMaintenance.lastMilege;
      this.requistionForm.milageDifference = this.requistionForm.currentMilage - this.requistionForm.previousServiceMilage;
      this.requistionForm.model = this.requestMaintenance.model;
      this.requistionForm.chassisNo = this.requestMaintenance.chassisNo;
      this.requistionForm.engineNo = this.requestMaintenance.engineNo;
      this.requistionForm.previousServiceDate = this.requestMaintenance.previousServiceDate;


      button.setAttribute('data-target', '#maintenanceRequestModal');
    }
    if (mode === 'view') {
      this.details = vehicle;
      button.setAttribute('data-target', '#detailsVehicleServiceModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
