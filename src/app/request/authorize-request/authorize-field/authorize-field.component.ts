import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { RequesterGuard } from 'src/app/guards/requester.guard';
import { Fieldrequest } from 'src/app/types/fieldrequest';
import { AuthorizeRequestService } from '../authorize-request.service';
import { RequestService } from '../../request-home/request.service';

@Component({
  selector: 'app-authorize-field',
  templateUrl: './authorize-field.component.html',
  styleUrls: ['./authorize-field.component.css']
})
export class AuthorizeFieldComponent implements OnInit {
  delegated: any;

  constructor(
    private authorizerService:AuthorizeRequestService,
    private route:Router,
    private alert:AlertService,
    private requesterGuard:RequesterGuard,
    private requesterService:RequestService
  ) { }
  
   fieldRequests:any = [];

   public fieldAuthorize: Fieldrequest | undefined;
   public fieldReject: Fieldrequest | undefined;
   public fieldDetails:Fieldrequest | undefined;
  ngOnInit(): void {
    this.isDelegated();
    if(sessionStorage.getItem("role")=="Request Authorizer"
     || (sessionStorage.getItem("delegated") == '1') && this.requesterGuard.canActivate()
    ){
      this.getFieldRequestsOnDataTable();
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
    // This method will display field requests
    public getFieldRequestsOnDataTable():void{
      this.authorizerService.getFieldRequests(this.director).subscribe((ret:Fieldrequest[] )=>{
        this.fieldRequests = ret; 
        console.log(this.fieldRequests);
        setTimeout(()=>{                      
          $('#FieldDataTable').DataTable( {
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

   //This will authorize field request
   public authorizeFieldRequest(field:Fieldrequest){
    var approver = sessionStorage.getItem("username");
    field.authorizedBy = approver!;
  this.authorizerService.authorizeFieldRequests(field).subscribe(
    (ret:Fieldrequest)=>{
      this.alert.sucessAlert("You have successfully authorized field request by "+field.requestedBy);
      this.getFieldRequestsOnDataTable();
    },
    (error:HttpErrorResponse)=>{
          this.alert.errorAlert("Server Error");
    }
  );
}
  //This will reject field request
  public onRejectFieldRequest(field:Fieldrequest){
    var approver = sessionStorage.getItem("username");
    field.authorizedBy = approver!;
    console.log(field);
  this.authorizerService.rejectFieldRequests(field).subscribe(
    (ret:Fieldrequest)=>{
      this.alert.sucessAlert("You have successfully rejected field request by "+field.requestedBy);
      this.getFieldRequestsOnDataTable();
    },
    (error:HttpErrorResponse)=>{
          this.alert.errorAlert("Server Error");
    }
  );
}


   //This will control field request  modals
   public onOpenFieldModal(field: Fieldrequest, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'authorizeField') {
      this.fieldAuthorize = field;
      button.setAttribute('data-target', '#authorizeFieldRequestModal');
    }
    if (mode === 'rejectField') {
      this.fieldReject = field;
      button.setAttribute('data-target', '#rejectFieldRequestModal');
    }
    if(mode === 'view'){
       this.fieldDetails = field;
       button.setAttribute('data-target', '#detailsFieldRequestModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
