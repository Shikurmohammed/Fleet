import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnverifiedCustodianRequestComponent } from './unverified-custodian-request.component';

describe('UnverifiedCustodianRequestComponent', () => {
  let component: UnverifiedCustodianRequestComponent;
  let fixture: ComponentFixture<UnverifiedCustodianRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnverifiedCustodianRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnverifiedCustodianRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
