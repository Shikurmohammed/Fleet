import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegateOfficerComponent } from './delegate-officer.component';

describe('DelegateOfficerComponent', () => {
  let component: DelegateOfficerComponent;
  let fixture: ComponentFixture<DelegateOfficerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelegateOfficerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelegateOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
