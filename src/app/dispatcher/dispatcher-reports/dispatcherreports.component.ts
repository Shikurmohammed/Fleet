import { Incitydispatch } from 'src/app/types/incitydispatch';

import { Fielddispatcher } from './../../types/fielddispatcher';
import { AlertService } from './../../alert.service';
import { NgForm } from '@angular/forms';
import { DispatchedReport } from './../../types/dispatched-report';
import { FieldService } from 'src/app/request/field/field.service';
import { Component, OnInit } from '@angular/core';
import { OffTimeDispatch } from 'src/app/types/offTimeDispatch';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { awashLogo } from 'src/assets/img/awashlogo';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-dispatcherreports',
  templateUrl: './dispatcherreports.component.html',
  styleUrls: ['./dispatcherreports.component.css']
})
export class DispatcherreportsComponent implements OnInit {
vals: any;
reportranges: any;
myDate: Date;
cValue:any;
fieldlength: number;
allfieldlength: number;
incitylength: number;
allincitylength: number;
offtimelength: number;
allofftimelength: number;
fieldFrom:any;
fieldTo: any
incityFrom: any;
incityTo: any;
offtimeFrom: any;
offtimeTo: any;
isFieldShown: boolean= false;
isIncityShown: boolean= false;
isOfftimeShown: boolean= false;
isAllFieldShown: boolean = false;
isAllIncityShown: boolean = false;
isAllOfftimeShown: boolean = false;
dispatcher: Fielddispatcher[]=[]
incity: Incitydispatch[]=[];
offtime: OffTimeDispatch[]=[];
private imageData = awashLogo.imageData;
fileName = "fieldDispatched.xlsx";
incityfileName = "incityDispatched.xlsx";
offtimefileName = "offtimeDispatched.xlsx";
allfieldfilename = "allfieldDispatched.xlsx";
allincityfilename = "allincityDispatched.xlsx";
allofftimefilename = "allofftimeDispatched.xlsx";
dispatched: DispatchedReport = new DispatchedReport();
fieldDispatch: Fielddispatcher[]=[];
incityDispatch: Incitydispatch[]=[];
offtimeDispatch: OffTimeDispatch[]=[];
  dateToday: string;
  intervalId;
  time= new Date();
  constructor(
    private fieldService: FieldService,
    private alert: AlertService
    ) { }

