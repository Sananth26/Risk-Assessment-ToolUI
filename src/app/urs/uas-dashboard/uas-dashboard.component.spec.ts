import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UasDashboardComponent } from './uas-dashboard.component';

describe('UasDashboardComponent', () => {
  let component: UasDashboardComponent;
  let fixture: ComponentFixture<UasDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UasDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UasDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
