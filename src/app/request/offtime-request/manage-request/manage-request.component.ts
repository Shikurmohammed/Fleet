import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { AuthService } from 'src/app/auth/auth.service';
import { OffTimeRequest } from 'src/app/types/offTimeRequest';
import { OfftimeRequestService } from '../offtime-request.service';

@Component({
  selector: 'app-manage-request',
  templateUrl: './manage-request.component.html',
  styleUrls: ['./manage-request.component.css'],
})
export class ManageRequestComponent implements OnInit {
  public requests: OffTimeRequest[] = [];
  data: any = [];
  userName: any;
  reasonForRequest: string;
  reqId: number;
  reqDetail: OffTimeRequest;
  hasData: Boolean = false;
  noData: boolean = false;
  noDatamessage: string;

  constructor(
    private offTimeService: OfftimeRequestService,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  isAuthenticated() {
    return this.authService.isAuthenticated;
  }

  ngOnInit(): void {
    this.getRequestOnDataTable();
  }

  public getRequestOnDataTable(): void {
    this.userName = sessionStorage.getItem('username');
    console.log('user name is: ' + this.userName);
    this.offTimeService
      .getRequests(this.userName)
      .subscribe((ret: OffTimeRequest[]) => {
        this.data = ret;
        if (this.data.length == 0) {
          this.noDatamessage = 'No Requests Found.';
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
            order: [[1, 'asc']],
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
      this.reasonForRequest = data;
      button.setAttribute('data-target', '#reasonModal');
    }
    if (mode === 'cancel') {
      this.reqId = data;
      button.setAttribute('data-target', '#cancelModal');
    }
    if (mode === 'detail') {
      this.reqDetail = data;
      button.setAttribute('data-target', '#detailModal');
    }
    container?.appendChild(button);
    button.click();
  }

  EditRequest(reqId: number) {
    let url: string = '/editRequest/' + reqId;
    this.router.navigate([url]);
  }

  cancelRequest(reqId: number) {
    this.offTimeService.cancelOffTimeRequest(reqId).subscribe({
      next: () => {
        this.alertService.sucessAlert('Request Successfully Cancelled.');
      },
      error: () => {
        this.alertService.errorAlert('Request Could not be Canceled.');
      },
    });
    location.reload();
  }

  print(id: number) {
    this.router.navigate(['printOfftime', id]);
  }
}
