import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { DirectorateType } from 'src/app/types/Directorate';
import { VehicleType } from 'src/app/types/VehicleType';
import { UserService } from 'src/app/user/user.service';
import { VehicleService } from './vehicle.service';
import { FuelDetail } from 'src/app/types/FuelDetail';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css'],
})
export class VehicleComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  exists = false;
  directorates: DirectorateType[];
  vehicleTypes: VehicleType[];
  fuelTypes: FuelDetail[];
  constructor(
    private formBuilder: FormBuilder,
    private vehicleService: VehicleService,
    private alertService: AlertService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getDirectorates();
    this.getVehicleTypes();
    this.getFuelType();
    this.form = this.formBuilder.group({
      id: [''],
      model: ['', Validators.required],
      make: ['', Validators.required],
      yearOfMake: ['2020', Validators.required],
      engineNo: ['', Validators.required],
      chassisNo: ['', Validators.required],
      plateNo: [
        '',
        [Validators.required, this.vehicleAlreadyExists.bind(this)],
      ],
      cc: ['', Validators.required],
      fuelType: ['', Validators.required],
      disPerLit: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{0,2})?$')],
      ],
      carryingCapacity: ['', Validators.required],

      lastMilege: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{0,2})?$')],
      ],
      insExpDate: ['', Validators.required],
      insRenewalDate: ['', Validators.required],
      policyNo: ['', Validators.required],

      description: ['', Validators.required],
      purposeOfUsage: ['', Validators.required],
      custodian: ['', Validators.required],
      vehicleTypeString:['', Validators.required],
      owner: [''],
      isStandBy:['no', Validators.required],
      createdBy:['']
    });
  }

  get f() {
    return this.form.controls;
  }
  // isStandBy(reset:any){
  //   this.form.controls.isStandBy.setValue('yes');
  // }
  // notStandBy(reset:any){
  //   this.form.controls.isStandBy.setValue('');
  // }
  vehicleAlreadyExists(control: AbstractControl) {
    this.exists = false;
    if (control.value) {
      this.vehicleService
        .vehicleAlreadyExists(control.value)
        .subscribe((data) => {
          if (data == true) {
            this.exists = true;
            //this line here is very crucial to make the form invalid
            this.f['plateNo'].setErrors({ exist: true });
          }
        });
    }
  }
  addVehicle(): void {
    this.submitted = true;
    this.form.controls.createdBy.setValue(sessionStorage.getItem("username"));
    console.log(this.form.value);
    if (this.form.valid) {
      this.vehicleService.addVehicle(this.form.value).subscribe({
        next: () => {
          this.alertService.sucessAlert('Vehicle Successfully Added.');
          this.router.navigate(['/manageVehicle']);
        },
        error: () => {
          this.alertService.errorAlert('Vehicle Could not be Added.');
          this.router.navigate(['/manageVehicle']);
        },
      });
    } else {
      console.log('form is invalid');
    }
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
}
