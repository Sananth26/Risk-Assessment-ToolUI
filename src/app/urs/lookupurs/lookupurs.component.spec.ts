import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupursComponent } from './lookupurs.component';

describe('LookupursComponent', () => {
  let component: LookupursComponent;
  let fixture: ComponentFixture<LookupursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LookupursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookupursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
