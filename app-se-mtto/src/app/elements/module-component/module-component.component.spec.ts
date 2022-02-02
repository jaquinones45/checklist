import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleComponentComponent } from './module-component.component';

describe('ModuleComponentComponent', () => {
  let component: ModuleComponentComponent;
  let fixture: ComponentFixture<ModuleComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
