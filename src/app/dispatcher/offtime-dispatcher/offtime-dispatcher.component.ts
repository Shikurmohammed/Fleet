import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OfftimeRequestService } from 'src/app/request/offtime-request/offtime-request.service';
import { OffTimeDispatch } from 'src/app/types/offTimeDispatch';
import { OffTimeRequest } from 'src/app/types/offTimeRequest';
import { OfftimeDispatcherService } from './offtime-dispatcher.service';

@Component({
  selector: 'app-offtime-dispatcher',
  templateUrl: './offtime-dispatcher.component.html',
  styleUrls: ['./offtime-dispatcher.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfftimeDispatcherComponent implements OnInit {
  data: any = [];
  hasData: Boolean = false;
  noData: boolean = false;
  noDatamessage: string;

  constructor(
    private offTimeService: OfftimeDispatcherService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getRequestsOnDataTable();
  }

  public getRequestsOnDataTable(): void {
    this.offTimeService
      .getAuthorizedRequests()
      .subscribe((ret: OffTimeRequest[]) => {
        this.data = ret;
        if (this.data.length == 0) {
          this.noDatamessage = 'No Authorized Requests for offTime.';
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
          });
        }, 1);
      });
  }
  /*  public getAllAuthorizedRequests(): void {
    this.offTimeService
      .getAuthorizedRequests()
      .subscribe((ret: OffTimeRequest[]) => {
        this.data = ret;
        if (this.data.length == 0) {
          this.noDatamessage = 'No Authorized Requests for offTime.';
          this.noData = true;
        } else {
          this.hasData = true;
        }
      });
  } */

  fullDetail(id: number) {
    // this.offTimeService.passRequest(request);
    // this.router.navigate(['/manageOfftimeDispatch']);
    this.router.navigate(['manageOfftimeDispatch', id]);
  }
}
