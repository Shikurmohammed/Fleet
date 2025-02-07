import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { MaintenanceType } from 'src/app/types/maintenanceTypes';
import { RequestMaintenance } from 'src/app/types/request-maintenance';
import { MechanicServiceService } from '../mechanic-service.service';

@Component({
  selector: 'app-mechanic-requests',
  templateUrl: './mechanic-requests.component.html',
  styleUrls: ['./mechanic-requests.component.css']
})
export class MechanicRequestsComponent implements OnInit {

  director: string;
  username: string;
  custRequests: RequestMaintenance[]=[];
  modifyForm: RequestMaintenance = new RequestMaintenance();
  details: RequestMaintenance;
  reqMaintenanceType: string;
  reasonForRequest: string;

  constructor(
    private alert:AlertService,
    private router:Router,
    private mechanicService:MechanicServiceService
  ) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("role")=="GS Mechanic"){
      this.director = sessionStorage.getItem("directorate");
      this.username = sessionStorage.getItem("username");
      if(sessionStorage.getItem("updated")!=null){
        this.alert.sucessAlert(sessionStorage.getItem("updated"));
        sessionStorage.removeItem("updated");
     }
     this.getCustodianRequests();
     
    }else{
      this.router.navigate(['/home']);
    }
  }
              //To display custodian requests that need mechanic replay
              public getCustodianRequests():void{
                this.mechanicService.getMechanicRequests().subscribe((ret:RequestMaintenance[])=>{
                  this.custRequests = ret;
                  // console.log(this.custRequests);
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
          getMaintenanceType(maintType:string):void{
               this.mechanicService.getMaintenanceType(maintType).subscribe(
                (ret:MaintenanceType)=>{
                   this.reqMaintenanceType = ret.mainType;
                },
                (error:HttpErrorResponse)=>{

                }
               );   
          }
          EditMaintenanceRequest(request:NgForm){
            // request.modifiedBy = this.username;
             this.mechanicService.verifyCustodianRequests(request.value).subscribe(
              (ret:RequestMaintenance)=>{
                sessionStorage.setItem("updated", "Request Successfully Updated");
                window.location.reload();
              },
              (error:HttpErrorResponse)=>{}
             );
          }
              //This will control vehicle service  modals
      public onOpenModal(request: RequestMaintenance, mode: string): void {
        const container = document.getElementById('main-container');
        const button = document.createElement('button');
        button.type = 'button';
        button.style.display = 'none';
        button.setAttribute('data-toggle', 'modal');
        if (mode === 'Verify') {
            this.modifyForm = request;
            this.modifyForm.modifiedBy = this.username;
            button.setAttribute('data-target', '#modifyRequestModal');
        }
        if (mode === 'view') {
            this.details = request;
            if(this.details.maintenanceType !=null){
              this.getMaintenanceType(this.details.maintenanceType);
            }
            button.setAttribute('data-target', '#detailsVehicleServiceModal');
        }
        if (mode === 'reason') {
          this.reasonForRequest = request.reasonForRejection;
          button.setAttribute('data-target', '#reasonModal');
        }
        container?.appendChild(button);
        button.click();
      }  

}
