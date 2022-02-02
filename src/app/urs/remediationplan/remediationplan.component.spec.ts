import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemediationplanComponent } from './remediationplan.component';

describe('RemediationplanComponent', () => {
  let component: RemediationplanComponent;
  let fixture: ComponentFixture<RemediationplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemediationplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemediationplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
