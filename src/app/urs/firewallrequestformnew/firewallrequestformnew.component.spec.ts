import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirewallrequestformnewComponent } from './firewallrequestformnew.component';

describe('FirewallrequestformnewComponent', () => {
  let component: FirewallrequestformnewComponent;
  let fixture: ComponentFixture<FirewallrequestformnewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirewallrequestformnewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirewallrequestformnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
