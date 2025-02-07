import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { RequesterGuard } from 'src/app/guards/requester.guard';
import { InCityRequest } from 'src/app/types/in-city-request';
import { AuthorizeRequestService } from '../authorize-request.service';
import { RequestService } from '../../request-home/request.service';

@Component({
  selector: 'app-authorize-incity',
  templateUrl: './authorize-incity.component.html',
  styleUrls: ['./authorize-incity.component.css']
})
export class AuthorizeIncityComponent implements OnInit {
  delegated: any;

  constructor(
    private authorizerService:AuthorizeRequestService,
    private route:Router,
    private alert:AlertService,
    private requesterGuard:RequesterGuard,
    private requesterService:RequestService
  ) { }
  
   inCityRequests:any = [];

   public inCityAuthorize: InCityRequest | undefined;
   public inCityReject: InCityRequest | undefined;
   public details:InCityRequest | undefined;
  ngOnInit(): void {
    this.isDelegated();
    if(sessionStorage.getItem("role")=="Request Authorizer"
    || (sessionStorage.getItem("delegated") == '1') && this.requesterGuard.canActivate()){
      this.getInCityRequestsOnDataTable();

    }else{
      this.route.navigate(['/home']);
    }
  }
         director:any=sessionStorage.getItem("directorate");
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
        //To display incity requests by user's directorate on data tables
        public getInCityRequestsOnDataTable():void{
          this.authorizerService.getInCityRequests(this.director).subscribe((ret:InCityRequest[] )=>{
            this.inCityRequests = ret; 
            console.log(this.inCityRequests);
            setTimeout(()=>{                      
              $('#InCityDataTable').DataTable( {
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
 
   //This will authorize incity request
   public authorizeInCityRequest(incity:InCityRequest){
    var approver = sessionStorage.getItem("username");
    incity.authorizedBy = approver!;
  this.authorizerService.authorizeInCityRequests(incity).subscribe(
    (ret:InCityRequest)=>{
      this.alert.sucessAlert("You have successfully authorized Incity request by "+incity.requestBy);
      this.getInCityRequestsOnDataTable();
    },
    (error:HttpErrorResponse)=>{
          this.alert.errorAlert("Server Error");
    }
  );
}
  //This will reject incity request
  public onRejectInCityRequest(incity:InCityRequest){
    var approver = sessionStorage.getItem("username");
    incity.authorizedBy = approver!;
    console.log(incity);
  this.authorizerService.rejectInCityRequests(incity).subscribe(
    (ret:InCityRequest)=>{
      this.alert.sucessAlert("You have successfully rejected Incity request by "+incity.requestBy);
      this.getInCityRequestsOnDataTable();
    },
    (error:HttpErrorResponse)=>{
         this.alert.errorAlert("Server Error");
    }
  );
}


   
   //This will control incity  modals
   public onOpenIncityModal(incity: InCityRequest, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'authorizeInCity') {
      this.inCityAuthorize = incity;
      button.setAttribute('data-target', '#authorizeInCityRequestModal');
    }
    if (mode === 'rejectInCity') {
      this.inCityReject = incity;
      button.setAttribute('data-target', '#rejectInCityRequestModal');
    }
    if (mode === 'view') {
      this.details = incity;
      button.setAttribute('data-target', '#detailsInCityRequestModal');
    }
    container?.appendChild(button);
    button.click();
  }


}
