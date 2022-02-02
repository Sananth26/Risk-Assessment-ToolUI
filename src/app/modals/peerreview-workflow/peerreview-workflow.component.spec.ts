import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeerreviewWorkflowComponent } from './peerreview-workflow.component';

describe('PeerreviewWorkflowComponent', () => {
  let component: PeerreviewWorkflowComponent;
  let fixture: ComponentFixture<PeerreviewWorkflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeerreviewWorkflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeerreviewWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
