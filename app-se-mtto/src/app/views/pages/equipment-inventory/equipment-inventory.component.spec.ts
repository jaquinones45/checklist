import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentInventoryComponent } from './equipment-inventory.component';

describe('EquipmentInventoryComponent', () => {
  let component: EquipmentInventoryComponent;
  let fixture: ComponentFixture<EquipmentInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
