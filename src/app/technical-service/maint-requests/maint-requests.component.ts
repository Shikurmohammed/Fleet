import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestMaintenance } from './../../types/request-maintenance';
import { FieldService } from 'src/app/request/field/field.service';
import { Component, OnInit } from '@angular/core';
import { Garage } from 'src/app/types/garage';

@Component({
  selector: 'app-maint-requests',
  templateUrl: './maint-requests.component.html',
  styleUrls: ['./maint-requests.component.css']
})
export class MaintRequestsComponent implements OnInit {
  maintenance: RequestMaintenance[]=[];
  garages:any;
  mainten: RequestMaintenance=new RequestMaintenance();
  requestlength:number;
  technician:any;
  dateToday:string;
  id:any;

  maintenancerequest: RequestMaintenance|undefined;
  constructor(
    private fieldService: FieldService,
    private alert: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getMaintenanceRequest();
    this.technician = sessionStorage.getItem("username");
    this.dateToday = new Date().toISOString().substring(0,10);
    this.fieldService.getGarage().subscribe({
      next:(resp)=>{
       this.garages = resp;
      },
      error:()=>{
        this.alert.errorAlert("Unable To Fetch GArage");
      }
    });
  }
  assignGarage(maintain: RequestMaintenance):void{
     this.id= maintain.id;
    this.fieldService.assignGarageToVehicle(this.id,maintain).subscribe(
      (resp)=>{
        this.alert.sucessAlert("Garage Assigned Successfully");
        this.getMaintenanceRequest();
       // this.router.navigate(['maintRequest'])
      },
      (error: HttpErrorResponse)=>{
        this.alert.errorAlert("Server Error: Unable To Update");
      }
    );

  }
  public openModal(request: RequestMaintenance, mode: string): void {
    const container = document.getElementById('mainmaintenancerequest');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'garage') {
      this.maintenancerequest = request;
      button.setAttribute('data-target', '#maintenancerequestModal');
    }

    container?.appendChild(button);
    button.click();
  }

 getMaintenanceRequest(){
  this.fieldService.getMaintenanceRequest().subscribe(
    (resp)=>{
       this.maintenance = resp;
       this.requestlength = resp.length;
       setTimeout(() => {
        $('#maintrequestdatatable').DataTable({
          pagingType: 'full_numbers',
          pageLength: 5,
          autoWidth: true,
          retrieve: true,
          processing: true,
          lengthMenu: [5, 10, 25],
          order: [[1, 'desc']],
        });
      }, 1);
    },
    (error: HttpErrorResponse)=>{
             this.alert.errorAlert("Unable to fetch Data.");
    }
  );
 }

}
