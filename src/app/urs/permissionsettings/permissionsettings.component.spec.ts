import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionsettingsComponent } from './permissionsettings.component';

describe('PermissionsettingsComponent', () => {
  let component: PermissionsettingsComponent;
  let fixture: ComponentFixture<PermissionsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
