import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SopboardComponent } from './sopboard.component';

describe('SopboardComponent', () => {
  let component: SopboardComponent;
  let fixture: ComponentFixture<SopboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SopboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SopboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
