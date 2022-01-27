import { TableDataService } from './../table-data.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AfterViewInit, Component, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog} from '@angular/material/dialog';
import { CheckBox } from './checkBox/checkBox.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})

export class TableComponent implements AfterViewInit {
  displayedColumns: string[] = ['orderId', 'orderDate', 'partyName', 'station', 'Mobile', 'status', 'action'];
  tableData = [];
  dataSource: any
  selectedObj:any; //sent in popup component as a @Input
  requestDate: any;
  selectedOption:any;
  selectedStatusOption:any;
  Show = false;
  isPopupOpen:boolean = false;
  isDivVisible: boolean = false;
  clikOnCustom: boolean = false;
  
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
   
  ngOnInit() { this.dataSource = this._tableDataService.getData()};

  constructor(private _tableDataService: TableDataService, private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog, private router: Router) {};

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
    if (filterRequest === 'pending') { this.selectedStatusOption = filterRequest }

    else if (filterRequest === 'delivered') { this.selectedStatusOption = filterRequest }
    
    else if (filterRequest === 'cancel') { this.selectedStatusOption = filterRequest }

    else if (filterRequest === 'approved') { this.selectedStatusOption = filterRequest }
  }

  apply() {    
    if(this.selectedOption === 'lastMonth') {
      this.tableData = [];
      this.requestDate = new Date();
      let previousMonth = new Date(this.requestDate);
      previousMonth.setMonth(this.requestDate.getMonth()- 1);
      let firstDay = new Date(previousMonth.getFullYear(), previousMonth.getMonth(), 1);
      let lastDay = new Date(previousMonth.getFullYear(), previousMonth.getMonth() + 1, 0);
      this.dataSource.filteredData.forEach((day)=> {
        console.log(day.orderDate >= firstDay && day.orderDate <= lastDay )
        if(day.orderDate >= firstDay && day.orderDate <= lastDay && day.status == this.selectedStatusOption) {
          this.tableData.push(day);
        }
      })
    }  
    else if(this.selectedOption === 'thisMonth') {
       this.tableData = [];
      let date = new Date();
      let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      this.dataSource.filteredData.forEach((item) => {
        if (item.orderDate >= firstDay && item.orderDate <= lastDay && item.status == this.selectedStatusOption) {
          this.tableData.push(item);
        };
      });
    }
    else if(this.selectedOption === 'today') {
      this.tableData = [];
      let todayDate: Date = new Date();
      todayDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
      this.dataSource.filteredData.forEach((day) => {
        if (day.orderDate >= todayDate && day.orderDate <= todayDate && day.status == this.selectedStatusOption) {
          this.tableData.push(day);
        }
      });
    }
    else if(this.selectedOption === 'yesterday') {
      this.tableData = [];
      let today = new Date();
      let yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());
      console.log(today, yesterday);
      this.dataSource.filteredData.forEach((day) => {
        if (day.orderDate <= yesterday && day.orderDate >= yesterday && day.status == this.selectedStatusOption) {
          this.tableData.push(day);
        }
      });
    }
    else if(this.selectedOption === 'custom') {
      this.tableData = [];
      let var1: Date = this.customForm.get('formDate').value;
      console.log(var1);
      var1 = new Date(var1);
      let var2: Date = this.customForm.get('toDate').value;
      console.log(var2);
      var2 = new Date(var2);
      this.dataSource.filteredData.forEach((day) => {
        if (day.orderDate >= var1 && day.orderDate <= var2 && day.status == this.selectedStatusOption) {
          this.tableData.push(day);
        }
      });
    }
  //Filter the dataSource!
    this.dataSource = this.tableData;  
  
  }

  filterByDate(filterRequest: any) {

    if (filterRequest === 'today') {
      this.selectedOption = filterRequest;
    }
    else if (filterRequest === 'yesterday') {
      this.selectedOption = filterRequest;
    }
    else if (filterRequest === 'lastMonth') {
      this.selectedOption = filterRequest
    }
    else if (filterRequest === 'thisMonth') {
      this.selectedOption = filterRequest
    }
    else if (filterRequest === 'custom') {
      this.selectedOption = filterRequest
      this.clikOnCustom = !this.clikOnCustom;
    }
  }

  openPopUp(i) {
    this.selectedObj = this.dataSource.filteredData[i];
    this.router.navigate(['edit', this.selectedObj]);
  }

  closePopUp() { this.isPopupOpen = false }; //control from popUp component!

  openCheckBox() {   const dialogRef = this.dialog.open(CheckBox) }

  selectedBox(colName: string) {
    let newCols = this.displayedColumns;
    const colIndex = newCols.findIndex(col => col === colName);
    if(colIndex >= 0 ) {
      newCols.splice(colIndex, 1)
    }else {
      newCols.splice(colIndex, 0, colName);
      // newCols.push(colName);
    }
    
  }

}



