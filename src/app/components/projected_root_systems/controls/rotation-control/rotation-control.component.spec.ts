import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotationControlComponent } from './rotation-control.component';

describe('RotationControlComponent', () => {
  let component: RotationControlComponent;
  let fixture: ComponentFixture<RotationControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RotationControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RotationControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
