import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirplanefieldRequestComponent } from './airplanefield-request.component';

describe('AirplanefieldRequestComponent', () => {
  let component: AirplanefieldRequestComponent;
  let fixture: ComponentFixture<AirplanefieldRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirplanefieldRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirplanefieldRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
