import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/alert.service';
import { Maintenancecompletion } from 'src/app/types/maintenancecompletion';
import { RequestMaintenance } from 'src/app/types/request-maintenance';
import { MechanicServiceService } from '../mechanic-service.service';

@Component({
  selector: 'app-mechanic-completion',
  templateUrl: './mechanic-completion.component.html',
  styleUrls: ['./mechanic-completion.component.css']
})
export class MechanicCompletionComponent implements OnInit {
  director: string;
  username: string;
  completedRequest: Maintenancecompletion[]=[];
  modifyForm: Maintenancecompletion = new Maintenancecompletion();
  details: Maintenancecompletion;
  reqDirectorate: string;
  requestDetails: RequestMaintenance;
  model: string;
  requestDirectorate: string;
  previousMilege: number;
  isLessthan: boolean=false;
  fuelTechnical: number;

  constructor(
    private alert:AlertService,
    private router:Router,
    private mechanicService:MechanicServiceService
  ) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("role")=="GS Mechanic"){
      this.director = sessionStorage.getItem("directorate");
      this.username = sessionStorage.getItem("username");
      if(sessionStorage.getItem("submitted")!=null){
        this.alert.sucessAlert(sessionStorage.getItem("submitted"));
        sessionStorage.removeItem("submitted");
     }
     this.getCompletedRequests();
     
    }else{
      this.router.navigate(['/home']);
    }
  }

          //To display completed requests
          public getCompletedRequests():void{
            this.mechanicService.getAllCompletedRequests().subscribe((ret:Maintenancecompletion[])=>{
              this.completedRequest = ret;
              setTimeout(()=>{                      
                $('#CompletedRequestTable').DataTable( {
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
     //check milege not less than previous
     checkMilege(current:any){
           if(current.target.value<=this.previousMilege){
              this.isLessthan = true;
           }else{
            this.isLessthan=false;
           }

     }
      submitMaintenanceRequest(request:NgForm){
           this.mechanicService.modifyMaintenanceSubmission(request.value).subscribe(
            (ret:Maintenancecompletion)=>{
                sessionStorage.setItem("submitted", "Vehicle Maintenance Successfully Submitted");   
                window.location.reload();               
            },
            (error:HttpErrorResponse)=>{
              this.alert.errorAlert("Server Error");
            }
           );
      }
      getRequestDetails(request:number){
         this.mechanicService.getRequestDetails(request).subscribe(
          (ret:RequestMaintenance)=>{
            this.requestDetails = ret;
            this.requestDirectorate = ret.reqDirectorate;
            this.model = ret.model;
            this.previousMilege = ret.kmTechnical;
            this.fuelTechnical = ret.fuelTechnical;
          },
          (error:HttpErrorResponse)=>{
            this.alert.errorAlert("Server Error");
          }
         );
      }
           //This will control  modals
            public onOpenModal(request: Maintenancecompletion, mode: string): void {
              const container = document.getElementById('main-container');
              const button = document.createElement('button');
              button.type = 'button';
              button.style.display = 'none';
              button.setAttribute('data-toggle', 'modal');
              if (mode === 'submit') {
                  this.modifyForm = request;
                  this.modifyForm.modifiedBy = this.username;
                  this.getRequestDetails(this.modifyForm.requestId);
                  button.setAttribute('data-target', '#maintenanceSubmissionModal');
              }
              if (mode === 'view') {
                  this.details = request;
                  this.getRequestDetails(this.details.requestId);
                  button.setAttribute('data-target', '#detailsMaintenanceModal');
              }
              container?.appendChild(button);
              button.click();
            }  

}
