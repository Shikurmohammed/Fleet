import { Component, OnInit } from '@angular/core';
import { CheckService } from '../check.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { OffTimeRequest } from 'src/app/types/offTimeRequest';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestService } from 'src/app/request/request-home/request.service';
import { DispatcherGuard } from 'src/app/guards/dispatcher.guard';
import { UserService } from 'src/app/user/user.service';
import { DirectorateType } from 'src/app/types/Directorate';

@Component({
  selector: 'app-check-offtime',
  templateUrl: './check-offtime.component.html',
  styleUrls: ['./check-offtime.component.css']
})
export class CheckOfftimeComponent implements OnInit {
  delegated: any;
  directorates: DirectorateType[];
  dir: DirectorateType[];
  directorName: String;

  constructor(
    private checkService:CheckService,
    private route:Router,
    private alert:AlertService,
    private requesterService:RequestService,
    private dispatcherGuard:DispatcherGuard,
    private userService:UserService
  ) {}

  offTimeRequests: any = [];
  public offTimeAuthorize: OffTimeRequest | undefined;
  public rejectOffTime: OffTimeRequest | undefined;
  public detailsOffTime: OffTimeRequest | undefined;
  ngOnInit(): void {
    this.isDelegated();
    if(sessionStorage.getItem("role")=="Senior Transport Officer"
    || (sessionStorage.getItem("delegated") == '1') && this.dispatcherGuard.canActivate()
   ){
    this.getOffTimeRequestsOnDataTable();
  }else{
     this.route.navigate(['/home']);
   }
    if(sessionStorage.getItem("Checked")!=null){
      this.alert.sucessAlert(sessionStorage.getItem("Checked"));
      sessionStorage.removeItem("Checked");
    }
    if(sessionStorage.getItem("officerRejected")!=null){
      this.alert.sucessAlert(sessionStorage.getItem("officerRejected"));
      sessionStorage.removeItem("officerRejected");
    }
    this.getDirectorates();
  }
  director: any = sessionStorage.getItem('directorate');
  isDelegated():any{
    this.requesterService.isDelegated(sessionStorage.getItem("username")).subscribe(
    (res:any)=>{   
      this.delegated = res;
      if(sessionStorage.getItem('role')=='Dispatcher' && res=='0'){
        window.location.reload();
      }
    },
    (error:HttpErrorResponse)=>{
      
    }
   );
  }
    //Inorder to get directorates
    public getDirectorates() {
      this.userService.getDirectorate().subscribe(
        (response: DirectorateType[]) => {
          this.directorates = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  //To display offtime requests by user's directorate on data tables
  public getOffTimeRequestsOnDataTable(): void {
    this.checkService
      .getOffTimeRequests()
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
    offtime.approvedBy = approver!;
    this.checkService.authorizeOffTimeRequests(offtime).subscribe(
      (ret: OffTimeRequest) => {
        sessionStorage.setItem("Checked",'You Have Successfully Approved Off-time Request By ' +offtime.reqBy);
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        this.alert.errorAlert('Server Error');
      }
    );
  }
  //This will reject offtime request
  public onRejectOfftimeRequest(offtime: OffTimeRequest) {
    var approver = sessionStorage.getItem('username');
    offtime.approvedBy = approver!;
    this.checkService.rejectOffTimeRequests(offtime).subscribe(
      (ret: OffTimeRequest) => {
        sessionStorage.setItem("officerRejected",'You Have Successfully Rejected Off-time Request By ' + offtime.reqBy);
        window.location.reload();
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
       this.dir = this.directorates.filter(x => x.id === this.detailsOffTime.directorate);
        this.directorName = this.dir[0].directorate;
      button.setAttribute('data-target', '#detailsOffTimeRequestModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
