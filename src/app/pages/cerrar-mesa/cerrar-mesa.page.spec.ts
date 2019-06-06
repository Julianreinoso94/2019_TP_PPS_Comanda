import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CerrarMesaPage } from './cerrar-mesa.page';

describe('CerrarMesaPage', () => {
  let component: CerrarMesaPage;
  let fixture: ComponentFixture<CerrarMesaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CerrarMesaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CerrarMesaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
