import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectSelector2DComponent } from './object-selector2-d.component';

describe('ObjectSelector2DComponent', () => {
  let component: ObjectSelector2DComponent;
  let fixture: ComponentFixture<ObjectSelector2DComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectSelector2DComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectSelector2DComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
