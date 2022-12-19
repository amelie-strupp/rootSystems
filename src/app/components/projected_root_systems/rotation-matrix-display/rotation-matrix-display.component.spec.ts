import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotationMatrixDisplayComponent } from './rotation-matrix-display.component';

describe('RotationMatrixDisplayComponent', () => {
  let component: RotationMatrixDisplayComponent;
  let fixture: ComponentFixture<RotationMatrixDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RotationMatrixDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RotationMatrixDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
