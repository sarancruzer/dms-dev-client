import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingClassComponent } from './building-class.component';

describe('BuildingClassComponent', () => {
  let component: BuildingClassComponent;
  let fixture: ComponentFixture<BuildingClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
