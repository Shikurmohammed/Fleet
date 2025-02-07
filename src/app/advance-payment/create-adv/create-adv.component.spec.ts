import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdvComponent } from './create-adv.component';

describe('CreateAdvComponent', () => {
  let component: CreateAdvComponent;
  let fixture: ComponentFixture<CreateAdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAdvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
