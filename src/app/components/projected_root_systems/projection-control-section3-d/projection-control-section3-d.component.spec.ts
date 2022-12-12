import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionControlSection3DComponent } from './projection-control-section3-d.component';

describe('ProjectionControlSection3DComponent', () => {
  let component: ProjectionControlSection3DComponent;
  let fixture: ComponentFixture<ProjectionControlSection3DComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectionControlSection3DComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectionControlSection3DComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
