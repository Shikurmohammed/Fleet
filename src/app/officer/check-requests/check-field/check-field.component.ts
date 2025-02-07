import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Fieldrequest } from 'src/app/types/fieldrequest';
import { CheckService } from '../check.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { RequestService } from 'src/app/request/request-home/request.service';
import { DispatcherGuard } from 'src/app/guards/dispatcher.guard';

@Component({
  selector: 'app-check-field',
  templateUrl: './check-field.component.html',
  styleUrls: ['./check-field.component.css']
})
export class CheckFieldComponent implements OnInit {
  delegated: any;

  constructor(
    private checkService:CheckService,
    private route:Router,
    private alert:AlertService,
    private requesterService:RequestService,
    private dispatcherGuard:DispatcherGuard
  ) { }
  
   fieldRequests:any = [];

   public fieldAuthorize: Fieldrequest | undefined;
   public fieldReject: Fieldrequest | undefined;
   public fieldDetails:Fieldrequest | undefined;
  ngOnInit(): void {
    this.isDelegated();
    if(sessionStorage.getItem("role")=="Senior Transport Officer"
    || (sessionStorage.getItem("delegated") == '1') && this.dispatcherGuard.canActivate()
   ){
    this.getFieldRequestsOnDataTable();
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
  }
         director:any=sessionStorage.getItem("directorate");
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
    // This method will display field requests
    public getFieldRequestsOnDataTable():void{
      this.checkService.getFieldRequests().subscribe((ret:Fieldrequest[] )=>{
        this.fieldRequests = ret; 
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
    field.approvedBy = approver!;
  this.checkService.authorizeFieldRequests(field).subscribe(
    (ret:Fieldrequest)=>{
      sessionStorage.setItem("Checked","You have successfully approved field request by "+field.requestedBy);
      window.location.reload();
    },
    (error:HttpErrorResponse)=>{
          this.alert.errorAlert("Server Error");
    }
  );
}
  //This will reject field request
  public onRejectFieldRequest(field:Fieldrequest){
    var approver = sessionStorage.getItem("username");
    field.approvedBy = approver!;
  this.checkService.rejectFieldRequests(field).subscribe(
    (ret:Fieldrequest)=>{
      sessionStorage.setItem("officerRejected","You have successfully rejected field request by "+field.requestedBy);
      window.location.reload();
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
