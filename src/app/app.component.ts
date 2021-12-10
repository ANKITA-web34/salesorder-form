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

  toggleButton: boolean;
  isOnIndex:boolean = false;


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
    rate: new FormControl(0, [Validators.required]),
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

  bookOptions = [
    { id: 1, value: 'Sales Order' },
    { id: 2, value: 'Challan' },
    { id: 3, value: 'In Voice' },
  ];

  orderTypeOptions = [
    { id: 1, orderType: 'Whatsapp' },
    { id: 2, orderType: 'By Agent' },
    { id: 3, orderType: 'By Email' },
    { id: 4, orderType: 'On Call' },
    { id: 5, orderType: 'Shop Visit' },
  ];

  taxTypeOptions = [
    { id: 1, value: 'IGST' },
    { id: 2, value: 'SGST' },
    { id: 3, value: 'N/A' },
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

  toggleForm(index: number) { 
    const formArray = this.salesOrder.get('products') as FormArray;
    const productControls = formArray.controls[index];
    
    const value = productControls.get('btnToggle').value;
    productControls.get('btnToggle').setValue(!value);  
    

    // const value = this.salesOrder.get('showForm').value;
    // this.salesOrder.get('showForm').setValue(!value);  
    // this.toggleButton = !this.toggleButton;
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

  onProductChange(index: number) {
    const formArray = this.salesOrder.get('products') as FormArray;
    const productControls = formArray.controls[index];
    const searchString = +productControls.get('productId').value;

    this.products.forEach((product) => {
      if (product.id === searchString) {
        productControls.get('mrp').setValue(product.mrp);
        productControls.get('mrp').disable();
        productControls.get('rate').setValue(product.rate);
        productControls.get('rate').disable();
        productControls.get('amnt').setValue(product.mrp);
        productControls.get('amnt').disable();
        productControls.get('qnt').setValue(1);
      }
    });

    this.grandTotal();
    
  }

  onQntChange(index: number) {
    const formArray = this.salesOrder.get('products') as FormArray;
    const productControls = formArray.controls[index];

    // AMOUNT OF THE PRODUCT
    const qnt = +productControls.get('qnt').value;
    const rate = +productControls.get('rate').value;
    const amount = qnt * rate;
    productControls.get('amnt').setValue(amount);

    this.onTax1Change(index);
    this.onTax2Change(index);
    this.grandTotal();
  }


  onDiscount1Change(index: number) {
    const formArray = this.salesOrder.get('products') as FormArray;
    const productControls = formArray.controls[index];

    const disPer = +productControls.get('dis1').value;
    const mrp = +productControls.get('mrp').value;
    const disAmt = (mrp * disPer) / 100;
    const rate = mrp - disAmt;

    productControls.get('disamt1').setValue(disAmt);
    productControls.get('disamt1').disable();
    productControls.get('rate').setValue(rate);

    this.onQntChange(index);
    this.onTax1Change(index);
    this.onTax2Change(index);
    this.grandTotal();
  }

  onDiscount2Change(index: number) {
    const formArray = this.salesOrder.get('products') as FormArray;
    const productControls = formArray.controls[index];

    const disPer = +productControls.get('dis2').value;
    const disAmt1 = +productControls.get('disamt1').value;
    const mrp = +productControls.get('mrp').value;

    const disAmt = (disPer / 100) * (mrp - disAmt1);
    const rate = mrp - (disAmt1 + disAmt);

    productControls.get('disamt2').setValue(disAmt);
    productControls.get('disamt2').disable();
    productControls.get('rate').setValue(rate);

    this.onQntChange(index);
    this.onTax1Change(index);
    this.onTax2Change(index);
    this.grandTotal();
  }

  onTax1Change(index: number) {
    const formArray = this.salesOrder.get('products') as FormArray;
    const productControls = formArray.controls[index];

    const productAmount = +productControls.get('amnt').value;
    const taxPer = +productControls.get('tax1').value;
    const taxAmnt = (taxPer * productAmount) / 100;

    console.log(taxAmnt);

    productControls.get('tax1amt').setValue(taxAmnt);
    this.grandTotal();
  }

  onTax2Change(index: number) {
    const formArray = this.salesOrder.get('products') as FormArray;
    const productControls = formArray.controls[index];

    const tax1Amt = +productControls.get('tax1amt').value;
    const taxPer2 = +productControls.get('tax2').value;

    const tax2Amt = (taxPer2 * tax1Amt) / 100;
    console.log(tax2Amt);
    productControls.get('tax2amt').setValue(tax2Amt);
    this.grandTotal();
  }

  grandTotal() {
    const formArray = this.salesOrder.get('products') as FormArray;

    let qnt = 0;
    let amount = 0;
    let discountAmount = 0;
    let taxAmount = 0;

    formArray.controls.forEach((control: FormControl) => { 
      qnt += +control.get('qnt').value;
      amount += +control.get('amnt').value;
      discountAmount += +control.get('disamt1').value + +control.get('disamt2').value;
      taxAmount += +control.get('tax1amt').value + +control.get('tax2amt').value;
    });

    this.salesOrder.get('quantity').setValue(qnt);
    this.salesOrder.get('amount').setValue(amount);
    this.salesOrder.get('discountAmount').setValue(discountAmount);
    this.salesOrder.get('taxAmount').setValue(taxAmount);

    const totalValue = amount - discountAmount + taxAmount;
    this.salesOrder.get('totalAmount').setValue(totalValue);
  }

  onAddProduct() {
    const productsFormArray = this.salesOrder.get('products') as FormArray;

    productsFormArray.push(
      new FormGroup({
        productId: new FormControl(null),
        qnt: new FormControl(null),
        mrp: new FormControl(null),
        rate: new FormControl(null),
        dis1: new FormControl(null),
        disamt1: new FormControl(null),
        dis2: new FormControl(null),
        disamt2: new FormControl(null),
        amnt: new FormControl(null),
        tax1: new FormControl(null),
        tax2: new FormControl(null),
        tax1amt: new FormControl(null),
        tax2amt: new FormControl(null),
        btnToggle: new FormControl({ value: false })
      })
    );

  }

  onSubmit() {
    console.log('OnSubmit Called');
    console.log(this.salesOrder.value);
    if (this.salesOrder.valid) {
      alert('Valid & form Submitted');
    }
  }
}
