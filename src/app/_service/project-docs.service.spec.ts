import { TestBed, inject } from '@angular/core/testing';

import { ProjectDocsService } from './project-docs.service';

describe('ProjectDocsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectDocsService]
    });
  });

  it('should be created', inject([ProjectDocsService], (service: ProjectDocsService) => {
    expect(service).toBeTruthy();
  }));
});
