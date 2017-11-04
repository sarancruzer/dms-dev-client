import { TestBed, inject } from '@angular/core/testing';

import { ClientSizeService } from './client-size.service';

describe('ClientSizeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientSizeService]
    });
  });

  it('should be created', inject([ClientSizeService], (service: ClientSizeService) => {
    expect(service).toBeTruthy();
  }));
});
