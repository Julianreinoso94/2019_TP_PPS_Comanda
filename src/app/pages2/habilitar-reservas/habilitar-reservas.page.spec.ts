import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HabilitarReservasPage } from './habilitar-reservas.page';

describe('HabilitarReservasPage', () => {
  let component: HabilitarReservasPage;
  let fixture: ComponentFixture<HabilitarReservasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabilitarReservasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HabilitarReservasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
