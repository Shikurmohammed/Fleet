import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DirectorateType } from 'src/app/types/Directorate';
import { Vehicle } from 'src/app/types/Vehicle';
import { VehicleType } from 'src/app/types/VehicleType';
import { UserService } from 'src/app/user/user.service';
import { VehicleService } from '../../vehicle.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { FuelDetail } from 'src/app/types/FuelDetail';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-update-vehicle',
  templateUrl: './update-vehicle.component.html',
  // styleUrls: ['./update-vehicle.component.css']
})
export class UpdateVehicleComponent implements OnInit {
  role: string;
  isGeneral: boolean;
  vehicleTypes: VehicleType[];
  vehicleTypeObject: VehicleType[] = [];
  vehicleTypeValue: String;
  directorates: DirectorateType[];
  fuelTypes: FuelDetail[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UpdateVehicleComponent>,
    private userService: UserService,
    private vehicleService: VehicleService,
    private router: Router,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.role = sessionStorage.getItem("role");
    setTimeout(() => {
      this.getDirectorates();
      this.getFuelType();
      this.getVehicleTypes();
    }, 3);
  }

  public getDirectorates() {
    this.userService.getDirectorate().subscribe(
      {
        next: (response: DirectorateType[]) => {
          this.directorates = response;
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      }
    );
  }
  public onUpdateVehicle(vehicle: Vehicle): void {
    if (
      this.data.status === 'Assigned to Respective'
      || this.data.status === 'Maintenance'
      || this.data.status === 'Dispatched'
    ) {
      this.isGeneral = false;
    } else {
      this.isGeneral = true;
    }
    if (this.data.status === 'StandBy') {
      this.data.isStandBy = 'yes';
    } else if (this.data.status != 'StandBy') {
      this.data.isStandBy = 'no';
    }
    this.vehicleTypeObject = this.vehicleTypes.filter(x => x.id === this.data.vehicleType);
    this.vehicleTypeValue = this.vehicleTypeObject[0]?.vehicleType;


    vehicle.createdBy = sessionStorage.getItem("username");
    this.vehicleService.updateVehicle(vehicle).subscribe(
      {
        next: (response: Vehicle) => {
          sessionStorage.setItem("updated", "Vehicle Successfully Updated");
          window.location.reload();
        },
        error: (error: HttpErrorResponse) => {
          this.alertService.errorAlert('Vehicle Could not be Updated.');
          this.router.navigate(['/manageVehicle']);
        }
      }
    );
  }

  public getFuelType() {
    this.vehicleService.getFuelType().subscribe(
      {
        next: (response: FuelDetail[]) => {
          this.fuelTypes = response;
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      }
    );
  }
  public getVehicleTypes() {
    this.vehicleService.getVehicleTypes().subscribe(
      {
        next: (response: VehicleType[]) => {
          this.vehicleTypes = response;
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      }
    );
  }
  onClose() {
    this.dialogRef.close();
  }


}
