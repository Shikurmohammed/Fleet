import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegateAuthorizerComponent } from './delegate-authorizer.component';

describe('DelegateAuthorizerComponent', () => {
  let component: DelegateAuthorizerComponent;
  let fixture: ComponentFixture<DelegateAuthorizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelegateAuthorizerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelegateAuthorizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
