import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintIncityComponent } from './print-incity.component';

describe('PrintIncityComponent', () => {
  let component: PrintIncityComponent;
  let fixture: ComponentFixture<PrintIncityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintIncityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintIncityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
