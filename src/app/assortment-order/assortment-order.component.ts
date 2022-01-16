import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assortment-order',
  templateUrl: './assortment-order.component.html',
  styleUrls: ['./assortment-order.component.css'],
})

export class AssortmentOrderComponent implements OnInit {
  number: number = 0;
  filterProductList = [];
  arrayValue: any;

  assortmentOrderForm = new FormGroup({
    product: new FormControl(),
    category: new FormControl(),
    baleQnt: new FormControl(),
    remark: new FormControl(),
    toggleButton: new FormControl(false),
    inputs: new FormControl(),
    productDesignArray: new FormArray([]),
    card: new FormControl(false),
  });

  constructor() {}

  ngOnInit(): void {}

  productCategory = [
    { id: 1, categoryName: 'Salwar Suit' },
    { id: 2, categoryName: 'Palazzo Suit' },
    { id: 3, categoryName: 'Patiala Suit' }
  ];

  products = [
    { id: 1, name: 'Salwar Suit Vol. 10', categoryId: 1, designNumberStart: 1001, totalDesign: 5 },
    { id: 2, name: 'Salwar Suit Vol. 11', categoryId: 1, designNumberStart: 1101, totalDesign: 3 },
    { id: 3, name: 'Palazzo Suit Vol. 15', categoryId: 2, designNumberStart: 1501, totalDesign: 6 },
    { id: 4, name: 'Patiala Suit Vol. 22', categoryId: 3, designNumberStart: 2201, totalDesign: 15 },
  ];

  onproductCategoryChange() {
    const selectedProductCategory = this.assortmentOrderForm.get('category').value;
    this.assortmentOrderForm.get('toggleButton').setValue(false);
    this.filterProductList = [];
    this.products.forEach((values) => {
      if (values.categoryId === selectedProductCategory.id) {
        this.filterProductList.push(values);
      }
    });
  }

  get newArrayControls() {
    return (this.assortmentOrderForm.get('productDesignArray') as FormArray).controls;
  }

  getControls() {
    return (this.assortmentOrderForm.get('productDesignArray') as FormArray).controls.length < 0;
  }

  matSlideToggle() {
    const selectedProduct = this.assortmentOrderForm.get('product').value;
    this.arrayValue = this.assortmentOrderForm.get('productDesignArray') as FormArray;

    for (let i = this.arrayValue.controls.length; i >= 0; i--) {
      this.arrayValue.removeAt(i);
    }

    for (let i = 0; i < selectedProduct.totalDesign; i++) {
      const store = (i + selectedProduct.designNumberStart).toString();
      this.arrayValue.push(
        new FormGroup({
          input: new FormControl(),
          chip: new FormControl(store),
        })
      );
    }
  }

  calculate() {
    let baleQuntPer = 108;
    let qty = 0;

    let getArray = this.assortmentOrderForm.get('productDesignArray').value; // as FormArray;
    getArray.forEach((inputs) => {
      qty = qty + inputs.input;
    });

    let calc = qty % baleQuntPer;
    if (calc == 0) {
      alert('Bale Added');
      // this.number++
    } else {
      alert('not match with bale quantity.');
    }
  }

  checkCalc() {
    let baleQuntPer = 108;
    let count = 0;

    let getArray = this.assortmentOrderForm.get('productDesignArray').value;
    getArray.forEach((item) => {
      count = count + item.input;
    });

    let roundValue = Math.round(count / baleQuntPer);
    if(roundValue == 2) {
      this.number = roundValue
    }    
    console.log(roundValue)
    this.calculate();
    this.assortmentOrderForm.get('card').setValue(true);
    this.assortmentOrderForm.get('toggleButton').setValue(false);
  }

  edit() {
    this.assortmentOrderForm.get('card').setValue(false);
    this.assortmentOrderForm.get('toggleButton').setValue(true);
  }

  remove() {
    this.number = 0;
    // this.isClick = false;
    //  this.isVisibale = true;
  }

  onBalQntInput() {
    const getBaleQntInputValue = this.assortmentOrderForm.get('baleQnt').value;
    alert(`${getBaleQntInputValue} Bale Added✔`);
    this.number = getBaleQntInputValue;
  }
}
