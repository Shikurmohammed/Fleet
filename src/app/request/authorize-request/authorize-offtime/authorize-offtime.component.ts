import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { RequesterGuard } from 'src/app/guards/requester.guard';
import { OffTimeRequest } from 'src/app/types/offTimeRequest';
import { AuthorizeRequestService } from '../authorize-request.service';
import { RequestService } from '../../request-home/request.service';

@Component({
  selector: 'app-authorize-offtime',
  templateUrl: './authorize-offtime.component.html',
  styleUrls: ['./authorize-offtime.component.css'],
})
export class AuthorizeOfftimeComponent implements OnInit {
  delegated: string;
  constructor(
    private authorizerService: AuthorizeRequestService,
    private route: Router,
    private alert: AlertService,
    private requesterGuard: RequesterGuard,
    private requesterService:RequestService
  ) {}

  offTimeRequests: any = [];
  public offTimeAuthorize: OffTimeRequest | undefined;
  public rejectOffTime: OffTimeRequest | undefined;
  public detailsOffTime: OffTimeRequest | undefined;
  ngOnInit(): void {
       this.isDelegated();
        if (
      sessionStorage.getItem('role') == 'Request Authorizer' ||
      (sessionStorage.getItem('delegated') == '1' &&
        this.requesterGuard.canActivate())
    ) {
      this.getOffTimeRequestsOnDataTable();
    } else {
      this.route.navigate(['/home']);
    }
  }
  director: any = sessionStorage.getItem('directorate');
  isDelegated():any{
    this.requesterService.isDelegated(sessionStorage.getItem("username")).subscribe(
    (res:any)=>{   
      this.delegated = res;
      if(sessionStorage.getItem('role')=='Requester' && res=='0'){
        window.location.reload();
      }
    },
    (error:HttpErrorResponse)=>{
      
    }
   );
}
  //To display offtime requests by user's directorate on data tables
  public getOffTimeRequestsOnDataTable(): void {
    this.authorizerService
      .getOffTimeRequests(this.director)
      .subscribe((ret: OffTimeRequest[]) => {
        this.offTimeRequests = ret;
        console.log(this.offTimeRequests);
        setTimeout(() => {
          $('#OfftimeDataTable').DataTable({
            pagingType: 'full_numbers',
            pageLength: 5,
            autoWidth: false,
            retrieve: true,
            processing: true,
            lengthMenu: [5, 10, 25],
            order: [[1, 'asc']],
          });
        }, 1);
      });
  }

  //This will authorize offtime request
  public authorizeOfftimeRequest(offtime: OffTimeRequest) {
    var approver = sessionStorage.getItem('username');
    offtime.authorizedBy = approver!;
    this.authorizerService.authorizeOffTimeRequests(offtime).subscribe(
      (ret: OffTimeRequest) => {
        this.alert.sucessAlert(
          'You Have Successfully Authorized Off-time Request By ' +
            offtime.reqBy
        );
        this.getOffTimeRequestsOnDataTable();
      },
      (error: HttpErrorResponse) => {
        this.alert.errorAlert('Server Error');
      }
    );
  }
  //This will reject offtime request
  public onRejectOfftimeRequest(offtime: OffTimeRequest) {
    var approver = sessionStorage.getItem('username');
    offtime.authorizedBy = approver!;
    console.log(offtime);
    this.authorizerService.rejectOffTimeRequests(offtime).subscribe(
      (ret: OffTimeRequest) => {
        this.alert.sucessAlert(
          'You Have Successfully Rejected Off-time Request By ' + offtime.reqBy
        );
        this.getOffTimeRequestsOnDataTable();
      },
      (error: HttpErrorResponse) => {
        this.alert.errorAlert('Server Error');
      }
    );
  }

  //This will control offtime  modals
  public onOpenModal(offtime: OffTimeRequest, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'authorizeOffTime') {
      this.offTimeAuthorize = offtime;
      button.setAttribute('data-target', '#authorizeOffTimeRequestModal');
    }
    if (mode === 'rejectOffTime') {
      this.rejectOffTime = offtime;
      button.setAttribute('data-target', '#rejectOffTimeRequestModal');
    }
    if (mode === 'view') {
      this.detailsOffTime = offtime;
      button.setAttribute('data-target', '#detailsOffTimeRequestModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
