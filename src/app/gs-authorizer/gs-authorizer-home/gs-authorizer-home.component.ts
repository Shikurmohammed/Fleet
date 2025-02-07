import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MechanicServiceService } from 'src/app/mechanic/mechanic-service.service';
import { GsAuthService } from '../gs-auth.service';

@Component({
  selector: 'app-gs-authorizer-home',
  templateUrl: './gs-authorizer-home.component.html',
  styleUrls: ['./gs-authorizer-home.component.css']
})
export class GsAuthorizerHomeComponent implements OnInit {

  numOfVerified: number;
  numOfSubmittedMechanic: number;

  constructor(
    private gsService: GsAuthService,
    private mechanicService:MechanicServiceService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getNoOfVerifiedrequest();
    this.getNoSubmittedMechanic();
    if(sessionStorage.getItem('home')!=null){
      window.location.reload();
      sessionStorage.removeItem("home");
    }
  }
  
  getNoOfVerifiedrequest(){
    this.mechanicService.getNoOfVerifiedrequest().subscribe(
      (res:number)=>{
        this.numOfVerified = res;
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
