import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectedRootSystemsComponent } from './projected-root-systems.component';

describe('ProjectedRootSystemsComponent', () => {
  let component: ProjectedRootSystemsComponent;
  let fixture: ComponentFixture<ProjectedRootSystemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectedRootSystemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectedRootSystemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
