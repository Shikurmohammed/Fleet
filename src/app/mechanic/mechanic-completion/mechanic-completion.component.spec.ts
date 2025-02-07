import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechanicCompletionComponent } from './mechanic-completion.component';

describe('MechanicCompletionComponent', () => {
  let component: MechanicCompletionComponent;
  let fixture: ComponentFixture<MechanicCompletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MechanicCompletionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MechanicCompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
