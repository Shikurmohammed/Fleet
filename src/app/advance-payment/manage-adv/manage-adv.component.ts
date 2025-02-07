import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { AdvancePayment } from 'src/app/types/AdvancePayment';
import { AdvanceService } from '../advance.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-manage-adv',
  templateUrl: './manage-adv.component.html',
  styleUrls: ['./manage-adv.component.css'],
})
export class ManageAdvComponent implements OnInit {
  hasData: Boolean = false;
  noData: boolean = false;
  noDatamessage: string;
  userName: any;
  data: any = [];
  reasonForRejection: any;
  advId: any;
  advDetail: any;

  constructor(
    private advService: AdvanceService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getAdvancedOnDataTable();

    if (sessionStorage.getItem('advcancel') != null) {
      this.alertService.sucessAlert(sessionStorage.getItem('advcancel'));
      sessionStorage.removeItem('advcancel');
    }
  }
  printDetail(id:number){
    this.router.navigate(['printSettlement',id]);
   }
  public getAdvancedOnDataTable(): void {
    this.userName = sessionStorage.getItem('username');
    this.advService
      .getAdvancePayments(this.userName)
      .subscribe((ret: AdvancePayment[]) => {
        this.data = ret;
        if (this.data.length == 0) {
          this.noDatamessage = 'No Advance Payment Found.';
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
            order: [[0, 'desc']],
          });
        }, 1);
      });
  }

  public onOpenModal(data: any, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'reason') {
      this.reasonForRejection = data;
      button.setAttribute('data-target', '#reasonModal');
    }
    if (mode === 'cancel') {
      this.advId = data;
      button.setAttribute('data-target', '#cancelModal');
    }
    if (mode === 'detail') {
      //this.advDetail = data;
      this.AdvDetail(data);
      button.setAttribute('data-target', '#detailModal');
    }
    container?.appendChild(button);
    button.click();
  }

  AdvDetail(reqId: any) {
    this.advService.getAdvDetail(reqId).subscribe((ret) => {
      this.advDetail = ret;
    });
  }
  EditRequest(reqId: number) {
    let url: string = '/editAdv/' + reqId;
    this.router.navigate([url]);
  }

  cancelRequest(reqId: number) {
    this.advService.cancelAdvanceRequest(reqId).subscribe({
      next: () => {
        sessionStorage.setItem(
          'advcancel',
          'Advanced Payment Request Successfully Cancelled.'
        );
      },
      error: () => {
        this.alertService.errorAlert(
          'Advanced Payment Request Could not be Canceled.'
        );
      },
    });
  }
}
