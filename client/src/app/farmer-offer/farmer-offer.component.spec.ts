import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerOfferComponent } from './farmer-offer.component';

describe('FarmerOfferComponent', () => {
  let component: FarmerOfferComponent;
  let fixture: ComponentFixture<FarmerOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmerOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
