import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaPedidoPage } from './alta-pedido.page';

describe('AltaPedidoPage', () => {
  let component: AltaPedidoPage;
  let fixture: ComponentFixture<AltaPedidoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaPedidoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaPedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
