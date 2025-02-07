import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/alert.service';
import { Maintenancecompletion } from 'src/app/types/maintenancecompletion';
import { GsAuthService } from '../gs-auth.service';
import { MechanicGuard } from 'src/app/guards/mechanic.guard';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/request/request-home/request.service';

@Component({
  selector: 'app-maint-completion',
  templateUrl: './maint-completion.component.html',
  styleUrls: ['./maint-completion.component.css'],
})
export class MaintCompletionComponent implements OnInit {
  delegated: any;
  constructor(
    private gsService: GsAuthService,
    private alertService: AlertService,
    private mechanicGuard:MechanicGuard,
    private route:Router,
    private requesterService:RequestService
  ) {}

  public vehiclesSubmmitted: any = [];
  public vehicleAuthorize: Maintenancecompletion | undefined;
  public requestDetails: Maintenancecompletion | undefined;

  ngOnInit(): void {
    this.isDelegated();
    if(sessionStorage.getItem("role")=="GS Approver"
    || (sessionStorage.getItem("delegated") == '1') && this.mechanicGuard.canActivate()
   ){
    this.getVehiclesSubmittedOnDataTable();
  }else{
     this.route.navigate(['/home']);
   }
        if(sessionStorage.getItem("updated")!=null){
          this.alertService.sucessAlert(sessionStorage.getItem("updated"));
          sessionStorage.removeItem("updated");
   }
  }
  isDelegated():any{
    this.requesterService.isDelegated(sessionStorage.getItem("username")).subscribe(
    (res:any)=>{   
      this.delegated = res;
      if(sessionStorage.getItem('role')=='GS Mechanic' && res=='0'){
        window.location.reload();
      }
    },
    (error:HttpErrorResponse)=>{
      
    }
   );
  }
  public getVehiclesSubmittedOnDataTable(): void {
    this.gsService
      .getVehiclesSubmitted()
      .subscribe((ret: Maintenancecompletion[]) => {
        this.vehiclesSubmmitted = ret;

        setTimeout(() => {
          $('#VerifiedDataTable').DataTable({
            pagingType: 'full_numbers',
            pageLength: 5,
            autoWidth: false,
            retrieve: true,
            processing: true,
            lengthMenu: [5, 10, 25],
            order: [[1, 'desc']],
          });
        }, 1);
      });
  }

  public authorizeSubmittedVehicles(request: Maintenancecompletion) {
    var approver = sessionStorage.getItem('username');
    request.authorizedBy = approver!;
    this.gsService.authorizeSubmittedVehicles(request).subscribe(
      (ret: Maintenancecompletion) => {
        sessionStorage.setItem("updated", 'You Have Successfully Authorized Vehicle Maintenance Submission.');
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        this.alertService.errorAlert('Server Error');
      }
    );
  }

  public onOpenModal(request: Maintenancecompletion, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'authorizeRequest') {
      this.vehicleAuthorize = request;
      button.setAttribute('data-target', '#authorizeMaintCompletionModal');
    }

    if (mode === 'view') {
      this.requestDetails = request;
      button.setAttribute('data-target', '#detailsMaintCompletionModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
