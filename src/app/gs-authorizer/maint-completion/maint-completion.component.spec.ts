import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintCompletionComponent } from './maint-completion.component';

describe('MaintCompletionComponent', () => {
  let component: MaintCompletionComponent;
  let fixture: ComponentFixture<MaintCompletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintCompletionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintCompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
