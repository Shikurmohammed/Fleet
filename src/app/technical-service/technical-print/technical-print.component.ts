import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { FieldService } from 'src/app/request/field/field.service';
import { awashLogo } from 'src/assets/img/awashlogo';
import { TechnicalServiceService } from '../technical-service.service';
import { RequestMaintenance } from 'src/app/types/request-maintenance';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-technical-print',
  templateUrl: './technical-print.component.html',
  styleUrls: ['./technical-print.component.css']
})
export class TechnicalPrintComponent implements OnInit {
  
  estimatedfuelRequired:any;
     id:any;
    dateToday: string;
    time = new Date();
    intervalId;
    dotval:any;
    private imageData = awashLogo.imageData;
    myDate: Date;
    cValue: any;
  maintenanceReq: RequestMaintenance=new RequestMaintenance();
  kmDifference: number;
   
   
    constructor(
      private router: Router,
      private alert: AlertService,
      private routes: ActivatedRoute,
      private technicalService:TechnicalServiceService
  
    ) { }
  
    ngOnInit(): void {
      this.myDate = new Date()
      this.cValue = formatDate(this.myDate, 'yyyy-MM-dd', 'en-US');
      this.id = this.routes.snapshot.params['id'];
      this.getMaintenanceRequest();
      this.dateToday = new Date().toISOString();
    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);
    }

     getMaintenanceRequest(){
      this.technicalService.getMaintenanceRequest(this.id).subscribe(
        (res:RequestMaintenance)=>{
          this.maintenanceReq = res;
          this.kmDifference = res.kmTechnical-res.previousServiceMilage;
        },
        (error:HttpErrorResponse)=>{
          this.alert.errorAlert("Server Error");
        }
      );
     }

    goBack(){
        this.router.navigate(['maintCompletion']);
    }
    print(){
      window.print();
    }



}
