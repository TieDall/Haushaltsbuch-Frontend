import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DauerauftragListComponent } from './dauerauftrag-list.component';

describe('DauerauftragListComponent', () => {
  let component: DauerauftragListComponent;
  let fixture: ComponentFixture<DauerauftragListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DauerauftragListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DauerauftragListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
