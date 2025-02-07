import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldService } from 'src/app/request/field/field.service';
import { DirectorateType } from 'src/app/types/Directorate';
import { Fieldrequest } from 'src/app/types/fieldrequest';
import { Fielddispatcher } from 'src/app/types/fielddispatcher';

@Component({
  selector: 'app-field-dispatcher',
  templateUrl: './field-dispatcher.component.html',
  styleUrls: ['./field-dispatcher.component.css']
})
export class FieldDispatcherComponent implements OnInit {
  directorates: DirectorateType[] = [];
  dateToday: string;
  director: any;
  username: any;
  id: number;
  dispatcherLength:number=0;
  requestedby: any;
  request: Fieldrequest = new Fieldrequest();
  fieldapprove: Fielddispatcher = new Fielddispatcher();
  approve: Fieldrequest[];
  constructor(
    private routes: ActivatedRoute,
    private fieldService: FieldService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getRequest();
    this.id = this.routes.snapshot.params['id'];
    this.dateToday = new Date().toISOString().substring(0,10);
    this.director = sessionStorage.getItem("directorate");
    this.username = sessionStorage.getItem("username");
    // this.fieldService.getRequestByID(this.id).subscribe(data=>{
    // this.request = data;
    // this.requestedby = data.requestedBy;

    // },
    // error=>console.log(error));


  }

  goToView(){
    this.router.navigate(['/myfieldrequest']);
 }
 detailRequest(id:number){
  this.router.navigate(['manageFieldDispatch',id]);
 }
 addReject(){
  console.log(this.request);
   this.fieldService.rejectRequest(this.id,this.request).subscribe(dat=>{
    alert("User Request Rejected Successfully.!");
   },
   error=>console.log(error));
 }
 addApproval(){
  console.log(this.request);
 }
 approveRequest(id:number){
  this.router.navigate(['fieldDispatcher',id]);

 }
 rejectRequest(id:number){
  //$('#rejectModal').hide();
   this.router.navigate(['fieldDispatcher',id]);
   //this.getRequest();
   //location.reload();
 }
 getRequest(){
  this.fieldService.getRequestDispatcher().subscribe(data=>{
    this.approve = data;
    this.dispatcherLength = data.length;


    setTimeout(() => {
      $('#fieldDispatcherdatatable').DataTable({
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
  error=>console.log(error));
 }
 fieldApproval(){
   console.log(this.request);
   this.fieldService.approveRequest(this.id, this.request).subscribe(data=>{
          this.goToView();
   },
   error=>console.log(error));
 }

}
