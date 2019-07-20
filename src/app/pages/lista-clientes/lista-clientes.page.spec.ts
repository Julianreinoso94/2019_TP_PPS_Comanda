import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaClientesPage } from './lista-clientes.page';

describe('ListaClientesPage', () => {
  let component: ListaClientesPage;
  let fixture: ComponentFixture<ListaClientesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaClientesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaClientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
