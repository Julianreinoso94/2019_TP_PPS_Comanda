import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VericarmesapedidoPage } from './vericarmesapedido.page';

describe('VericarmesapedidoPage', () => {
  let component: VericarmesapedidoPage;
  let fixture: ComponentFixture<VericarmesapedidoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VericarmesapedidoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VericarmesapedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
