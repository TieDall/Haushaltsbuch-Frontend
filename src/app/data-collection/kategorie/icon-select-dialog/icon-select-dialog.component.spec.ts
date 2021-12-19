import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconSelectDialogComponent } from './icon-select-dialog.component';

describe('IconSelectDialogComponent', () => {
  let component: IconSelectDialogComponent;
  let fixture: ComponentFixture<IconSelectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconSelectDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
