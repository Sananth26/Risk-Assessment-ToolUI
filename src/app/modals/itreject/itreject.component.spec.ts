import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItrejectComponent } from './itreject.component';

describe('ItrejectComponent', () => {
  let component: ItrejectComponent;
  let fixture: ComponentFixture<ItrejectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItrejectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItrejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
