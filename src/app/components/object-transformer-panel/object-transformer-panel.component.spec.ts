import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectTransformerPanelComponent } from './object-transformer-panel.component';

describe('ObjectTransformerPanelComponent', () => {
  let component: ObjectTransformerPanelComponent;
  let fixture: ComponentFixture<ObjectTransformerPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectTransformerPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectTransformerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
