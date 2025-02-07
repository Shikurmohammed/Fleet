import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldManageDispatchComponent } from './field-manage-dispatch.component';

describe('FieldManageDispatchComponent', () => {
  let component: FieldManageDispatchComponent;
  let fixture: ComponentFixture<FieldManageDispatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldManageDispatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldManageDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
