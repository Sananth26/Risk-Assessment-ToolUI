import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RisksummaryandmitigationComponent } from './risksummaryandmitigation.component';

describe('RisksummaryandmitigationComponent', () => {
  let component: RisksummaryandmitigationComponent;
  let fixture: ComponentFixture<RisksummaryandmitigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RisksummaryandmitigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RisksummaryandmitigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
