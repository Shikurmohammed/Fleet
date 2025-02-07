import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncityDispatcherComponent } from './incity-dispatcher.component';

describe('IncityDispatcherComponent', () => {
  let component: IncityDispatcherComponent;
  let fixture: ComponentFixture<IncityDispatcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncityDispatcherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncityDispatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
