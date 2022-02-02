import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeComponentComponent } from './type-component.component';

describe('TypeComponentComponent', () => {
  let component: TypeComponentComponent;
  let fixture: ComponentFixture<TypeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
