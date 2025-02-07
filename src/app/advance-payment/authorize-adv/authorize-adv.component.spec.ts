import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizeAdvComponent } from './authorize-adv.component';

describe('AuthorizeAdvComponent', () => {
  let component: AuthorizeAdvComponent;
  let fixture: ComponentFixture<AuthorizeAdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizeAdvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizeAdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
