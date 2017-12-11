import { TestBed, inject } from '@angular/core/testing';

import { ClientTypeService } from './client-type.service';

describe('ClientTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientTypeService]
    });
  });

  it('should be created', inject([ClientTypeService], (service: ClientTypeService) => {
    expect(service).toBeTruthy();
  }));
});
