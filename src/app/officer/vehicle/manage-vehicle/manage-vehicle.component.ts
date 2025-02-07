import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { DirectorateType } from 'src/app/types/Directorate';
import { Vehicle } from 'src/app/types/Vehicle';
import { VehicleType } from 'src/app/types/VehicleType';
import { UserService } from 'src/app/user/user.service';
import { VehicleService } from '../vehicle.service';
import { FuelDetail } from 'src/app/types/FuelDetail';

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
    private router: Router,
    private alertService: AlertService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUserOnDataTable();
    this.getDirectorates();
    this.getVehicleTypes();
    this.getFuelType();
    this.role = sessionStorage.getItem("role");
    if (sessionStorage.getItem("updated") != null) {
      this.alertService.sucessAlert(sessionStorage.getItem("updated"));
      sessionStorage.removeItem("updated");
    }
  }

  public getUserOnDataTable(): void {
    this.vehicleService.getVehicles().subscribe((ret: Vehicle[]) => {
      this.vehicles = ret;

      setTimeout(() => {
        $('#datatableexample').DataTable({
          //pagingType: 'full_numbers',
          pageLength: 5,
          autoWidth: true,
          retrieve: true,
          processing: true,
          lengthMenu: [5, 10, 25],

          buttons: [
            { extend: 'copy', text: 'Copy', className: 'btn btn-primary' },
            { extend: 'excel', text: 'Excel', className: 'btn btn-success' },
            { extend: 'pdf', text: 'PDF', className: 'btn btn-danger' },

            {
              extend: 'colvis',
              text: 'Choose Columns',
              columns: ':not(:first-child)' // Exclude the first column if needed
            }
          ],
          dom: 'Bfrtip', // Add buttons to the table UI
          order: [[1, 'desc']],

        });
      }, 1);
    });
  }

  public getDirectorates() {
    this.userService.getDirectorate().subscribe(
      (response: DirectorateType[]) => {
        this.directorates = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getVehicleTypes() {
    this.vehicleService.getVehicleTypes().subscribe(
      (response: VehicleType[]) => {
        this.vehicleTypes = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getFuelType() {
    this.vehicleService.getFuelType().subscribe(
      (response: FuelDetail[]) => {
        this.fuelTypes = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(vehicle: Vehicle, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit') {
      //console.log(this.vehicleTypes.find(item => item.id === vehicle.vehicleType));
      //  this.vehicleTypeValue = this.vehicleTypeObject.vehicleType;
      // console.log(this.vehicleTypeObject);
      this.editVehicle = vehicle;
      if (
        this.editVehicle.status === 'Assigned to Respective'
        || this.editVehicle.status === 'Maintenance'
        || this.editVehicle.status === 'Dispatched'
      ) {
        this.isGeneral = false;
      } else {
        this.isGeneral = true;
      }
      if (this.editVehicle.status === 'StandBy') {
        this.editVehicle.isStandBy = 'yes';
      } else if (this.editVehicle.status != 'StandBy') {
        this.editVehicle.isStandBy = 'no';
      }
      this.vehicleTypeObject = this.vehicleTypes.filter(x => x.id === this.editVehicle.vehicleType);
      this.vehicleTypeValue = this.vehicleTypeObject[0].vehicleType;
      button.setAttribute('data-target', '#updateVehicleModal');
    }
    if (mode === 'dispose') {
      this.disposeVehicle = vehicle;
      button.setAttribute('data-target', '#disposeVehicleModal');
    }
    if (mode === 'view') {
      this.viewDetail = vehicle;
      this.vehicleTypeObject = this.vehicleTypes.filter(x => x.id === this.viewDetail.vehicleType);
      this.vehicleTypeValue = this.vehicleTypeObject[0].vehicleType;
      this.fuelObject = this.fuelTypes.filter(x => x.id === this.viewDetail.fuelType);
      this.fuelValue = this.fuelObject[0].typeOfFuel;
      button.setAttribute('data-target', '#detailVehicleModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onUpdateVehicle(vehicle: Vehicle): void {
    vehicle.createdBy = sessionStorage.getItem("username");
    this.vehicleService.updateVehicle(vehicle).subscribe(
      (response: Vehicle) => {
        sessionStorage.setItem("updated", "Vehicle Successfully Updated");
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
        this.alertService.errorAlert('Vehicle Could not be Updated.');
        this.router.navigate(['/manageVehicle']);
      }
    );
  }

  public onDisposeVehicle(id: any): void {
    this.vehicleService.disposeVehicle(id).subscribe(
      (response: any) => {
        this.alertService.sucessAlert('Vehicle Successfully Disposed.');
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
        this.alertService.errorAlert('Vehicle Could not be Disposed.');
        window.location.reload();
      }
    );
  }

  isDispatcher() {
    if (sessionStorage.getItem('role') == 'Dispatcher') {
      return true;
    } else {
      return false;
    }
  }

}
