import { TestBed, inject } from '@angular/core/testing';

import { FarmDataService } from './farm-data.service';

describe('FarmDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FarmDataService]
    });
  });

  it('should be created', inject([FarmDataService], (service: FarmDataService) => {
    expect(service).toBeTruthy();
  }));
});
