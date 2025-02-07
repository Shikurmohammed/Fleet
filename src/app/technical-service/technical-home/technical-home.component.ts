import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TechnicalServiceService } from '../technical-service.service';

@Component({
  selector: 'app-technical-home',
  templateUrl: './technical-home.component.html',
  styleUrls: ['./technical-home.component.css']
})
export class TechnicalHomeComponent implements OnInit {
  numOfAuthorized: number;
  numOfMaintenance: number;
  numOfGarage:number;

  constructor(
    private router:Router,
    private technicalService:TechnicalServiceService
  ) { }

  ngOnInit(): void {
    this.getNoOfAuthorizedrequest();
    this.getNoOfUnderMaintenance();
    this.getNoOfGarage();
    if(sessionStorage.getItem('home')!=null){
      window.location.reload();
      sessionStorage.removeItem("home");
    }
  }

  getNoOfAuthorizedrequest(){
    this.technicalService.getNoOfAuthorizedrequest().subscribe(
      (res:number)=>{
        this.numOfAuthorized = res;
      },
      ()=>{}
    );
  }
  getNoOfUnderMaintenance(){
    this.technicalService.getNoOfUnderMaintenance().subscribe(
      (res:number)=>{
        this.numOfMaintenance = res;
      },
      ()=>{}
    );
  }

  getNoOfGarage(){
    this.technicalService.getNoOfGarage().subscribe(
      (res:number)=>{
        this.numOfGarage = res;
      },
      ()=>{}
    );
  }

}
