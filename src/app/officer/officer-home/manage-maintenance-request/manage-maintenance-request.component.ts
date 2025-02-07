import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/alert.service';
import { IncityRequestService } from 'src/app/request/incity-request/incity-request.service';
import { RequestMaintenanceService } from 'src/app/request/request-maintenance/request-maintenance.service';
import { Garage } from 'src/app/types/garage';
import { Maintenancecompletion } from 'src/app/types/maintenancecompletion';
import { MaintenanceType } from 'src/app/types/maintenanceTypes';
import { RequestMaintenance } from 'src/app/types/request-maintenance';
import { OfficerService } from '../officer.service';

@Component({
  selector: 'app-manage-maintenance-request',
  templateUrl: './manage-maintenance-request.component.html',
  styleUrls: ['./manage-maintenance-request.component.css']
})
export class ManageMaintenanceRequestComponent implements OnInit {
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
  maintenanceDetails: Maintenancecompletion;
  garageDetails: RequestMaintenance;
  garages: Garage[];
  vehiclesGarage: Garage;
  garageName: string;
  garageLocation: string;
  garagePhone: string;

  constructor(
    private officerService:OfficerService,
    private router:Router,
    private alert:AlertService,
    private requestService:RequestMaintenanceService,
    private service:IncityRequestService,



  ) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("role")=="Senior Transport Officer"){
      this.getMyMaintenanceRequests();
      this.director = sessionStorage.getItem("directorate");
      this.username = sessionStorage.getItem("username");
      this.getServiceMaintenanceType();
      this.getTyresMaintenanceType();
      if(sessionStorage.getItem("updated")!=null){
        this.alert.sucessAlert(sessionStorage.getItem("updated"));
        sessionStorage.removeItem("updated");
     }
    }else{
      this.router.navigate(['/home']);
    }
  }

            //To display vehicles whose service millages are due on data tables
            public getMyMaintenanceRequests():void{
              this.officerService.getAllOfMyRequest().subscribe((ret:RequestMaintenance[])=>{
                this.mainRequests = ret; 
                console.log(ret);
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

              //To get service maintenance types 
      getServiceMaintenanceType(){
        this.officerService.getMaintenanceTypes().subscribe(
          (res:MaintenanceType[])=>{
             this.serviceMaintenanceType = res;
          },
          (error:HttpErrorResponse)=>{}
        );
    }
          //To get tyres maintenance types 
          getTyresMaintenanceType(){
            this.officerService.getTyresMaintenanceTypes().subscribe(
              (res:MaintenanceType[])=>{
                 this.tyresMaintenanceType = res;
              },
              (error:HttpErrorResponse)=>{}
            );
        }
    EditRequestServiceMaintenance(editRequest:NgForm){
       this.officerService.updateServiceRequest(editRequest.value).subscribe(
        (ret:RequestMaintenance)=>{
          //this.alert.sucessAlert("Request Successfully Updated");
             sessionStorage.setItem("updated", "Request Successfully Updated");
             window.location.reload();
        },
        (error:HttpErrorResponse)=>{
            this.alert.errorAlert("Server Error");
        }
       );

    }
    whatType(maintType:string){
      this.officerService.whatType(maintType).subscribe(
        (ret)=>{
          this.returnValue = ret.mainInterval;          
        },
        (error:HttpErrorResponse)=>{
          
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

          getGarageDetails(id:number){
                this.requestService.getGarageDetails(id).subscribe(
                  (ret:Garage)=>{
                    this.vehiclesGarage = ret;
                  },
                  ()=>{}
                );
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
       
         this.whatType(this.requistionForm.maintenanceType);
        
        console.log(this.myType);
         button.setAttribute('data-target', '#maintenanceRequestModal');
    }
    if (mode === 'view') {
      //this.details = vehicle;
      // technicalBy
      // this.isMaintained(request.id);
      if(request.technicalBy!=null){
        this.isMaintained(request.id);
        this.garageDetails = request;
        this.getGarageDetails(request.id);
        // this.vehiclesGarage = this.garages.filter(x => x.id === this.garageDetails.garage);
        // this.garageName = this.vehiclesGarage[0].name;
        // this.garageLocation = this.vehiclesGarage[0].location;
        // this.garagePhone = this.vehiclesGarage[0].phone;
      }else{
        this.garageDetails = request;
      }

      button.setAttribute('data-target', '#detailsMaintenanceModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
