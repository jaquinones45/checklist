import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeSystemComponent } from './type-system.component';

describe('TypeSystemComponent', () => {
  let component: TypeSystemComponent;
  let fixture: ComponentFixture<TypeSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeSystemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
