import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RequestMaintenance } from 'src/app/types/request-maintenance';
import { Vehicle } from 'src/app/types/Vehicle';
import { RequestMaintenanceService } from '../request-maintenance.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from 'src/app/alert.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-vehicle-request',
  templateUrl: './vehicle-request.component.html',
  styles: [
  ]
})
export class VehicleRequestComponent implements OnInit {
  requistionForm: any;
  director: any;
  username: any;
  existingKm: number = 0;
  isLessthan: boolean = false;
  constructor(
    private dialogRef: MatDialogRef<VehicleRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private requestService: RequestMaintenanceService,
    private alert: AlertService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.director = sessionStorage.getItem("directorate");
    this.username = sessionStorage.getItem("username");
    // Populate the form with the passed data
    const vehicleData = this.data;
    this.requistionForm = {
      requestedBy: this.username,
      reqDirectorate: this.director,
      //To Get Already Existing Vehicle Details
      plateNo: vehicleData.plateNo,
      //I have corrected the previous milege
      previousServiceMilage: vehicleData.lmVehicleBody,
      currentMilage: vehicleData.lastMilege,
      milageDifference: vehicleData.currentMilage - vehicleData.previousServiceMilage,
      model: vehicleData.model,
      chassisNo: vehicleData.chassisNo,
      engineNo: vehicleData.engineNo,
      previousServiceDate: vehicleData.previousServiceDate,
      existingKm: vehicleData.lastMilege,
    };

  }
  onClose() {
    this.dialogRef.close("vehicle request dialog closing");
  }

  //Submit maintainace request
  onSubmit() {
    this.requestService.sendMaintenanceRequest(this.requistionForm).subscribe({
      next: (res: RequestMaintenance) => {
        sessionStorage.setItem("requested", "Maintenance Request Successfully Sent");
         window.location.reload();
        this.dialogRef.close();
      },
      error: (error: HttpErrorResponse) => {
        this.alert.errorAlert("Server Error");
      }
    })
  }
  //check milege not less than previous
  checkMilege(current: any) {
    if (current.target.value < this.existingKm) {
      this.isLessthan = true;
    } else {
      this.isLessthan = false;
    }
  }
}
