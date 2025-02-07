import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagecompletionComponent } from './managecompletion.component';

describe('ManagecompletionComponent', () => {
  let component: ManagecompletionComponent;
  let fixture: ComponentFixture<ManagecompletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagecompletionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagecompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
