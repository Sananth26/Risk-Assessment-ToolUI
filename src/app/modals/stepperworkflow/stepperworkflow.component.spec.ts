import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperworkflowComponent } from './stepperworkflow.component';

describe('StepperworkflowComponent', () => {
  let component: StepperworkflowComponent;
  let fixture: ComponentFixture<StepperworkflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepperworkflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperworkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
