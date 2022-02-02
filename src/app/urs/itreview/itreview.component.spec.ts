import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItreviewComponent } from './itreview.component';

describe('ItreviewComponent', () => {
  let component: ItreviewComponent;
  let fixture: ComponentFixture<ItreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
