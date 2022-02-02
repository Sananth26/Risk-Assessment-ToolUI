import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserriskdetailrankingComponent } from './userriskdetailranking.component';

describe('UserriskdetailrankingComponent', () => {
  let component: UserriskdetailrankingComponent;
  let fixture: ComponentFixture<UserriskdetailrankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserriskdetailrankingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserriskdetailrankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
