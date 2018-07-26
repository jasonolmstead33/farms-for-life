import { TestBed, inject } from '@angular/core/testing';

import { FoodDataService } from './food-data.service';

describe('FoodDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FoodDataService]
    });
  });

  it('should be created', inject([FoodDataService], (service: FoodDataService) => {
    expect(service).toBeTruthy();
  }));
});
