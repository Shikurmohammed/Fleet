import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { AlertService } from 'src/app/alert.service';
import { InCityRequest } from 'src/app/types/in-city-request';
import { IncityRequestService } from '../incity-request.service';

@Component({
  selector: 'app-viewincityrequest',
  templateUrl: './viewincityrequest.component.html',
  styleUrls: ['./viewincityrequest.component.css']
})

export class ViewincityrequestComponent implements OnInit {
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
    private inCityRequestService:IncityRequestService,
    private router: Router,
    private routes: ActivatedRoute,
    private ngConfirm: NgConfirmService,
    private alert:AlertService
    ) {}

  ngOnInit(): void {
   this.viewIncityRequest();
   this.id = this.routes.snapshot.params['id'];
    this.role = sessionStorage.getItem("role");
    this.userName = sessionStorage.getItem('username');
    this.currentDate=new Date().toISOString().substring(0,10);
    if(sessionStorage.getItem("requestUpdated")!=null){
      this.alert.sucessAlert(sessionStorage.getItem("requestUpdated"));
      sessionStorage.removeItem("requestUpdated");
   }
   if(sessionStorage.getItem("cancled")!=null){
    this.alert.sucessAlert(sessionStorage.getItem("cancled"));
    sessionStorage.removeItem("cancled");
 }
   
  }

  printDetail(id:number){
    this.router.navigate(['printIncity',id]);
   }

  viewIncityRequest()
  {
    this.inCityRequestService.viewIncityRequestByUserName(sessionStorage.getItem("username")).subscribe({
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

  cancelIncityRequest(id:number){
    {
      this.inCityRequestService.cancelIncityRequest(id).subscribe({
         next:()=>{
          // this.alert.sucessAlert("Request Successfully Cancelled!");
          sessionStorage.setItem("cancled", "Request Successfully Cancelled! ");
          window.location.reload();
         },
         error:()=>{
          this.alert.errorAlert("Server Error");
         }
      });
      location.reload();
    }
    return false;
  }



  updateIncityRequest(req:InCityRequest){
    // this.router.navigate(['/incityRequest',id]);
    this.inCityRequestService.updateinCityRequest(req.id,req).subscribe({
      next:()=>{
        // this.alert.sucessAlert("Request Successfully Updated");
        // this.viewIncityRequest();
        sessionStorage.setItem("requestUpdated", "Request Successfully Updated ");
        window.location.reload();
      },
      error:()=>{
        this.alert.errorAlert("Server Error");
      }
    });
  }


  getDateFrom(datefrom:any)
  {
    this.from = datefrom.target.value;
    this.lastfrom = new Date(this.from).getTime();
    if(this.req.dateTo!=null){
      this.lastto=new Date(this.req.dateTo).getTime();
      this.noOfDays = (Math.ceil((this.lastto-this.lastfrom)/(1000*3600*24)))+1;
    }
  }


  getDateTo(dateto:any)
  {
    this.to=dateto.target.value;
    this.lastto=new Date(this.to).getTime();
    if(this.req.id!=null){
      this.lastfrom=new Date(this.req.dateFrom).getTime();
      this.noOfDays = (Math.floor((this.lastto-this.lastfrom)/(1000*3600*24)))+1;
    }else{
      this.noOfDays = ((this.lastto-this.lastfrom)/(1000*3600*24))+1;
    }

  }

  
  getFrom(){
    this.lastfrom=new Date(this.req.dateFrom).getTime();
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
    if (mode === 'Update') {
      this.req = data;
      button.setAttribute('data-target', '#updateModal');
    }
    if (mode === 'Reason') {
      this.req = data;
      button.setAttribute('data-target', '#reasonModal');
    }
    container?.appendChild(button);
    button.click();
  }
}