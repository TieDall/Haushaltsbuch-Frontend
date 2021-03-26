import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DauerauftragEditComponent } from './dauerauftrag-edit.component';

describe('DauerauftragEditComponent', () => {
  let component: DauerauftragEditComponent;
  let fixture: ComponentFixture<DauerauftragEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DauerauftragEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DauerauftragEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
