import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniView2DComponent } from './mini-view2-d.component';

describe('MiniView2DComponent', () => {
  let component: MiniView2DComponent;
  let fixture: ComponentFixture<MiniView2DComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniView2DComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiniView2DComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
