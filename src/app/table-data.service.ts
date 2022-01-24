import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TableDataService {
 
  dataSource = new Subject<any>();

  getData() {
    return new MatTableDataSource(ELEMENT_DATA);
  }

  
  constructor() { }
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
  { orderId: 1, partyName: 'Nevine Acotanza', orderDate: new Date(2022, 0, 2), status: 'pending', station: 'pali Rajasthan', Mobile: 1274151, action: '' },
  { orderId: 2, partyName: 'partyName2', orderDate: new Date(2021, 11, 3), status: 'approved', station: 'jaipur, Rajasthan', Mobile: 124151, action: '' },
  { orderId: 3, partyName: 'Oluwarotimi Adesina', orderDate: new Date(2021, 10, 4), status: 'delivered', station: 'Ajmer, Rajasthan', Mobile: 1246151, action: '' },
  { orderId: 4, partyName: 'partyName4', orderDate: new Date(2022, 0, 3), status: 'delivered', station: 'Gurugram, Dehli', Mobile: 124151, action: '' },
  { orderId: 5, partyName: 'Praveen Bommannavar', orderDate: new Date(2021, 1, 8), status: 'pending', station: 'Mumbai, Maharastra', Mobile: 124151, action: '' },
  { orderId: 6, partyName: 'partyName6', orderDate: new Date(2021, 10, 11), status: 'approved', station: 'karnal, Hariyana', Mobile: 124151, action: '' },
  { orderId: 7, partyName: 'Fabrizio Cedrone', orderDate: new Date(2021, 9, 3), status: 'approved', station: 'Noida, Delhi', Mobile: 199151, action: '' },
  { orderId: 8, partyName: 'partyName8', orderDate: new Date(2021, 11, 1), status: 'canceled', station: 'Jodhpur, Rajasthan', Mobile: 134151, action: '' },
  { orderId: 9, partyName: 'partyName9', orderDate: new Date(2021, 11, 10), status: 'pending', station: 'Chandigadth, Punjab', Mobile: 124151, action: '' },
  { orderId: 10, partyName: 'Dharshani Arumugam', orderDate: new Date(2021, 11, 1), status: 'canceled', station: 'Amratsar, Punjab', Mobile: 1241851, action: '' },
  { orderId: 11, partyName: 'partyName11', orderDate: new Date(2021, 11, 28), status: 'approved', station: 'city/state', Mobile: 94135331, action: '' },
  { orderId: 12, partyName: 'partyName12', orderDate: new Date(2021, 9, 4), status: 'canceled', station: 'Ahamdabad, Gujrat', Mobile: 104151, action: '' },
  { orderId: 13, partyName: 'Alessia Caravaggio', orderDate: new Date(2021, 11, 20), status: 'canceled', station: 'Gandhinager, Gujrat', Mobile: 124151, action: '' },
  { orderId: 14, partyName: 'partyName14', orderDate: new Date(2021, 11, 27), status: 'canceled', station: 'city/state', Mobile: 735737456, action: '' },
  { orderId: 15, partyName: 'Cassidee Cavazos', orderDate: new Date(2021, 11, 24), status: 'canceled', station: 'Kota, Rajasthan', Mobile: 124151, action: '' },
  { orderId: 16, partyName: 'partyName16', orderDate: new Date(2021, 11, 23), status: 'pending', station: 'city/state', Mobile: 8895362, action: '' },
  { orderId: 17, partyName: 'partyName17', orderDate: new Date(2022, 0, 16), status: 'canceled', station: 'city/state', Mobile: 99732, action: '' },  {
    orderId: 18, partyName: 'partyName18', orderDate: new Date(2022, 0, 17), status: 'canceled', station: 'city/state', Mobile: 124151, action: '' },
  { orderId: 19, partyName: 'partyName19', orderDate: new Date(2021, 10, 21), status: 'approved', station: 'city/state', Mobile: 124151, action: '' },
  { orderId: 20, partyName: 'partyName20', orderDate: new Date(2021, 10, 12), status: 'pending', station: 'city/state', Mobile: 124151, action: '' },
];
