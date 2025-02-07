import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { RequestMaintenance } from 'src/app/types/request-maintenance';
import { GsAuthService } from '../gs-auth.service';
import { RequestService } from 'src/app/request/request-home/request.service';
import { MechanicGuard } from 'src/app/guards/mechanic.guard';

@Component({
  selector: 'app-verified-requests',
  templateUrl: './verified-requests.component.html',
  styleUrls: ['./verified-requests.component.css'],
})
export class VerifiedRequestsComponent implements OnInit {
  delegated: any;
  constructor(
    private gsService: GsAuthService,
    private alert: AlertService,
    private mechanicGuard:MechanicGuard,
    private route:Router,
    private requesterService:RequestService
  ) {}

  verifiedRequests: any = [];
  public vehicleAuthorize: RequestMaintenance | undefined;
  public vehicleReject: RequestMaintenance | undefined;
  public requestDetails: RequestMaintenance | undefined;

  ngOnInit(): void {
    this.isDelegated();
    if(sessionStorage.getItem("role")=="GS Approver"
    || (sessionStorage.getItem("delegated") == '1') && this.mechanicGuard.canActivate()
   ){
    this.getVerifiedRequestsOnDataTable();
  }else{
     this.route.navigate(['/home']);
   }
    if(sessionStorage.getItem("authorizedVerified")!=null){
      this.alert.sucessAlert(sessionStorage.getItem("authorizedVerified"));
      sessionStorage.removeItem("authorizedVerified");
   }
   if(sessionStorage.getItem("rejectedVerified")!=null){
    this.alert.sucessAlert(sessionStorage.getItem("rejectedVerified"));
    sessionStorage.removeItem("rejectedVerified");
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
  public getVerifiedRequestsOnDataTable(): void {
    this.gsService
      .getVerifiedRequests()
      .subscribe((ret: RequestMaintenance[]) => {
        this.verifiedRequests = ret;
        console.log(this.verifiedRequests);
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

  public authorizeVerifiedRequest(request: RequestMaintenance) {
    var approver = sessionStorage.getItem('username');
    request.authorizedBy = approver!;
    this.gsService.authorizeVerifiedRequests(request).subscribe(
      (ret: RequestMaintenance) => {

        sessionStorage.setItem("authorizedVerified",'You Have Successfully Authorized Vehicle Maintenance Request By '+request.requestedBy );
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        this.alert.errorAlert('Server Error');
      }
    );
  }
  public onRejectVerifiedRequest(request: RequestMaintenance) {
    var approver = sessionStorage.getItem('username');
    request.authorizedBy = approver!;

    this.gsService.rejectVerifiedRequests(request).subscribe(
      (ret: RequestMaintenance) => {
        
        sessionStorage.setItem("rejectedVerified",
        'You Have Successfully Rejected Vehicle Maintenance Request By ' +
        request.requestedBy );
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        this.alert.errorAlert('Server Error');
      }
    );
  }

  public onOpenModal(request: RequestMaintenance, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'authorizeRequest') {
      this.vehicleAuthorize = request;
      button.setAttribute('data-target', '#authorizeMaintRequestModal');
    }
    if (mode === 'rejectRequest') {
      this.vehicleReject = request;
      button.setAttribute('data-target', '#rejectMaintRequestModal');
    }
    if (mode === 'view') {
      this.requestDetails = request;
      button.setAttribute('data-target', '#detailsMaintRequestModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
