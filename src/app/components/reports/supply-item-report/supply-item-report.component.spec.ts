import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyItemReportComponent } from './supply-item-report.component';

describe('SupplyItemReportComponent', () => {
  let component: SupplyItemReportComponent;
  let fixture: ComponentFixture<SupplyItemReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplyItemReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplyItemReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
