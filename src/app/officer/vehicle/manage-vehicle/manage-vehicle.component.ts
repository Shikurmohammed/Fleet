import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { DirectorateType } from 'src/app/types/Directorate';
import { Vehicle } from 'src/app/types/Vehicle';
import { VehicleType } from 'src/app/types/VehicleType';
import { UserService } from 'src/app/user/user.service';
import { VehicleService } from '../vehicle.service';
import { FuelDetail } from 'src/app/types/FuelDetail';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DisposeVehicleComponent } from './dispose-vehicle/dispose-vehicle.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { UpdateVehicleComponent } from './update-vehicle/update-vehicle.component';

@Component({
  selector: 'app-manage-vehicle',
  templateUrl: './manage-vehicle.component.html',
  styleUrls: ['./manage-vehicle.component.css'],
})
export class ManageVehicleComponent implements OnInit {
  vehicles: any = [];
  public editVehicle: Vehicle | undefined;
  public disposeVehicle: Vehicle | undefined;
  public viewDetail: Vehicle | undefined;
  fuel: string;
  directorates: DirectorateType[];
  vehicleTypes: VehicleType[];
  vehicleTypeObject: VehicleType[] = [];
  vehicleTypeValue: String;
  isGeneral: boolean;
  fuelTypes: FuelDetail[];
  fuelObject: FuelDetail[];
  fuelValue: string;
  role: string;

  constructor(
    private vehicleService: VehicleService,
    private alertService: AlertService,
    private dialog:MatDialog,

  ) { }
 @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) pagintor!: MatPaginator;
  searchQuery: any;
  displayedColumns: string[] = ['id', 'plateNo', 'model', 'make', 'lastMilege', 'insExpDate', 'insRenewalDate','policyNo','status', 'action'];
  public dataSource = new MatTableDataSource<Vehicle>([]);
  ngOnInit(): void {
    this.vehicleDataTable();

    this.role = sessionStorage.getItem("role");
    if (sessionStorage.getItem("updated") != null) {
      this.alertService.sucessAlert(sessionStorage.getItem("updated"));
      sessionStorage.removeItem("updated");
    }
  }
  isDispatcher() {
    if (sessionStorage.getItem('role') == 'Dispatcher') {
      return true;
    } else {
      return false;
    }
  }
  public vehicleDataTable(): void {
    this.vehicleService.getVehicles().subscribe((ret: Vehicle[]) => {
      this.vehicles = ret;
     // this.dataSource.data=ret

      setTimeout(() => {
        this.dataSource.data = ret;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.pagintor;
        $('#datatableexample').DataTable({
          //pagingType: 'full_numbers',
          pageLength: 5,
          autoWidth: true,
          retrieve: true,
          processing: true,
          lengthMenu: [5, 10, 25],

          // buttons: [
          //   { extend: 'copy', text: 'Copy', className: 'btn btn-primary' },
          //   { extend: 'excel', text: 'Excel', className: 'btn btn-success' },
          //   { extend: 'pdf', text: 'PDF', className: 'btn btn-danger' },

          //   {
          //     extend: 'colvis',
          //     text: 'Choose Columns',
          //     columns: ':not(:first-child)' // Exclude the first column if needed
          //   }
          // ],
          dom: 'Bfrtip', // Add buttons to the table UI
          order: [[1, 'desc']],

        });
      }, 1);
    });
  }

//search
search() {
  console.log(this.searchQuery);
  this.dataSource.filter = this.searchQuery.trim().toLowerCase();
}

//Dispose
dispose(vehicle:Vehicle){
  this.dialog.open(DisposeVehicleComponent,{
    data:vehicle
  });

}
detail(vehicle:Vehicle){
  // this.viewDetail = vehicle;
  //     this.vehicleTypeObject = this.vehicleTypes.filter(x => x.id === this.viewDetail.vehicleType);
  //     this.vehicleTypeValue = this.vehicleTypeObject[0].vehicleType;
  //     this.fuelObject = this.fuelTypes.filter(x => x.id === this.viewDetail.fuelType);
  //     this.fuelValue = this.fuelObject[0].typeOfFuel;
  this.dialog.open(VehicleDetailsComponent,{
    data:vehicle
  });

}
update(vehicle:Vehicle){
  // this.editVehicle = vehicle;
  // if (
  //   this.editVehicle.status === 'Assigned to Respective'
  //   || this.editVehicle.status === 'Maintenance'
  //   || this.editVehicle.status === 'Dispatched'
  // ) {
  //   this.isGeneral = false;
  // } else {
  //   this.isGeneral = true;
  // }
  // if (this.editVehicle.status === 'StandBy') {
  //   this.editVehicle.isStandBy = 'yes';
  // } else if (this.editVehicle.status != 'StandBy') {
  //   this.editVehicle.isStandBy = 'no';
  // }
  // this.vehicleTypeObject = this.vehicleTypes.filter(x => x.id === this.editVehicle.vehicleType);
  // this.vehicleTypeValue = this.vehicleTypeObject[0].vehicleType;
  console.log(vehicle);

  this.dialog.open(UpdateVehicleComponent,{
    data:vehicle
  });
}


}
