import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizeRequestComponent } from './authorize-request.component';

describe('AuthorizeRequestComponent', () => {
  let component: AuthorizeRequestComponent;
  let fixture: ComponentFixture<AuthorizeRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizeRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
