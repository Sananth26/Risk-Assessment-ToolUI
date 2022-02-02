import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildboxComponent } from './childbox.component';

describe('ChildboxComponent', () => {
  let component: ChildboxComponent;
  let fixture: ComponentFixture<ChildboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
