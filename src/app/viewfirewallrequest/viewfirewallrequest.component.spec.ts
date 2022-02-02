import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewfirewallrequestComponent } from './viewfirewallrequest.component';

describe('ViewfirewallrequestComponent', () => {
  let component: ViewfirewallrequestComponent;
  let fixture: ComponentFixture<ViewfirewallrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewfirewallrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewfirewallrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
