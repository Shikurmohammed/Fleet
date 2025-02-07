import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizeIncityComponent } from './authorize-incity.component';

describe('AuthorizeIncityComponent', () => {
  let component: AuthorizeIncityComponent;
  let fixture: ComponentFixture<AuthorizeIncityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizeIncityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizeIncityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
