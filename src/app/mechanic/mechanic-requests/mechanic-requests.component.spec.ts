import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechanicRequestsComponent } from './mechanic-requests.component';

describe('MechanicRequestsComponent', () => {
  let component: MechanicRequestsComponent;
  let fixture: ComponentFixture<MechanicRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MechanicRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MechanicRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
