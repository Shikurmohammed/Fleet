import { Component, OnInit } from '@angular/core';
import { SettleAdvancePaymentService } from '../settle-advance-payment.service';
import { AdvancePayment } from 'src/app/types/AdvancePayment';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from 'src/app/alert.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settle-advance-payment',
  templateUrl: './settle-advance-payment.component.html',
  styleUrls: ['./settle-advance-payment.component.css']
})
export class SettleAdvancePaymentComponent implements OnInit {
  advancePaymentRequests: AdvancePayment[];
  grantAdvance: AdvancePayment;
  advanceReject: AdvancePayment;
  username: string;

  constructor(
    private settlementOfficerService:SettleAdvancePaymentService,
    private alert:AlertService,
    private router:Router
  ) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("granted")!=null){
      this.alert.sucessAlert(sessionStorage.getItem("granted"));
      sessionStorage.removeItem("granted");
     }
     if(sessionStorage.getItem("advanceRejected")!=null){
      this.alert.sucessAlert(sessionStorage.getItem("advanceRejected"));
      sessionStorage.removeItem("advanceRejected");
     }
    this.getAdvancePaymentRequestsOnDataTable();
    this.username = sessionStorage.getItem("username");

  }

      // This method will display advance payment requests
      public getAdvancePaymentRequestsOnDataTable():void{
        this.settlementOfficerService.getAdvancePaymentRequests().subscribe((ret:AdvancePayment[] )=>{
          this.advancePaymentRequests = ret; 
         // console.log(this.advancePaymentRequests);
          setTimeout(()=>{                      
            $('#AdvancePaymentTable').DataTable( {
              pagingType: 'full_numbers',
              pageLength: 5,
              autoWidth:false,
              retrieve: true,
              processing: true,
              lengthMenu : [5, 10, 25],
          } );
          }, 1);      
      });
  } 
    //  Beginning of granting advance payment 
   public grantAdvanceRequest(advance:AdvancePayment){
      this.settlementOfficerService.grantAdvanceRequest(advance).subscribe(
           (ret:AdvancePayment)=>{
            sessionStorage.setItem("granted", 'Advance Payment Successfully Granted');
            window.location.reload();
           },
           (error:HttpErrorResponse)=>{
             this.alert.errorAlert("Server Error");
           }
      );
    }
    //End of grant
     //Beginning of rejection
     onRejectAdvanceRequest(advanceForm:AdvancePayment){
       this.settlementOfficerService.rejectAdvancePayment(advanceForm).subscribe(
        (ret:AdvancePayment)=>{
          sessionStorage.setItem("advanceRejected", 'Advance Payment Successfully Rejected');
          window.location.reload();
        },
        (errror:HttpErrorResponse)=>{
          this.alert.errorAlert("Server Error");
        }
       );
     }
    //  End of rejection
    printDetail(id:number){
      this.router.navigate(['printSettlement',id]);
     }
     //This will control field request  modals
     public onOpenModal(advance: AdvancePayment, mode: string): void {
      advance.settledBy = this.username;
      const container = document.getElementById('main-container');
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      if (mode === 'grantAdvance') {
        this.grantAdvance = advance;
        button.setAttribute('data-target', '#grantAdvanceRequestModal');
      }
      if (mode === 'rejectAdvance') {
        this.advanceReject = advance;
        button.setAttribute('data-target', '#rejectAdvanceModal');
      }
      container?.appendChild(button);
      button.click();
    }

}
