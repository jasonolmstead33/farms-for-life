import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyPreferenceComponent } from './agency-preference.component';

describe('AgencyPreferenceComponent', () => {
  let component: AgencyPreferenceComponent;
  let fixture: ComponentFixture<AgencyPreferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyPreferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyPreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
