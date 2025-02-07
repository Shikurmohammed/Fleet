import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { AuthService } from 'src/app/auth/auth.service';
import { OfftimeRequestService } from 'src/app/request/offtime-request/offtime-request.service';
import { OffTimeRequest } from 'src/app/types/offTimeRequest';
import { PrintService } from '../print.service';

@Component({
  selector: 'app-offtime',
  templateUrl: './offtime.component.html',
  styleUrls: ['./offtime.component.css']
})
export class OfftimeComponent implements OnInit {
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
    private printService: PrintService,
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
    this.printService
      .getApprovedRequests()
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
            order: [[0, 'desc']],
            });
        }, 1);
      });
  }

  print(id: number) {
    this.router.navigate(['printOfftime', id]);
  }

}
