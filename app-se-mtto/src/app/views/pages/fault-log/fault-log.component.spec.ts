import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaultLogComponent } from './fault-log.component';

describe('FaultLogComponent', () => {
  let component: FaultLogComponent;
  let fixture: ComponentFixture<FaultLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaultLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaultLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
