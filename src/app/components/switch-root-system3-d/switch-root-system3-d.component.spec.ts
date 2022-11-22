import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchRootSystem3DComponent } from './switch-root-system3-d.component';

describe('SwitchRootSystem3DComponent', () => {
  let component: SwitchRootSystem3DComponent;
  let fixture: ComponentFixture<SwitchRootSystem3DComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchRootSystem3DComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwitchRootSystem3DComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
