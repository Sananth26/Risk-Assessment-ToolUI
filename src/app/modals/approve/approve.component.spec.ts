import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveComponent } from './approve.component';

describe('ApprovemComponent', () => {
  let component: ApproveComponent;
  let fixture: ComponentFixture<ApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
