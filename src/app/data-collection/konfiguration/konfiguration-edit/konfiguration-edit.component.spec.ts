import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KonfigurationEditComponent } from './konfiguration-edit.component';

describe('KonfigurationEditComponent', () => {
  let component: KonfigurationEditComponent;
  let fixture: ComponentFixture<KonfigurationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KonfigurationEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KonfigurationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
