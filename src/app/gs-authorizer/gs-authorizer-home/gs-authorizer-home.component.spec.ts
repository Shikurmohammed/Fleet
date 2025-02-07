import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GsAuthorizerHomeComponent } from './gs-authorizer-home.component';

describe('GsAuthorizerHomeComponent', () => {
  let component: GsAuthorizerHomeComponent;
  let fixture: ComponentFixture<GsAuthorizerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GsAuthorizerHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GsAuthorizerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
