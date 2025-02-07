import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegateGsauthComponent } from './delegate-gsauth.component';

describe('DelegateGsauthComponent', () => {
  let component: DelegateGsauthComponent;
  let fixture: ComponentFixture<DelegateGsauthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelegateGsauthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelegateGsauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
