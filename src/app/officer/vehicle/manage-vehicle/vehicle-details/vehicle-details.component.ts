import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FuelDetail } from 'src/app/types/FuelDetail';
import { VehicleType } from 'src/app/types/VehicleType';

@Component({
  selector: 'app-vehicle-details',
templateUrl:'./vehicle-details.component.html',
  styleUrls:['./vehicle-details.component.css'],
})
export class VehicleDetailsComponent implements OnInit {

 vehicleTypes: VehicleType[];
  vehicleTypeObject: VehicleType[] = [];
  vehicleTypeValue: String;
  fuelTypes: FuelDetail[];
  fuelObject: FuelDetail[];
  fuelValue: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
   private dialogRef: MatDialogRef<VehicleDetailsComponent>) { }
  ngOnInit(): void {
    console.log("Data in dispose")
    console.log(this.data)
    this.vehicleTypeObject = this.vehicleTypes?.filter(x => x?.id === this.data?.vehicleType);
    this.vehicleTypeValue = this.vehicleTypeObject[0]?.vehicleType;
    this.fuelObject = this.fuelTypes?.filter(x => x?.id === this.data?.fuelType);
    this.fuelValue = this.fuelObject[0]?.typeOfFuel;
  }
  onClose() {
    this.dialogRef.close();
  }

}
