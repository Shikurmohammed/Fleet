import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfftimeManageDispatchComponent } from './offtime-manage-dispatch.component';

describe('OfftimeManageDispatchComponent', () => {
  let component: OfftimeManageDispatchComponent;
  let fixture: ComponentFixture<OfftimeManageDispatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfftimeManageDispatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfftimeManageDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
