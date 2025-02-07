import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { RequestMaintenance } from 'src/app/types/request-maintenance';
import { Report } from 'src/app/types/RequestReport';
import { awashLogo } from 'src/assets/img/awashlogo';
import { MechanicServiceService } from '../../mechanic-service.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-unverified-custodian-request',
  templateUrl: './unverified-custodian-request.component.html',
  styleUrls: ['./unverified-custodian-request.component.css']
})
export class UnverifiedCustodianRequestComponent implements OnInit {

  report:RequestMaintenance[]=[];
  request:Report = new Report();
  isOnView:boolean = false;
  myDate: Date;
  cValue:any;

  fileName = 'UnverifiedCustodianRequests.xlsx';
  private imageData = awashLogo.imageData;
  constructor(
    private alert:AlertService,
    private router:Router,
    private mechanicService:MechanicServiceService
  ) { }

  ngOnInit(): void {
    this.myDate = new Date()
    this.cValue = formatDate(this.myDate, 'yyyy-MM-dd', 'en-US');
  }
  viewUnverified(request:NgForm){
      this.isOnView = true;
      this.mechanicService.getReportOfUnverifiedCustodianRequests(request.value).subscribe(
        (res:RequestMaintenance[])=>{
           this.report = res;
           setTimeout(()=>{                      
            $('#unverifiedRequestTable').DataTable( {
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
  changeView(){
    this.isOnView = false;
  }
  printExcel(): void {
    let excels = document.getElementById('unverifiedRequestTable');
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

    doc.addImage(imagedata, 'GIF', 25, 10, 80, 17);
    // doc.page=1;
    // function footer(){
    // doc.text(150,285, 'page ' + doc.page);
    // doc.page ++;
    // };
    doc.setFontSize(10);
    doc.setTextColor(20);
    doc.text("Unverified Custodians' Maintenance Requests", 130, 17, { baseline: 'middle' });
    doc.text("Report Date: "+this.cValue, 320, 17, { baseline: 'middle' });
    doc.text("____________________________________________________________________________________________________________",0,28);
    autoTable(
      doc,

      {
        html: '#unverifiedRequestTable',
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
    doc.save('unverifiedRequestTable');
  }

  print(){
    //var divToPrint=document.getElementById("ServiceDataTable");
    var divToPrint = document.getElementById('unverifiedRequestTable');
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
}
