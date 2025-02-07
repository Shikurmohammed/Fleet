import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldDispatcherComponent } from './field-dispatcher.component';

describe('FieldDispatcherComponent', () => {
  let component: FieldDispatcherComponent;
  let fixture: ComponentFixture<FieldDispatcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldDispatcherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldDispatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
