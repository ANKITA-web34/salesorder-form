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

  salesOrder = new FormGroup({
    party: new FormControl(null, [Validators.required]),
    address: new FormControl({ value: null, disabled: true }, [Validators.required]),
    book: new FormControl(null, [Validators.required]),
    orderType: new FormControl(null, [Validators.required]),
    taxType: new FormControl(null, [Validators.required]),
    orderId: new FormControl(null, [Validators.required]),
    orderDate: new FormControl(null, [Validators.required]),
    deliveryDate: new FormControl(null, [Validators.required]),
    challan: new FormControl(null, [Validators.required]),
    products: new FormArray([]),
    quantity: new FormControl(0, [Validators.required]),
    amount: new FormControl(0, [Validators.required]),
    discountAmount: new FormControl(0, [Validators.required]),
    taxAmount: new FormControl(0, [Validators.required]),
    totalAmount: new FormControl(0, [Validators.required]),
  });

  partyOptions = [
    { id: 1, partyName: 'party1', dueDays: 2 },
    { id: 2, partyName: 'party2', dueDays: 10 },
    { id: 3, partyName: 'party3', dueDays: 7 },
    { id: 4, partyName: 'party4', dueDays: 5 }
  ];

  salesmans =[
    { id: 1, salesmanName: 'salesman1'},
    { id: 2, salesmanName: 'salesman2'},
    { id: 3, salesmanName: 'salesman3'},
    { id: 4, salesmanName: 'salesman4'}
  ]

  brokers = [
    { id: 1, brokerName: 'broker1'},
    { id: 2, brokerName: 'broker2'},
    { id: 3, brokerName: 'broker3'},
    { id: 4, brokerName: 'broker4'}
  ]

  addressOptions = [
    { id: 1, partyAddress: 'address1', partyId: 1 },
    { id: 2, partyAddress: 'address2', partyId: 2 },
    { id: 3, partyAddress: 'address3', partyId: 3 },
    { id: 4, partyAddress: 'address4', partyId: 4 },
  ];

  bookOptions = [{ id: 1, value: 'Sales Order' }];

  // onChange() {
  //   ///////////////////////////////////////////////
  //   // const partyId = +this.salesOrder.get('party').value;
  //   // const deliveryDate = new Date(this.salesOrder.get('deliveryDate').value);

  //   // let dueDays;

  //   // this.partyOptions.forEach((party)=> {
  //   //   if( party.id === partyId) {
  //   //     dueDays = party.dueDays;
  //   //   }
  //   // });

  //   // const orderDateInSec = deliveryDate.setDate(deliveryDate.getDate() + dueDays);
  //   // const orderDate = new Date(orderDateInSec).toISOString.slice(0, 10).split('-');
  // }

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
    const partyId = +this.salesOrder.get('party').value;

    this.addressOptions.forEach((address) => {
      if (address.partyId === partyId) {
        this.salesOrder.get('address').setValue(address.partyAddress);
      }
    });
  }

  // OnLoad() {
  //   const currentDate: any = new Date().toISOString().slice(0, 10).split('-');
  //   this.salesOrder.get('orderDate').setValue(`${currentDate[2]}-${currentDate[1]}-${currentDate[0]}`);
  //   this.salesOrder.get('orderDate').disable();
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
        })
      );
    }
  }

  onDelete(idx: any) {
    const productsFormArray = this.salesOrder.get('products') as FormArray;
    if (productsFormArray.length > 1) {
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
    productsFormArray.controls.forEach((control: FormControl) => {
      // FOR TOTAL QUANTITY
      quantity += +control.get('qnt').value;

      // FOR TOTAL AMOUNT
      amount += +control.get('qnt').value * +control.get('mrp').value;
    });

    this.salesOrder.get('quantity').setValue(quantity);
    this.salesOrder.get('amount').setValue(amount);

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

    const disPer = +productControls.get('dis2').value;
    const disAmt1 = +productControls.get('disamt1').value;
    const mrp = +productControls.get('mrp').value;

    const disAmt = (disPer / 100) * (mrp - disAmt1);

    productControls.get('disamt2').setValue(disAmt);
    productControls.get('disamt2').disable();
  }
}
