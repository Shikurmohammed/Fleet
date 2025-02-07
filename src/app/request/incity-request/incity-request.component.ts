import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { InCityRequest } from 'src/app/types/in-city-request';
import { IncityRequestService } from './incity-request.service';

@Component({
  selector: 'app-incity-request',
  templateUrl: './incity-request.component.html',
  styleUrls: ['./incity-request.component.css']
})

export class IncityRequestComponent implements OnInit {
  direct:any;
  userName:any;
  incity: InCityRequest= new InCityRequest();
  id: any;
  actionbtn: any;
  from:any;
  to:any;
  lastfrom:any;
  lastto:any;
  noOfDays:any;
  currentDate:string;
  

  constructor(
    private inCityRequestServicce:IncityRequestService,
    private routes: ActivatedRoute,
    private router:Router,
    private alert:AlertService
    ) {}

  ngOnInit(): void {
    this.actionbtn="Create Request";
    this.direct =  sessionStorage.getItem('directorate');
    this.userName = sessionStorage.getItem('username');
    this.id = this.routes.snapshot.params['id'];
    this.currentDate=new Date().toISOString().substring(0,10);

    // this.inCityRequestServicce.getRequestByID(this.id).subscribe(dat=>{
    //   this.incity=dat;

    // },
    // error=>console.log(error));
    
    // if(this.id !=null){
    //   this.actionbtn = "Update Request";
    // }
    
  }


  getDateFrom(datefrom:any)
  {
    this.from = datefrom.target.value;
    this.lastfrom = new Date(this.from).getTime();
    if(this.incity.dateTo!=null){
      this.lastto=new Date(this.incity.dateTo).getTime();
      this.noOfDays = (Math.ceil((this.lastto-this.lastfrom)/(1000*3600*24))) +1;
    }
  }


  getDateTo(dateto:any)
  {
    this.to=dateto.target.value;
    this.lastto=new Date(this.to).getTime();
    if(this.incity.id!=null){
      this.lastfrom=new Date(this.incity.dateFrom).getTime();
      this.noOfDays = (Math.floor((this.lastto-this.lastfrom)/(1000*3600*24)))+1;
    }else{
      this.noOfDays = ((this.lastto-this.lastfrom)/(1000*3600*24))+1;
    }

  }

  
  getFrom(){
    this.lastfrom=new Date(this.incity.dateFrom).getTime();
  }

  incityRequest(addForm: NgForm) {
    if(this.id==null){
      this.inCityRequestServicce.inCityRequestMethod(addForm.value).subscribe({
        next:()=>{
          this.alert.sucessAlert("Request Successfully Created");
          this.router.navigate(['viewincityrequest']);
        },
        error:()=>{
          this.alert.errorAlert("Server Error");
        }
        
      });
         
    }
    else{
     this.inCityRequestServicce.updateinCityRequest(this.id,this.incity).subscribe({
      next:()=>{
        this.alert.sucessAlert("Request Successfully Updated");
        this.router.navigate(['viewincityrequest']);
      },
      error:()=>{
        this.alert.errorAlert("Server Error");
      }
    } );
    }
    
  }
}
