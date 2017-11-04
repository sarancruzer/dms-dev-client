import { TestBed, inject } from '@angular/core/testing';

import { CommonNewService } from './common-new.service';

describe('CommonNewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonNewService]
    });
  });

  it('should be created', inject([CommonNewService], (service: CommonNewService) => {
    expect(service).toBeTruthy();
  }));
});
