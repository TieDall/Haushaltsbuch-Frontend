import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KategorieListComponent } from './kategorie-list.component';

describe('KategorieListComponent', () => {
  let component: KategorieListComponent;
  let fixture: ComponentFixture<KategorieListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KategorieListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KategorieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
