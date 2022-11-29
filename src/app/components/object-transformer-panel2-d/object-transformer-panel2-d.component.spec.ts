import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectTransformerPanel2DComponent } from './object-transformer-panel2-d.component';

describe('ObjectTransformerPanel2DComponent', () => {
  let component: ObjectTransformerPanel2DComponent;
  let fixture: ComponentFixture<ObjectTransformerPanel2DComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectTransformerPanel2DComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectTransformerPanel2DComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
