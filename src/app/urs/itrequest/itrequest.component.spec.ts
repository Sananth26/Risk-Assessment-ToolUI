import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItrequestComponent } from './itrequest.component';

describe('ItrequestComponent', () => {
  let component: ItrequestComponent;
  let fixture: ComponentFixture<ItrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
