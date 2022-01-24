import { TableDataService } from './../table-data.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AfterViewInit, Component, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
// import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

import { MatDialog} from '@angular/material/dialog';
import { PopUp } from './popUp/popUp.component';
import { CheckBox } from './checkBox/checkBox.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})

export class TableComponent implements AfterViewInit {
  dataSource: any
  displayedColumns: string[] = ['orderId', 'orderDate', 'partyName', 'station', 'Mobile', 'status', 'action'];
  newArray: string[];
  //dataSource: any = new MatTableDataSource(ELEMENT_DATA);
  isDivVisible: boolean = false;
  clikOnCustom: boolean = false;
  requestDate: any;
  tableData = [];
  selectedOption:any;
  Show = false;
  selectedStatusOption:any;
  customForm = new FormGroup({
    formDate: new FormControl(),
    toDate: new FormControl(),
    apply: new FormControl({ value: false }),
  });

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('mat-table') el!:ElementRef;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;    
  }
   
  ngOnInit() { this.dataSource = this._tableDataService.getData() };

  constructor(private _tableDataService: TableDataService, private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog) {};

  search(event: any) { this.dataSource.filter = event.target.value }; //Filter by search bar
  
  reset() { 
    this.ngOnInit() 
    this.Show = !this.Show
  };

  announceSortChange(sortState: Sort) {
    console.log(sortState);
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  filter() {
    this.isDivVisible = !this.isDivVisible;
    this.clikOnCustom = false;
  }

  filterByStatus(filterRequest: any) {
    this.tableData = [];
    if (filterRequest === 'pending') {
      console.log(filterRequest);
      this.selectedStatusOption = filterRequest;
      console.log(this.selectedStatusOption);
    }

    else if (filterRequest === 'delivered') {
      console.log(filterRequest);
      this.selectedStatusOption = filterRequest;
      console.log(this.selectedStatusOption);
      // this.dataSource.filter = filterRequest;
    }
    
    else if (filterRequest === 'cancel') {
      console.log(filterRequest);
      this.selectedStatusOption = filterRequest;
      console.log(this.selectedStatusOption);
      // this.dataSource.filter = filterRequest;
    }

    else if (filterRequest === 'approved') {
      console.log(filterRequest);
      this.selectedStatusOption = filterRequest;
      console.log(this.selectedStatusOption);
      // this.dataSource.filter = filterRequest;
    }
  }

  apply() {    
    console.log(this.selectedOption);
    console.log(this.selectedStatusOption);
    if(this.selectedOption === 'lastMonth') {
      this.tableData = [];
      this.requestDate = new Date();
      let previousMonth = new Date(this.requestDate);
      previousMonth.setMonth(this.requestDate.getMonth()- 1);
      let firstDay = new Date(previousMonth.getFullYear(), previousMonth.getMonth(), 1);
      let lastDay = new Date(previousMonth.getFullYear(), previousMonth.getMonth() + 1, 0);
      console.log(firstDay, lastDay);
      this.dataSource.filteredData.forEach((day)=> {
        console.log(day.orderDate >= firstDay && day.orderDate <= lastDay && day.status == this.selectedStatusOption )
        // if(day.orderDate >= firstDay && day.orderDate <= lastDay && day.status == this.selectedStatusOption) {
        //   this.tableData.push(day);
        // }
      })
    }
  
  //   else if(this.selectedOption === 'thisMonth') {
  //      this.tableData = [];
  //     let date = new Date();
  //     let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  //     let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  //     ELEMENT_DATA.forEach((item) => {
  //       if (item.orderDate >= firstDay && item.orderDate <= lastDay && item.status == this.selectedStatusOption) {
  //         this.tableData.push(item);
  //       };
  //     });
  //   }
  //   else if(this.selectedOption === 'today') {
  //     this.tableData = [];
  //     let todayDate: Date = new Date();
  //     todayDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
  //     ELEMENT_DATA.forEach((day) => {
  //       if (day.orderDate >= todayDate && day.orderDate <= todayDate && day.status == this.selectedStatusOption) {
  //         this.tableData.push(day);
  //       }
  //     });
  //   }
  //   else if(this.selectedOption === 'yesterday') {
  //     this.tableData = [];
  //     let today = new Date();
  //     let yesterday = new Date(today);
  //     yesterday.setDate(yesterday.getDate() - 1);
  //     yesterday = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());
  //     console.log(today, yesterday);
  //     ELEMENT_DATA.forEach((day) => {
  //       if (day.orderDate <= yesterday && day.orderDate >= yesterday && day.status == this.selectedStatusOption) {
  //         this.tableData.push(day);
  //       }
  //     });
  //   }
  //   else if(this.selectedOption === 'custom') {
  //     this.tableData = [];
  //     let var1: Date = this.customForm.get('formDate').value;
  //     console.log(var1);
  //     var1 = new Date(var1);
  //     let var2: Date = this.customForm.get('toDate').value;
  //     console.log(var2);
  //     var2 = new Date(var2);
  //     ELEMENT_DATA.forEach((day) => {
  //       if (day.orderDate >= var1 && day.orderDate <= var2 && day.status == this.selectedStatusOption) {
  //         this.tableData.push(day);
  //       }
  //     });
  //   }
  //   //Filter the dataSource!
    this.dataSource = this.tableData;  
  }

  filterByDate(filterRequest: any) {

    if (filterRequest === 'today') {
      console.log(filterRequest);
      this.selectedOption = filterRequest;
      console.log(this.selectedOption);
    }

    else if (filterRequest === 'yesterday') {
      console.log(filterRequest);
      this.selectedOption = filterRequest;
      console.log(this.selectedOption);
    }

    else if (filterRequest === 'lastMonth') {
      console.log(filterRequest);
      this.selectedOption = filterRequest
      console.log(this.selectedOption);
    }

    else if (filterRequest === 'thisMonth') {
      console.log(filterRequest);
      this.selectedOption = filterRequest
      console.log(this.selectedOption);
    }

    else if (filterRequest === 'custom') {
      console.log(filterRequest);
      this.selectedOption = filterRequest
      console.log(this.selectedOption);
      this.clikOnCustom = !this.clikOnCustom;
    }
  }

  openDialog() { const dialogRef = this.dialog.open(PopUp) };

  openCheckBox() {
    const dialogRef = this.dialog.open(CheckBox);
  }

  selectedBox(colName: string) {
    const colIndex = this.displayedColumns.findIndex(col =>
      col === colName
    );
    if(colIndex >= 0) {
      this.displayedColumns.splice(colIndex, 1)
    }
    else {
      this.displayedColumns.push(colName)
    };
  }

}



