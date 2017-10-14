import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolePrivillegesComponent } from './role-privilleges.component';

describe('RolePrivillegesComponent', () => {
  let component: RolePrivillegesComponent;
  let fixture: ComponentFixture<RolePrivillegesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolePrivillegesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolePrivillegesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
