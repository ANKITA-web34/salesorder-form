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
    orderDate: new FormControl(`${this.orderDate[2]}-${this.orderDate[1]}-${this.orderDate[0]}`, [Validators.required]),
    deliveryDate: new FormControl(null, [Validators.required]),
    challan: new FormControl(null, [Validators.required]),
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

  // onLoad() {
  //   // const currentDate: any = new Date().toISOString().slice(0, 10).split('-');
  //   // const splitTime = `${currentDate[2]}-${currentDate[1]}-${currentDate[0]}`
  //   // this.salesOrder.get('orderDate').setValue(splitTime);
  //   // this.salesOrder.get('orderDate').disable();
  //   console.log("hello on load")
  // }

  onBookChange() {
    const orderId = this.salesOrder.get('book').value;
    const currentDate: any = new Date().toISOString().slice(0, 10).split('-');

    this.salesOrder.get('orderId').setValue(orderId);
    this.salesOrder.get('orderId').disable();

    this.salesOrder.get('orderDate').setValue(`${currentDate[2]}-${currentDate[1]}-${currentDate[0]}`);
    this.salesOrder.get('orderDate').disable();
  }

  onAddMore() {
    const productsFormArray = this.salesOrder.get('products') as FormArray;

    if (productsFormArray.valid) {
      productsFormArray.push(
        new FormGroup({
          // productSearchString: new FormControl(null, Validators.required),
          productId: new FormControl(null, [Validators.required]),
          qnt: new FormControl(null, [Validators.required]),
          mrp: new FormControl(null, [Validators.required]),
          rate: new FormControl(null, [Validators.required]),
          dis1: new FormControl(null, [Validators.required]),
          disamt1: new FormControl({ value: null, disabled: true }, [Validators.required]),
          dis2: new FormControl(null, [Validators.required]),
          disamt2: new FormControl({ value: null, disabled: true }, [Validators.required]),
          amnt: new FormControl({ value: null, disabled: true }, [Validators.required]),
          tax1: new FormControl(null),
          tax2: new FormControl(null),
          deleteButton: new FormControl(null),
          addButton: new FormControl(null),
        })
      );
    }
  }

  onDelete(idx: any) {
    const productsFormArray = this.salesOrder.get('products') as FormArray;
    if (productsFormArray.length > 0) {
      productsFormArray.removeAt(idx);
    }
  }

  get productsControls() {
    return (this.salesOrder.get('products') as FormArray).controls;
  }

  getControls() {
    return (this.salesOrder.get('products') as FormArray).controls.length > 0;
  }

  onProductChange(i: number) {
    const productsFormArray = this.salesOrder.get('products') as FormArray;
    const productControls = productsFormArray.controls[i];

    const searchString = +productControls.get('productId').value;

    this.products.forEach((product) => {
      if (product.id === searchString) {
        // productControls.get('productId').setValue(product.id);
        productControls.get('mrp').setValue(product.mrp);
        productControls.get('rate').setValue(product.rate);
      }
    });
  }

  onQntChange(idx: any) {
    const productsFormArray = this.salesOrder.get('products') as FormArray;
    const productControls = productsFormArray.controls[idx];

    let quantity = 0;
    let amount = 0;
    let addOfDisAmnt1 = 0;
    let addOfDisAmnt2 = 0;
    let grandDiscountAmount = 0;
    let getTaxValue = 0;
    let getTaxValue2 = 0;
    let grandTotalOfTax = 0;
    let grandTotal = 0;

    productsFormArray.controls.forEach((control: FormControl) => {
      // FOR TOTAL QUANTITY
      quantity += +control.get('qnt').value;

      //For grandDiscount
      addOfDisAmnt1 += (+control.get('mrp').value - +control.get('disamt1').value) * +control.get('qnt').value;
      addOfDisAmnt2 +=
        (+control.get('mrp').value -
          +control.get('disamt1').value -
          +control.get('disamt2').value * (+control.get('mrp').value - +control.get('disamt1').value)) *
        +control.get('qnt').value;
      grandDiscountAmount += addOfDisAmnt1 + addOfDisAmnt2 - +control.get('mrp').value;
      // addOfDisAmnt += ((+control.get('disamt1').value) + (+control.get('disamt2').value)) * (+control.get('qnt').value);
      // grandDiscountAmount +=  addOfDisAmnt * +control.get('mrp').value;

      //For GrandTaxAmount
      getTaxValue += (+control.get('mrp').value * +control.get('tax1').value) / 100;
      getTaxValue2 += (+control.get('mrp').value * +control.get('tax2').value) / 100;
      grandTotalOfTax += ((getTaxValue + getTaxValue2) * +control.get('mrp').value) / 100;

      //For Total Amount
      grandTotal += +control.get('mrp').value - grandDiscountAmount + grandTotalOfTax;
      console.log(grandTotal);

      // FOR AMOUNT
      amount += +control.get('qnt').value * +control.get('mrp').value;
    });

    this.salesOrder.get('quantity').setValue(quantity);
    this.salesOrder.get('amount').setValue(amount);
    this.salesOrder.get('discountAmount').setValue(grandDiscountAmount);
    this.salesOrder.get('taxAmount').setValue(grandTotalOfTax);
    this.salesOrder.get('totalAmount').setValue(grandTotal);

    const productAmount = +productControls.get('mrp').value * +productControls.get('qnt').value;
    productControls.get('amnt').setValue(productAmount);
  }

  onDiscount1Change(i: number) {
    const productsFormArray = this.salesOrder.get('products') as FormArray;
    const productControls = productsFormArray.controls[i];

    const disPer = +productControls.get('dis1').value;
    const mrp = +productControls.get('mrp').value;
    const disAmt = (disPer / 100) * mrp;

    productControls.get('disamt1').setValue(disAmt);
    productControls.get('disamt1').disable();
  }

  onDiscount2Change(i: number) {
    const productsFormArray = this.salesOrder.get('products') as FormArray;
    const productControls = productsFormArray.controls[i];

    const disPer1 = +productControls.get('dis1').value;
    const disPer = +productControls.get('dis2').value;
    const disAmt1 = +productControls.get('disamt1').value;
    const mrp = +productControls.get('mrp').value;

    const disAmt = (disPer / 100) * (mrp - disAmt1);

    productControls.get('disamt2').setValue(disAmt);
    productControls.get('disamt2').disable();

    //(Discount/List Price) × 100.
  }

  onSubmit() {
    console.log('OnSubmit Called');
    console.log(this.salesOrder.value);
    if (this.salesOrder.valid) {
      alert('Valid & form Submitted');
    }
  }
}
