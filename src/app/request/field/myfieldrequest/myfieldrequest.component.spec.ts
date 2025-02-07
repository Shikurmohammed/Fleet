import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyfieldrequestComponent } from './myfieldrequest.component';

describe('MyfieldrequestComponent', () => {
  let component: MyfieldrequestComponent;
  let fixture: ComponentFixture<MyfieldrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyfieldrequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyfieldrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
