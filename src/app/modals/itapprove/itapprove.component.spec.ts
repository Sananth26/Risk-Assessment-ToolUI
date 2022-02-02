import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItapproveComponent } from './itapprove.component';

describe('ItapproveComponent', () => {
  let component: ItapproveComponent;
  let fixture: ComponentFixture<ItapproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItapproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItapproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
