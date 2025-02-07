import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { FieldService } from 'src/app/request/field/field.service';
import { Driver } from 'src/app/types/driver';
import { Vehicle } from 'src/app/types/Vehicle';

@Component({
  selector: 'app-manage-driver',
  templateUrl: './manage-driver.component.html',
  styleUrls: ['./manage-driver.component.css']
})
export class ManageDriverComponent implements OnInit {
  request: Driver[];
  vehicle: any;
  username: any;
  role: any;
  id: any;
  phoneFound: string="";
  driverFound: string="";
  exist: boolean;
  driverExist: boolean=false;
  deletedriver: Driver|undefined;
  updatedriver: Driver|undefined;
  viewdriver: Driver|undefined;
  disabledriver: Driver|undefined;
  enabledriver: Driver|undefined;
  driver: Driver = new Driver();
  driverlength: number=0;
  driverID: any;
  constructor(
    private fieldService: FieldService,
    private router: Router,
    private routes: ActivatedRoute,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.id = this.routes.snapshot.params['id'];
    this.getDriver();
        if(sessionStorage.getItem("updated")!=null){
          this.alert.sucessAlert(sessionStorage.getItem("updated"));
          sessionStorage.removeItem("updated");
    }
    if(sessionStorage.getItem("enabled")!=null){
      this.alert.sucessAlert(sessionStorage.getItem("enabled"));
      sessionStorage.removeItem("enabled");
    }
    if(sessionStorage.getItem("disabled")!=null){
      this.alert.sucessAlert(sessionStorage.getItem("disabled"));
      sessionStorage.removeItem("disabled");
    }
     }

     checkDriverName(fullname: string){
      this.driverExist = false;
      this.fieldService.getDriverByFullname(fullname).subscribe({
       next:(fname)=>{
       if(fname == null){
         this.driverExist = false;
         this.driverFound = "";
       }
       else{
          this.driverExist = true;
          this.driverFound= "Driver " + fullname + " Already Registered";
       }
       },
       error:()=>{
         console.log("failed to check driver name");
       }
      });
     }
     checkPhone(phon: string){
       this.exist=false;
       //this.telephone = phon;
       this.fieldService.driverAlreadyExists(phon).subscribe(
         (data)=>{
           if(data==null){
              this.exist = false;
              this.phoneFound="";
           }
           else{
             this.exist = true;
             this.phoneFound = "phone already exist";
           }
         },
         (error)=>{

         }
         )

     }
  public onOpenModal(drivers: Driver, mode: string): void {
    const container = document.getElementById('maindriver');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'deletedriv') {
      this.deletedriver = drivers;
      button.setAttribute('data-target', '#deletedriver');
    }
    if (mode === 'updatedriver') {
      this.updatedriver = drivers;
      button.setAttribute('data-target', '#updatedriverModal');
    }
    if (mode === 'viewdriver') {
      this.viewdriver = drivers;
      button.setAttribute('data-target', '#viewriverModal');
    }
    if (mode === 'disabledriver') {
      this.disabledriver = drivers;
      button.setAttribute('data-target', '#disabledriverModal');
    }
    if (mode === 'enabledriver') {
      this.enabledriver = drivers;
      button.setAttribute('data-target', '#enabledriverModal');
    }
    container?.appendChild(button);
    button.click();
  }
  addMore(){
    this.router.navigate(['driverAdd']);
  }
  driverDisable(drivers: Driver): void{

    this.fieldService.disableDriver(drivers).subscribe(
      (resp)=>{
       console.log(resp);
        sessionStorage.setItem("disabled", "Driver Deactivated Successfully.");
        window.location.reload();
       // this.router.navigate(['manageDriver']);
      },
      (error:HttpErrorResponse)=>{
        this.alert.errorAlert("Unable to Disable this Driver");
      }
    );

  }
  driverEnable(drivers: Driver): void{
   //console.log(drivers);
    //console.log("your activated id is " + drivers.id);
    this.fieldService.enableDriver(drivers).subscribe(
      (resp)=>{
       console.log(resp);
        sessionStorage.setItem("enabled", 'Driver Activated Successfully.');
        window.location.reload();
      },
      (error:HttpErrorResponse)=>{
        this.alert.errorAlert("Unable to Activate this Driver");
      }
    );

  }
  getDriver(){
    this.fieldService.getDriver().subscribe({
      next:(resp)=>{
       // console.log(resp);
        this.request = resp;
        this.driverlength = resp.length;
        setTimeout(() => {
          $('#driverdatatable').DataTable({
            pagingType: 'full_numbers',
            pageLength: 5,
            autoWidth: true,
            retrieve: true,
            processing: true,
            lengthChange:false,
            lengthMenu: [5, 10, 25],
          });
        }, 1);
      },
      error:()=>{
        this.alert.errorAlert("Error Occured While Fetching Data.");
      }
    });
  }
  updateDriver(drivers: Driver): void{
   console.log("your id is :" + drivers.id);
   this.fieldService.updateDriverInfo(drivers).subscribe(
    (response: Driver) => {
      sessionStorage.setItem("updated", 'Driver Successfully Updated.');
      window.location.reload();
      //this.router.navigate(['manageDriver']);
      //location.reload();
    },
    (error: HttpErrorResponse) => {
      //alert(error.message);
      this.alert.errorAlert('Driver Could not be Updated.');
      this.router.navigate(['manageDriver']);
    }
   );
  }
  deleteDriverData(id: number): void{
    this.fieldService.deleteDriver(id).subscribe(
      (response: any) => {
        this.alert.sucessAlert('Driver Successfully Deleted.');
        this.getDriver();
        //window.location.reload();
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
        this.alert.errorAlert('Unable To Delete Driver.');
        window.location.reload();
      }
    );
  }
  deleteDriver(id: number){
    if(confirm("Are You Sure Want To Delete This Driver?")){
       this.fieldService.deleteDriver(id).subscribe({
        next:()=>{
           //alert("Driver Deleted Successfully.");
        },
        error:()=>{
          alert("Driver Deleted Successfully.");
          this.router.navigate(['/manageDriver']);
        //alert("Could Not Delete this Driver");
        }
       });
       location.reload();
    }
     return false;
  }

}
