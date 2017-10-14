import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienttypeComponent } from './clienttype.component';

describe('ClienttypeComponent', () => {
  let component: ClienttypeComponent;
  let fixture: ComponentFixture<ClienttypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienttypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienttypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
