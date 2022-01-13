import { FormControl, FormGroup } from '@angular/forms';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import * as moment from 'moment';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements AfterViewInit {
  displayedColumns: string[] = ['orderId', 'partyName', 'orderDate', 'status', 'Mobile', 'station'];
  dataSource: any = new MatTableDataSource(ELEMENT_DATA); 
  // dataSourceFiltered: any = new MatTableDataSource(ELEMENT_DATA);
  // dataSource = new MatTableDataSource();
  isOnIndex: boolean = false;
  isDivVisible: boolean = false;
  clikOnCustom: boolean = false;
  generalValue: any;
  requestDate: any;
  requestStatus: any;
  filterSelectObj: any = [];

  customForm = new FormGroup({
    formDate: new FormControl(null),
    toDate: new FormControl(null),
  });

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  filterData(event: any) {this.dataSource.filter = event.target.value; } //Filter by search bar

  filterByStatus(event: any) {
    this.clikOnCustom = false;
  }

  clickMe() {
    let tableData = [];
    let var1:Date = this.customForm.get('formDate').value;
    var1 = new Date(var1);
    let var2:Date = this.customForm.get('toDate').value;
    var2 = new Date(var2);
    ELEMENT_DATA.forEach((day)=> {
      if(day.orderDate >= var1 && day.orderDate >= var2) {
        tableData.push(day)
      }
    })
    this.dataSource = tableData;
  }

  filterByDate(filterRequest: any) {
    this.clikOnCustom = false;

    if (filterRequest === 'today' && filterRequest === 'approved' ) {
      let tableData = [];
      let todayDate: Date = new Date();
      console.log(todayDate);
      todayDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
      console.log(todayDate);
      ELEMENT_DATA.forEach((day)=> {
        console.log(day.orderDate, todayDate);
        if(day.orderDate >= todayDate && day.orderDate <= todayDate) {
          tableData.push(day)
        }
      })
      this.dataSource = tableData;
    }

    if (filterRequest === 'yesterday') {
      console.log('yesterday');
      let tableData = [];
      let today = new Date()
      let yesterday = new Date(today)      
        yesterday.setDate(yesterday.getDate() - 1);      
      yesterday = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());
      console.log(today, yesterday)
      ELEMENT_DATA.forEach((day) => {
        console.log(day.orderDate, yesterday, day.orderDate >= yesterday && day.orderDate <= yesterday)
        if(day.orderDate >= yesterday && day.orderDate <= yesterday) {
          tableData.push(day)
        }
      })
      this.dataSource = tableData;
    }

    if(filterRequest === 'lastMonth') {
      let tableData = [];
      this.requestDate = new Date();    
      let previousMonth = new Date(this.requestDate);
      previousMonth.setMonth(this.requestDate.getMonth() - 1);
      let firstDay = new Date(previousMonth.getFullYear(), previousMonth.getMonth(), 1);
      let lastDay = new Date(previousMonth.getFullYear(), previousMonth.getMonth() + 1, 0);
      console.log(firstDay, lastDay); 
      ELEMENT_DATA.forEach((day)=> {
        if(day.orderDate >= firstDay && day.orderDate <= lastDay) {
          tableData.push(day)
        }
      })    
      this.dataSource = tableData;
    }

    if (filterRequest === 'thisMonth') {
      let tableData = [];
      let date = new Date();
      let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      ELEMENT_DATA.forEach((item)=> {
        if(item.orderDate >= firstDay && item.orderDate <= lastDay){
          tableData.push(item);
        }
      })
      this.dataSource = tableData;
    }

    if (filterRequest === 'custom') {
      this.clikOnCustom = !this.clikOnCustom;
      console.log('custom');
      
    }
  }

  Dowanload() {
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
}

