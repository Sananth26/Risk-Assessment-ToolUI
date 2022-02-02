import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskdetailuserComponent } from './riskdetailuser.component';

describe('RiskdetailuserComponent', () => {
  let component: RiskdetailuserComponent;
  let fixture: ComponentFixture<RiskdetailuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskdetailuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskdetailuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
