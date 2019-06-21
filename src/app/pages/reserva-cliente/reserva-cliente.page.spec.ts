import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaClientePage } from './reserva-cliente.page';

describe('ReservaClientePage', () => {
  let component: ReservaClientePage;
  let fixture: ComponentFixture<ReservaClientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservaClientePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
