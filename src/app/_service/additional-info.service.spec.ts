import { TestBed, inject } from '@angular/core/testing';

import { AdditionalInfoService } from './additional-info.service';

describe('AdditionalInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdditionalInfoService]
    });
  });

  it('should be created', inject([AdditionalInfoService], (service: AdditionalInfoService) => {
    expect(service).toBeTruthy();
  }));
});
