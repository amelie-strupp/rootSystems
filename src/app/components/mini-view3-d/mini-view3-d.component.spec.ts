import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniView3DComponent } from './mini-view3-d.component';

describe('MiniView3DComponent', () => {
  let component: MiniView3DComponent;
  let fixture: ComponentFixture<MiniView3DComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniView3DComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiniView3DComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
