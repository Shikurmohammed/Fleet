import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OffTimeRequest } from 'src/app/types/offTimeRequest';
import { InCityRequest } from 'src/app/types/in-city-request';
import {Fieldrequest} from 'src/app/types/fieldrequest';
import { AuthorizeRequestService } from './authorize-request.service';

@Component({
  selector: 'app-authorize-request',
  templateUrl: './authorize-request.component.html',
  styleUrls: ['./authorize-request.component.css']
})
export class AuthorizeRequestComponent implements OnInit {

  constructor(
    private authorizerService:AuthorizeRequestService,
    private route:Router
  ) { }
  
   offTimeRequests:any = [];
   inCityRequests:any = [];
   fieldRequests:any = [];
   public offTimeAuthorize: OffTimeRequest | undefined;
   public rejectOffTime: OffTimeRequest | undefined;
   public inCityAuthorize: InCityRequest | undefined;
   public inCityReject: InCityRequest | undefined;
   public fieldAuthorize: Fieldrequest | undefined;
   public fieldReject: Fieldrequest | undefined;
  ngOnInit(): void {
    if(sessionStorage.getItem("role")=="Request Authorizer"){
      this.getOffTimeRequestsOnDataTable();
      this.getInCityRequestsOnDataTable();
      this.getFieldRequestsOnDataTable();
      if(sessionStorage.getItem('home')!=null){
        window.location.reload();
        sessionStorage.removeItem("home");
      }
    }else{
      this.route.navigate(['/home']);
    }
  }
         director:any=sessionStorage.getItem("directorate");
      //To display offtime requests by user's directorate on data tables
      public getOffTimeRequestsOnDataTable():void{
       
        this.authorizerService.getOffTimeRequests(this.director).subscribe((ret: OffTimeRequest[])=>{
          this.offTimeRequests = ret; 
          console.log(this.offTimeRequests);
          setTimeout(()=>{                      
            $('#OfftimeDataTable').DataTable( {
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
   //This will authorize offtime request
   public authorizeOfftimeRequest(offtime:OffTimeRequest){
        var approver = sessionStorage.getItem("username");
        offtime.authorizedBy = approver!;
      this.authorizerService.authorizeOffTimeRequests(offtime).subscribe(
        (ret:OffTimeRequest)=>{
          alert("You have successfully authorized off-time request by "+offtime.reqBy);
          this.getOffTimeRequestsOnDataTable();
        },
        (error:HttpErrorResponse)=>{
              alert(error.message);
        }
      );
   }
   //This will reject offtime request
   public onRejectOfftimeRequest(offtime:OffTimeRequest){
    var approver = sessionStorage.getItem("username");
    offtime.authorizedBy = approver!;
    console.log(offtime);
  this.authorizerService.rejectOffTimeRequests(offtime).subscribe(
    (ret:OffTimeRequest)=>{
      alert("You have successfully rejected off-time request by "+offtime.reqBy);
      this.getOffTimeRequestsOnDataTable();
    },
    (error:HttpErrorResponse)=>{
          alert(error.message);
    }
  );
}
   //This will authorize incity request
   public authorizeInCityRequest(incity:InCityRequest){
    var approver = sessionStorage.getItem("username");
    incity.authorizedBy = approver!;
  this.authorizerService.authorizeInCityRequests(incity).subscribe(
    (ret:InCityRequest)=>{
      alert("You have successfully authorized Incity request by "+incity.requestBy);
      this.getInCityRequestsOnDataTable();
    },
    (error:HttpErrorResponse)=>{
          alert(error.message);
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
      alert("You have successfully rejected off-time request by "+incity.requestBy);
      this.getInCityRequestsOnDataTable();
    },
    (error:HttpErrorResponse)=>{
          alert(error.message);
    }
  );
}
   //This will authorize field request
   public authorizeFieldRequest(field:Fieldrequest){
    var approver = sessionStorage.getItem("username");
    field.authorizedBy = approver!;
  this.authorizerService.authorizeFieldRequests(field).subscribe(
    (ret:Fieldrequest)=>{
      alert("You have successfully authorized field request by "+field.requestedBy);
      this.getFieldRequestsOnDataTable();
    },
    (error:HttpErrorResponse)=>{
          alert(error.message);
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
      alert("You have successfully rejected field request by "+field.requestedBy);
      this.getFieldRequestsOnDataTable();
    },
    (error:HttpErrorResponse)=>{
          alert(error.message);
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
    container?.appendChild(button);
    button.click();
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
    container?.appendChild(button);
    button.click();
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
    container?.appendChild(button);
    button.click();
  }


}
