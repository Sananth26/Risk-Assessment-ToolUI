import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SopformComponent } from './sopform.component';

describe('SopformComponent', () => {
  let component: SopformComponent;
  let fixture: ComponentFixture<SopformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SopformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SopformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
