import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DimensionIndicatorComponent } from './dimension-indicator.component';

describe('DimensionIndicatorComponent', () => {
  let component: DimensionIndicatorComponent;
  let fixture: ComponentFixture<DimensionIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DimensionIndicatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DimensionIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
