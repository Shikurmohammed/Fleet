import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerHomeComponent } from './officer-home.component';

describe('OfficerHomeComponent', () => {
  let component: OfficerHomeComponent;
  let fixture: ComponentFixture<OfficerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficerHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
