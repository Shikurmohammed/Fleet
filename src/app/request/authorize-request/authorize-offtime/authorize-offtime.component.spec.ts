import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizeOfftimeComponent } from './authorize-offtime.component';

describe('AuthorizeOfftimeComponent', () => {
  let component: AuthorizeOfftimeComponent;
  let fixture: ComponentFixture<AuthorizeOfftimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizeOfftimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizeOfftimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
