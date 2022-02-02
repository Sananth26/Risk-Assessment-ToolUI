import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItviewrequestComponent } from './itviewrequest.component';

describe('ItviewrequestComponent', () => {
  let component: ItviewrequestComponent;
  let fixture: ComponentFixture<ItviewrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItviewrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItviewrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