  ngOnInit(): void {
   // this.getAllFieldDispatch();
    this.dateToday = new Date().toISOString();
    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);
    this.myDate = new Date()
    this.cValue = formatDate(this.myDate, 'yyyy-MM-dd', 'en-US');
  }
  offtimePDF(){
    const doc = new jsPDF('portrait','px','a4');
    const imagedata = this.imageData;

    doc.addImage(imagedata, 'GIF', 10, 10, 80, 17);
    doc.setFontSize(10);
    doc.setTextColor(20);
    doc.text("Offtime Dispatched Vehicle Report", 140, 17, { baseline: 'middle' });
    doc.text("Date: "+this.cValue, 340, 17, { baseline: 'middle' });
    doc.text("____________________________________________________________________________________________________________",0,28);
    autoTable(doc,{
        html: '#offtimereportbydaterange',
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
        tableLineColor: [124, 95, 240], tableLineWidth: 0.1,
        margin:{
          top:50,
          left: 4,
          right:4
        }
      }
    );
    doc.save('offtimeDispatched');
  }
  incityPDF(){
    const doc = new jsPDF('portrait','px','a4');
    const imagedata = this.imageData;

    doc.addImage(imagedata, 'GIF', 10, 10, 80, 17);
    doc.setFontSize(10);
    doc.setTextColor(20);
    doc.text("Incity Dispatched Vehicle Report", 140, 17, { baseline: 'middle' });
    doc.text("Date: "+this.cValue, 340, 17, { baseline: 'middle' });
    doc.text("____________________________________________________________________________________________________________",0,28);
    autoTable(doc,{
        html: '#incityreportbydaterange',
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
        tableLineColor: [124, 95, 240], tableLineWidth: 0.1,
        margin:{
          top:50,
          left: 4,
          right:4
        }
      }
    );
    doc.save('incityDispatched');
  }
  fieldPDF(){
    const doc = new jsPDF('portrait','px','a4');
    const imagedata = this.imageData;

    doc.addImage(imagedata, 'GIF', 10, 10, 80, 17);
    doc.setFontSize(10);
    doc.setTextColor(20);
    doc.text("Field Dispatched Vehicle Report", 140, 17, { baseline: 'middle' });
    doc.text("Date: "+this.cValue, 340, 17, { baseline: 'middle' });
    doc.text("____________________________________________________________________________________________________________",0,28);
    autoTable(doc,{
        html: '#fieldreportbydaterange',
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
        tableLineColor: [124, 95, 240], tableLineWidth: 0.1,
        margin:{
          top:50,
          left: 4,
          right:4
        }
      }
    );
    doc.save('fieldDispatched');
  }
  fieldEXCEL(){
    let excels = document.getElementById("fieldreportbydaterange");
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(excels);

    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    ws['!cols'] = [ //set col. widths
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
     ];
    XLSX.utils.book_append_sheet(wb,ws,"Sheet1");
    XLSX.writeFile(wb,this.fileName);



  }
  incityEXCEL(){
    let excels = document.getElementById("incityreportbydaterange");
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(excels);

    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    ws['!cols'] = [ //set col. widths
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
     ];
    XLSX.utils.book_append_sheet(wb,ws,"Sheet1");
    XLSX.writeFile(wb,this.incityfileName);



  }

  incityPrint(){
    var divToPrint = document.getElementById('incityreportbydaterange');
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

  offtimePrint(){
    var divToPrint = document.getElementById('offtimereportbydaterange');
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
  offtimeEXCELL(){
    let excels = document.getElementById("offtimereportbydaterange");
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(excels);

    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    ws['!cols'] = [ //set col. widths
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
     ];
    XLSX.utils.book_append_sheet(wb,ws,"Sheet1");
    XLSX.writeFile(wb,this.offtimefileName);



  }
  fieldPrint(){
    var divToPrint = document.getElementById('fieldreportbydaterange');
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
  allFieldPrint(){
    var divToPrint = document.getElementById('allfieldReport');
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
  allFieldPDF(){
    const doc = new jsPDF('portrait','px','a4');
    const imagedata = this.imageData;

    doc.addImage(imagedata, 'GIF', 10, 10, 80, 17);
    doc.setFontSize(10);
    doc.setTextColor(20);
    doc.text("All Field Dispatched Vehicle Report", 140, 17, { baseline: 'middle' });
    doc.text("Date: "+this.cValue, 340, 17, { baseline: 'middle' });
    doc.text("____________________________________________________________________________________________________________",0,28);
    autoTable(doc,{
        html: '#allfieldReport',
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
        tableLineColor: [124, 95, 240], tableLineWidth: 0.1,
        margin:{
          top:50,
          left: 4,
          right:4
        }
      }
    );
    doc.save('allfieldDispatched');
  }
  allFieldEXCEL(){
    let excels = document.getElementById("allfieldReport");
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(excels);

    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    ws['!cols'] = [ //set col. widths
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
     ];
    XLSX.utils.book_append_sheet(wb,ws,"Sheet1");
    XLSX.writeFile(wb,this.allfieldfilename);


  }
  allIncityPrint(){
    var divToPrint = document.getElementById('allincityReport');
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
  allIncityPDF(){
    const doc = new jsPDF('portrait','px','a4');
    const imagedata = this.imageData;

    doc.addImage(imagedata, 'GIF', 10, 10, 80, 17);
    doc.setFontSize(10);
    doc.setTextColor(20);
    doc.text("All Incity Dispatched Vehicle Report", 140, 17, { baseline: 'middle' });
    doc.text("Date: "+this.cValue, 340, 17, { baseline: 'middle' });
    doc.text("____________________________________________________________________________________________________________",0,28);
    autoTable(doc,{
        html: '#allincityReport',
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
        tableLineColor: [124, 95, 240], tableLineWidth: 0.1,
        margin:{
          top:50,
          left: 4,
          right:4
        }
      }
    );
    doc.save('allincityDispatched');
  }
  allIncityEXCEL(){

    let excels = document.getElementById("allincityReport");
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(excels);

    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    ws['!cols'] = [ //set col. widths
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
     ];
    XLSX.utils.book_append_sheet(wb,ws,"Sheet1");
    XLSX.writeFile(wb,this.allincityfilename);
  }
  allOfftimePrint(){
    var divToPrint = document.getElementById('allofftimeReport');
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
  allOfftimePDF(){
    const doc = new jsPDF('portrait','px','a4');
    const imagedata = this.imageData;

    doc.addImage(imagedata, 'GIF', 10, 10, 80, 17);
    doc.setFontSize(10);
    doc.setTextColor(20);
    doc.text("All Offtime Dispatched Vehicle Report", 140, 17, { baseline: 'middle' });
    doc.text("Date: "+this.cValue, 340, 17, { baseline: 'middle' });
    doc.text("____________________________________________________________________________________________________________",0,28);
    autoTable(doc,{
        html: '#allofftimeReport',
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
        tableLineColor: [124, 95, 240], tableLineWidth: 0.1,
        margin:{
          top:50,
          left: 4,
          right:4
        }
      }
    );
    doc.save('allofftimeDispatched');
  }
  allOfftimeEXCEL(){
    let excels = document.getElementById("allofftimeReport");
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(excels);

    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    ws['!cols'] = [ //set col. widths
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
     ];
    XLSX.utils.book_append_sheet(wb,ws,"Sheet1");
    XLSX.writeFile(wb,this.allofftimefilename);
  }
  getAllFieldDispatch(){
     this.fieldService.getAllFieldDispatch().subscribe({
        next:(fields)=>{
           this.fieldDispatch = fields;
           this.allfieldlength = fields.length;
             this.isFieldShown = false;
             this.isIncityShown = false;
             this.isOfftimeShown = false;
             this.isAllFieldShown = true;
             this.isAllIncityShown = false;
             this.isAllOfftimeShown = false;

           setTimeout(() => {
            $('#allfieldReport').DataTable({
              autoWidth: false,
              retrieve: true,
              paging:false,
              searching:true
            });
          }, 1);
        },
        error: ()=>{
          this.alert.errorAlert("Unable To Fetch All Field Dispatch");
        }
     });
  }
  getAllIncityDispatch(){
    this.fieldService.getAllIncityDispatch().subscribe({
      next:(incity)=>{
         this.incityDispatch = incity;
         this.isAllIncityShown = true;
         this.isIncityShown = false;
         this.isAllFieldShown = false;
         this.isAllOfftimeShown = false;
         this.isFieldShown = false;
         this.isOfftimeShown = false;
         this.allincitylength = incity.length;
         setTimeout(() => {
          $('#allincityReport').DataTable({
            autoWidth: false,
            retrieve: true,
            paging:false,
            searching:true
          });
        }, 1);
      },
      error: ()=>{
        this.alert.errorAlert("Unable To Fetch All Field Dispatch");
      }
   });

  }
  getAllOfftimeDispatch(){
    this.fieldService.getAllOfftimeDispatch().subscribe({
      next:(offtime)=>{
         this.offtimeDispatch = offtime;
         this.allofftimelength = offtime.length;
         this.isAllIncityShown = false;
         this.isIncityShown = false;
         this.isAllFieldShown = false;
         this.isAllOfftimeShown = true;
         this.isFieldShown = false;
         this.isOfftimeShown = false;
         setTimeout(() => {
          $('#allofftimeReport').DataTable({
            autoWidth: false,
            retrieve: true,
            paging:false,
            searching:true
          });
        }, 1);
      },
      error: ()=>{
        this.alert.errorAlert("Unable To Fetch All Field Dispatch");
      }
   });
  }

  onSelectRanges(){
    if(this.vals =='Offtime' && this.reportranges =='All'){
    this.getAllOfftimeDispatch();
    $("#allofftimeReport").show();
    $("#allofftimeaction").show();

    $("#allincityaction").hide();
    $("#allincityReport").hide();

    $("#allfieldReport").hide();
    $("#allfieldaction").hide();

    $("#fieldTable").hide();
    $(".incityFilter").hide();
    // $(".offtimeFilter").show();
    $(".fieldFilter").hide();
    $("#incityTable").hide();
    $("#offtimeTable").hide();
    $("#fieldAction").hide();
    $("#incityAction").hide();
    $("#offtimeAction").hide();

    $("#nofield").hide();
    $("#noincity").hide();
    $("#nooftime").hide();

    $("#noallfield").hide();
    $("#noallincity").hide();
    $("#noallofftime").hide();

   }
   else if(this.vals =='Field' && this.reportranges =='All'){
    this.getAllFieldDispatch();

    $("#allfieldReport").show();
    $("#allfieldaction").show();

    $("#allincityaction").hide();
    $("#allincityReport").hide();

    $("#allofftimeReport").hide();
    $("#allofftimeaction").hide();

    $("#fieldTable").hide();
    $(".incityFilter").hide();
    // $(".offtimeFilter").show();
    $(".fieldFilter").hide();
    $("#incityTable").hide();
    $("#offtimeTable").hide();
    $("#fieldAction").hide();
    $("#incityAction").hide();
    $("#offtimeAction").hide();

    $("#nofield").hide();
    $("#noincity").hide();
    $("#nooftime").hide();

    $("#noallfield").hide();
    $("#noallincity").hide();
    $("#noallofftime").hide();

   }
   else if(this.vals =='Incity' && this.reportranges =='All'){
    this.getAllIncityDispatch();
    $("#allincityaction").show();
    $("#allincityReport").show();

    $("#allofftimeReport").hide();
    $("#allofftimeaction").hide();

    $("#allfieldReport").hide();
    $("#allfieldaction").hide();

    $("#allfieldReport").hide();
    $("#allfieldaction").hide();
    $("#fieldTable").hide();
    $(".incityFilter").hide();
    $(".offtimeFilter").hide();
    $(".fieldFilter").hide();
    $("#incityTable").hide();
    $("#offtimeTable").hide();
    $("#fieldAction").hide();
    $("#incityAction").hide();
    $("#offtimeAction").hide();

    $("#nofield").hide();
    $("#noincity").hide();
    $("#nooftime").hide();

    $("#noallfield").hide();
    $("#noallincity").hide();
    $("#noallofftime").hide();

   }
   else{
    $("#allincityaction").hide();
    $("#allincityReport").hide();

    $("#allofftimeReport").hide();
    $("#allofftimeaction").hide();

    $("#allfieldReport").hide();
    $("#allfieldaction").hide();

    $("#allfieldReport").hide();
    $("#allfieldaction").hide();
    $("#fieldTable").hide();
    $(".incityFilter").hide();
    $(".offtimeFilter").hide();
    $(".fieldFilter").hide();
    $("#incityTable").hide();
    $("#offtimeTable").hide();
    $("#fieldAction").hide();
    $("#incityAction").hide();
    $("#offtimeAction").hide();

    $("#nofield").hide();
    $("#noincity").hide();
    $("#nooftime").hide();

    $("#noallfield").hide();
    $("#noallincity").hide();
    $("#noallofftime").hide();
   }
  }
  onSelect(){
 //console.log(this.vals);
if(this.vals == 'Field' && this.reportranges =='All'){

    this.getAllFieldDispatch();
    $("#allfieldReport").show();
    $("#allfieldaction").show();
    // $("#fieldTable").show();
    $(".incityFilter").hide();
    $(".offtimeFilter").hide();
    $("#incityTable").hide();
    $("#offtimeTable").hide();
    $("#fieldAction").show();
    $("#incityAction").hide();
    $("#offtimeAction").hide();

    $("#noincity").hide();
    $("#nooftime").hide();

    $("#noallfield").hide();
    $("#noallincity").hide();
    $("#noallofftime").hide();

    $("#allincityaction").hide();
    $("#allincityReport").hide();

    $("#allofftimeReport").hide();
    $("#allofftimeaction").hide();

    $("#allfieldReport").hide();
    $("#allfieldaction").hide();


 }
 else if(this.vals == 'Field' && this.reportranges =='Date Range'){
  //console.log(this.isFieldShown);
  $("#allfieldReport").hide();
  $("#allfieldaction").hide();
 // $(".fieldFilter").show();
  // $("#fieldTable").show();
  $(".incityFilter").hide();
  $(".offtimeFilter").hide();
  $("#incityTable").hide();
  $("#offtimeTable").hide();
  $("#fieldAction").show();
  $("#incityAction").hide();
  $("#offtimeAction").hide();

  $("#noincity").hide();
  $("#nooftime").hide();

  $("#noallfield").hide();
  $("#noallincity").hide();
  $("#noallofftime").hide();

  $("#allincityaction").hide();
  $("#allincityReport").hide();

  $("#allofftimeReport").hide();
  $("#allofftimeaction").hide();

  $("#allfieldReport").hide();
  $("#allfieldaction").hide();


}
 else if(this.vals =='Incity' && this.reportranges =='All'){

    this.getAllIncityDispatch();
    $("#allincityaction").show();
    $("#allincityReport").show();
    $("#fieldTable").hide();
    $(".incityFilter").show();
    $(".offtimeFilter").hide();
    $(".fieldFilter").hide();
    $("#incityTable").show();
    $("#offtimeTable").hide();
    $("#fieldAction").hide();
    $("#incityAction").show();
    $("#offtimeAction").hide();

    $("#nofield").hide();
    $("#nooftime").hide();
    $("#noallfield").hide();
    $("#noallincity").hide();
    $("#noallofftime").hide();

    $("#allincityaction").hide();
    $("#allincityReport").hide();

    $("#allofftimeReport").hide();
    $("#allofftimeaction").hide();

    $("#allfieldReport").hide();
    $("#allfieldaction").hide();

 }
 else if(this.vals =='Incity' && this.reportranges =='Date Range'){

  $("#allincityaction").hide();
  $("#allincityReport").hide();
  $("#fieldTable").hide();
  $(".incityFilter").show();
  $(".offtimeFilter").hide();
  $(".fieldFilter").hide();
  $("#incityTable").show();
  $("#offtimeTable").hide();
  $("#fieldAction").hide();
  $("#incityAction").show();
  $("#offtimeAction").hide();

  $("#nofield").hide();
  $("#nooftime").hide();
  $("#noallfield").hide();
  $("#noallincity").hide();
  $("#noallofftime").hide();

  $("#allincityaction").hide();
  $("#allincityReport").hide();

  $("#allofftimeReport").hide();
  $("#allofftimeaction").hide();

  $("#allfieldReport").hide();
  $("#allfieldaction").hide();

}
 else if(this.vals =='Offtime' && this.reportranges=='All'){

    this.getAllOfftimeDispatch();
    $("#allofftimeReport").show();
    $("#allofftimeaction").show();

    $("#fieldTable").hide();
    $(".incityFilter").hide();
    $(".offtimeFilter").hide();
    $(".fieldFilter").hide();
    $("#incityTable").hide();
    $("#offtimeTable").hide();
    $("#fieldAction").hide();
    $("#incityAction").hide();
    $("#offtimeAction").show();

    $("#nofield").hide();
    $("#noincity").hide();
    $("#noallfield").hide();
    $("#noallincity").hide();
    $("#noallofftime").hide();

    $("#allincityaction").hide();
    $("#allincityReport").hide();

    $("#allofftimeReport").hide();
    $("#allofftimeaction").hide();

    $("#allfieldReport").hide();
    $("#allfieldaction").hide();

 }
 else if(this.vals =='Offtime' && this.reportranges=='Date Range'){

  $("#allofftimeReport").hide();
  $("#allofftimeaction").hide();

  $("#fieldTable").hide();
  $(".incityFilter").hide();
  $(".offtimeFilter").show();
  $(".fieldFilter").hide();
  $("#incityTable").hide();
  $("#offtimeTable").show();
  $("#fieldAction").hide();
  $("#incityAction").hide();
  $("#offtimeAction").show();

  $("#nofield").hide();
  $("#noincity").hide();
  $("#noallfield").hide();
  $("#noallincity").hide();
  $("#noallofftime").hide();

  $("#allincityaction").hide();
  $("#allincityReport").hide();

  $("#allofftimeReport").hide();
  $("#allofftimeaction").hide();

  $("#allfieldReport").hide();
  $("#allfieldaction").hide();

}
 else{
  $(document).ready(function(){
    $("#fieldTable").hide();
    $(".incityFilter").hide();
    $(".offtimeFilter").show();
    $(".fieldFilter").hide();
    $("#incityTable").hide();
    $("#offtimeTable").hide();
    $("#fieldAction").hide();
    $("#incityAction").hide();
    $("#offtimeAction").hide();

    $("#nofield").hide();
    $("#noincity").hide();
    $("#nooftime").hide();

    $("#noallfield").hide();
    $("#noallincity").hide();
    $("#noallofftime").hide();

    $("#allincityaction").hide();
    $("#allincityReport").hide();

    $("#allofftimeReport").hide();
    $("#allofftimeaction").hide();

    $("#allfieldReport").hide();
    $("#allfieldaction").hide();

   });
 }
  }
  fieldDateRangeReport(fieldRange: NgForm){
    //this.isFieldShown = true;
    //console.log("field is " + this.isFieldShown);
    this.fieldFrom = fieldRange.controls.fieldfromDate.value;
    this.fieldTo = fieldRange.controls.fieldtoDate.value;
    //console.log(this.fieldFrom);
    this.fieldService.getDispatcherFieldReport(fieldRange.value).subscribe({
      next:(response)=>{
              this.dispatcher = response;
              this.fieldlength = response.length;
              this.isFieldShown = true;
              this.isIncityShown = false;
              this.isOfftimeShown = false;
              console.log("field is " + this.isFieldShown);
              setTimeout(() => {
                $('#fieldreportbydaterange').DataTable({
                  autoWidth: false,
                  retrieve: true,
                  paging:false,
                  searching:true
                });
              }, 1);
             // fieldRange.reset();
      }


     });
  }
  offtimeDateRangeReport(offtimeRange: NgForm){
    this.offtimeFrom = offtimeRange.controls.offtimeFromDate.value;
    this.offtimeTo = offtimeRange.controls.offtimeToDate.value;
    this.fieldService.getDispatcherOfftimeReport(offtimeRange.value).subscribe({
      next:(offtimevals)=>{
                this.offtime = offtimevals;
                this.offtimelength = offtimevals.length;
                this.isOfftimeShown = true;
                this.isFieldShown = false;
                this.isIncityShown = false;
                console.log(this.offtime);
                setTimeout(() => {
                 $('#offtimereportbydaterange').DataTable({
                  autoWidth: false,
                  retrieve: true,
                  paging:false,
                  searching:true
                 });
               }, 1);

      }
 });
  }
  incityDateRangeReport(incityRange: NgForm){
    this.incityFrom = incityRange.controls.incityFromDate.value;
    this.incityTo = incityRange.controls.incityToDate.value;
        this.fieldService.getDispatcherIncityReport(incityRange.value).subscribe({
             next:(incityvals)=>{
                       this.incity = incityvals;
                       this.incitylength = incityvals.length;
                       this.isIncityShown = true;
                       this.isFieldShown = false;
                       this.isOfftimeShown = false;
                       setTimeout(() => {
                        $('#incityreportbydaterange').DataTable({
                          autoWidth: false,
                          retrieve: true,
                          paging:false,
                          searching:true
                        });
                      }, 1);

             }
        });
  }

}
