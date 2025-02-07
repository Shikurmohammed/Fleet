import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AlertService } from 'src/app/alert.service';
import { OffTimeRequest } from 'src/app/types/offTimeRequest';
import { OfftimeDispatcherService } from '../offtime-dispatcher.service';

@Component({
  selector: 'app-offtime-modify-dispatched',
  templateUrl: './offtime-modify-dispatched.component.html',
  styleUrls: ['./offtime-modify-dispatched.component.css'],
})
export class OfftimeModifyDispatchedComponent implements OnInit {
  data: any = [];
  hasData: Boolean = false;
  noData: boolean = false;
  noDatamessage: string;
  reqId: any;
  requestDetail: OffTimeRequest;
  authDate: string;
  form!: FormGroup;
  submitted = false;
  kmOnDepInitial: number;
  date: any;
  constructor(
    private offTimeService: OfftimeDispatcherService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getRequestsOnDataTable();

    if (sessionStorage.getItem('dispatchofftmodify') != null) {
      this.alertService.sucessAlert(
        sessionStorage.getItem('dispatchofftmodify')
      );
      sessionStorage.removeItem('dispatchofftmodify');
    }

    let today = new Date();
    let pipe = new DatePipe('en-US');
    this.date = pipe.transform(today, 'YYYY-MM-dd');

    this.form = this.formBuilder.group({
      id: [''],
      reqId: [''],
      appBy: [''],
      appDate: [''],
      kmOnDep: [''],
      kmOnRet: ['', this.customValidator()],
      kmDifference: [''],
      date: [''],
      status: [''],
      reasonForRejection: [''],
      plateNo: [''],
      driverName: [''],
    });
  }

  customValidator() {
    return (control: FormControl) => {
      const form = control.parent;
      if (form) {
        const min = form.get('kmOnDep');
        const max = form.get('kmOnRet');

        //  return min.value && max.value && +max.value < +min.value;
        return +max.value < +min.value ? { error: 'min value' } : null;
      }
    };
  }

  get f() {
    return this.form.controls;
  }

  public getRequestsOnDataTable(): void {
    this.offTimeService
      .getDispatchedRequests()
      .subscribe((ret: OffTimeRequest[]) => {
        this.data = ret;
        if (this.data.length == 0) {
          this.noDatamessage = 'No Dispatched Requests for offTime.';
          this.noData = true;
        } else {
          this.hasData = true;
        }

        setTimeout(() => {
          $('#datatableexample').DataTable({
            pagingType: 'full_numbers',
            pageLength: 5,
            autoWidth: true,
            retrieve: true,
            processing: true,
            lengthMenu: [5, 10, 25],
            order: [[1, 'desc']],
          });
        }, 1);
      });
  }

  public onOpenModal(request: OffTimeRequest, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'detail') {
      this.requestDetail = request;
      //this.authDate = request.authorizedDate.slice(0, 10);
      button.setAttribute('data-target', '#detailRequestModal');
    }
    if (mode === 'modify') {
      //this.modifyDispatched = request;
      this.getById(request);
      button.setAttribute('data-target', '#modifyDispatchedModal');
    }
    container?.appendChild(button);
    button.click();
  }

  getById(id: any) {
    this.reqId = id;
    this.offTimeService
      .getById(id)
      .pipe(first())
      .subscribe((x) => {
        this.form.patchValue(x);

        this.form.patchValue({
          date: this.date,
        });

        this.kmOnDepInitial = x.kmOnDep;
      });
  }
  updateDispatched() {
    this.submitted = true;
    if (this.form.valid) {
      ($('#modifyDispatchedModal') as any).modal('hide');
      this.offTimeService
        .updateDispatched(this.reqId, this.form.value)
        .pipe(first())
        .subscribe({
          next: () => {
            sessionStorage.setItem(
              'dispatchofftmodify',
              'Request Successfully Updated..'
            );
            window.location.reload();
          },
          error: () => {
            this.alertService.errorAlert('Request Could not be Updated.');
          },
        });
    }
  }
}
