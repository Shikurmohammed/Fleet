import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MechanicServiceService } from '../mechanic-service.service';

@Component({
  selector: 'app-mechanic-home',
  templateUrl: './mechanic-home.component.html',
  styleUrls: ['./mechanic-home.component.css']
})
export class MechanicHomeComponent implements OnInit {
  numOfUnverified: number;
  numOfVerified: number;
  numOfAuthorized: number;
  numOfCompletionTechnical: number;
  numOfSubmittedMechanic: number;

  constructor(
    private router:Router,
    private mechanicService:MechanicServiceService
  ) { }

  ngOnInit(): void {

    this.getNoOfUnverifiedrequest();
    this.getNoOfVerifiedrequest();
    this.getNoAuthorizedRequest();
    this.getNoCompletionTechnical();
    this.getNoSubmittedMechanic();
    if(sessionStorage.getItem('home')!=null){
      window.location.reload();
      sessionStorage.removeItem("home");
    }
  }
  getNoOfUnverifiedrequest(){
    this.mechanicService.getNoOfUnverifiedrequest().subscribe(
      (res:number)=>{
        this.numOfUnverified = res;
      },
      ()=>{}
    );
  }
  getNoOfVerifiedrequest(){
    this.mechanicService.getNoOfVerifiedrequest().subscribe(
      (res:number)=>{
        this.numOfVerified = res;
      },
      ()=>{}
    );
  }

  getNoAuthorizedRequest(){
    this.mechanicService.getNoAuthorizedRequest().subscribe(
      (res:number)=>{
        this.numOfAuthorized = res;
      },
      ()=>{}
    );
  }

  getNoCompletionTechnical(){
    this.mechanicService.getNoCompletionTechnical().subscribe(
      (res:number)=>{
        this.numOfCompletionTechnical = res;
      },
      ()=>{}
    );
  }

  getNoSubmittedMechanic(){
    this.mechanicService.getNoSubmittedMechanic().subscribe(
      (res:number)=>{
        this.numOfSubmittedMechanic = res;
      },
      ()=>{}
    );
  }


}
