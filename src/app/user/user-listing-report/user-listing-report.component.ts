import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { UserType } from 'src/app/types/UserType';
import { UserService } from '../user.service';

import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe, formatDate } from '@angular/common';
import { NgForm } from '@angular/forms';
import { RequestMaintenance } from 'src/app/types/request-maintenance';
import { Report } from 'src/app/types/RequestReport';
import { awashLogo } from 'src/assets/img/awashlogo';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-user-listing-report',
  templateUrl: './user-listing-report.component.html',
  styleUrls: ['./user-listing-report.component.css']
})
export class UserListingReportComponent implements OnInit {
  public users: UserType[] = [];
  public editUser: UserType | undefined;
  public deactivateUser: UserType | undefined;
  public details:UserType|undefined;
  directorates: any;
  data: any = [];
  myDate: Date;
  cValue:any;
  private imageData = awashLogo.imageData;
  fileName = 'UserProfileReport.xlsx';
  constructor(
    private userService: UserService,
    private route: Router,
    private alert:AlertService
  ) {}
  ngOnInit(): void {
    this.myDate = new Date()
    this.cValue = formatDate(this.myDate, 'yyyy-MM-dd', 'en-US');
    this.getUserOnDataTable();
  }

  //To display user data on data tables
  public getUserOnDataTable(): void {
    this.userService.getUsers().subscribe((ret: UserType[]) => {
      this.data = ret;
      setTimeout(() => {
        $('#datatableexample').DataTable({
 
          autoWidth: false,
          retrieve: true,
          paging:true,
          searching:true,
          
          
        });
      }, 1);
    });
  }
  printExcel(): void {
    let excels = document.getElementById('datatableexample');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(excels);
  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    ws['!cols'] = [{ width: 30 }, { width: 30 }, { width: 30 }]; //set col. widths
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
    doc.text("User Profile Listing Report", 140, 17, { baseline: 'middle' });
    doc.text("Date: "+this.cValue, 340, 17, { baseline: 'middle' });
    doc.text("____________________________________________________________________________________________________________",0,28);
    autoTable(
      doc,
  
      {
        html: '#datatableexample',
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
    doc.save('UserProfileListing');
  }
  
  print(){
    //var divToPrint=document.getElementById("ServiceDataTable");
    var divToPrint = document.getElementById('datatableexample');
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
