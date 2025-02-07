import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncityComponent } from './incity.component';

describe('IncityComponent', () => {
  let component: IncityComponent;
  let fixture: ComponentFixture<IncityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
