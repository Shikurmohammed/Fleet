import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatcherreportsComponent } from './dispatcherreports.component';

describe('DispatcherreportsComponent', () => {
  let component: DispatcherreportsComponent;
  let fixture: ComponentFixture<DispatcherreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DispatcherreportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DispatcherreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
