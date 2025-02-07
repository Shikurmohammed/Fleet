import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { Vehicle } from 'src/app/types/Vehicle';
import { awashLogo } from 'src/assets/img/awashlogo';
import { OfficerService } from '../officer.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-insurance-due',
  templateUrl: './insurance-due.component.html',
  styleUrls: ['./insurance-due.component.css']
})
export class InsuranceDueComponent implements OnInit {
  vehicles: Vehicle[] = [];
  requestMaintenance: Vehicle;
  details: Vehicle;
  source:any={};
  dataAdapter: any = new jqx.dataAdapter(this.source);
  columns :any[] = [];
  columnGroups: ({ text: string; align: string; name: string; parentGroup?: undefined; } | { text: string; parentGroup: string; align: string; name: string; })[];
  myDate: Date;
  cValue:any;

  fileName = 'VehicleInsuranceDue.xlsx';
  private imageData = awashLogo.imageData;

  constructor(
    private officerService:OfficerService,
    private router:Router,
    private alert:AlertService
  ) { }
  ngOnInit(): void {
    this.myDate = new Date()
     this.cValue = formatDate(this.myDate, 'yyyy-MM-dd', 'en-US');
    this.getServiceMillageDueOnDataTable();
  }
  //To display vehicles whose insurance date are due on data tables
  public getServiceMillageDueOnDataTable():void{
    this.officerService.getInsuranceDue().subscribe((ret:Vehicle[] )=>{
      this.vehicles = ret; 
      setTimeout(()=>{                      
        $('#ServiceDataTable').DataTable( {
          autoWidth: false,
          retrieve: true,
          paging:false,
          searching:true
   
   

      } );
      }, 1);      
    //   this.source =
    //   {
    //       localData: this.vehicles,
    //       dataType: 'array',
    //       dataFields:Vehicle
    //   };
    // this.dataAdapter = new jqx.dataAdapter(this.source);
    // this.columns =
    // [
    //     { text: 'Plate Number', dataField: 'plateNo', width:'15%', columnGroup:'ReportHeaders' },
    //     { text: 'Model', dataField: 'model', width: '15%', align: 'center', cellsAlign: 'center', columnGroup:'ReportHeaders' },
    //     { text: 'CC', dataField: 'cc', width: '12%', align: 'center', cellsAlign: 'center', columnGroup:'ReportHeaders' },
    //     { text: 'Policy No', dataField: 'policyNo', width: '15%', cellsAlign: 'center', align: 'center', columnGroup:'ReportHeaders'},
    //     { text: 'Expiry Date', dataField: 'insExpDate', width: '15%', columnGroup:'ReportHeaders' },
    //     { text: 'Renewal Date', dataField: 'insRenewalDate', width: '15%', columnGroup:'ReportHeaders' },
    //     { text: 'Current KM', dataField: 'lastMilege', width: '13%', cellsAlign: 'center', align: 'center', columnGroup:'ReportHeaders'}
     
        
    // ];  
    // this.myDate = new Date()

    // const cValue = formatDate(this.myDate, 'yyyy-MM-dd', 'en-US');

    // this.columnGroups=
    // [
    //     { text: '<strong>Vehicles Whose Insurance Date is Due</strong> &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; '
    //     +' &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;   Report Date: <strong>'+cValue+'</strong>',
    //      align: 'center',
    //      name: 'ReportHeaders' }
    // ]; 
  });
} 
  printExcel(): void {
    let excels = document.getElementById('ServiceDataTable');
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

    doc.addImage(imagedata, 'GIF', 25, 10, 80, 17);
    // doc.page=1;
    // function footer(){
    // doc.text(150,285, 'page ' + doc.page);
    // doc.page ++;
    // };
    doc.setFontSize(10);
    doc.setTextColor(20);
    doc.text("Vehicles Whose Insurance Date Are Due Report", 130, 17, { baseline: 'middle' });
    doc.text("Report Date: "+this.cValue, 320, 17, { baseline: 'middle' });
    doc.text("Report Date: "+this.cValue, 320, 17, { baseline: 'middle' });
    doc.text("____________________________________________________________________________________________________________",0,28);
    autoTable(
      doc,

      {
        html: '#ServiceDataTable',
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
    doc.save('VehicleInsuranceDue');
  }

  print(){
    //var divToPrint=document.getElementById("ServiceDataTable");
    var divToPrint = document.getElementById('ServiceDataTable');
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
   //This will control vehicle service  modals
   public onOpenModal(vehicle: Vehicle, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'request') {
      this.requestMaintenance = vehicle;
      button.setAttribute('data-target', '#rejectInCityRequestModal');
    }
    if (mode === 'view') {
      this.details = vehicle;
      button.setAttribute('data-target', '#detailsVehicleServiceModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
