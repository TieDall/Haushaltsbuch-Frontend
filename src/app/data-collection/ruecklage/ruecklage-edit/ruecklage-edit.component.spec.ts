import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuecklageEditComponent } from './ruecklage-edit.component';

describe('RuecklageEditComponent', () => {
  let component: RuecklageEditComponent;
  let fixture: ComponentFixture<RuecklageEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuecklageEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RuecklageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
