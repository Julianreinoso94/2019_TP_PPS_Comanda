import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbrirMesaPage } from './abrir-mesa.page';

describe('AbrirMesaPage', () => {
  let component: AbrirMesaPage;
  let fixture: ComponentFixture<AbrirMesaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbrirMesaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbrirMesaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
