import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-vehicle-details',
  template: `
        <!-- This is to show vehicles whose service mileage is due -->
    <h6 mat-dialog-title>Vehicle Service Due Details</h6>
    <div mat-dialog-content>
        <div class="row">
              <div class="col-md-6">
                <p>
                  Plate Number: <strong><span>{{ data?.plateNo }}</span></strong>
                </p>
                <p>
                  Model: <strong><span>{{ data?.model }}</span></strong>
                </p>
                <p>
                  Make: <strong><span>{{ data?.make }}</span></strong>
                </p>
                <p>
                  cc: <strong><span>{{ data?.cc }}</span></strong>
                </p>
                <p>
                  Year Of Make: <strong><span>{{ data?.yearOfMake }}</span></strong>
                </p>
                <p>
                  Engine Number: <strong><span>{{ data?.engineNo }}</span></strong>
                </p>
                <p>
                  Chassis Number: <strong><span>{{ data?.chassisNo }}</span></strong>
                </p>
              </div>
              <div class="col-md-6">
                <p>
                  Policy Number: <strong><span>{{ data?.policyNo}}</span></strong>
                </p>
                <p>
                  Fuel Type:

                  <strong *ngIf="data?.fuelType == 1"><span>Benzine</span></strong>
                  <strong *ngIf="data?.fuelType == 2"><span>Diesel</span></strong>
                </p>
                <p>
                  Purpose Of Usage: <strong><span>{{ data?.purposeOfUsage }}</span></strong>
                </p>
                <p>
                  Distance Per Littre: <strong><span>{{ data?.disPerLit}}</span></strong>
                </p>
                <p>
                  Last Mileage Vehicle Body: <strong><span>{{ data?.lmVehicleBody}}</span></strong>
                </p>
                <p>
                  Carrying Capacity: <strong><span>{{ data?.carryingCapacity}}</span></strong>

                </p>
              </div>
        </div>
    </div>
    <div mat-dialog-actions>
    <button mat-button (click)="onClose()">Close</button>
</div>
  `,
  styles: [
  ]
})
export class VehicleDetailsComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<VehicleDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onClose() {
    this.dialogRef.close();
  }
}
