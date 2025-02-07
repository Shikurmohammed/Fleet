import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AlertService } from 'src/app/alert.service';
import { AdvancePayment } from 'src/app/types/AdvancePayment';
import { AdvanceType } from 'src/app/types/AdvanceType';
import { DirectorateType } from 'src/app/types/Directorate';
import { UserService } from 'src/app/user/user.service';
import { AdvanceService } from '../advance.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-adv',
  templateUrl: './create-adv.component.html',
  styleUrls: ['./create-adv.component.css'],
})
export class CreateAdvComponent implements OnInit {
  settlementType: AdvanceType[] = [];
  form!: FormGroup;
  editMode = false;
  submitted = false;

  id?: string;
  title!: string;
  buttonText!: string;

  directorate: any;
  userName: any;
  date: any;

  AdvPayment: AdvancePayment = new AdvancePayment();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private advService: AdvanceService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getSettlementType();
    this.directorate = sessionStorage.getItem('directorate');
    this.userName = sessionStorage.getItem('username');

    let today = new Date();
    let pipe = new DatePipe('en-US');
    this.date = pipe.transform(today, 'YYYY-MM-dd');
    this.id = this.route.snapshot.params['id'];

    this.form = this.formBuilder.group({
      id: [''],
      staffName: ['', Validators.required],
      dir: this.directorate,
      userName: this.userName,
      reqDir: [''],
      reqBy: [''],
      crtDate: this.date,
      staffAcc: ['', Validators.required],
      claimBranch: ['', Validators.required],
      totalAmount: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{0,2})?$')],
      ],
      purpose: ['', Validators.required],
      typeOfSettlment: ['', Validators.required],
      departureDate: ['', Validators.required],
      grade: ['', Validators.required],
      noOfDays: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });

    this.title = 'Create Advance Payment';
    this.buttonText = 'Create';
    if (this.id) {
      this.title = 'Update Advance Payment';
      this.buttonText = 'Update';
      this.editMode = true;
      this.advService
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
  public getSettlementType() {
    this.advService.getSettlementType().subscribe(
      (response: AdvanceType[]) => {
        this.settlementType = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  advPayment(): void {
    this.submitted = true;
    if (this.form.valid) {
      if (this.id) {
        this.advService
          .update(this.id!, this.form.value)
          .pipe(first())
          .subscribe({
            next: () => {
              this.alertService.sucessAlert(
                'Advance Payment Successfully Updated.'
              );
              this.router.navigate(['/advManage']);
            },
            error: () => {
              this.alertService.errorAlert(
                'Advance Payment Could not be Updated.'
              );
              this.router.navigate(['/advManage']);
            },
          });
      } else {
        this.advService
          .createAdv(this.form.value)
          .pipe(first())
          .subscribe({
            next: () => {
              this.alertService.sucessAlert(
                'Advance Payment Successfully Created.'
              );
              this.router.navigate(['/advManage']);
            },
            error: () => {
              this.alertService.errorAlert(
                'Advance Payment Could not be Created.'
              );
              this.router.navigate(['/advManage']);
            },
          });
      }
    }
  }
  goBack() {
    this.router.navigate(['/advManage']);
  }
}
