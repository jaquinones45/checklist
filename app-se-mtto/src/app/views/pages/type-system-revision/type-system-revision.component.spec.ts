import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeSystemRevisionComponent } from './type-system-revision.component';

describe('TypeSystemRevisionComponent', () => {
  let component: TypeSystemRevisionComponent;
  let fixture: ComponentFixture<TypeSystemRevisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeSystemRevisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeSystemRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
