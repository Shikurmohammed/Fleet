import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyreMillageDueComponent } from './tyre-millage-due.component';

describe('TyreMillageDueComponent', () => {
  let component: TyreMillageDueComponent;
  let fixture: ComponentFixture<TyreMillageDueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TyreMillageDueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TyreMillageDueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
