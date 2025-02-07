import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { RequestMaintenance } from 'src/app/types/request-maintenance';
import { Report } from 'src/app/types/RequestReport';
import { awashLogo } from 'src/assets/img/awashlogo';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { RequestMaintenanceService } from '../request-maintenance/request-maintenance.service';


@Component({
  selector: 'app-maintenance-report',
  templateUrl: './maintenance-report.component.html',
  styleUrls: ['./maintenance-report.component.css']
})
export class MaintenanceReportComponent implements OnInit {
  request:Report = new Report();
  isOnView:boolean = false;
  myDate: Date;
  cValue:any;
  private imageData = awashLogo.imageData;
  fileName = 'MaintenanceRequestReport.xlsx';
  report: RequestMaintenance[]=[];
  mydirectorate: string;
  constructor(
    private router:Router,
    private alert:AlertService,
    private requestService:RequestMaintenanceService
  ) { }

  ngOnInit(): void {
    this.myDate = new Date()
    this.cValue = formatDate(this.myDate, 'yyyy-MM-dd', 'en-US');
    this.mydirectorate = sessionStorage.getItem("directorate");
  }
  viewReport(request:Report){
    this.isOnView = true;
     request.directorate = this.mydirectorate;
    this.requestService.getReportOfMaintenanceRequests(request).subscribe(
      (res:RequestMaintenance[])=>{
         this.report = res;
         setTimeout(()=>{                      
          $('#MaintenanceRequestTable').DataTable( {
            autoWidth: false,
            retrieve: true,
            paging:false,
            searching:true
        } );
        }, 1);      
      },
      (error:HttpErrorResponse)=>{
        this.alert.errorAlert("Server Error")
      }
    );
}
printExcel(): void {
  let excels = document.getElementById('MaintenanceRequestTable');
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
    { width: 20 }
  ]; //set col. widths
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, this.fileName);
}
printPDF() {
  const doc = new jsPDF('p', 'px');
  let logo = null;

  debugger;
  var pdf = new jsPDF();
  var img = new Image();
  const imagedata = this.imageData;

  doc.addImage(imagedata, 'GIF', 10, 10, 80, 17);
  // doc.page=1;
  // function footer(){
  // doc.text(150,285, 'page ' + doc.page);
  // doc.page ++;
  // };
  doc.setFontSize(10);
  doc.setTextColor(20);
  doc.text(this.request.directorate+"\'s Maintenance Requests", 100, 17, { baseline: 'middle' });
  doc.text("Date: "+this.cValue, 370, 17, { baseline: 'middle' });
  doc.text("____________________________________________________________________________________________________________",0,28);
  autoTable(
    doc,

    {
      html: '#MaintenanceRequestTable',
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
      tableLineColor: [124, 95, 240], tableLineWidth: 0.1,
      margin:{
        top:50,
        left: 4,
        right:4
      }
    }
  );
  doc.save('MaintenanceRequestReport');
}

print(){
  //var divToPrint=document.getElementById("ServiceDataTable");
  var divToPrint = document.getElementById('MaintenanceRequestTable');
  var htmlToPrint = '' +
      '<style type="text/css">' +
      'table, th, td {' +
      'border:1px solid #000;' +
      'border-collapse: collapse;' +
      '}' +
      '</style>';
  htmlToPrint += divToPrint.outerHTML;
  const newWin = window.open("");
  newWin.document.write(htmlToPrint);
  newWin.print();
  newWin.close();
  window.location.reload();
}
  changeView(){
    this.isOnView = false;
    this.request.from = null;
    this.request.to = null;
    this.request.reportType = null;
  }
}
