import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, Routes } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { IncityRequestService } from 'src/app/request/incity-request/incity-request.service';
import { Incitydispatch } from 'src/app/types/incitydispatch';

@Component({
  selector: 'app-incity-modify-dispatched',
  templateUrl: './incity-modify-dispatched.component.html',
  styleUrls: ['./incity-modify-dispatched.component.css']
})
export class IncityModifyDispatchedComponent implements OnInit {
  dispatch: Incitydispatch[];
  detail: Incitydispatch = new Incitydispatch();
  modify: Incitydispatch | undefined;
  length: number = 0;
  incityRequestID: number;
  vehiclePlateNo: string = '';
  kmDifference:number;
  kmReturn:number;
  kmDeparture:number;
  isValid:boolean;
  warning:string;

  constructor(
    private service: IncityRequestService,
    private alert: AlertService,
    private router: Router,
    private routes: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getIncityDispatchData();
    this.incityRequestID = this.modify.requesterId;
  }

  public getIncityDispatchData() {
    this.service.viewIncityDispatch().subscribe({
      next: (data) => {
        this.dispatch = data;
        this.length = data.length;

        setTimeout(() => {
          $('#modify').DataTable({
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
      error: () => {
        this.alert.errorAlert("No Dispatched Requests for Incity");
      }
    });
  }

  public onOpenModal(dispacher: Incitydispatch, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'detail') {
      this.detail = dispacher;
      button.setAttribute('data-target', '#detailApprovedRequestModal');
    }
    if (mode === 'modify') {
      this.modify = dispacher;
      this.incityRequestID = dispacher.requesterId
      button.setAttribute('data-target', '#modifyApprovedModal');
    }
    container?.appendChild(button);
    button.click();
  }


  getReturnKm(net:number){
    this.kmReturn=net;
    this.kmDeparture=this.modify.departureKm;
    if(this.kmReturn<this.kmDeparture)
    {
      this.isValid=true;
      this.warning='return km not less than departure km!';
    }
    else{
      this.isValid=false;
      this.warning='';
    }
  }


  onModifyForm(update: Incitydispatch) {
    this.incityRequestID = this.modify.requesterId;
    this.vehiclePlateNo = this.modify.plateNumber;
    this.kmDifference=((1*this.kmReturn)-(1*this.kmDeparture));
    
    this.service.modifyDispatchedReturnKm(this.incityRequestID, update).subscribe(
      (data: any) => {
        this.alert.sucessAlert("Request Modified Succesfully");
        this.getIncityDispatchData();
      },
      (error: HttpErrorResponse) => {
        this.alert.errorAlert("Unable to update Request");
      });
  }

}
