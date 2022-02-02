import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulePlantComponent } from './module-plant.component';

describe('ModulePlantComponent', () => {
  let component: ModulePlantComponent;
  let fixture: ComponentFixture<ModulePlantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModulePlantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulePlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
