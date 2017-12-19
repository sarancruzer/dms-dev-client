import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectNoteComponent } from './project-note.component';

describe('ProjectNoteComponent', () => {
  let component: ProjectNoteComponent;
  let fixture: ComponentFixture<ProjectNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
