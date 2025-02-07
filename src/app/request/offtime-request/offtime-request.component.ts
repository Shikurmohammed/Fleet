import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/alert.service';
import { OffTimeRequest } from 'src/app/types/offTimeRequest';
import { OfftimeRequestService } from './offtime-request.service';

@Component({
  selector: 'app-offtime-request',
  templateUrl: './offtime-request.component.html',
  styleUrls: ['./offtime-request.component.css'],
})
export class OfftimeRequestComponent implements OnInit {
  directorate: any;
  userName: any;
  date: any;

  id?: string;
  title!: string;
  buttonText!: string;

  OffTimeRequest: OffTimeRequest = new OffTimeRequest();
  form!: FormGroup;
  editMode = false;
  submitted = false;
  phonePattern = '^d{10}$';
  from: Date;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private offTimeReqService: OfftimeRequestService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.directorate = sessionStorage.getItem('directorate');
    this.userName = sessionStorage.getItem('username');

    let today = new Date();
    let pipe = new DatePipe('en-US');
    this.date = pipe.transform(today, 'YYYY-MM-dd');
    this.id = this.route.snapshot.params['id'];

    this.form = this.formBuilder.group({
      id: [''],
      dir: this.directorate,
      userName: this.userName,
      reqDir: [''],
      reqBy: [''],
      date: this.date,
      vehicleNeededFrom: ['', Validators.required],
      vehicleNeededTo: ['', Validators.required],
      nameOfPassengers: ['', Validators.required],
      residentialArea: ['', Validators.required],
      departureDate: ['', Validators.required],
      morningTime: [''],
      nightTime: [''],
      returnDate: ['', Validators.required],
      returnTime: ['', Validators.required],
      km: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{0,2})?$')],
      ],
      reason: ['', [Validators.required, Validators.minLength(7)]],
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      requestedFor:['', Validators.required]
    });

    this.title = 'Off-Time Vehicle Requisition Form';
    this.buttonText = 'Create Request';
    if (this.id) {
      this.title = 'Update Offtime Request';
      this.buttonText = 'Update';
      this.editMode = true;
      this.offTimeReqService
        .getById(this.id)
        .pipe(first())
        .subscribe((x) => {
          this.form.patchValue(x);
        });
    }
  }
  get f() {
    return this.form.controls;
  }
  getDateFrom(datefrom:any)
  {
    this.from = datefrom.target.value;

  }

  clearMorningTime(clear:any){
     this.form.controls['morningTime'].setValue("");
  }
  clearNightTime(clear:any){
    this.form.controls['nightTime'].setValue("");
 }

  offtimeRequest(): void {
    console.log('checking form valid: ' + this.form.valid);
    this.submitted = true;
    if (this.form.valid) {
      if (this.id) {
        this.offTimeReqService
          .update(this.id!, this.form.value)
          .pipe(first())
          .subscribe({
            next: () => {
              this.alertService.sucessAlert('Request Successfully Updated.');
              this.router.navigate(['/manageofftimerequest']);
            },
            error: () => {
              this.alertService.errorAlert('Request Could not be Updated.');
              this.router.navigate(['/manageofftimerequest']);
            },
          });
      } else {
        this.offTimeReqService
          .offTimeRequest(this.form.value)
          .pipe(first())
          .subscribe({
            next: () => {
              this.alertService.sucessAlert('Request Successfully Created.');
              this.router.navigate(['/manageofftimerequest']);
            },
            error: () => {
              this.alertService.errorAlert('Request Could not be Created.');
              this.router.navigate(['/manageofftimerequest']);
            },
          });
      }
      /* this.saveUser()
        .pipe(first())
        .subscribe({
          next: () => {
            this.alertService.sucessAlert('Request Successfully Created.');
            this.router.navigate(['/manageofftimerequest']);
          },
          error: () => {
            this.alertService.errorAlert('Request Could not be Created.');
            this.router.navigate(['/manageofftimerequest']);
          },
        }); */
    }
  }

  /*  private saveUser(): any {
    // create or update user based on id param
    return this.id
      ? this.offTimeReqService.update(this.id!, this.form.value)
      : this.offTimeReqService.offTimeRequest(this.form.value);
  } */
}
