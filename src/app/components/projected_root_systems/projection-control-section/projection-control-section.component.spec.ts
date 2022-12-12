import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionControlSectionComponent } from './projection-control-section.component';

describe('ProjectionControlSectionComponent', () => {
  let component: ProjectionControlSectionComponent;
  let fixture: ComponentFixture<ProjectionControlSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectionControlSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectionControlSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
