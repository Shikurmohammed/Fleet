import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/alert.service';
import { Garage } from 'src/app/types/garage';
import { Maintenancecompletion } from 'src/app/types/maintenancecompletion';
import { MaintenanceType } from 'src/app/types/maintenanceTypes';
import { RequestMaintenance } from 'src/app/types/request-maintenance';
import { IncityRequestService } from '../../incity-request/incity-request.service';
import { RequestMaintenanceService } from '../request-maintenance.service';

@Component({
  selector: 'app-manage-maintenance-request',
  templateUrl: './manage-cust-maintenance-request.component.html',
  styleUrls: ['./manage-cust-maintenance-request.component.css']
})
export class ManageCustMaintenanceRequestComponent implements OnInit {
  mainRequests: RequestMaintenance[]=[];
  requistionForm:RequestMaintenance = new RequestMaintenance();
  director: string;
  username: string;
  serviceMaintenanceType: MaintenanceType[];
  tyresMaintenanceType: MaintenanceType[];
  maintType: MaintenanceType;
  interval:number;
  returnValue: any;
  myType: MaintenanceType;
  maintained: boolean;
  maintenanceDetails: Maintenancecompletion;
  garageDetails: RequestMaintenance;
  garages: Garage[];
  vehiclesGarage: Garage[];
  garageName: string;
  garageLocation: string;
  garagePhone: string;
  constructor(
    private router:Router,
    private alert:AlertService,
    private requestService:RequestMaintenanceService,
    private service:IncityRequestService,
  ) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("role")=="Requester" || sessionStorage.getItem("role")=="Senior Transport Officer"){
      this.director = sessionStorage.getItem("directorate");
      this.username = sessionStorage.getItem("username");
      if(sessionStorage.getItem("updated")!=null){
        this.alert.sucessAlert(sessionStorage.getItem("updated"));
        sessionStorage.removeItem("updated");
     }
      this.getMyMaintenanceRequests();
      this.getGarage();
    }else{
        this.router.navigate(['/home']);
    }
  }
              //To display vehicles whose service millages are due on data tables
              public getMyMaintenanceRequests():void{
                this.requestService.getAllOfMyRequest(this.director).subscribe((ret:RequestMaintenance[])=>{
                  this.mainRequests = ret;
                  setTimeout(()=>{
                    $('#MyRequestTable').DataTable( {
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
          EditRequestServiceMaintenance(editRequest:NgForm){
            this.requestService.updateCustodianRequest(editRequest.value).subscribe(
             (ret:RequestMaintenance)=>{
              sessionStorage.setItem("updated", "Request Successfully Updated");
              window.location.reload();
             },
             (error:HttpErrorResponse)=>{
                 this.alert.errorAlert("Server Error");
             }
            );

         }

         isMaintained(id:number){
              this.requestService.isMaintained(id).subscribe(
                (ret:Maintenancecompletion)=>{

                      this.maintenanceDetails = ret;
                },
                (error:HttpErrorResponse)=>{
                       this.alert.errorAlert("Server Error");
                }
              );
         }
         getGarage() {
          this.service.getGarage().subscribe({
            next: (resp) => {
              this.garages = resp;
            },
            error: () => {
              alert("Sorry, your request could not be fetched");
            }
          });
        }
      //This will control vehicle service  modals
      public onOpenModal(request: RequestMaintenance, mode: string): void {
        const container = document.getElementById('main-container');
        const button = document.createElement('button');
        button.type = 'button';
        button.style.display = 'none';
        button.setAttribute('data-toggle', 'modal');
        if (mode === 'edit') {
            this.requistionForm = request;

            button.setAttribute('data-target', '#maintenanceRequestModal');
        }
        if (mode === 'view') {
          //this.details = vehicle;
          if(request.garage!=null){
            this.isMaintained(request.id);
            this.garageDetails = request;
            this.vehiclesGarage = this.garages.filter(x => x.id === this.garageDetails.garage);
            this.garageName = this.vehiclesGarage[0].name;
            this.garageLocation = this.vehiclesGarage[0].location;
            this.garagePhone = this.vehiclesGarage[0].phone;
          }else{
            this.garageDetails = request;
          }
          button.setAttribute('data-target', '#detailsMaintenanceModal');
        }
        container?.appendChild(button);
        button.click();
      }

}
