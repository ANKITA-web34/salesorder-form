import { FormControl, FormGroup } from '@angular/forms';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ngxCsv } from 'ngx-csv/ngx-csv';
// import * as moment from 'moment';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements AfterViewInit {
  displayedColumns: string[] = ['orderId', 'orderDate', 'partyName', 'station', 'Mobile', 'status', 'action'];
  dataSource: any = new MatTableDataSource(ELEMENT_DATA);
  isOnIndex: boolean = false;
  isDivVisible: boolean = false;
  clikOnCustom: boolean = false;
  generalValue: any;
  requestDate: any;
  requestStatus: any;
  filterSelectObj: any = []

  customForm = new FormGroup({
    formDate: new FormControl(false),
    toDate: new FormControl(false),
    apply: new FormControl({ value: false }),
  });

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  announceSortChange(sortState: Sort) {
    console.log(sortState);
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  filterData(event: any) { this.dataSource.filter = event.target.value; } //Filter by search bar

  filter() {
    this.isDivVisible = !this.isDivVisible;
    this.clikOnCustom = false;
  }

  filterByStatus(filterRequest: any) {
    if (filterRequest === 'pending') {
      this.dataSource.filter = filterRequest;
    }

    if (filterRequest === 'delivered') {
      console.log('status: delivered');
      this.dataSource.filter = filterRequest;
    }
    
    if (filterRequest === 'cancel') {
      console.log('status: cancel');
      this.dataSource.filter = filterRequest;
    }

    if (filterRequest === 'approved') {
      console.log('status: approved');
      this.dataSource.filter = filterRequest;
    }
  }

  tableData = [];

  clickMe() {
    this.dataSource = this.tableData;    
  }

  filterByDate(filterRequest: any) {
    this.clikOnCustom = false;

    if (filterRequest === 'today') {
      this.tableData = [];
      let todayDate: Date = new Date();
      console.log(todayDate);
      todayDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
      console.log(todayDate);
      ELEMENT_DATA.forEach((day) => {
        console.log(day.orderDate, todayDate);
        if (day.orderDate >= todayDate && day.orderDate <= todayDate) {
          this.tableData.push(day);
        }
      });
    }

    if (filterRequest === 'yesterday') {
      console.log('yesterday');
      let tableData = [];
      let today = new Date();
      let yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());
      console.log(today, yesterday);
      ELEMENT_DATA.forEach((day) => {
        console.log(day.orderDate, yesterday, day.orderDate >= yesterday && day.orderDate <= yesterday);
        if (day.orderDate >= yesterday && day.orderDate <= yesterday) {
          tableData.push(day);
        }
      });
    }

    if (filterRequest === 'lastMonth') {
      this.tableData = [];
      this.requestDate = new Date();
      let previousMonth = new Date(this.requestDate);
      previousMonth.setMonth(this.requestDate.getMonth() - 1);
      let firstDay = new Date(previousMonth.getFullYear(), previousMonth.getMonth(), 1);
      let lastDay = new Date(previousMonth.getFullYear(), previousMonth.getMonth() + 1, 0);
      ELEMENT_DATA.forEach((day) => {
        if (day.orderDate >= firstDay && day.orderDate <= lastDay) {
          this.tableData.push(day);
        }
      });
    }

    if (filterRequest === 'thisMonth') {
      this.tableData = [];
      let date = new Date();
      let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      ELEMENT_DATA.forEach((item) => {
        if (item.orderDate >= firstDay && item.orderDate <= lastDay) {
          this.tableData.push(item);
        }
      });
    }

    if (filterRequest === 'custom') {
      const value = this.customForm.get('formDate').value &&  this.customForm.get('toDate').value;
      this.customForm.get('formDate').setValue(!value);
      this.customForm.get('toDate').setValue(!value);

      // this.tableData = [];
      // let var1: Date = this.customForm.get('formDate').value;
      // var1 = new Date(var1);
      // let var2: Date = this.customForm.get('toDate').value;
      // var2 = new Date(var2);
      // ELEMENT_DATA.forEach((day) => {
      //   if (day.orderDate >= var1 && day.orderDate <= var2) {
      //     this.tableData.push(day);
      //   }
      // });
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
  action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    orderId: 1,
    partyName: 'Nevine Acotanza',
    orderDate: new Date(2022, 0, 2),
    status: 'pending',
    station: 'pali Rajasthan',
    Mobile: 1274151,
    action: '',
  },
  {
    orderId: 2,
    partyName: 'partyName2',
    orderDate: new Date(2021, 11, 3), //formatDate(new Date(), '03/12/2021', 'en-GB'),
    status: 'approved',
    station: 'jaipur, Rajasthan',
    Mobile: 124151,
    action: '',
  },
  {
    orderId: 3,
    partyName: 'Oluwarotimi Adesina',
    orderDate: new Date(2021, 10, 4), //formatDate(new Date(), '04/11/2021', 'en-GB'),
    status: 'delivered',
    station: 'Ajmer, Rajasthan',
    Mobile: 1246151,
    action: '',
  },
  {
    orderId: 4,
    partyName: 'partyName4',
    orderDate: new Date(2022, 0, 3), //formatDate(new Date(), '03/01/2022', 'en-GB'),
    status: 'delivered',
    station: 'Gurugram, Dehli',
    Mobile: 124151,
    action: '',
  },
  {
    orderId: 5,
    partyName: 'Praveen Bommannavar',
    orderDate: new Date(2021, 1, 8), //formatDate(new Date(), '08/02/2021', 'en-GB'),
    status: 'pending',
    station: 'Mumbai, Maharastra',
    Mobile: 124151,
    action: '',
  },
  {
    orderId: 6,
    partyName: 'partyName6',
    orderDate: new Date(2021, 10, 11), //formatDate(new Date(), '11/11/2021', 'en-GB'),
    status: 'approved',
    station: 'karnal, Hariyana',
    Mobile: 124151,
    action: '',
  },
  {
    orderId: 7,
    partyName: 'Fabrizio Cedrone',
    orderDate: new Date(2021, 9, 3), //formatDate(new Date(), '09/03/2021', 'en-GB'),
    status: 'approved',
    station: 'Noida, Delhi',
    Mobile: 199151,
    action: '',
  },
  {
    orderId: 8,
    partyName: 'partyName8',
    orderDate: new Date(2021, 11, 1), //formatDate(new Date(), '01/12/2021', 'en-GB'),
    status: 'canceled',
    station: 'Jodhpur, Rajasthan',
    Mobile: 134151,
    action: '',
  },
  {
    orderId: 9,
    partyName: 'partyName9',
    orderDate: new Date(2021, 11, 10), //formatDate(new Date(), '10/12/2021', 'en-GB'),
    status: 'pending',
    station: 'Chandigadth, Punjab',
    Mobile: 124151,
    action: '',
  },
  {
    orderId: 10,
    partyName: 'Dharshani Arumugam',
    orderDate: new Date(2021, 11, 1), //formatDate(new Date(), '01/12/2021', 'en-GB'),
    status: 'canceled',
    station: 'Amratsar, Punjab',
    Mobile: 1241851,
    action: '',
  },
  {
    orderId: 11,
    partyName: 'partyName11',
    orderDate: new Date(2021, 11, 28), //formatDate(new Date(), '28/12/2021', 'en-GB'),
    status: 'approved',
    station: 'city/state',
    Mobile: 94135331,
    action: '',
  },
  {
    orderId: 12,
    partyName: 'partyName12',
    orderDate: new Date(2021, 9, 4), //formatDate(new Date(), '19/11/2021', 'en-GB'),
    status: 'canceled',
    station: 'Ahamdabad, Gujrat',
    Mobile: 104151,
    action: '',
  },
  {
    orderId: 13,
    partyName: 'Alessia Caravaggio',
    orderDate: new Date(2021, 11, 20), //formatDate(new Date(), '20/12/2021', 'en-GB'),
    status: 'canceled',
    station: 'Gandhinager, Gujrat',
    Mobile: 124151,
    action: '',
  },
  {
    orderId: 14,
    partyName: 'partyName14',
    orderDate: new Date(2021, 11, 27), //formatDate(new Date(), '27/12/2021', 'en-GB'),
    status: 'canceled',
    station: 'city/state',
    Mobile: 735737456,
    action: '',
  },
  {
    orderId: 15,
    partyName: 'Cassidee Cavazos',
    orderDate: new Date(2021, 11, 24), //formatDate(new Date(), '24/11/2021', 'en-GB'),
    status: 'canceled',
    station: 'Kota, Rajasthan',
    Mobile: 124151,
    action: '',
  },
  {
    orderId: 16,
    partyName: 'partyName16',
    orderDate: new Date(2021, 11, 23), //formatDate(new Date(), '23/12/2021', 'en-GB'),
    status: 'pending',
    station: 'city/state',
    Mobile: 8895362,
    action: '',
  },
  {
    orderId: 17,
    partyName: 'partyName17',
    orderDate: new Date(2021, 11, 21), //formatDate(new Date(), '21/11/2021', 'en-GB'),
    status: 'canceled',
    station: 'city/state',
    Mobile: 99732,
    action: '',
  },
  {
    orderId: 18,
    partyName: 'partyName18',
    orderDate: new Date(2021, 10, 19), //formatDate(new Date(), '19/12/2021', 'en-GB'),
    status: 'canceled',
    station: 'city/state',
    Mobile: 124151,
    action: '',
  },
  {
    orderId: 19,
    partyName: 'partyName19',
    orderDate: new Date(2021, 10, 21), //formatDate(new Date(), '21/12/2021', 'en-GB'),
    status: 'approved',
    station: 'city/state',
    Mobile: 124151,
    action: '',
  },
  {
    orderId: 20,
    partyName: 'partyName20',
    orderDate: new Date(2021, 10, 12), //formatDate(new Date(), '12/11/2020', 'en-GB'),
    status: 'pending',
    station: 'city/state',
    Mobile: 124151,
    action: '',
  },
];
