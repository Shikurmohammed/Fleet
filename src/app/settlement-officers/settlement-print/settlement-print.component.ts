import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from 'src/app/alert.service';
import { FieldService } from 'src/app/request/field/field.service';
import { Fielddispatcher } from 'src/app/types/fielddispatcher';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { style } from '@angular/animations';
import * as XLSX from 'xlsx';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { merge } from 'jquery';
import { awashLogo } from 'src/assets/img/awashlogo';
import { formatDate } from '@angular/common';
import { SettleAdvancePaymentService } from '../settle-advance-payment.service';
import { AdvancePayment } from 'src/app/types/AdvancePayment';
import { ToWords } from 'to-words';
import { UserType } from 'src/app/types/UserType';
import { UserService } from 'src/app/user/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-settlement-print',
  templateUrl: './settlement-print.component.html',
  styleUrls: ['./settlement-print.component.css']
})
export class SettlementPrintComponent implements OnInit {
  printdetail:any;
  
  export:Fielddispatcher[]=[];
   dispatch: Fielddispatcher = new Fielddispatcher();
   dispatcher:any;
   id:number;
   driverphone: string="";
   residencePlace: string="";
   driverName: string="";
   fileName = "approvedFieldRequest.xlsx";
   source:any={};
    dateToday: string;
    time = new Date();
    intervalId;
    dotval:any;
    private imageData = awashLogo.imageData;
    myDate: Date;
    cValue: any;
    role:any;
    plateNo: string;
  settlementdetails: AdvancePayment;
  noOfdays: any;
  amount: string;
  data: UserType[];
  requesterDir: UserType[];
  directorName: String;
    constructor(
      private router: Router,
      private settlementService: SettleAdvancePaymentService,
      private alert: AlertService,
      private routes: ActivatedRoute,
      private userService:UserService
  
    ) { }
  
    ngOnInit(): void {
      this.myDate = new Date()
      this.cValue = formatDate(this.myDate, 'yyyy-MM-dd', 'en-US');
      this.role = sessionStorage.getItem("role");
      this.id = this.routes.snapshot.params['id'];
      this.dateToday = new Date().toISOString();
    this.getSettlementDetailById();
    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);
    }
     toWords = new ToWords({
      localeCode: 'en-US',
      converterOptions: {
        currency: true,
        ignoreDecimal: false,
        ignoreZeroCurrency: false,
        doNotAddOnly: false,
        currencyOptions: { // can be used to override defaults for the selected locale
          name: 'ETB',
          plural: 'ETB',
          symbol: 'ETB',
          fractionalUnit: {
            name: 'cent',
            plural: 'cents',
            symbol: '',
          },
        }
      }
    });

    getUser(approvedBy:string){
      this.userService.getUsers().subscribe((ret: UserType[]) => {
        this.requesterDir = ret.filter(x => x.username === approvedBy);
        this.directorName = this.requesterDir[0].directorate;
      }
      );
    }

    getSettlementDetailById(){
      this.settlementService.getSettlementDetail(this.id).subscribe(
         (res:AdvancePayment)=>{
           this.settlementdetails = res;


           this.noOfdays = this.toWords.convert(this.settlementdetails.noOfDays, {currency:false});
           this.amount = this.toWords.convert(this.settlementdetails.totalAmount);

           this.getUser(res.approvedBy);
        },
         (error:HttpErrorResponse)=>{}
      );
      
    }
    goBack(){
      if(this.role == 'SettlementOfficers'){
        this.router.navigate(['settleAdvancePayment']);
      }else{
        this.router.navigate(['advManage']);
      }
    }
    exportExcel():void{
     let excels = document.getElementById("printApproval");
     const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(excels);
  
     const wb:XLSX.WorkBook = XLSX.utils.book_new();
     ws['!cols'] = [{ width: 30 }, { width: 30 }, { width: 30 } ]; //set col. widths
     XLSX.utils.book_append_sheet(wb,ws,"Sheet1");
     XLSX.writeFile(wb,this.fileName);
  
    }
    print(){
      window.print();
    }
    exportPDF(){
      const doc = new jsPDF('portrait','px','a4');
      const imagedata = this.imageData;
      doc.addImage(imagedata, 'GIF', 10, 10, 80, 17);
       var header = document.getElementById("headerdata");
       doc.setFontSize(10);
       doc.setTextColor(20);
       doc.text("Approved Field Request", 140, 17, { baseline: 'middle' });
       doc.text("Date: "+this.cValue, 340, 17, { baseline: 'middle' });
       doc.text("____________________________________________________________________________________________________________",0,28);
       autoTable(doc,{
        html: '#printApproval',
        theme: 'grid',
        body: [
          [
            {
              content: 'Text',
              colSpan: 2,
              rowSpan: 2,
              styles: {
                 halign: 'center',
  
                 },
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
        doc.save("approvedFieldRequest");
    }

}
