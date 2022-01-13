import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssortmentOrderComponent } from './assortment-order.component';

describe('AssortmentOrderComponent', () => {
  let component: AssortmentOrderComponent;
  let fixture: ComponentFixture<AssortmentOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssortmentOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssortmentOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
