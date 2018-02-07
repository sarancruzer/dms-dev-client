import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailReportComponent } from './project-detail-report.component';

describe('ProjectDetailReportComponent', () => {
  let component: ProjectDetailReportComponent;
  let fixture: ComponentFixture<ProjectDetailReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDetailReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
