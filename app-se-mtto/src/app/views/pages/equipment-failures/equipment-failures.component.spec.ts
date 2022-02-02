import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentFailuresComponent } from './equipment-failures.component';

describe('EquipmentFailuresComponent', () => {
  let component: EquipmentFailuresComponent;
  let fixture: ComponentFixture<EquipmentFailuresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentFailuresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentFailuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
