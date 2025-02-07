import { Router } from '@angular/router';
import { AlertService } from './../../../alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FieldService } from './../../../request/field/field.service';
import { Maintenancecompletion } from './../../../types/maintenancecompletion';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RequestMaintenance } from 'src/app/types/request-maintenance';

@Component({
  selector: 'app-completion',
  templateUrl: './completion.component.html',
  styleUrls: ['./completion.component.css']
})
export class CompletionComponent implements OnInit {
  completion: Maintenancecompletion= new Maintenancecompletion();
  maintenance: RequestMaintenance[]=[];
  requestlength:number;
  requesterID: any;
  plateNo: any;
  maintenancecompletion: RequestMaintenance|undefined;
  dateToday: string;
  dateGarage: Date;

  constructor(
    private fieldService: FieldService,
    private alert: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllMaintenanceRequest();
    this.dateToday = new Date().toISOString().substring(0,10);
    if(sessionStorage.getItem("maintenanceInserted")!=null){
      this.alert.sucessAlert(sessionStorage.getItem("maintenanceInserted"));
      sessionStorage.removeItem("maintenanceInserted");
   }

  }
  completeMaintenances(compl: Maintenancecompletion){
    //console.log(compl);
    this.fieldService.completeMaintenance(compl).subscribe({
      next:(res)=>{
        sessionStorage.setItem("maintenanceInserted","Completion Inserted Successfully");
        window.location.reload();

      },
      error: ()=>{
        this.alert.errorAlert("Failed To Insert Completion");
      }
    });

  }
  openReturnModal(completion: RequestMaintenance,mode: string): void{
    const container = document.getElementById('mainmaintenancecompletion');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'completions') {
      this.maintenancecompletion = completion;
      this.requesterID = completion.id;
      this.plateNo = completion.plateNo;
      this.dateGarage = completion.technicalRespondDate; 
      button.setAttribute('data-target', '#maintenancecompletionModal');
    }

    container?.appendChild(button);
    button.click();
  }
  getAllMaintenanceRequest(){
    this.fieldService.getMaintenanceCompletedVehicle().subscribe(
      (resp)=>{
        this.maintenance = resp;
        this.requestlength = resp.length;
        setTimeout(() => {
          $('#completiondatatable').DataTable({
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
            this.alert.errorAlert("Unable To Fetch Maintenance Request");
      }
    );
  }
  printDetail(id:number){
    this.router.navigate(['technicalPrint',id]);
   }

}
