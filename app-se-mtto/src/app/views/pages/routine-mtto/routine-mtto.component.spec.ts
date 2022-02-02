import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutineMttoComponent } from './routine-mtto.component';

describe('RoutineMttoComponent', () => {
  let component: RoutineMttoComponent;
  let fixture: ComponentFixture<RoutineMttoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutineMttoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutineMttoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
