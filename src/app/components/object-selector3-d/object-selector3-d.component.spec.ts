import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectSelector3DComponent } from './object-selector3-d.component';

describe('ObjectSelector3DComponent', () => {
  let component: ObjectSelector3DComponent;
  let fixture: ComponentFixture<ObjectSelector3DComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectSelector3DComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectSelector3DComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
