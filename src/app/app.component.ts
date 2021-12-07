import { logging } from 'protractor';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'salesorder';

  numberOnlyRegex = '/[0-9]+$/g';

  orderDate = new Date().toISOString().slice(0, 10).split('-');

  salesOrder = new FormGroup({
    party: new FormControl(null, [Validators.required]),
    address: new FormControl({ value: null, disabled: true }, [Validators.required]),
    book: new FormControl(null, [Validators.required]),
    orderType: new FormControl(null, [Validators.required]),
    taxType: new FormControl(null, [Validators.required]),
    orderId: new FormControl(null, [Validators.required]),
    orderDate: new FormControl({ value: `${this.orderDate[2]}-${this.orderDate[1]}-${this.orderDate[0]}`, disabled: true }, [Validators.required]),
    deliveryDate: new FormControl(null, [Validators.required]),
    challan: new FormControl(null, [Validators.required]),

    // FIND PRODUCT FORM
    showForm: new FormControl(false),
    productId: new FormControl(null, [Validators.required]),
    mrp: new FormControl(null, [Validators.required]),
    rate: new FormControl(null, [Validators.required]),
    qnt: new FormControl(null, [Validators.required]),
    amnt: new FormControl(null, [Validators.required]),
    dis1: new FormControl(null, [Validators.required]),
    disamt1: new FormControl(null, [Validators.required]),
    dis2: new FormControl(null, [Validators.required]),
    disamt2: new FormControl(null, [Validators.required]),
    tax1: new FormControl(null, [Validators.required]),
    tax2: new FormControl(null, [Validators.required]),

    products: new FormArray([]),
    quantity: new FormControl(0, [Validators.required]),
    amount: new FormControl(0, [Validators.required]),
    discountAmount: new FormControl(0, [Validators.required]),
    taxAmount: new FormControl(0, [Validators.required]),
    totalAmount: new FormControl(0, [Validators.required]),
    salesman: new FormControl(),
    broker: new FormControl(),
    hasteName: new FormControl(),
    transPort: new FormControl(),
    dueDays: new FormControl(),
  });

  partyOptions = [
    { id: 1, partyName: 'party1', dueDays: 2 },
    { id: 2, partyName: 'party2', dueDays: 10 },
    { id: 3, partyName: 'party3', dueDays: 7 },
    { id: 4, partyName: 'party4', dueDays: 5 },
  ];

  salesmans = [
    { id: 1, salesmanName: 'salesman1' },
    { id: 2, salesmanName: 'salesman2' },
    { id: 3, salesmanName: 'salesman3' },
    { id: 4, salesmanName: 'salesman4' },
  ];

  brokers = [
    { id: 1, brokerName: 'broker1' },
    { id: 2, brokerName: 'broker2' },
    { id: 3, brokerName: 'broker3' },
    { id: 4, brokerName: 'broker4' },
  ];

  addressOptions = [
    { id: 1, partyAddress: 'address1', partyId: 1 },
    { id: 2, partyAddress: 'address2', partyId: 2 },
    { id: 3, partyAddress: 'address3', partyId: 3 },
    { id: 4, partyAddress: 'address4', partyId: 4 },
  ];

  bookOptions = [{ id: 1, value: 'Sales Order' }];

  orderTypeOptions = [
    { id: 1, orderType: 'Whatsapp' },
    { id: 2, orderType: 'Online Portal' },
  ];

  taxTypeOptions = [
    { id: 1, value: 'CGST' },
    { id: 2, value: 'SGST' },
  ];

  products = [
    {
      id: 1,
      name: 'Kurti',
      mrp: 500,
      rate: 500,
    },
    {
      id: 2,
      name: 'Shirt',
      mrp: 600,
      rate: 600,
    },
  ];

  ngOnInit() {}

  onPartyChange() {
    // ADDRESS LOGIC
    const partyId = +this.salesOrder.get('party').value;
    this.addressOptions.forEach((address) => {
      if (address.partyId === partyId) {
        this.salesOrder.get('address').setValue(address.partyAddress);
      }
    });

    // DUE DATE LOGIC
    this.partyOptions.forEach((party) => {
      if (party.id === partyId) {
        this.salesOrder.get('dueDays').setValue(party.dueDays);
      }
    });

    // DELIVERY DATE LOGIC
    const dueDays = this.salesOrder.get('dueDays').value;
    const orderDate = this.salesOrder.get('orderDate').value.split('-');
    const orderDateFormat = new Date(`${orderDate[2]}-${orderDate[1]}-${orderDate[0]}`);
    const deliveryDate = orderDateFormat.setDate(orderDateFormat.getDate() + dueDays);
    const actualDeliveryDate = new Date(deliveryDate).toISOString().slice(0, 10).split('-');
    this.salesOrder.get('deliveryDate').setValue(`${actualDeliveryDate[2]}-${actualDeliveryDate[1]}-${actualDeliveryDate[0]}`);
  }

  onBookChange() {
    const orderId = this.salesOrder.get('book').value;
    const currentDate: any = new Date().toISOString().slice(0, 10).split('-');

    this.salesOrder.get('orderId').setValue(orderId);
    this.salesOrder.get('orderId').disable();

    this.salesOrder.get('orderDate').setValue(`${currentDate[2]}-${currentDate[1]}-${currentDate[0]}`);
    this.salesOrder.get('orderDate').disable();
  }

  toggleForm() {
    const value = this.salesOrder.get('showForm').value;
    this.salesOrder.get('showForm').setValue(!value);
  }

  onDelete(index: number) {
    const productsFormArray = this.salesOrder.get('products') as FormArray;
    if (productsFormArray.length > 0) {
      productsFormArray.removeAt(index);
    }
  }

  get productsControls() {
    return (this.salesOrder.get('products') as FormArray).controls;
  }

  getControls() {
    return (this.salesOrder.get('products') as FormArray).controls.length > 0;
  }

  onProductChange() {
    const searchString = +this.salesOrder.get('productId').value;

    this.products.forEach((product) => {
      if (product.id === searchString) {
        this.salesOrder.get('mrp').setValue(product.mrp);
        this.salesOrder.get('rate').setValue(product.rate);
      }
    });
  }

  onQntChange() {
    const qnt = +this.salesOrder.get('qnt').value;
    const mrp = +this.salesOrder.get('mrp').value;
    const amount = qnt * mrp;
    this.salesOrder.get('amnt').setValue(amount);
  }

  onDiscount1Change() {
    const disPer = +this.salesOrder.get('dis1').value;
    const mrp = +this.salesOrder.get('mrp').value;
    const disAmt = (disPer / 100) * mrp;

    this.salesOrder.get('disamt1').setValue(disAmt);
    this.salesOrder.get('disamt1').disable();
  }

  onDiscount2Change() {
    const disPer = +this.salesOrder.get('dis2').value;
    const disAmt1 = +this.salesOrder.get('disamt1').value;
    const mrp = +this.salesOrder.get('mrp').value;

    const disAmt = (disPer / 100) * (mrp - disAmt1);

    this.salesOrder.get('disamt2').setValue(disAmt);
    this.salesOrder.get('disamt2').disable();
  }

  onAddProduct() {
    const productsFormArray = this.salesOrder.get('products') as FormArray;

    const productId = this.salesOrder.get('productId').value;
    const qnt = this.salesOrder.get('qnt').value;
    const mrp = this.salesOrder.get('mrp').value;
    const rate = this.salesOrder.get('rate').value;
    const dis1 = this.salesOrder.get('dis1').value;
    const disamt1 = this.salesOrder.get('disamt1').value;
    const dis2 = this.salesOrder.get('dis2').value;
    const disamt2 = this.salesOrder.get('disamt2').value;
    const amnt = this.salesOrder.get('amnt').value;
    const tax1 = this.salesOrder.get('tax1').value;
    const tax2 = this.salesOrder.get('tax2').value;

    productsFormArray.push(
      new FormGroup({
        productId: new FormControl({ value: productId, disabled: true }),
        qnt: new FormControl({ value: qnt, disabled: true }),
        mrp: new FormControl({ value: mrp, disabled: true }),
        rate: new FormControl({ value: rate, disabled: true }),
        dis1: new FormControl({ value: dis1, disabled: true }),
        disamt1: new FormControl({ value: disamt1, disabled: true }),
        dis2: new FormControl({ value: dis2, disabled: true }),
        disamt2: new FormControl({ value: disamt2, disabled: true }),
        amnt: new FormControl({ value: amnt, disabled: true }),
        tax1: new FormControl({ value: tax1, disabled: true }),
        tax2: new FormControl({ value: tax2, disabled: true }),
      })
    );

    this.salesOrder.get('productId').setValue(null);
    this.salesOrder.get('qnt').setValue(null);
    this.salesOrder.get('mrp').setValue(null);
    this.salesOrder.get('rate').setValue(null);
    this.salesOrder.get('dis1').setValue(null);
    this.salesOrder.get('disamt1').setValue(null);
    this.salesOrder.get('dis2').setValue(null);
    this.salesOrder.get('disamt2').setValue(null);
    this.salesOrder.get('amnt').setValue(null);
    this.salesOrder.get('tax1').setValue(null);
    this.salesOrder.get('tax2').setValue(null);
  }

  onSubmit() {
    console.log('OnSubmit Called');
    console.log(this.salesOrder.value);
    if (this.salesOrder.valid) {
      alert('Valid & form Submitted');
    }
  }
}
