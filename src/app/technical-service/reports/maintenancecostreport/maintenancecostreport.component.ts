import { NgForm } from '@angular/forms';
import { AlertService } from './../../../alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FieldService } from './../../../request/field/field.service';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Maintenancecompletion } from 'src/app/types/maintenancecompletion';
import { Costreport } from 'src/app/types/maintenancecostreport/costreport';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { awashLogo } from 'src/assets/img/awashlogo';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-maintenancecostreport',
  templateUrl: './maintenancecostreport.component.html',
  styleUrls: ['./maintenancecostreport.component.css']
})
export class MaintenancecostreportComponent implements OnInit {

  vals: any;
  months: string;
  subMonth: string;
  years: string;
  subYear: string;
  isMonthSelected: boolean= false;
  isYearSelected: boolean= false;
  isAllSelected: boolean= false;
  selectedValue: any;
  maintenanceconst: Costreport= new Costreport();
  maintenance: Maintenancecompletion[]=[];
  monthlymaintenance: Maintenancecompletion[]=[];
  plateNomaintenance:Maintenancecompletion=new Maintenancecompletion();
  yearlymaintenance: Maintenancecompletion[]=[];
  totalCount: any;
  reportlength: number;
  reporyeartlength: number;
  allreportlength: number;
  totalmonthlycount: any;
  totalyearlycount: any;
  dateToday: string;
  time = new Date();
  isMonthlyShown: boolean=false;
  isPlateNoShown:boolean=false;
  isYearlyShown: boolean=false;
  isAllShown: boolean =false;
  private imageData = awashLogo.imageData;
  intervalId;
  myDate: Date;
  cValue: any;
  monthfileName = "monthlyCostReport.xlsx";
  yearfileName = "yearlyCostReport.xlsx";
  allfileName = "allCostReport.xlsx";
  plate: number;
  plateNo:string;
  plateVals: string;
  constructor(
    private fieldService: FieldService,
   private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.myDate = new Date()
    this.cValue = formatDate(this.myDate, 'yyyy-MM-dd', 'en-US');
    this.dateToday = new Date().toISOString();
    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);
    $("#allcostcard").hide();
  }
  yearlyPDF(){
    const doc = new jsPDF('portrait','px','a4');
    const imagedata = this.imageData;

    doc.addImage(imagedata, 'GIF', 10, 10, 80, 17);
    doc.setFontSize(10);
    doc.setTextColor(20);
    doc.text("Yearly Vehicle Maintenance Cost Report", 140, 17, { baseline: 'middle' });
    doc.text("Date: "+this.cValue, 340, 17, { baseline: 'middle' });
    doc.text("____________________________________________________________________________________________________________",0,28);
    autoTable(doc,{
        html: '#costreportbyyearrange',
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
    doc.save('yearlyMaintenanceCost');
  }
  monthlyPDF(){
    const doc = new jsPDF('portrait','px','a4');
    const imagedata = this.imageData;

    doc.addImage(imagedata, 'GIF', 10, 10, 80, 17);
    doc.setFontSize(10);
    doc.setTextColor(20);
    doc.text("Monthly Vehicle Maintenance Cost Report", 140, 17, { baseline: 'middle' });
    doc.text("Date: "+this.cValue, 340, 17, { baseline: 'middle' });
    doc.text("____________________________________________________________________________________________________________",0,28);
    autoTable(doc,{
        html: '#costreportbymonthrange',
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
    doc.save('monthlyMaintenanceCost');
  }
  yearlyEXCEL(){
    let excels = document.getElementById("costreportbyyearrange");
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(excels);

    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    ws['!cols'] = [ //set col. widths
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },

     ];
    XLSX.utils.book_append_sheet(wb,ws,"Sheet1");
    XLSX.writeFile(wb,this.yearfileName);
  }
  monthlyEXCEL(){
    let excels = document.getElementById("costreportbymonthrange");
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(excels);

    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    ws['!cols'] = [ //set col. widths
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },

     ];
    XLSX.utils.book_append_sheet(wb,ws,"Sheet1");
    XLSX.writeFile(wb,this.monthfileName);
  }
  monthlyPrint(){
     var divToPrint = document.getElementById('costreportbymonthrange');
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
       location.reload();
  }
  yearPrint(){
   var divToPrint = document.getElementById('costreportbyyearrange');
   var htmlToPrint = '' +
   '<style type="text/css">' +
   'table, th, td {' +
   'border:1px solid #000;' +
   'border-collapse: collapse;' +
   '}' +
   'table{'+
   'width: 100%;'+
  '}'+

   '</style>';
   htmlToPrint += divToPrint.outerHTML;
   const newWin = window.open('  ', '  ', 'width=' + '1024px' + ', height=' + '800px');
  newWin.document.write(htmlToPrint);
  newWin.print();
  newWin.close();
 location.reload();
  }
  allPrint(){
   // window.print();
   var divToPrint = document.getElementById('allCostReport');
   var htmlToPrint = '' +
   '<style type="text/css">' +
   'table, th, td {' +
   'border:1px solid #000;' +
   'border-collapse: collapse;' +
   '}' +
   'table{'+
   'width: 100%;'+
  '}'+

   '</style>';
   htmlToPrint += divToPrint.outerHTML;
   const newWin = window.open('  ', '  ', 'width=' + '1024px' + ', height=' + '800px');
  newWin.document.write(htmlToPrint);
  newWin.print();
  newWin.close();
 location.reload();
  }
  allEXCEL(){
    let excels = document.getElementById("allCostReport");
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(excels);

    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    ws['!cols'] = [ //set col. widths
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },

     ];
    XLSX.utils.book_append_sheet(wb,ws,"Sheet1");
    XLSX.writeFile(wb,this.allfileName);
  }
  allPDF(){
    const doc = new jsPDF('portrait','px','a4');
    const imagedata = this.imageData;

    doc.addImage(imagedata, 'GIF', 10, 10, 80, 17);
    doc.setFontSize(10);
    doc.setTextColor(20);
    doc.text("All Vehicle Maintenance Cost Report", 140, 17, { baseline: 'middle' });
    doc.text("Date: "+this.cValue, 340, 17, { baseline: 'middle' });
    doc.text("____________________________________________________________________________________________________________",0,28);
    autoTable(doc,{
        html: '#allCostReport',
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
    doc.save('allMaintenanceCost');
  }

  monthlyReport(monthly: NgForm){

    this.months = monthly.controls.fromMonth.value;
   // this.subMonth = this.months.substring(5);
    this.subMonth = formatDate(this.months, 'MMMM', 'en-US');
    //console.log(this.subMonth);
    this.isMonthlyShown = true;
    this.fieldService.getMaintenanceCompleteByMonthRange(monthly.value).subscribe(
      (month)=>{
         this.monthlymaintenance = month;
         this.reportlength = month.length;
         this.isMonthlyShown = true;
         this.isAllShown = false;
         this.isYearlyShown = false;
        // console.log(this.monthlymaintenance);
          setTimeout(() => {
            $('#costreportbymonthrange').DataTable({
              autoWidth: false,
                  retrieve: true,
                  paging:false,
                  searching:true
            });
          }, 1);
      },
      (error: HttpErrorResponse)=>{
        console.log(error);
      }
    );
    this.fieldService.totalMonthlyCost(monthly.value).subscribe(
      (month)=>{
         this.totalmonthlycount = month;
      },
      (error: HttpErrorResponse)=>{
        console.log(error);
      }
    );
  }

  byPlateNoReport(monthly: NgForm){
    //console.log(monthly.value);
    this.isPlateNoShown = true;
    this.fieldService.getMaintenanceCompleteByPlateNo(monthly.value).subscribe(
      (month)=>{
        this.monthlymaintenance = month;
        console.log(this.monthlymaintenance);
         this.reportlength = month.length;
         this.isPlateNoShown = true;
         this.isAllShown = false;
         this.isYearlyShown = false;
         this.isMonthlyShown = false;
          setTimeout(() => {
            $('#costreportbymonthrange').DataTable({
              autoWidth: false,
                  retrieve: true,
                  paging:false,
                  searching:true
            });
          }, 1);
      },
      (error: HttpErrorResponse)=>{
        console.log(error);
      }
    );

    this.fieldService.totalPlateNoCost(monthly.value).subscribe(
      (month)=>{
         this.totalmonthlycount = month;
         console.log(month);
      },
      (error: HttpErrorResponse)=>{
        console.log(error);
      }
    );
  }

  yearlyReport(yearly: NgForm){
    this.years = yearly.controls.fromYear.value;
    
    // this.subMonth = this.months.substring(5);
     this.subYear = formatDate(this.years, 'yyyy', 'en-US');
    this.fieldService.getMaintenanceCompleteByYearRange(yearly.value).subscribe(
      (year)=>{
         this.yearlymaintenance = year;
         this.reporyeartlength = year.length;
         this.isYearlyShown = true;
         this.isMonthlyShown = false;
         this.isAllShown = false;
         setTimeout(() => {
          $('#costreportbyyearrange').DataTable({
            autoWidth: false,
            retrieve: true,
            paging:false,
            searching:true
          });
        }, 1);
      },
      (error: HttpErrorResponse)=>{
        console.log(error);
      }
    );
    this.fieldService.totalYearlyCost(yearly.value).subscribe(
      (month)=>{
         this.totalyearlycount = month;
      },
      (error: HttpErrorResponse)=>{
        console.log(error);
      }
    );
  }

  getMaintenanceCostReport(){
      this.fieldService.getMaintenanceComplete().subscribe({
        next:(resp)=>{
          this.maintenance = resp;
          this.allreportlength = resp.length;
          this.isAllShown = true;
          this.isMonthlyShown = false;
         this.isYearlyShown = false;
          setTimeout(() => {
            $('#allCostReport').DataTable({
              autoWidth: false,
              retrieve: true,
              paging:false,
              searching:true
            });
          }, 1);
        },
        error:()=>{
          this.alert.errorAlert("Unable to fetch maintenance Cost");
        }

  });
      this.fieldService.maintenanceCostCount().subscribe({
       next: (response)=>{
           this.totalCount = response;
           console.log("total cost is " +this.totalCount);
        },
       error: ()=>{
          this.alert.errorAlert("Unable To Count Maintenance Cost");
        }
  });
  }

  onPlateNoSelect(){
    if(this.plateVals == "plate"){
      this.plate = 1;
    }else{
      this.plate = 0;
    }
  }

  onSelect(){
    this.selectedValue = this.vals;
   // console.log(this.vals);
 if(this.vals == 'AllCost'){
    
  this.getMaintenanceCostReport();

    $("#allcostcard").show();
    $("#allaction").show();
    $(".yearlyfilter").hide();
    $(".monthfilter").hide();
    $("#costreportbymonthrange").hide();
    $("#costreportbyyearrange").hide();
    $("#monthaction").hide();
    $("#yearaction").hide();
   $("#nomonth").hide();
    $("#noyear").hide();
   // $("#noall").hide();


 }
 else if(this.vals =='Monthly'){
  $(document).ready(function(){
    $(".monthfilter").show();
    $("#allcostcard").hide();
    $(".yearlyfilter").hide();
    $("#costreportbyyearrange").hide();
    $("#yearaction").hide();
    $("#allaction").hide();

   // $("#nomonth").hide();
    $("#noyear").hide();
    $("#noall").hide();

   });

 }
 else if(this.vals =='Yearly'){
  $(document).ready(function(){
    $(".yearlyfilter").show();
    $("#allcostcard").hide();
    $(".monthfilter").hide();
    $("#costreportbymonthrange").hide();
    $("#monthaction").hide();
    $("#allaction").hide();
    $("#nomonth").hide();
    //$("#noyear").hide();
    $("#noall").hide();
   });
 }
 else{
  $(document).ready(function(){
    $(".yearlyfilter").hide();
    $("#allcostcard").hide();
    $(".monthfilter").hide();
    $("#costreportbymonthrange").hide();
    $("#monthaction").hide();
    $("#allaction").hide();
    $("#yearaction").hide();
    $("#costreportbyyearrange").hide();

    $("#nomonth").hide();
    $("#noyear").hide();
    $("#noall").hide();
   });
 }
  }



}
