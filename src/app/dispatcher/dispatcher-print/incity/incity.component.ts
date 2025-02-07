import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrintService } from '../print.service';
import { AlertService } from 'src/app/alert.service';
import { InCityRequest } from 'src/app/types/in-city-request';

@Component({
  selector: 'app-incity',
  templateUrl: './incity.component.html',
  styleUrls: ['./incity.component.css']
})
export class IncityComponent implements OnInit {

  incity:InCityRequest[];
  userName:string;
  role: any;
  id: Number;
  req:InCityRequest=new InCityRequest;
  Length:number=0;
  currentDate:string;
  from:any;
  lastfrom:any;
  lastto:any;
  noOfDays:any;
  to:any;


  constructor( 
    private printService:PrintService,
    private router: Router,
    private routes: ActivatedRoute,
    private alert:AlertService
  ) {}

  ngOnInit(): void {
   this.viewIncityRequest();
   this.id = this.routes.snapshot.params['id'];
    this.role = sessionStorage.getItem("role");
    this.userName = sessionStorage.getItem('username');
    this.currentDate=new Date().toISOString().substring(0,10); 
  }

  printDetail(id:number){
    this.router.navigate(['printIncity',id]);
   }

  viewIncityRequest()
  {
    this.printService.viewApprovedIncityRequest().subscribe({
      next:(resp)=>{
        this.incity = resp;
        this.Length=resp.length;

        setTimeout(() => {
          $('#viewdatatable').DataTable({
            pagingType: 'full_numbers',
            pageLength: 5,
            autoWidth: false,
            retrieve: true,
            processing: true,
            lengthMenu: [5, 10, 25],
            order: [[0, 'desc']],
          });
        }, 1);
      },
      error:()=>{
        this.alert.errorAlert("Server Error");
    }
    });
  }

  public onOpenModal(data: any, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'Detail') {
      this.req = data;
     button.setAttribute('data-target', '#viewRequestStatusModal');
    }
    if (mode === 'Cancel') {
      this.req = data;
      button.setAttribute('data-target', '#cancelModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
