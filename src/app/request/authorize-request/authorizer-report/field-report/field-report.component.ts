import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AlertService } from 'src/app/alert.service';
import { AuthReqReport } from 'src/app/types/AuthReqReport';
import { InCityRequest } from 'src/app/types/in-city-request';
import { awashLogo } from 'src/assets/img/awashlogo';
import { ReportService } from '../report.service';
import * as XLSX from 'xlsx';
import { Fieldrequest } from 'src/app/types/fieldrequest';

@Component({
  selector: 'app-field-report',
  templateUrl: './field-report.component.html',
  styleUrls: ['./field-report.component.css'],
})
export class FieldReportComponent implements OnInit {
  requestsReport: any = [];
  report: AuthReqReport = new AuthReqReport();
  hasData: Boolean = false;
  noData: boolean = false;
  noDatamessage: string;
  myDate: Date;
  fileName = 'VehicleRequisition.xlsx';
  cValue: any;
  directorate: any = sessionStorage.getItem('directorate');
  private imageData = awashLogo.imageData;
  constructor(
    private authService: ReportService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.report.listing = 'Authorized';
    this.report.from = null;
    this.report.to = null;
    this.report.directorate = this.directorate;
    this.getRequestsOnDataTable(this.report);
    this.myDate = new Date();
    this.cValue = formatDate(this.myDate, 'yyyy-MM-dd', 'en-US');
  }

  public getRequestsOnDataTable(report: AuthReqReport): void {
    this.authService.getFieldReport(report).subscribe(
      (ret: Fieldrequest[]) => {
        this.requestsReport = ret;

        if (this.requestsReport.length == 0) {
          this.noDatamessage = 'No Requests Found.';
          this.noData = true;
        } else {
          this.noData = false;
          this.hasData = true;
        }
        setTimeout(() => {
          $('#RequestsDataTable').DataTable({
            autoWidth: false,
            retrieve: true,
            paging: false,
            searching: true,
          });
        }, 1);
      },
      (error: HttpErrorResponse) => {
        this.alertService.errorAlert('Server Error');
      }
    );
  }

  onSelectedListing(value: string): void {
    this.report.listing = value;
    this.getRequestsOnDataTable(this.report);
  }

  onSelectedFrom(value: any): void {
    this.report.from = value;
    if (this.report.to != null) {
      this.getRequestsOnDataTable(this.report);
    }
  }
  onSelectedTo(value: any): void {
    this.report.to = value;
    if (this.report.from != null) {
      this.getRequestsOnDataTable(this.report);
    }
  }

  printExcel(): void {
    let excels = document.getElementById('RequestsDataTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(excels);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    ws['!cols'] = [
      { width: 20 }, 
      { width: 20 }, 
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
    ]; //set col. widths
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }
  printPDF() {
    const doc = new jsPDF('p', 'px');

    const imagedata = this.imageData;

    doc.addImage(imagedata, 'GIF', 30, 10, 80, 17);

    doc.setFontSize(10);
    doc.setTextColor(20);
    doc.text(this.report.listing + ' Field Requests', 170, 17, {
      baseline: 'middle',
    });
    doc.text('Report Date: ' + this.cValue, 330, 17, { baseline: 'middle' });
    doc.text("____________________________________________________________________________________________________________",0,28);
    autoTable(
      doc,

      {
        html: '#RequestsDataTable',
        theme: 'grid',
        body: [
          [
            {
              content: 'Text',
              colSpan: 2,
              rowSpan: 2,
              styles: { halign: 'center' },
            },
          ],
        ],
            headStyles: {
              fillColor:[238, 230, 230],
              textColor:[0,0,0]
            },
            footStyles:{
              fillColor:[238, 230, 230],
              textColor:[0,0,0]
            },
            tableLineColor: [124, 95, 240], tableLineWidth: 0.1,
            margin:{
              top:50,
              left: 4,
              right:4
            }   
         }
    );
    doc.save(this.report.listing + 'FieldReport');
  }

  print() {
    var divToPrint = document.getElementById('RequestsDataTable');
    var htmlToPrint =
      '' +
      '<style type="text/css">' +
      'table, th, td {' +
      'border:1px solid #000;' +
      'border-collapse: collapse;' +
      '}' +
      '</style>';

    htmlToPrint += divToPrint.outerHTML;
    const newWin = window.open('');
    newWin.document.write(htmlToPrint);
    newWin.print();
    newWin.close();
    window.location.reload();
  }
}
