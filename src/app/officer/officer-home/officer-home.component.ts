import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OfficerService } from './officer.service';

@Component({
  selector: 'app-officer-home',
  templateUrl: './officer-home.component.html',
  styleUrls: ['./officer-home.component.css']
})
export class OfficerHomeComponent implements OnInit {
  numOfServiceMillageDue: number;
  numOfTyresMillageDue: number;
  numOfInsuranceDue: number;
  numOfOfftime: number;
  numFieldReq: number;

  constructor(
    private officerService:OfficerService,
    private router:Router
  ) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("role")=="Senior Transport Officer"){
      this.getNoOfServiceMillageDue();
      this.getNoOfTyresMillageDue();
      this.getNoOfInsuranceDue();
      this.getNoFieldReq();
      this.getNoOfOfftimeReq();
      if(sessionStorage.getItem('home')!=null){
        window.location.reload();
        sessionStorage.removeItem("home");
      }
    }else{
      this.router.navigate(['/home']);
    }
  }

  getNoOfServiceMillageDue(){
    this.officerService.getNoOfServiceMillageDue().subscribe(
      (res:number)=>{
        this.numOfServiceMillageDue = res;
      },
      ()=>{}
    );
  }

  getNoOfTyresMillageDue(){
    this.officerService.getNoOfTyreMillageDue().subscribe(
      (res:number)=>{
        this.numOfTyresMillageDue = res;
      },
      ()=>{}
    );
  }

  getNoOfInsuranceDue(){
    this.officerService.getNoOfInsuranceDue().subscribe(
      (res:number)=>{
        this.numOfInsuranceDue = res;
      },
      (error:HttpErrorResponse)=>{
        error.message;
      }
    );
  }
  getNoOfOfftimeReq(){
    this.officerService.getNoOfOfftimeReq().subscribe(
      (res:number)=>{
        this.numOfOfftime = res;
      },
      (error:HttpErrorResponse)=>{
        error.message;
      }
    );
  }
  getNoFieldReq(){
    this.officerService.getNoFieldReq().subscribe(
      (res:number)=>{
        this.numFieldReq = res;
      },
      (error:HttpErrorResponse)=>{
        error.message;
      }
    );
  }

}