export interface PeriodicElement {
  orderId: number;
  partyName: string;
  orderDate: Date;
  status: string;
  station: string;
  Mobile: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    orderId: 1,
    partyName: 'Nevine Acotanza',
    orderDate: new Date(2022, 0, 2),
    status: 'pending',
    station: 'pali Rajasthan',
    Mobile: 1274151,
  },
  {
    orderId: 2,
    partyName: 'partyName2',
    orderDate: new Date(2021, 11, 3),//formatDate(new Date(), '03/12/2021', 'en-GB'),
    status: 'approved',
    station: 'jaipur, Rajasthan',
    Mobile: 124151,
  },
  {
    orderId: 3,
    partyName: 'Oluwarotimi Adesina',
    orderDate: new Date(2021, 10, 4),//formatDate(new Date(), '04/11/2021', 'en-GB'),
    status: 'delivered',
    station: 'Ajmer, Rajasthan',
    Mobile: 1246151,
  },
  {
    orderId: 4,
    partyName: 'partyName4',
    orderDate: new Date(2022, 0, 3),//formatDate(new Date(), '03/01/2022', 'en-GB'),
    status: 'delivered',
    station: 'Gurugram, Dehli',
    Mobile: 124151,
  },
  {
    orderId: 5,
    partyName: 'Praveen Bommannavar',
    orderDate: new Date(2021, 1, 8),//formatDate(new Date(), '08/02/2021', 'en-GB'),
    status: 'pending',
    station: 'Mumbai, Maharastra',
    Mobile: 124151,
  },
  {
    orderId: 6,
    partyName: 'partyName6',
    orderDate: new Date(2021, 10, 11),//formatDate(new Date(), '11/11/2021', 'en-GB'),
    status: 'approved',
    station: 'karnal, Hariyana',
    Mobile: 124151,
  },
  {
    orderId: 7,
    partyName: 'Fabrizio Cedrone',
    orderDate: new Date(2021, 9, 3),//formatDate(new Date(), '09/03/2021', 'en-GB'),
    status: 'approved',
    station: 'Noida, Delhi',
    Mobile: 199151,
  },
  {
    orderId: 8,
    partyName: 'partyName8',
    orderDate: new Date(2021, 11, 1),//formatDate(new Date(), '01/12/2021', 'en-GB'),
    status: 'canceled',
    station: 'Jodhpur, Rajasthan',
    Mobile: 134151,
  },
  {
    orderId: 9,
    partyName: 'partyName9',
    orderDate: new Date(2021, 11, 10),//formatDate(new Date(), '10/12/2021', 'en-GB'),
    status: 'pending',
    station: 'Chandigadth, Punjab',
    Mobile: 124151,
  },
  {
    orderId: 10,
    partyName: 'Dharshani Arumugam',
    orderDate: new Date(2021, 11, 1),//formatDate(new Date(), '01/12/2021', 'en-GB'),
    status: 'canceled',
    station: 'Amratsar, Punjab',
    Mobile: 1241851,
  },
  {
    orderId: 11,
    partyName: 'partyName11',
    orderDate: new Date(2021, 11, 28),//formatDate(new Date(), '28/12/2021', 'en-GB'),
    status: 'approved',
    station: 'city/state',
    Mobile: 94135331,
  },
  {
    orderId: 12,
    partyName: 'partyName12',
    orderDate: new Date(2021, 9, 4),//formatDate(new Date(), '19/11/2021', 'en-GB'),
    status: 'canceled',
    station: 'Ahamdabad, Gujrat',
    Mobile: 104151,
  },
  {
    orderId: 13,
    partyName: 'Alessia Caravaggio',
    orderDate: new Date(2021, 11, 20),//formatDate(new Date(), '20/12/2021', 'en-GB'),
    status: 'canceled',
    station: 'Gandhinager, Gujrat',
    Mobile: 124151,
  },
  {
    orderId: 14,
    partyName: 'partyName14',
    orderDate: new Date(2021, 11, 27),//formatDate(new Date(), '27/12/2021', 'en-GB'),
    status: 'canceled',
    station: 'city/state',
    Mobile: 735737456,
  },
  {
    orderId: 15,
    partyName: 'Cassidee Cavazos',
    orderDate: new Date(2021, 11, 24),//formatDate(new Date(), '24/11/2021', 'en-GB'),
    status: 'canceled',
    station: 'Kota, Rajasthan',
    Mobile: 124151,
  },
  {
    orderId: 16,
    partyName: 'partyName16',
    orderDate: new Date(2021, 11, 23),//formatDate(new Date(), '23/12/2021', 'en-GB'),
    status: 'pending',
    station: 'city/state',
    Mobile: 8895362,
  },
  {
    orderId: 17,
    partyName: 'partyName17',
    orderDate: new Date(2021, 11, 21),//formatDate(new Date(), '21/11/2021', 'en-GB'),
    status: 'canceled',
    station: 'city/state',
    Mobile: 99732,
  },
  {
    orderId: 18,
    partyName: 'partyName18',
    orderDate: new Date(2021, 10, 19),//formatDate(new Date(), '19/12/2021', 'en-GB'),
    status: 'canceled',
    station: 'city/state',
    Mobile: 124151,
  },
  {
    orderId: 19,
    partyName: 'partyName19',
    orderDate: new Date(2021, 10, 21),//formatDate(new Date(), '21/12/2021', 'en-GB'),
    status: 'approved',
    station: 'city/state',
    Mobile: 124151,
  },
  {
    orderId: 20,
    partyName: 'partyName20',
    orderDate: new Date(2021, 10, 12),//formatDate(new Date(), '12/11/2020', 'en-GB'),
    status: 'pending',
    station: 'city/state',
    Mobile: 124151,
  },
];
