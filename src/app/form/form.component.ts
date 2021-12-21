import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  title = 'salesorder';

  toggleButton: boolean;
  isOnIndex: boolean = false;

  numberOnlyRegex = '/[0-9]+$/g';

  orderDate = new Date().toISOString().slice(0, 10).split('-');

  salesOrder = new FormGroup({
    party: new FormControl(null, [Validators.required]),
    address: new FormControl({ value: null, disabled: true }),
    book: new FormControl(null, [Validators.required]),
    orderType: new FormControl(null, [Validators.required]),
    taxType: new FormControl(null, [Validators.required]),
    orderId: new FormControl(null, [Validators.required]),
    orderDate: new FormControl({ value: `${this.orderDate[2]}-${this.orderDate[1]}-${this.orderDate[0]}`, disabled: true }, [Validators.required]),
    deliveryDate: new FormControl(null, [Validators.required]),
    challan: new FormControl(null),

    // FIND PRODUCT FORM
    showForm: new FormControl(false),
    productId: new FormControl(null, [Validators.required]),
    mrp: new FormControl(null, [Validators.required]),
    rate: new FormControl(0, [Validators.required]),
    qnt: new FormControl(null, [Validators.required]),
    amnt: new FormControl(null, [Validators.required]),
    dis1: new FormControl(null),
    disamt1: new FormControl(null),
    dis2: new FormControl(null),
    disamt2: new FormControl(null),
    tax1: new FormControl(null),
    tax2: new FormControl(null),

    products: new FormArray([
      new FormGroup({
        productId: new FormControl(null,  [Validators.required]),
        qnt: new FormControl(null),
        mrp: new FormControl(null),
        rate: new FormControl(null),
        dis1: new FormControl(null),
        disamt1: new FormControl(null),
        disamt1Value: new FormControl(null),
        dis2: new FormControl(null),
        disamt2: new FormControl(null),
        disamt2Value: new FormControl(null),
        amnt: new FormControl(null),
        tax1: new FormControl(null),
        tax2: new FormControl(null),
        tax1amt: new FormControl(null),
        tax2amt: new FormControl(null),
        btnToggle: new FormControl(false),
      }),
    ]),
    quantity: new FormControl(null, [Validators.required]),
    amount: new FormControl(null, [Validators.required]),
    discountAmount: new FormControl(null, [Validators.required]),
    taxAmount: new FormControl(null, [Validators.required]),
    totalAmount: new FormControl(null, [Validators.required]),
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
  hastNames = [
    { id: 1, hastNm: 'hastName-1' },
    { id: 2, hastNm: 'hastName-2' },
    { id: 3, hastNm: 'hastName-3' },
    { id: 4, hastNm: 'hastName-4' },
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
    const dueDays = +this.salesOrder.get('dueDays').value;
    const orderDate = this.salesOrder.get('orderDate').value.split('-');
    const orderDateFormat = new Date(`${orderDate[2]}-${orderDate[1]}-${orderDate[0]}`);
    const deliveryDate = orderDateFormat.setDate(orderDateFormat.getDate() + dueDays);
    const actualDeliveryDate = new Date(deliveryDate).toISOString().slice(0, 10).split('-');
    this.salesOrder.get('deliveryDate').setValue(`${actualDeliveryDate[2]}-${actualDeliveryDate[1]}-${actualDeliveryDate[0]}`);
  }

  onDueDayschange() {
    const dueDays = +this.salesOrder.get('dueDays').value;
    const orderDate = this.salesOrder.get('orderDate').value.split('-');
    const orderDateFormat = new Date(`${orderDate[2]}-${orderDate[1]}-${orderDate[0]}`);
    const deliveryDate = orderDateFormat.setDate(orderDateFormat.getDate() + dueDays);
    const actualDate = new Date(deliveryDate).toISOString().slice(0, 10).split('-');
    this.salesOrder.get('deliveryDate').setValue(`${actualDate[2]}-${actualDate[1]}-${actualDate[0]}`);
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
  }

  onDelete(index: number) {
    const productsFormArray = this.salesOrder.get('products') as FormArray;
    let result = confirm('Are You Sure ⚠');
    if (result === false) {
      event.preventDefault();
    } else if (productsFormArray.length > 0) {
      productsFormArray.removeAt(index);
    }
    this.grandTotal();
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
        disamt1Value: new FormControl(null),
        dis2: new FormControl(null),
        disamt2: new FormControl(null),
        disamt2Value: new FormControl(null),
        amnt: new FormControl(null),
        tax1: new FormControl(null),
        tax2: new FormControl(null),
        tax1amt: new FormControl(null),
        tax2amt: new FormControl(null),
        btnToggle: new FormControl(false),
      })
    );
  }

  calculate(index: number) {
    const formArray = this.salesOrder.get('products') as FormArray;
    const productControls = formArray.controls[index];

    const qnt = +productControls.get('qnt').value;

    // DISCOUNT 1 CHANGE LOGIC
    const dis1Per = +productControls.get('dis1').value;
    const mrp = +productControls.get('mrp').value;
    const disAmt1 = ((mrp * dis1Per) / 100);
    const disAmt1Value = (mrp - disAmt1) * qnt;
    const disAmt1Rate = mrp - disAmt1;

    productControls.get('disamt1').setValue(disAmt1 * qnt);
    productControls.get('disamt1Value').setValue(disAmt1Value);
    productControls.get('disamt1').disable();
    productControls.get('rate').setValue(disAmt1Rate);

    // DISCOUNT 2 CHANGE LOGIC
    const dis2Per = +productControls.get('dis2').value;

    if (dis2Per) {
      const disAmt2 = ((dis2Per / 100) * disAmt1Rate);
      const disAmt2Value = (mrp - disAmt2) * qnt;
      const disAmt2Rate = mrp - (disAmt1 + disAmt2);

      productControls.get('disamt2').setValue(disAmt2 * qnt);
      productControls.get('disamt2Value').setValue(disAmt2Value);
      productControls.get('disamt2').disable();
      productControls.get('rate').setValue(disAmt2Rate);
    } else {
      productControls.get('disamt2').setValue(0);
      productControls.get('disamt2').disable();
    }

    // QUANTITY CHANGE LOGIC
    const rateValue = +productControls.get('rate').value;
    const amount = qnt * rateValue;
    productControls.get('amnt').setValue(amount);

    // TAX 1 CHANGE
    const productAmount = +productControls.get('amnt').value;
    const tax1Per = +productControls.get('tax1').value;
    const tax1Amnt = (tax1Per * productAmount) / 100;
    productControls.get('tax1amt').setValue(tax1Amnt);

    // TAX 2 CHANGE
    if (tax1Amnt) {
      const tax2Per = +productControls.get('tax2').value;
      const tax2Amt = (tax2Per * tax1Amnt) / 100;
      productControls.get('tax2amt').setValue(tax2Amt);
    } else {
      productControls.get('tax2amt').setValue(0);
    }
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
      taxAmount += (+control.get('tax1amt').value + +control.get('tax2amt').value) * qnt;
    });

    this.salesOrder.get('quantity').setValue(qnt.toFixed(2));
    this.salesOrder.get('amount').setValue(amount.toFixed(2));
    this.salesOrder.get('discountAmount').setValue(discountAmount.toFixed(2));
    this.salesOrder.get('taxAmount').setValue(taxAmount.toFixed(2));

    const totalValue = amount - discountAmount + taxAmount;
    this.salesOrder.get('totalAmount').setValue(totalValue.toFixed(2));
  }

  onSubmit() {
    console.log('OnSubmit Called');
    if (this.salesOrder.valid) {
      alert('Valid & form Submitted');
    }
  }

}
