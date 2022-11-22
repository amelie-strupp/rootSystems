import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootSystems3DComponent } from './root-systems3-d.component';

describe('RootSystems3DComponent', () => {
  let component: RootSystems3DComponent;
  let fixture: ComponentFixture<RootSystems3DComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RootSystems3DComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RootSystems3DComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
