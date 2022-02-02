import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsummaryComponent } from './viewsummary.component';

describe('ViewsummaryComponent', () => {
  let component: ViewsummaryComponent;
  let fixture: ComponentFixture<ViewsummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewsummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
