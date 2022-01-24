import { TableDataService } from './../../table-data.service';
import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import * as jspdf from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ngxCsv } from 'ngx-csv/ngx-csv';


@Component({
  selector: 'app-checkBox',
  templateUrl: './checkBox.component.html',
  styleUrls: ['./checkBox.component.css'],
})
export class CheckBox implements OnInit {
  table: ElementRef;
  fileName = "Excel.xlsx"
  data: any;
  dataSource: any;
  selectedOption: any;
  newData: any = [];

  ngOnInit() {
    this.dataSource = this._tableDataService.getData();
  }

  constructor(private _tableDataService: TableDataService, public dialogRef: MatDialogRef<CheckBox>) {}

  Pdf() {
    const doc = new jspdf.jsPDF();
    autoTable(doc, { html: '#mat-table' });
    doc.save('Sales-order.pdf');
  }

  
  Csv() {
    let options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Material Table',
      useBom: true,
      noDownload: false,
      headers: ['OrderID', 'Name', 'Date', 'Status', 'Station', 'Mobile'],
    };

    new ngxCsv(this.dataSource.filteredData, 'MatTable', options);
    console.log(this.dataSource.filteredData);
  }

  Excel() {
    let element = document.getElementById('mat-table');
    console.log(element);
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    
    const workbook:XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook,worksheet, 'Sheet1');

    XLSX.writeFile(workbook, this.fileName);
  }

  cancel(): void {
    console.log('close!');
    this.dialogRef.close();
  }

  
}









// AfterViewInit() {
  //     let html = `
  //     <table mat-table id="mat-table"  [dataSource]="dataSource" class="mat-elevation-z8">
  //     <ng-container matColumnDef="${this.selectedOption}">
  //         <th mat-header-cell *matHeaderCellDef mat-sort-header>${this.selectedOption}</th>
  //         <td mat-cell *matCellDef="let element">{{ ${this.selectedData} }}</td>
  //     </ng-container>
  //     </table>`
  // }
