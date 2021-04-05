import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GutscheinEditComponent } from './gutschein-edit.component';

describe('GutscheinEditComponent', () => {
  let component: GutscheinEditComponent;
  let fixture: ComponentFixture<GutscheinEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GutscheinEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GutscheinEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
