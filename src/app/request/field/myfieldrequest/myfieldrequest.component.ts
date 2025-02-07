import { Fielddispatcher } from './../../../types/fielddispatcher';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { Subject } from 'rxjs';
import { AlertService } from 'src/app/alert.service';

import { Fieldrequest } from 'src/app/types/fieldrequest';
import { FieldService } from '../field.service';
@Component({
  selector: 'app-myfieldrequest',
  templateUrl: './myfieldrequest.component.html',
  styleUrls: ['./myfieldrequest.component.css'],
})
export class MyfieldrequestComponent implements OnInit {
request: Fieldrequest[]=[];
username: string;
role: any;
id: any;
contingen:number=0;
myfieldLenth: number=0;
km:number=0;
totalKM:number=0;
deleterequest: Fieldrequest|undefined;
updaterequest: Fieldrequest|undefined;
viewrequest: Fieldrequest|undefined;
printdetail: Fielddispatcher|undefined;
requestreject: Fieldrequest = new Fieldrequest();
  departDate: any;
  lastdepartureDate: any;
  noOfdays: any;
  lastreturnDate: any;
  returnDate: any;
  dateToday: string;
  dateDeparted: string;
  diffDate: string;
  reqid: any;
  ids: any;
  noOfDays: number;
  to: any;
  contings: number;
  constructor(
    private fieldRequest: FieldService,
    private ngConfirm: NgConfirmService,
    private requestService: FieldService,
    private router: Router,
    private routes: ActivatedRoute,
    private alert:AlertService


  ) { }

  ngOnInit(): void {
    this.id = this.routes.snapshot.params['id'];
    this.role = sessionStorage.getItem("role");
    this.getMyRequests();
    this.username = sessionStorage.getItem('username');
    this.dateToday = new Date().toISOString().substring(0,10);
    if(sessionStorage.getItem("updated")!=null){
      this.alert.sucessAlert(sessionStorage.getItem("updated"));
      sessionStorage.removeItem("updated");
   }
   if(sessionStorage.getItem("cancel")!=null){
    this.alert.sucessAlert(sessionStorage.getItem("cancel"));
    sessionStorage.removeItem("cancel");
 }

  }
  printDetail(id:number){
   this.router.navigate(['printField',id]);
  }
  getKM(km: number){
    this.km=km;
    if(this.contingen == 0){
      this.contingen = this.updaterequest.contingency;
      this.totalKM = ((2*this.km)+(1*this.contingen) );
    }else{
      this.totalKM = ((2*this.km)+(1*this.contingen) );
    }
  }
  getContingency(con: number){
    this.contingen = con;
    if(this.km == 0){
      this.totalKM = ((2*this.updaterequest.destKM)+(1*this.contingen) );
    }else{
      this.totalKM = ((2*this.km)+(1*this.contingen) );
    }
  }
  getDeparture(dept: any){
    this.departDate = dept.target.value;
    this.lastdepartureDate = new Date(this.departDate).getTime();
    this.lastreturnDate = new Date(this.returnDate).getTime();
    if(isNaN(this.lastreturnDate)){
      this.lastreturnDate = new Date(this.updaterequest.returnDate).getTime();
      this.noOfdays = ((this.lastreturnDate-this.lastdepartureDate)/(1000*3600*24))+1;
    }
    else{

      this.noOfdays = ((this.lastreturnDate-this.lastdepartureDate)/(1000*3600*24))+1;
    }

  }
  getReturnDate(retn: any){
    this.returnDate = retn.target.value;
    this.lastdepartureDate = new Date(this.departDate).getTime();
    this.lastreturnDate = new Date(this.returnDate).getTime();
    // console.log(this.updaterequest.departureDate);
    if(isNaN(this.lastdepartureDate)){
      this.lastdepartureDate = new Date(this.updaterequest.departureDate).getTime();
      this.noOfdays = ((this.lastreturnDate-this.lastdepartureDate)/(1000*3600*24))+1;
      console.log(this.noOfdays);
    }
    else{
      this.noOfdays = ((this.lastreturnDate-this.lastdepartureDate)/(1000*3600*24))+1;
    }
  }

  fieldReject(){
    console.log(this.requestreject);
     this.fieldRequest.rejectRequest(this.id, this.requestreject).subscribe(data=>{
           this.getMyRequests();
     });
  }
  requestDetail(id: number){
    this.router.navigate(['fieldrequestDetail',id]);
  }
  deleteRequestData(id: number): void{
    this.fieldRequest.deleteRequest(id).subscribe(
      (response: any) => {
        sessionStorage.setItem("cancel",'Request Successfully Cancelled' )
        window.location.reload();
        //window.location.reload();
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
        this.alert.errorAlert('Unable To Delete Driver.');
        this.getMyRequests();
       // window.location.reload();
      }
    );
  }
  public onOpenModal(request: Fieldrequest, mode: string): void {
    const container = document.getElementById('maindriver');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'deleterequest') {
      this.deleterequest = request;
      button.setAttribute('data-target', '#deleterequestModal');
    }
    if (mode === 'updaterequest') {
      this.updaterequest = request;
      button.setAttribute('data-target', '#updateRequestModal');
    }
    if (mode === 'viewrequest') {
      this.viewrequest = request;
      button.setAttribute('data-target', '#viewrequestModal');
    }
    container?.appendChild(button);
    button.click();
  }

  approveFieldRequest(id: number) {
    this.router.navigate(['fieldapproval', id]);
    //console.log(sessionStorage.getItem("role"));
  }
  updateRequest(request: Fieldrequest):void{
    console.log("your data is : " + request.id)
    this.fieldRequest.updateRequestInfo(request).subscribe(
      (response: Fieldrequest) => {
        sessionStorage.setItem("updated",'Request Successfully Updated' )
         window.location.reload();
      },
      (error: HttpErrorResponse) => {
        this.alert.errorAlert('Request Could not be Updated.');
        this.getMyRequests();
        //this.router.navigate(['myfieldrequest']);
      }
     );
  }
  getMyRequests() {
    this.requestService.getMyRequest(sessionStorage.getItem("username")).subscribe(
       (resp:Fieldrequest[]) => {
          this.request = resp;
          this.myfieldLenth = resp.length;
          //console.log(this.request);
        setTimeout(() => {
          $('#myrequestdatatable').DataTable({
            pagingType: 'full_numbers',
            pageLength: 5,
            autoWidth: true,
            retrieve: true,
            processing: true,
            lengthMenu: [5, 10, 25],
            order: [[0, 'desc']],
          });
        }, 1);
      },
       (error:HttpErrorResponse) => {
        // this.ngAlert.danger
        this.alert.errorAlert('Error While Fetching Requests .!');
      },
    );
  }
}
