import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldModifyDispatchedComponent } from './field-modify-dispatched.component';

describe('FieldModifyDispatchedComponent', () => {
  let component: FieldModifyDispatchedComponent;
  let fixture: ComponentFixture<FieldModifyDispatchedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldModifyDispatchedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldModifyDispatchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
