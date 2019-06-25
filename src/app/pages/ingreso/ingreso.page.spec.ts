import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoPage } from './ingreso.page';

describe('IngresoPage', () => {
  let component: IngresoPage;
  let fixture: ComponentFixture<IngresoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
