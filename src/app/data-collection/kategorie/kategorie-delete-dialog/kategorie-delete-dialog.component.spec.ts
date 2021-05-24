import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KategorieDeleteDialogComponent } from './kategorie-delete-dialog.component';

describe('KategorieDeleteDialogComponent', () => {
  let component: KategorieDeleteDialogComponent;
  let fixture: ComponentFixture<KategorieDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KategorieDeleteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KategorieDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
