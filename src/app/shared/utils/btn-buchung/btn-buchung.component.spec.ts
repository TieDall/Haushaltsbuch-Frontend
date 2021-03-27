import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnBuchungComponent } from './btn-buchung.component';

describe('BtnBuchungComponent', () => {
  let component: BtnBuchungComponent;
  let fixture: ComponentFixture<BtnBuchungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnBuchungComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnBuchungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
