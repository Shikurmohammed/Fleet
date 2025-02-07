import { Vehicle } from 'src/app/types/Vehicle';
import { Fielddispatcher } from './../../../types/fielddispatcher';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from './../../../alert.service';
import { FieldService } from 'src/app/request/field/field.service';
import { Component, OnInit } from '@angular/core';
import { Fieldrequest } from 'src/app/types/fieldrequest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-field-modify-dispatched',
  templateUrl: './field-modify-dispatched.component.html',
  styleUrls: ['./field-modify-dispatched.component.css']
})
export class FieldModifyDispatchedComponent implements OnInit {
  approved: Fielddispatcher[];
  approvedrequest: Fieldrequest[];
  dispatchedvehicle: Vehicle[];
  approvedLength:number=0;
  viewrequest: Fielddispatcher|undefined;
  updaterequest: Fielddispatcher|undefined;
  modifyrequest: Fielddispatcher = new Fielddispatcher();
  vehicle: Vehicle = new Vehicle();
  requesterID:number;
  kmOnDepature: number=0;
  kmDifference: number=0;
  kmOnReturn: number=0;
  vehiclePlate:string="";
  returnkm: number;
  isvalidkm: boolean;
  errorMSg: string;
  //dtOptions: DataTables.Settings = {};

  constructor(
    private fieldService: FieldService,
    private alert: AlertService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getAllApprovedFieldRequest();
     //this.requesterID = this.updaterequest.requesterID;
  }
  getKmOnReturn(ret: number){
    this.kmOnReturn = ret;
    this.kmOnDepature = this.updaterequest.kmReadingOnDeparture;

  }
  printDetail(id:number){
    this.router.navigate(['advancePrint',id]);
   }
  validateKmReturn(kmret: number){
    this.isvalidkm = true;
    this.kmOnDepature = this.updaterequest.kmReadingOnDeparture;
    if(1*kmret > 1*this.kmOnDepature){
      this.isvalidkm = false;
      this.errorMSg = " ";
    }
    else{
      this.isvalidkm = true;
      this.errorMSg = "return km must be greater than departure km";

    }
        // this.returnkm = (1*kmret-1*this.kmOnDepature);
  }
  addModify(modifyForm: Fielddispatcher){
    this.requesterID = this.updaterequest.requesterID;
    this.vehiclePlate = this.updaterequest.plateNo;
    this.kmOnDepature = this.updaterequest.kmReadingOnDeparture;
    this.kmOnReturn = modifyForm.kmReadingOnReturn;
    this.kmDifference = ((1*this.kmOnReturn)-(1*this.kmOnDepature));
    //console.log(modifyForm);
    this.fieldService.modifyApprovedRequest(this.requesterID, modifyForm).subscribe(
          (res:any)=>{

          this.alert.sucessAlert("Request Modified Succesfully");
          this.getAllApprovedFieldRequest();
          },
          (error: HttpErrorResponse)=>{
          this.alert.errorAlert("Unable to update Request");
          }

    );
  }
  getAllApprovedFieldRequest(){
    this.fieldService.getAllApprovedRequest().subscribe(
       (resp)=>{
         this.approved = resp;
          this.approvedLength = resp.length;
          console.log(resp);
          setTimeout(() => {
            $('#modifyfieldDispatcherdatatable').DataTable({
              pagingType: 'full_numbers',
              pageLength: 5,
              autoWidth: true,
              retrieve: true,
              processing: true,
              lengthMenu: [5, 10, 25],
              order: [[1, 'desc']],
            });
          }, 1);

       },
       (error: HttpErrorResponse)=>{

       }

    );
  }
  public onOpenModal(request: Fielddispatcher, mode: string): void {
    const container = document.getElementById('modifyfieldrequest');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'updaterequest') {
      this.updaterequest = request;
      button.setAttribute('data-target', '#updateapprovedrequest');
    }
    if (mode === 'viewrequest') {
      this.viewrequest = request;
      button.setAttribute('data-target', '#viewapprovedtModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
