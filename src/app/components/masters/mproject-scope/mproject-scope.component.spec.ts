import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MprojectScopeComponent } from './mproject-scope.component';

describe('MprojectScopeComponent', () => {
  let component: MprojectScopeComponent;
  let fixture: ComponentFixture<MprojectScopeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MprojectScopeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MprojectScopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
