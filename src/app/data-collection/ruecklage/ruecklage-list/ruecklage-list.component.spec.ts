import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuecklageListComponent } from './ruecklage-list.component';

describe('RuecklageListComponent', () => {
  let component: RuecklageListComponent;
  let fixture: ComponentFixture<RuecklageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuecklageListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RuecklageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
