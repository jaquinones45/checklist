import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleEquipmentComponent } from './module-equipment.component';

describe('ModuleEquipmentComponent', () => {
  let component: ModuleEquipmentComponent;
  let fixture: ComponentFixture<ModuleEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleEquipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
