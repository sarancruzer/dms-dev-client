import { TestBed, inject } from '@angular/core/testing';

import { ProjectScopeService } from './mproject-scope.service';

describe('ProjectScopeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectScopeService]
    });
  });

  it('should be created', inject([ProjectScopeService], (service: ProjectScopeService) => {
    expect(service).toBeTruthy();
  }));
});
