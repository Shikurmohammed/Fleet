import { HttpErrorResponse } from '@angular/common/http';
import { Maintenancecompletion } from './../../../../types/maintenancecompletion';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { FieldService } from 'src/app/request/field/field.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-managecompletion',
  templateUrl: './managecompletion.component.html',
  styleUrls: ['./managecompletion.component.css']
})
export class ManagecompletionComponent implements OnInit {
  maintenance: Maintenancecompletion[]=[];
  completes: Maintenancecompletion|undefined;
  completionlength:any

  constructor(
    private fieldService: FieldService,
    private alert: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllMaintenanceCompletion();
    if(sessionStorage.getItem("updated")!=null){
      this.alert.sucessAlert(sessionStorage.getItem("updated"));
      sessionStorage.removeItem("updated");
   }
  }
  updateCompletion(update: Maintenancecompletion):void{
    //console.log(update);
    this.fieldService.updateMaintenanceCompletion(update).subscribe({
          next:(res)=>{
            sessionStorage.setItem("updated", "Maintenance Completion Updated Successfully")
            window.location.reload();
          },
          error:()=>{
            this.alert.errorAlert("Unable To Update Maintenance Completion");
          }
    });
  }
  openEditModal(completion: Maintenancecompletion,mode: string): void{
    const container = document.getElementById('mainmodify');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'modify') {
      this.completes = completion;
      button.setAttribute('data-target', '#modifycompletion');
    }

    container?.appendChild(button);
    button.click();
  }

  getAllMaintenanceCompletion(){
    this.fieldService.getMaintenanceComplete().subscribe(
      (res)=>{
        this.maintenance = res;
        //console.log(res);
        this.completionlength = res.length;
        setTimeout(() => {
          $('#managecompletiondatatable').DataTable({
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
        this.alert.errorAlert("unable to fetch maintenance completion");
      }
    );
  }
}
