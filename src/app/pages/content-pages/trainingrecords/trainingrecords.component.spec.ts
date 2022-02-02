import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingrecordsComponent } from './trainingrecords.component';

describe('TrainingrecordsComponent', () => {
  let component: TrainingrecordsComponent;
  let fixture: ComponentFixture<TrainingrecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingrecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingrecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
