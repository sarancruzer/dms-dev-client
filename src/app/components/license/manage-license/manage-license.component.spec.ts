import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLicenseComponent } from './manage-license.component';

describe('ManageLicenseComponent', () => {
  let component: ManageLicenseComponent;
  let fixture: ComponentFixture<ManageLicenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageLicenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
