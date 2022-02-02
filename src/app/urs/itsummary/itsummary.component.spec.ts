import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItsummaryComponent } from './itsummary.component';

describe('ItsummaryComponent', () => {
  let component: ItsummaryComponent;
  let fixture: ComponentFixture<ItsummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItsummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
