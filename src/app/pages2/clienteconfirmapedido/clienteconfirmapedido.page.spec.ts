import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteconfirmapedidoPage } from './clienteconfirmapedido.page';

describe('ClienteconfirmapedidoPage', () => {
  let component: ClienteconfirmapedidoPage;
  let fixture: ComponentFixture<ClienteconfirmapedidoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteconfirmapedidoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteconfirmapedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
