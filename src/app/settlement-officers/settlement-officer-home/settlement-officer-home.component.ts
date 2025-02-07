import { Component, OnInit } from '@angular/core';
import { SettleAdvancePaymentService } from '../settle-advance-payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settlement-officer-home',
  templateUrl: './settlement-officer-home.component.html',
  styleUrls: ['./settlement-officer-home.component.css']
})
export class SettlementOfficerHomeComponent implements OnInit {
  numberOfRequests: number;

  constructor(
    private settlementService:SettleAdvancePaymentService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getNoOfRequests();
  }
  getNoOfRequests(){
    this.settlementService.getNoOfRequests().subscribe(
      (res:number)=>{
        this.numberOfRequests = res;
        //console.log(res);
      },
      ()=>{}
    );
  }
}
