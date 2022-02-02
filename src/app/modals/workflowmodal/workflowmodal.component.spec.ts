import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowmodalComponent } from './workflowmodal.component';

describe('WorkflowmodalComponent', () => {
  let component: WorkflowmodalComponent;
  let fixture: ComponentFixture<WorkflowmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
