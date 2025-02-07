import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncityModifyDispatchedComponent } from './incity-modify-dispatched.component';

describe('IncityModifyDispatchedComponent', () => {
  let component: IncityModifyDispatchedComponent;
  let fixture: ComponentFixture<IncityModifyDispatchedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncityModifyDispatchedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncityModifyDispatchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
