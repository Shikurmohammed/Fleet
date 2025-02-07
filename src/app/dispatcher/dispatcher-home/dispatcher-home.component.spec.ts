import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatcherHomeComponent } from './dispatcher-home.component';

describe('DispatcherHomeComponent', () => {
  let component: DispatcherHomeComponent;
  let fixture: ComponentFixture<DispatcherHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DispatcherHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DispatcherHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
