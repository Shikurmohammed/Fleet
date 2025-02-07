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
import { jqxDataTableComponent } from 'jqwidgets-ng/jqxdatatable';
import { awashLogo } from 'src/assets/img/awashlogo';
import { formatDate } from '@angular/common';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-print-field',
  templateUrl: './print-field.component.html',
  styleUrls: ['./print-field.component.css']
})
export class PrintFieldComponent implements OnInit {
  @ViewChild('myDataTable', { static: false }) myDataTable: jqxDataTableComponent;
// printdetail: Fielddispatcher[];
printdetail:any;
requester: any;
vehicleTypes:any;

requestedBy: any;
approvedBy: any;
estimatedfuelRequired:any;

export:Fielddispatcher[]=[];
 dispatch: Fielddispatcher = new Fielddispatcher();
 dispatcher:any;
 id:number;
 driverphone: string="";
 residencePlace: string="";
 driverName: string="";
 fileName = "approvedFieldRequest.xlsx";
 source:any={};
 dataAdapter: any = new jqx.dataAdapter(this.source);
 columns :any[] = [];
  dateToday: string;
  time = new Date();
  intervalId;
  dotval:any;
  private imageData = awashLogo.imageData;
  myDate: Date;
  cValue: any;
  plateNo: string;
  directorate: string;
  reqdate: string;
  departureDate: string;
  returnDate: string;
  destBranch: string;
  destCity: string;
  purpose: string;
  destKM: number;
  noOfDaysRequested: number;
  materialloaded: number;
  expence: string;
  requestedFor: string;
  passengers: string;
  vetypes: number;
  role: string;
  requestedTime: import("ngx-ui-loader").Time;
  passTelephone: string;
  constructor(
    private router: Router,
    private fieldService: FieldService,
    private alert: AlertService,
    private routes: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.myDate = new Date()
    this.cValue = formatDate(this.myDate, 'yyyy-MM-dd', 'en-US');
    this.role = sessionStorage.getItem("role");
    this.id = this.routes.snapshot.params['id'];
    this.dateToday = new Date().toISOString();
  this.getDispatcherByRequesterID();
  this.intervalId = setInterval(() => {
    this.time = new Date();
  }, 1000);
  }
  getDispatcherByRequesterID(){
    this.fieldService.getDispatcherByRequesterID(this.id).subscribe(
       (res)=>{
       // console.log(res.vehicleType);
       this.requestedBy = res.requestedBy;
       this.approvedBy = res.approvedBy
       this.estimatedfuelRequired = res.estimatedfuelRequired;
       this.driverName = res.driverName;
       this.plateNo = res.plateNo;
       this.vetypes = res.vehicleType;
            this.fieldService.getDriverByFullname(res.driverName).subscribe(
                  (driv)=>{
                     this.driverphone = driv.tellNo;
                     this.residencePlace = driv.residentPlace;
                  },
                  (error: HttpErrorResponse)=>{
                    console.log("error");
                  }
            );
            this.fieldService.getVehicleTypeByID(res.vehicleType).subscribe({
                  next:(typ)=>{
                    //console.log(typ);
                       this.vehicleTypes =typ.vehicleType;
                  },
                  error:()=>{
                    console.log("unable to get vehicle type by this id");
                  }
            });
            this.fieldService.getRequestByID(this.id).subscribe(
              (req)=>{
                 this.directorate = req.directorate;
                 this.reqdate = req.date;
                 this.departureDate = req.departureDate;
                 this.returnDate = req.returnDate;
                 this.destBranch = req.destBranch;
                 this.destCity = req.destCity;
                 this.purpose = req.purpose;
                 this.destKM = req.destKM;
                 this.noOfDaysRequested = req.noOfDaysRequested;
                 this.materialloaded = req.materialloaded;
                 this.expence = req.expence;
                 this.requestedFor = req.requestedFor;
                 this.passengers = req.passengers;
                 this.requestedTime = req.requestedTime;
                 this.passTelephone = req.passTelephone;
              },
              (error: HttpErrorResponse)=>{
                console.log("error");
              }
        );

       },
       (error: HttpErrorResponse)=>{
            this.alert.errorAlert("Unable to fetch data");
       }
    );
  }
  goBack(){
    if(this.role == 'Requester'){
      this.router.navigate(['myfieldrequest']);
    }else{
      this.router.navigate(['dispactherFieldPrint']);
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
  // getApproval
  // getDispatcherByRequesterID(){
  //   this.fieldService.getApproval().subscribe({
  //     next:(res: Fielddispatcher[])=>{
  //          this.printdetail = res;
  //         // console.log(res);
  //         this.export = res;


  //     },
  //     error:()=>{
  //       this.alert.errorAlert("Unable To Fetch Dispatcher Data");
  //     }
  //   });
  //   this.fieldService.getDispatcherByRequesterID(this.id).subscribe({
  //     next:(dat)=>{
  //   this.fieldService.getDriverByFullname(dat.driverName).subscribe({
  //      next:(rest)=>{
  //         this.driverphone = rest.tellNo;
  //         this.residencePlace = rest.residentPlace;
  //         this.lisenceNo = rest.licenseNo
  //      },
  //      error:()=>{
  //       console.log("error");
  //      }
  //   });
  //     },
  //     error:()=>{
  //       console.log("errors");
  //     }
  //        });
  // }

 }
