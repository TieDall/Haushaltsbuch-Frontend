import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DauerauftragGroupedListComponent } from './dauerauftrag-grouped-list.component';

describe('DauerauftragGroupedListComponent', () => {
  let component: DauerauftragGroupedListComponent;
  let fixture: ComponentFixture<DauerauftragGroupedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DauerauftragGroupedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DauerauftragGroupedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
