import { Component, OnInit } from '@angular/core';
import { PrintService } from '../print.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { Fieldrequest } from 'src/app/types/fieldrequest';
import { HttpErrorResponse } from '@angular/common/http';
import { Fielddispatcher } from 'src/app/types/fielddispatcher';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {
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
      private printService: PrintService,
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
    }
    printDetail(id:number){
     this.router.navigate(['printField',id]);
    }

    getMyRequests() {
      this.printService.getApprovedFieldRequest().subscribe(
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
              lengthChange:true,
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
