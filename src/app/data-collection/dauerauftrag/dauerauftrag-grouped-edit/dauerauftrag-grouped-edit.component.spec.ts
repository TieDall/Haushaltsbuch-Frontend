import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DauerauftragGroupedEditComponent } from './dauerauftrag-grouped-edit.component';

describe('DauerauftragGroupedEditComponent', () => {
  let component: DauerauftragGroupedEditComponent;
  let fixture: ComponentFixture<DauerauftragGroupedEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DauerauftragGroupedEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DauerauftragGroupedEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
