import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfftimeModifyDispatchedComponent } from './offtime-modify-dispatched.component';

describe('OfftimeModifyDispatchedComponent', () => {
  let component: OfftimeModifyDispatchedComponent;
  let fixture: ComponentFixture<OfftimeModifyDispatchedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfftimeModifyDispatchedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfftimeModifyDispatchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
