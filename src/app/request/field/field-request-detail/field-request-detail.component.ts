import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fielddispatcher } from 'src/app/types/fielddispatcher';
import { Fieldrequest } from 'src/app/types/fieldrequest';
import { FieldService } from '../field.service';

@Component({
  selector: 'app-field-request-detail',
  templateUrl: './field-request-detail.component.html',
  styleUrls: ['./field-request-detail.component.css']
})
export class FieldRequestDetailComponent implements OnInit {
  request: Fieldrequest[];
  approve: Fielddispatcher[];
  username: any;
  role: any;
  id: any;
  
  constructor(
    private requestService: FieldService,
    private routes: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.routes.snapshot.params['id'];
    this.username = sessionStorage.getItem("username");
    this.role = sessionStorage.getItem("role");
    this.getMyRequests();
    this.getApproval();
  }
  backView(){
     this.router.navigate(['myfieldrequest']);
  }
  pdfReport(){
    // this.requestService.getPDFReport().subscribe(dat=>{
    //   console.log("success");
    // })
  }
  getApproval(){
    this.requestService.getApproval().subscribe({
      next:(response)=>{
        console.log(response);
        this.approve = response;

      },
      error:()=>{
            // this.ngAlert.danger
            alert("Error While Fetching Requests .!");
      }
    });
  }
  getMyRequests(){
    this.requestService.getRequest().subscribe({
      next:(response)=>{
        console.log(response);
        this.request = response;

      },
      error:()=>{
            // this.ngAlert.danger
            alert("Error While Fetching Requests .!");
      }
    });
  }

}
