import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DirectorateType } from 'src/app/types/Directorate';
import { Fielddispatcher } from 'src/app/types/fielddispatcher';
import { Fieldrequest } from 'src/app/types/fieldrequest';
import { FieldService } from '../field.service';

@Component({
  selector: 'app-dispatcher-field-approval',
  templateUrl: './dispatcher-field-approval.component.html',
  styleUrls: ['./dispatcher-field-approval.component.css']
})
export class DispatcherFieldApprovalComponent implements OnInit {
  directorates: DirectorateType[] = [];
  dateToday: string;
  director: any;
  username: any;
  id: number;
  request: Fieldrequest = new Fieldrequest();
  approvefield: Fielddispatcher = new Fielddispatcher();
  constructor(
    private routes: ActivatedRoute,
    private fieldService: FieldService,
    private router: Router
    
  ) { }

  ngOnInit(): void {
    this.id = this.routes.snapshot.params['id'];
    this.dateToday = new Date().toISOString().substring(0,10);
    this.director = sessionStorage.getItem("directorate");
    this.username = sessionStorage.getItem("username");
    this.fieldService.getRequestByID(this.id).subscribe(data=>{
    this.request = data;
     
    },
    error=>console.log(error));
  }
  goToView(){
     this.router.navigate(['/myfieldrequest']);
  }
  fieldApproval(){
    console.log(this.request);
    this.fieldService.approveRequest(this.id, this.request).subscribe(data=>{
           this.goToView();
    },
    error=>console.log(error));
  }

}
