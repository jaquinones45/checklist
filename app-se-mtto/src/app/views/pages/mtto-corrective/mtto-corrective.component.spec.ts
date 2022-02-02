import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MttoCorrectiveComponent } from './mtto-corrective.component';

describe('MttoCorrectiveComponent', () => {
  let component: MttoCorrectiveComponent;
  let fixture: ComponentFixture<MttoCorrectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MttoCorrectiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MttoCorrectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
