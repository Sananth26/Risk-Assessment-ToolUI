import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirewallrequestComponent } from './firewallrequest.component';

describe('FirewallrequestComponent', () => {
  let component: FirewallrequestComponent;
  let fixture: ComponentFixture<FirewallrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirewallrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirewallrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
