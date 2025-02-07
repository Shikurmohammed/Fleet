import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedRequestsComponent } from './verified-requests.component';

describe('VerifiedRequestsComponent', () => {
  let component: VerifiedRequestsComponent;
  let fixture: ComponentFixture<VerifiedRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifiedRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifiedRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
