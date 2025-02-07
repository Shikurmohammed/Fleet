import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { IncityRequestService } from 'src/app/request/incity-request/incity-request.service';
import { Garage } from 'src/app/types/garage';

@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrls: ['./garage.component.css']
})
export class GarageComponent implements OnInit {
  garage:Garage=new Garage();
  exist:boolean;
  telephone:string;
  phoneFound:string;
  id:number;
  actionbtn:any;

  constructor(
    private routes: ActivatedRoute,
    private router:Router,
    private alert:AlertService,
    private service:IncityRequestService
  ) { }



  ngOnInit(): void {
    this.actionbtn="Register"
    this.id = this.routes.snapshot.params['id'];

    this.service.getGarageByID(this.id).subscribe(dat=>{
      this.garage=dat;
    },
    error=>console.log(error));

    if(this.id !=null){
      this.actionbtn = "Update";
    }
  }


  addGarage(add:NgForm)
  {
    if(this.id==null){
    this.service.registerGarage(add.value).subscribe({
      next:()=>{
        this.alert.sucessAlert("You have successfully registered garage")
        this.router.navigate(['manageGarage']);
      },
      error:()=>{
        this.alert.errorAlert("Garage Couldn't Registered")
        this.router.navigate(['manageGarage']);
      }
    });
  }
    else{
      this.service.editgarage(this.id,this.garage).subscribe({
        next:()=>{
          this.alert.sucessAlert("You have successfully edited the garage information")
          this.router.navigate(['manageGarage']);
        },
        error:()=>{
          this.alert.errorAlert("Unable to edit the garage information");
          this.router.navigate(['manageGarage']);
        }
      });
    }
  }

  
  checkPhone(phone:string){
    this.exist=false;
    this.service.phoneExists(phone).subscribe(
      (data)=>{
        if(data==null){
          this.exist = false;
           this.phoneFound="";
        }
        else{
           this.exist = true;
          this.phoneFound ="Phone already registered!";
        }
      },
      (error)=>{

      }
      )
  }

}
