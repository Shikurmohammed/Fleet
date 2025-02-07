import { Component, OnInit } from '@angular/core';
import { AdvanceService } from '../advance.service';
import { AdvancePayment } from 'src/app/types/AdvancePayment';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from 'src/app/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorize-adv',
  templateUrl: './authorize-adv.component.html',
  styleUrls: ['./authorize-adv.component.css'],
})
export class AuthorizeAdvComponent implements OnInit {
  advPayments: any = [];
  public advAuthorize: AdvancePayment | undefined;
  public rejectAdv: AdvancePayment | undefined;
  public advDetail: AdvancePayment | undefined;
  directorate: any;
  authusername:any;

  constructor(
    private advService: AdvanceService,
    private alert: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.directorate = sessionStorage.getItem('directorate');
    this.authusername=sessionStorage.getItem('username');
    this.getAdvPaymentsOnDataTable();
  }
  public getAdvPaymentsOnDataTable(): void {
    this.advService
      .getAdvPayments(this.authusername)
      .subscribe((ret: AdvancePayment[]) => {
        this.advPayments = ret;

        setTimeout(() => {
          $('#AdvDataTable').DataTable({
            pagingType: 'full_numbers',
            pageLength: 5,
            autoWidth: false,
            retrieve: true,
            processing: true,
            lengthMenu: [5, 10, 25],
            order: [[1, 'asc']],
          });
        }, 1);
      });
  }

  public authorizeAdvPayment(adv: AdvancePayment) {
    var approver = sessionStorage.getItem('username');
    adv.approvedBy = approver!;
    this.advService.authorizeAdvPayment(adv).subscribe(
      (ret: AdvancePayment) => {
        this.alert.sucessAlert(
          'You Have Successfully Authorized Advance Payment Request.'
        );
        this.getAdvPaymentsOnDataTable();
      },
      (error: HttpErrorResponse) => {
        this.alert.errorAlert('Server Error');
      }
    );
  }

  public onRejectAdvPayment(adv: AdvancePayment) {
    var approver = sessionStorage.getItem('username');
    adv.approvedBy = approver!;

    this.advService.rejectAdvPayment(adv).subscribe(
      (ret: AdvancePayment) => {
        this.alert.sucessAlert(
          'You Have Successfully Rejected Advance Payment Request.'
        );
        this.getAdvPaymentsOnDataTable();
      },
      (error: HttpErrorResponse) => {
        this.alert.errorAlert('Server Error');
      }
    );
  }

  public onOpenModal(adv: AdvancePayment, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'authorize') {
      this.advAuthorize = adv;
      button.setAttribute('data-target', '#authorizeModal');
    }
    if (mode === 'reject') {
      this.rejectAdv = adv;
      button.setAttribute('data-target', '#rejectModal');
    }
    if (mode === 'view') {
      //this.advDetail = adv;
      this.AdvDetail(adv);
      button.setAttribute('data-target', '#detailsModal');
    }
    container?.appendChild(button);
    button.click();
  }
  AdvDetail(reqId: any) {
    this.advService.getAdvDetail(reqId).subscribe((ret) => {
      this.advDetail = ret;
    });
  }
}
