import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuchungEditComponent } from './buchung-edit.component';

describe('BuchungEditComponent', () => {
  let component: BuchungEditComponent;
  let fixture: ComponentFixture<BuchungEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuchungEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuchungEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
