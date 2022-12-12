import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionPlaneControlComponent } from './projection-plane-control.component';

describe('ProjectionPlaneControlComponent', () => {
  let component: ProjectionPlaneControlComponent;
  let fixture: ComponentFixture<ProjectionPlaneControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectionPlaneControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectionPlaneControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
