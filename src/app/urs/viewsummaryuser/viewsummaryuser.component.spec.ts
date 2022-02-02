import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsummaryuserComponent } from './viewsummaryuser.component';

describe('ViewsummaryuserComponent', () => {
  let component: ViewsummaryuserComponent;
  let fixture: ComponentFixture<ViewsummaryuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewsummaryuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsummaryuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
