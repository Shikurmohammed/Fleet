import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { OfftimeDispatcherService } from 'src/app/dispatcher/offtime-dispatcher/offtime-dispatcher.service';
import { OffTimeDispatch } from 'src/app/types/offTimeDispatch';
import { AlertService } from 'src/app/alert.service';
import { OfftimePrintDetail } from 'src/app/types/offTimePrintDetail';
import { awashLogo } from 'src/assets/img/awashlogo';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-print-offtime',
  templateUrl: './print-offtime.component.html',
  styleUrls: ['./print-offtime.component.css'],
})
export class PrintOfftimeComponent implements OnInit {
  printDetail: OfftimePrintDetail;
  id: number;
  fileName = 'approvedOffTimeRequest.xlsx';
  private imageData = awashLogo.imageData;
  dateToday: string;
  time = new Date();
  intervalId;
  cValue: any;
  role: string;
  constructor(
    private router: Router,
    private offtimeService: OfftimeDispatcherService,
    private alertService: AlertService,
    private routes: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.routes.snapshot.params['id'];
    this.role = sessionStorage.getItem("role");
    this.dateToday = new Date().toISOString();

    this.getDispatchedByRequestId();
    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);
    this.cValue = formatDate(this.dateToday, 'yyyy-MM-dd', 'en-US');
  }

  goBack() {
    if(this.role == 'Requester'){
      this.router.navigate(['manageofftimerequest']);
    }else{
      this.router.navigate(['dispactherOfftimePrint']);
    }
  }
  print() {
    window.print();
  }
  printExcel(): void {
    let excels = document.getElementById('printApproval');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(excels);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    ws['!cols'] = [{ width: 30 }, { width: 30 }, { width: 30 }]; //set col. widths
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }
  printPDF() {
    const doc = new jsPDF('portrait', 'px', 'a4');

    const imagedata = this.imageData;

    doc.addImage(imagedata, 'GIF', 30, 10, 80, 17);

    doc.setFontSize(10);
    doc.setTextColor(20);
    doc.text('Approved Off-time Request', 170, 17, {
      baseline: 'middle',
    });
    doc.text('Report Date: ' + this.cValue, 330, 17, { baseline: 'middle' });

    autoTable(
      doc,

      {
        html: '#printApproval',
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
        //startY: 50,
        headStyles: {},
      }
    );

    doc.save('approvedOfftimeRequest');
  }

  getDispatchedByRequestId() {
    this.offtimeService.getApproved(this.id).subscribe({
      next: (res) => {
        this.printDetail = res;
      },
      error: () => {
        this.alertService.errorAlert('Unable to fetch dispatcher data');
      },
    });
  }
}
