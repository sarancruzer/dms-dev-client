import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectScopeConfigureComponent } from './project-scope-configure.component';

describe('ProjectScopeConfigureComponent', () => {
  let component: ProjectScopeConfigureComponent;
  let fixture: ComponentFixture<ProjectScopeConfigureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectScopeConfigureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectScopeConfigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
