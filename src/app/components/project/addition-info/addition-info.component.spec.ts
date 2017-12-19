import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionInfoComponent } from './addition-info.component';

describe('AdditionInfoComponent', () => {
  let component: AdditionInfoComponent;
  let fixture: ComponentFixture<AdditionInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
