import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOfftimeComponent } from './check-offtime.component';

describe('CheckOfftimeComponent', () => {
  let component: CheckOfftimeComponent;
  let fixture: ComponentFixture<CheckOfftimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckOfftimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckOfftimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
