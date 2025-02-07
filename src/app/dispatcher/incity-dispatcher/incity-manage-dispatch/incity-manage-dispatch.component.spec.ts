import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncityManageDispatchComponent } from './incity-manage-dispatch.component';

describe('IncityManageDispatchComponent', () => {
  let component: IncityManageDispatchComponent;
  let fixture: ComponentFixture<IncityManageDispatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncityManageDispatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncityManageDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
