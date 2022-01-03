import { FormControl, FormGroup } from '@angular/forms';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { formatDate } from '@angular/common';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import * as _ from 'lodash';



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

  filterData(event: any) {
    this.dataSource.filter = event.target.value;
  } //Filter by search bar

  filterByStatus(event: any) {
    this.clikOnCustom = false;
    this.isDivVisible = !this.isDivVisible;
  }

  clickMe() {
    let var1 = this.customForm.get('formDate').value;
    let var2 = this.customForm.get('toDate').value;
    console.log(var1, var2, this.dataSource);
    //  this.dataSource.filteredData.forEach((day)=> {
    //  if(day.orderDate >= var1 && day <= var2) {
    //    console.log("workss");
    //  }
    // })
    // let convertDate = new Date(var1).toISOString().slice(0, 10).split('-');
    // let convertDate2 = new Date(var2).toISOString().slice(0, 10).split('-');
    // let actualValue = (`${convertDate[0]}-${convertDate[2]}-${convertDate[1]}`);
    // let actualValue2 = (`${convertDate2[0]}-${convertDate2[2]}-${convertDate2[1]}`);
  }

  filterByDate(filterRequest: any) {
    this.clikOnCustom = false;
    if (filterRequest === 'today') {
      this.requestDate = new Date().toISOString().slice(0, 10).split('-');
      console.log(this.requestDate);
      let convertDate = `${this.requestDate[2]}/${this.requestDate[1]}/${this.requestDate[0]}`;
      console.log(convertDate);
      this.dataSource.filteredData.forEach((day) => {
        if (day === convertDate) {
          this.dataSource.filter = convertDate;
        }
      });
      this.dataSource.filter = convertDate;
    }

    if (filterRequest === 'yesterday') {
      console.log('yesterday');
      this.requestDate = new Date();
      let getday = this.requestDate.setDate(this.requestDate.getDate() - 1);
      let actualYesterDay = new Date(getday).toISOString().slice(0, 10).split('-');
      let replacDate = `${actualYesterDay[2]}/${actualYesterDay[1]}/${actualYesterDay[0]}`;
      this.dataSource.filter = replacDate;
    }

    // if(filterRequest === 'lastMonth') {
    //   console.log("this Month")
    //   this.requestDate = new Date();
    //   console.log("this month",this.requestDate);

    //   let previousMonth = new Date(this.requestDate);
    //   previousMonth.setMonth(this.requestDate.getMonth() - 1);
    //   const monthDate = formatDate(previousMonth, 'dd-MM-yyyy', 'en-PH');
    //   this.dataSource.filter = monthDate;
    //   console.log(monthDate);
    // }

    if (filterRequest === 'thisMonth') {
      console.log(this.requestDate);
      let date = new Date();
      let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      console.log(date.getMonth());

      // this.dataSourceFiltered = this.dummyData.map(el => {
      //   console.log(new Date(el.orderDate))
      // })
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
  orderDate: any;
  status: string;
  station: string;
  Mobile: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    orderId: 1,
    partyName: 'Nevine Acotanza',
    orderDate: formatDate(new Date(), '02/01/2022', 'en-GB'),
    status: 'pending',
    station: 'pali Rajasthan',
    Mobile: 1274151,
  },
  {
    orderId: 2,
    partyName: 'partyName2',
    orderDate: formatDate(new Date(), '03/12/2021', 'en-GB'),
    status: 'approved',
    station: 'jaipur, Rajasthan',
    Mobile: 124151,
  },
  {
    orderId: 3,
    partyName: 'Oluwarotimi Adesina',
    orderDate: formatDate(new Date(), '04/11/2021', 'en-GB'),
    status: 'delivered',
    station: 'Ajmer, Rajasthan',
    Mobile: 1246151,
  },
  {
    orderId: 4,
    partyName: 'partyName4',
    orderDate: formatDate(new Date(), '03/01/2022', 'en-GB'),
    status: 'delivered',
    station: 'Gurugram, Dehli',
    Mobile: 124151,
  },
  {
    orderId: 5,
    partyName: 'Praveen Bommannavar',
    orderDate: formatDate(new Date(), '08/02/2021', 'en-GB'),
    status: 'pending',
    station: 'Mumbai, Maharastra',
    Mobile: 124151,
  },
  {
    orderId: 6,
    partyName: 'partyName6',
    orderDate: formatDate(new Date(), '11/11/2021', 'en-GB'),
    status: 'approved',
    station: 'karnal, Hariyana',
    Mobile: 124151,
  },
  {
    orderId: 7,
    partyName: 'Fabrizio Cedrone',
    orderDate: formatDate(new Date(), '09/03/2021', 'en-GB'),
    status: 'approved',
    station: 'Noida, Delhi',
    Mobile: 199151,
  },
  {
    orderId: 8,
    partyName: 'partyName8',
    orderDate: formatDate(new Date(), '01/12/2021', 'en-GB'),
    status: 'canceled',
    station: 'Jodhpur, Rajasthan',
    Mobile: 134151,
  },
  {
    orderId: 9,
    partyName: 'partyName9',
    orderDate: formatDate(new Date(), '10/12/2021', 'en-GB'),
    status: 'pending',
    station: 'Chandigadth, Punjab',
    Mobile: 124151,
  },
  {
    orderId: 10,
    partyName: 'Dharshani Arumugam',
    orderDate: formatDate(new Date(), '01/12/2021', 'en-GB'),
    status: 'canceled',
    station: 'Amratsar, Punjab',
    Mobile: 1241851,
  },
  {
    orderId: 11,
    partyName: 'partyName11',
    orderDate: formatDate(new Date(), '28/12/2021', 'en-GB'),
    status: 'approved',
    station: 'city/state',
    Mobile: 94135331,
  },
  {
    orderId: 12,
    partyName: 'partyName12',
    orderDate: formatDate(new Date(), '19/11/2021', 'en-GB'),
    status: 'canceled',
    station: 'Ahamdabad, Gujrat',
    Mobile: 104151,
  },
  {
    orderId: 13,
    partyName: 'Alessia Caravaggio',
    orderDate: formatDate(new Date(), '20/12/2021', 'en-GB'),
    status: 'canceled',
    station: 'Gandhinager, Gujrat',
    Mobile: 124151,
  },
  {
    orderId: 14,
    partyName: 'partyName14',
    orderDate: formatDate(new Date(), '27/12/2021', 'en-GB'),
    status: 'canceled',
    station: 'city/state',
    Mobile: 735737456,
  },
  {
    orderId: 15,
    partyName: 'Cassidee Cavazos',
    orderDate: formatDate(new Date(), '24/11/2021', 'en-GB'),
    status: 'canceled',
    station: 'Kota, Rajasthan',
    Mobile: 124151,
  },
  {
    orderId: 16,
    partyName: 'partyName16',
    orderDate: formatDate(new Date(), '23/12/2021', 'en-GB'),
    status: 'pending',
    station: 'city/state',
    Mobile: 8895362,
  },
  {
    orderId: 17,
    partyName: 'partyName17',
    orderDate: formatDate(new Date(), '21/11/2021', 'en-GB'),
    status: 'canceled',
    station: 'city/state',
    Mobile: 99732,
  },
  {
    orderId: 18,
    partyName: 'partyName18',
    orderDate: formatDate(new Date(), '19/12/2021', 'en-GB'),
    status: 'canceled',
    station: 'city/state',
    Mobile: 124151,
  },
  {
    orderId: 19,
    partyName: 'partyName19',
    orderDate: formatDate(new Date(), '21/12/2021', 'en-GB'),
    status: 'approved',
    station: 'city/state',
    Mobile: 124151,
  },
  {
    orderId: 20,
    partyName: 'partyName20',
    orderDate: formatDate(new Date(), '12/11/2020', 'en-GB'),
    status: 'pending',
    station: 'city/state',
    Mobile: 124151,
  },
];
