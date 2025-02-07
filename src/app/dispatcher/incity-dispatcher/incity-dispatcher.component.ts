import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { IncityRequestService } from 'src/app/request/incity-request/incity-request.service';
import { InCityRequest } from 'src/app/types/in-city-request';
import { Incitydispatch } from 'src/app/types/incitydispatch';

@Component({
  selector: 'app-incity-dispatcher',
  templateUrl: './incity-dispatcher.component.html',
  styleUrls: ['./incity-dispatcher.component.css']
})
export class IncityDispatcherComponent implements OnInit {
  incitydispatch:Incitydispatch[];
  approve:InCityRequest[];
  request: InCityRequest=new InCityRequest();
  req:Incitydispatch=new Incitydispatch();
  id:any;
  Length:number=0;

  constructor(
    private incitydispatchservice:IncityRequestService,
    private routes: ActivatedRoute,
    private router: Router,
    private alert:AlertService
    ) { }

  ngOnInit(): void {
    this.viewIncityRequest();
    this.id = this.routes.snapshot.params['id'];
    // this.incitydispatchservice.getRequestByID(this.id).subscribe(data=>{
    //   this.request = data;
    //   },
    //   error=>console.log(error));
  }

  viewIncityRequest()
  {
    this.incitydispatchservice.viewIncityRequest().subscribe({
      next:(resp)=>{
        this.approve = resp;
        this.Length = resp.length;

        setTimeout(() => {
          $('#dispatchdatatable').DataTable({
            pagingType: 'full_numbers',
            pageLength: 5,
            autoWidth: true,
            retrieve: true,
            processing: true,
            lengthChange:true,
            lengthMenu: [5, 10, 25],
          });
        }, 1);
        },
      error:()=>{
        this.alert.errorAlert("Sorry, your request could not be fetched");
    }
    });
  }

  detail(id:number){
    this.router.navigate(['manageIncityDispatch',id]);
   }
}
