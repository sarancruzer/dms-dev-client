import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyItemsComponent } from './supply-items.component';

describe('SupplyItemsComponent', () => {
  let component: SupplyItemsComponent;
  let fixture: ComponentFixture<SupplyItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplyItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplyItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
