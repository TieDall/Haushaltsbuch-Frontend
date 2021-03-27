import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KonfigurationListComponent } from './konfiguration-list.component';

describe('KonfigurationListComponent', () => {
  let component: KonfigurationListComponent;
  let fixture: ComponentFixture<KonfigurationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KonfigurationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KonfigurationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
