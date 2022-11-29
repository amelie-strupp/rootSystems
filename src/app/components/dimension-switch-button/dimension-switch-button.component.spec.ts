import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DimensionSwitchButtonComponent } from './dimension-switch-button.component';

describe('DimensionSwitchButtonComponent', () => {
  let component: DimensionSwitchButtonComponent;
  let fixture: ComponentFixture<DimensionSwitchButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DimensionSwitchButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DimensionSwitchButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
