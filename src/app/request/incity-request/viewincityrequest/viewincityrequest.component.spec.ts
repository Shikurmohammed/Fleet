import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewincityrequestComponent } from './viewincityrequest.component';

describe('ViewincityrequestComponent', () => {
  let component: ViewincityrequestComponent;
  let fixture: ComponentFixture<ViewincityrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewincityrequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewincityrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
