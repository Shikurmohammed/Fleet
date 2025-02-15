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
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { VehicleRequestComponent } from './vehicle-request/vehicle-request.component';


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

  existingKm: number = 0;
  constructor(
    private router: Router,
    private alert: AlertService,
    private requestService: RequestMaintenanceService,
    private dialog: MatDialog,
  ) { }
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) pagintor!: MatPaginator;
  searchQuery: any;
  displayedColumns: string[] = ['id', 'plateNo', 'insExpDate', 'insRenewalDate', 'lastMilege', 'lmGenService', 'lmTyresChange', 'action'];
  public dataSource = new MatTableDataSource<Vehicle>([]);

  ngOnInit(): void {
    // Populate dataSource with data
    if (sessionStorage.getItem("role") == "Requester" || sessionStorage.getItem("role") == "Senior Transport Officer") {
      this.director = sessionStorage.getItem("directorate");
      this.username = sessionStorage.getItem("username");
      this.getMyVehicles();
    } else {
      this.router.navigate(['/home']);
    }

  }
  //To display vehicles whose service millages are due on data tables
  public getMyVehicles(): void {
    this.requestService.getMyVehicles(this.director).subscribe((ret: Vehicle[]) => {
      this.vehicles = ret;

      setTimeout(() => {
        this.dataSource.data = ret;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.pagintor;
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
  //search
  search() {
    console.log(this.searchQuery);
    this.dataSource.filter = this.searchQuery.trim().toLowerCase();
  }

  vehicleDetailsDialog(vehicle: Vehicle) {
    const dialogRef = this.dialog.open(VehicleDetailsComponent, {
      data: vehicle
    });
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        console.log("Vechile details component closed", res);
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  vehicleRequestDialog(vehicle: Vehicle) {
    console.log(vehicle)
    const dialogRef = this.dialog.open(VehicleRequestComponent, {
      data: vehicle
    });
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        console.log("Vechile details component closed", res);
       // this.alert.sucessAlert(res);
        if (sessionStorage.getItem("requested") != null) {
          this.alert.sucessAlert(sessionStorage.getItem("requested"));
          sessionStorage.removeItem("requested");
        }
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

}
