import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerapprovalComponent } from './managerapproval.component';

describe('ManagerapprovalComponent', () => {
  let component: ManagerapprovalComponent;
  let fixture: ComponentFixture<ManagerapprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerapprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
