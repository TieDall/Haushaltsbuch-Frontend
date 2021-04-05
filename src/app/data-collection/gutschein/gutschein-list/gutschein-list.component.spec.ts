import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GutscheinListComponent } from './gutschein-list.component';

describe('GutscheinListComponent', () => {
  let component: GutscheinListComponent;
  let fixture: ComponentFixture<GutscheinListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GutscheinListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GutscheinListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
