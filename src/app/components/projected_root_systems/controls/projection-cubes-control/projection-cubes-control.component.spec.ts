import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionCubesControlComponent } from './projection-cubes-control.component';

describe('ProjectionCubesControlComponent', () => {
  let component: ProjectionCubesControlComponent;
  let fixture: ComponentFixture<ProjectionCubesControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectionCubesControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectionCubesControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
