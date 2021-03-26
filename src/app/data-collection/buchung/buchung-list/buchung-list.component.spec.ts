import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuchungListComponent } from './buchung-list.component';

describe('BuchungListComponent', () => {
  let component: BuchungListComponent;
  let fixture: ComponentFixture<BuchungListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuchungListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuchungListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
