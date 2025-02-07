import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from 'src/app/alert.service';
import { FieldService } from 'src/app/request/field/field.service';
import { Fielddispatcher } from 'src/app/types/fielddispatcher';
import { Router, ActivatedRoute } from '@angular/router';
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

@Component({
  selector: 'app-advance-print',
  templateUrl: './advance-print.component.html',
  styleUrls: ['./advance-print.component.css']
})
export class AdvancePrintComponent implements OnInit {

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
  distPerLittre: number;
  salary: number;
  doubleKm: number;
  perdiem: number;
  grandTotal: number;
  cashAdvance: number;
  cashTotal: number;
  departureKm: number;
  returnKm: number;
  kmDifference: number;
  littresInBirr: number;
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
         this.distPerLittre = res.distancePerLitter;
         this.salary = res.salary;
         this.doubleKm = res.doubleTrip;
         this.perdiem = res.perdiemPerDay;
         this.grandTotal = res.grandTotal;
         this.cashAdvance = res.cashAdvancedTo;
         this.cashTotal = this.grandTotal + this.cashAdvance;
         this.departureKm = res.kmReadingOnDeparture;
         this.returnKm = this.departureKm + this.doubleKm;
         this.kmDifference = this.doubleKm;
         this.littresInBirr = res.littresInBirr;
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
        this.router.navigate(['modifyFieldDispatch']);
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
       doc.text("Advance Payment Form", 140, 17, { baseline: 'middle' });
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
        doc.save("advacnePaymentForm");
    }

}
