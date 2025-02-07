import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfftimeDispatcherComponent } from './offtime-dispatcher.component';

describe('OfftimeDispatcherComponent', () => {
  let component: OfftimeDispatcherComponent;
  let fixture: ComponentFixture<OfftimeDispatcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfftimeDispatcherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfftimeDispatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
