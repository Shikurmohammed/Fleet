import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintRequestsComponent } from './maint-requests.component';

describe('MaintRequestsComponent', () => {
  let component: MaintRequestsComponent;
  let fixture: ComponentFixture<MaintRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
