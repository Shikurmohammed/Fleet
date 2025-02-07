import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCompletionComponent } from './manage-completion.component';

describe('ManageCompletionComponent', () => {
  let component: ManageCompletionComponent;
  let fixture: ComponentFixture<ManageCompletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCompletionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
