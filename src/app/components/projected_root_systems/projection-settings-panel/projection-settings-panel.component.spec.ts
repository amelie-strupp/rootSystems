import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionSettingsPanelComponent } from './projection-settings-panel.component';

describe('ProjectionSettingsPanelComponent', () => {
  let component: ProjectionSettingsPanelComponent;
  let fixture: ComponentFixture<ProjectionSettingsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectionSettingsPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectionSettingsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
