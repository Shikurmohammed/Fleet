import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { MaintenanceType } from 'src/app/types/maintenanceTypes';
import { RequestMaintenance } from 'src/app/types/request-maintenance';
import { Vehicle } from 'src/app/types/Vehicle';
import { RequestMaintenanceService } from './request-maintenance.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-request-maintenance',
  templateUrl: './request-maintenance.component.html',
  styleUrls: ['./request-maintenance.component.css'],
})
export class RequestMaintenanceComponent implements OnInit {
  vehicles: Vehicle[] = [];
  requestMaintenance: Vehicle;
  details: Vehicle;
  requistionForm: RequestMaintenance = new RequestMaintenance();
  director: any;
  username: any;
  serviceMaintenanceType: MaintenanceType[];
  isLessthan: boolean = false;
  existingKm: number = 0;
  constructor(
    private router: Router,
    private alert: AlertService,
    private requestService: RequestMaintenanceService
  ) { }
@ViewChild(MatSort) sort!:MatSort;
@ViewChild(MatPaginator) pagintor!:MatPaginator;
searchQuery:any;
  displayedColumns: string[] = ['id','plateNo','insExpDate','insRenewalDate','lastMilege','lmGenService','lmTyresChange','action'];
 public dataSource = new MatTableDataSource<Vehicle>([]);

  ngOnInit(): void {
// Populate dataSource with data


    if (sessionStorage.getItem("role") == "Requester" || sessionStorage.getItem("role") == "Senior Transport Officer") {
      this.director = sessionStorage.getItem("directorate");
      this.username = sessionStorage.getItem("username");
      this.getMyVehicles();
      if (sessionStorage.getItem("requested") != null) {
        this.alert.sucessAlert(sessionStorage.getItem("requested"));
        sessionStorage.removeItem("requested");
      }
    } else {
      this.router.navigate(['/home']);
    }

  }
  //To display vehicles whose service millages are due on data tables
  public getMyVehicles(): void {
    this.requestService.getMyVehicles(this.director).subscribe((ret: Vehicle[]) => {
      this.vehicles = ret;

      setTimeout(() => {
        this.dataSource.data=ret;
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.pagintor;
        $('#ServiceDataTable').DataTable({
          pagingType: 'full_numbers',
          pageLength: 10,
          autoWidth: true,
          retrieve: true,
          processing: true,
          lengthMenu: [5, 10, 25, 50],
          order: [[0, 'asc']], // Adjust as needed
          responsive: true, // Enable responsive behavior
          scrollY: '600px', // Set vertical scrolling
          scrollCollapse: true, // Enable collapse
          dom: 'Bfrtip', // Add buttons to the top
          buttons: [
            { extend: 'copy', text: 'Copy', className: 'btn btn-primary' },
            { extend: 'csv', text: 'Export CSV' },
            { extend: 'excel', text: 'Export Excel' },
            { extend: 'pdf', text: 'Export PDF' },
            { extend: 'print', text: 'Print' }
          ],
          language: {
            search: 'Search:',
            lengthMenu: 'Show _MENU_ entries',
            info: 'Showing _START_ to _END_ of _TOTAL_ entries',
            paginate: {
              first: 'First',
              last: 'Last',
              next: 'Next',
              previous: 'Prev'
            }
          }
        });
      }, 1);
    });

  }
  RequestMaintenance() {
    this.requestService.sendMaintenanceRequest(this.requistionForm).subscribe(
      (res: RequestMaintenance) => {
        sessionStorage.setItem("requested", "Maintenance Request Successfully Sent");
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        this.alert.errorAlert("Server Error");
      }
    );
  }
  //check milege not less than previous
  checkMilege(current: any) {
    if (current.target.value < this.existingKm) {
      this.isLessthan = true;
    } else {
      this.isLessthan = false;
    }
  }
  public onOpenModal(vehicle: Vehicle, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'request') {
      this.requestMaintenance = vehicle;
      this.requistionForm.requestedBy = this.username;
      this.requistionForm.reqDirectorate = this.director;
      //To Get Already Existing Vehicle Details
      this.requistionForm.plateNo = this.requestMaintenance.plateNo;
      //I have corrected the previous milege
      this.requistionForm.previousServiceMilage = this.requestMaintenance.lmVehicleBody;
      this.requistionForm.currentMilage = this.requestMaintenance.lastMilege;
      this.requistionForm.milageDifference = this.requistionForm.currentMilage - this.requistionForm.previousServiceMilage;
      this.requistionForm.model = this.requestMaintenance.model;
      this.requistionForm.chassisNo = this.requestMaintenance.chassisNo;
      this.requistionForm.engineNo = this.requestMaintenance.engineNo;
      this.requistionForm.previousServiceDate = this.requestMaintenance.previousServiceDate;
      this.existingKm = this.requestMaintenance.lastMilege;

      button.setAttribute('data-target', '#maintenanceRequestModal');
    }
    if (mode === 'view') {
      this.details = vehicle;
      button.setAttribute('data-target', '#detailsVehicleServiceModal');
    }
    container?.appendChild(button);
    button.click();
  }

  //search
  search(){
    console.log(this.searchQuery);
    this.dataSource.filter= this.searchQuery.trim().toLowerCase();
  }
}
