import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeSystemRevisionPreviewComponent } from './type-system-revision-preview.component';

describe('TypeSystemRevisionPreviewComponent', () => {
  let component: TypeSystemRevisionPreviewComponent;
  let fixture: ComponentFixture<TypeSystemRevisionPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeSystemRevisionPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeSystemRevisionPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
