import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionNDRotationControlComponent } from './projection-ndrotation-control.component';

describe('ProjectionNDRotationControlComponent', () => {
  let component: ProjectionNDRotationControlComponent;
  let fixture: ComponentFixture<ProjectionNDRotationControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectionNDRotationControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectionNDRotationControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
