import { TestBed, inject } from '@angular/core/testing';

import { AgencyDataService } from './agency-data.service';

describe('AgencyDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgencyDataService]
    });
  });

  it('should be created', inject([AgencyDataService], (service: AgencyDataService) => {
    expect(service).toBeTruthy();
  }));
});
