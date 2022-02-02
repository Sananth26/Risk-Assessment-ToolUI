import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerapprovalcommentComponent } from './managerapprovalcomment.component';

describe('ManagerapprovalcommentComponent', () => {
  let component: ManagerapprovalcommentComponent;
  let fixture: ComponentFixture<ManagerapprovalcommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerapprovalcommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerapprovalcommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
