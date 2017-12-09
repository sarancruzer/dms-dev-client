import { TestBed, inject } from '@angular/core/testing';

import { BuildingClassService } from './building-class.service';

describe('BuildingClassService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuildingClassService]
    });
  });

  it('should be created', inject([BuildingClassService], (service: BuildingClassService) => {
    expect(service).toBeTruthy();
  }));
});
