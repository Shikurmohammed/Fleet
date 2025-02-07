import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OffTimeDispatch } from 'src/app/types/offTimeDispatch';
import { OffTimeRequest } from 'src/app/types/offTimeRequest';
import { OfftimeDispatcherService } from '../offtime-dispatcher.service';
import { VehicleService } from 'src/app/officer/vehicle/vehicle.service';
import { Vehicle } from 'src/app/types/Vehicle';
import { HttpErrorResponse } from '@angular/common/http';
import { type } from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { VehicleDetail } from 'src/app/types/vehicleDetailDto';
import { first } from 'rxjs';
import { VehicleType } from 'src/app/types/VehicleType';
import { DriverDetail } from 'src/app/types/driverDetail';
import { IncityRequestService } from 'src/app/request/incity-request/incity-request.service';

@Component({
  selector: 'app-offtime-manage-dispatch',
  templateUrl: './offtime-manage-dispatch.component.html',
  styleUrls: ['./offtime-manage-dispatch.component.css'],
})
export class OfftimeManageDispatchComponent implements OnInit {
  request: OffTimeRequest;
  form!: FormGroup;
  userName: any;
  date: any;
  vehicles: Vehicle[];
  driverName: any;
  departureKm: any;
  submitted = false;
  showMessage = false;
  authDate: string;
  vehicleType: VehicleType[] = [];
  drivers: DriverDetail[] = [];
  isAvailable: number = 1;
  alertAvailability: string;
  id: any;

  constructor(
    private formBuilder: FormBuilder,
    private offTimeService: OfftimeDispatcherService,
    private vehicleService: VehicleService,
    private router: Router,
    private alertService: AlertService,
    private routes: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //this.getRequest();
    this.id = this.routes.snapshot.params['id'];
    this.getRequestById(this.id);
    this.getVehicleTypes();
    this.getDrivers();
    this.userName = sessionStorage.getItem('username');

    let today = new Date();
    let pipe = new DatePipe('en-US');
    this.date = pipe.transform(today, 'YYYY-MM-dd');

    this.form = this.formBuilder.group({
      id: [''],
      reqId: this.id,
      appBy: this.userName,
      appDate: this.date,
      kmOnDep: this.departureKm,
      vtype: [''],
      kmOnRet: [''],
      kmDifference: [''],
      date: this.date,
      status: [''],
      reasonForRejection: [''],
      plateNo: ['', Validators.required],
      driverName: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  public getVehicleTypes() {
    this.vehicleService.getVehicleTypes().subscribe(
      (response: VehicleType[]) => {
        this.vehicleType = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getDrivers() {
    this.offTimeService.getDrivers().subscribe(
      (response: DriverDetail[]) => {
        this.drivers = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  getRequest() {
    this.request = this.offTimeService.getRequest();
  }
  getRequestById(id: any) {
    this.offTimeService.getRequestsById(id).subscribe({
      next: (res: OffTimeRequest) => {
        this.request = res;
      },
      error: () => {
        console.log('error');
      },
    });
  }

  public onOpenModal(mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'approve') {
      button.setAttribute('data-target', '#approveRequestModal');
    }
    if (mode === 'reject') {
      button.setAttribute('data-target', '#rejectRequestModal');
    }
    container?.appendChild(button);
    button.click();
    this.form.get('vtype')?.valueChanges.subscribe((f) => {
      this.getVehiclesOnPool(f);
    });
    this.form.get('plateNo')?.valueChanges.subscribe((f) => {
      this.getVehicleDetail(f);
    });
    // this.form.get('driverName')?.valueChanges.subscribe((f) => {
    //   this.checkDriverAvailability(f);
    // });
  }

  public approveRequest(): void {
    this.submitted = true;
    if (this.form.valid) {
      ($('#approveRequestModal') as any).modal('hide');
      this.offTimeService.approveRequest(this.form.value).subscribe({
        next: () => {
          this.alertService.sucessAlert('Request Successfully Approved.');
          this.router.navigate(['/offtimeDispatcher']);
        },
        error: () => {
          this.alertService.errorAlert('Request Could not be Approved.');
          this.router.navigate(['/offtimeDispatcher']);
        },
      });
    }
  }

  public rejectRequest(reason: string): void {
    if (reason === '') {
      this.showMessage = true;
    } else {
      ($('#rejectRequestModal') as any).modal('hide');
      const formData: FormData = new FormData();
      var rid = this.request.id as unknown as string;

      formData.append('reqId', rid);
      formData.append('reasonForRejection', reason);
      formData.append('approvedBy', this.userName);
      formData.append('approvedDate', this.date);

      console.log('reason for rejection: ' + reason);
      this.offTimeService.rejectRequest(formData).subscribe({
        next: () => {
          this.alertService.sucessAlert('Request Successfully Rejected.');
          this.router.navigate(['/offtimeDispatcher']);
        },
        error: () => {
          this.alertService.errorAlert('Request Could not be Rejected.');
          this.router.navigate(['/offtimeDispatcher']);
        },
      });
    }
  }

  public getVehiclesOnPool(vType: any) {
    this.vehicleService.getVehiclesOnPool(vType).subscribe(
      (response: Vehicle[]) => {
        this.vehicles = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getVehicleDetail(plateNo: any) {
    this.offTimeService.getVehicleDetail(plateNo).subscribe(
      (response: VehicleDetail) => {
        this.driverName = response.driverName;
        this.departureKm = response.kmOnDep;
      },
      (error: HttpErrorResponse) => {
        this.driverName='';
      }
    );
  }

  public checkDriverAvailability(driverName: string) {
    if(driverName!=''){
      this.offTimeService.checkDriverAvailability(driverName).subscribe(
        (response: number) => {
          this.isAvailable = response;
  
          this.alertAvailability =
            'Driver is currently Assigned to another Request';
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }
  backView() {
    this.router.navigate(['offtimeDispatcher']);
  }
}
