import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FuelDetail } from 'src/app/types/FuelDetail';
import { VehicleType } from 'src/app/types/VehicleType';
import { VehicleService } from '../../vehicle.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from 'src/app/alert.service';

@Component({
  selector: 'app-dispose-vehicle',
  template: `
<div>
  <div mat-dialog-content>
        <p>
              Are you sure you want to dispose vehicle with plate number
              {{ data?.plateNo }}?
         </p>
        <div mat-dialog-actions>
          <button mat-button (click)="onDisposeVehicle(data?.id)">Yes</button>
          <button mat-button (click)="onClose()">No</button>
        </div>
  </div>


  `,
  styles: [
  ]
})
export class DisposeVehicleComponent implements OnInit {
  vehicleTypes: VehicleType[];
  vehicleTypeObject: VehicleType[] = [];
  vehicleTypeValue: String;
  fuelTypes: FuelDetail[];
  fuelObject: FuelDetail[];
  fuelValue: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
   private dialogRef: MatDialogRef<DisposeVehicleComponent>,
    private vehicleService: VehicleService,
    private alertService: AlertService,) { }

  ngOnInit(): void {
    console.log("Data in dispose")
    console.log(this.data)
  }

  onClose() {
    this.dialogRef.close();
  }

  //Disposing
  public onDisposeVehicle(id: any): void {
    this.vehicleService.disposeVehicle(id).subscribe(
     { next:(response: any) => {
        this.alertService.sucessAlert('Vehicle Successfully Disposed.');
        window.location.reload();
      },
      error:(error: HttpErrorResponse) => {
        //alert(error.message);
       this.alertService.errorAlert('Vehicle Could not be Disposed.');
        window.location.reload();
      }}
    );
  }
}
