import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KategorieEditComponent } from './kategorie-edit.component';

describe('KategorieEditComponent', () => {
  let component: KategorieEditComponent;
  let fixture: ComponentFixture<KategorieEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KategorieEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KategorieEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
