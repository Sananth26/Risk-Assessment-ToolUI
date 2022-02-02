import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserstepperComponent } from './userstepper.component';

describe('UserstepperComponent', () => {
  let component: UserstepperComponent;
  let fixture: ComponentFixture<UserstepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserstepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserstepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
