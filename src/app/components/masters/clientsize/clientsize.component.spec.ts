import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsizeComponent } from './clientsize.component';

describe('ClientsizeComponent', () => {
  let component: ClientsizeComponent;
  let fixture: ComponentFixture<ClientsizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientsizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
