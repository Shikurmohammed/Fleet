import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
//import { AlertService } from 'ngx-alerts';
import { DirectorateType } from 'src/app/types/Directorate';
import { Fieldrequest } from 'src/app/types/fieldrequest';
import { UserService } from 'src/app/user/user.service';
import { FieldService } from '../field.service';
import { Select2OptionData } from "ng-select2";
import { Options } from "select2";


@Component({
  selector: 'app-vehcilefield-request',
  templateUrl: './vehcilefield-request.component.html',
  styleUrls: ['./vehcilefield-request.component.css']
})
export class VehcilefieldRequestComponent implements OnInit {
  directorates: DirectorateType[] = [];
  dateToday: string;
  director: any;
  username: any;
  id: number;
  request: Fieldrequest = new Fieldrequest();
  actionbtn: any;
  km: number=0;
  contings: number=0;
  totalKM:number=0;
  departDate: any;
  lastdepartureDate: any;
  lastreturnDate: any;
  returnDate:any;
  Time: any;
  noOfdays: any;
  noOfDays: number;
  to: any;

  constructor(
    private userService: UserService,
    private fieldService: FieldService,
    private routes: ActivatedRoute,
    private router: Router,
    private alert:AlertService

    ) {
    this.getDirectorates();
   }

  ngOnInit(): void {
    this.actionbtn="Create Request";
    this.id = this.routes.snapshot.params['id'];
    this.dateToday = new Date().toISOString().substring(0,10);
    this.director = sessionStorage.getItem("directorate");
    this.username = sessionStorage.getItem("username");
    
  }
  // method from abe
  getDateFrom(datefrom:any)
  {
    this.departDate = datefrom.target.value;
    this.lastdepartureDate = new Date(this.departDate).getTime();
    if(this.request.returnDate!=null){
      this.lastreturnDate=new Date(this.request.returnDate).getTime();
      this.noOfDays = (Math.ceil((this.lastreturnDate-this.lastdepartureDate)/(1000*3600*24))) +1;
    }
  }


  getDateTo(dateto:any)
  {
    this.to=dateto.target.value;
    this.lastreturnDate=new Date(this.to).getTime();
      this.noOfDays = ((this.lastreturnDate-this.lastdepartureDate)/(1000*3600*24)) + 1;
  }

  
  getFrom(){
    this.lastreturnDate=new Date(this.request.departureDate).getTime();
  }
  // End of abe


  getKM(km: number){
    this.km = km;
    if(this.request.contingency!=null){
      this.totalKM = ((2*this.km)+(1*this.contings) );
    }
  }
  getContingency(contins: number){
    this.contings = contins;
    this.totalKM = ((2*this.km)+(1*this.contings) );

  }

  public getDirectorates() {
    this.userService.getDirectorate().subscribe(
      (response: DirectorateType[]) => {
        this.directorates = response;
        //console.log(this.directorates);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }
  fieldVehicleRequest(addForm: NgForm) {
    console.log(addForm.value);
    if(this.id == null){
      this.fieldService.sendRequest(addForm.value).subscribe(
        (res:Fieldrequest)=>{
               console.log(res);
               this.alert.sucessAlert("Request Successfully Created")
               this.router.navigate(['/myfieldrequest']);
        },
        (error:HttpErrorResponse)=>{
          this.alert.errorAlert("Server Error");
        }
      );
    }
    else{
      this.fieldService.updateRequest(this.id, addForm.value).subscribe(data=>{
        this.alert.sucessAlert("Request Successfully Updated");
        this.router.navigate(['/myfieldrequest']);
      },
      error=>this.alert.errorAlert("Server Error"));

    }
  }

}
